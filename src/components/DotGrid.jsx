import { useRef, useEffect, useCallback, useMemo } from 'react';

import './DotGrid.css';

const throttle = (func, limit) => {
  let lastCall = 0;
  return function throttled(...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16)
  };
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const DotGrid = ({
  dotSize = 8,
  gap = 32,
  baseColor = '#A50000',
  activeColor = '#FFD347',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });
  const lastFrameRef = useRef(0);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);
  const baseTransparent = useMemo(() => {
    const { r, g, b } = baseRgb;
    return `rgba(${r},${g},${b},0)`;
  }, [baseRgb]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;

    const path = new window.Path2D();
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return path;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, targetX: 0, targetY: 0, cooldown: 0 });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return undefined;

    let rafId;
    const proximitySquared = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const now = performance.now();
      const previous = lastFrameRef.current || now;
      const delta = Math.min((now - previous) / 1000, 0.05);
      lastFrameRef.current = now;

      const easing = 1 - Math.exp(-delta * 12);
      const decay = Math.exp(-delta / Math.max(returnDuration, 0.2));

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        dot.targetX *= decay;
        dot.targetY *= decay;
        dot.xOffset += (dot.targetX - dot.xOffset) * easing;
        dot.yOffset += (dot.targetY - dot.yOffset) * easing;

        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const distanceSquared = dx * dx + dy * dy;

        let fillStyle = baseTransparent;
        if (distanceSquared <= proximitySquared) {
          const dist = Math.sqrt(distanceSquared);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          const alpha = Math.min(1, Math.max(0, t ** 1.2));
          fillStyle = `rgba(${r},${g},${b},${alpha})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = fillStyle;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseTransparent, baseRgb, activeRgb, circlePath, returnDuration]);

  useEffect(() => {
    buildGrid();
    let resizeObserver = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(buildGrid);
      if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const maxOffset = proximity * 0.35;
    const impulseMoveScale = 0.12;
    const impulseClickScale = 0.28;

    const applyImpulse = (dot, pushX, pushY, scale) => {
      dot.targetX = clamp(dot.targetX + pushX * scale, -maxOffset, maxOffset);
      dot.targetY = clamp(dot.targetY + pushY * scale, -maxOffset, maxOffset);
      dot.cooldown = performance.now();
    };

    const handleMove = (event) => {
      const now = performance.now();
      const pointer = pointerRef.current;
      const dt = pointer.lastTime ? now - pointer.lastTime : 16;
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pointer.lastTime = now;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.vx = vx;
      pointer.vy = vy;
      pointer.speed = speed;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;

      if (speed < speedTrigger) return;

      for (const dot of dotsRef.current) {
        if (now - dot.cooldown < 80) continue;
        const dist = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y);
        if (dist < proximity) {
          const pushX = dot.cx - pointer.x + vx * 0.004;
          const pushY = dot.cy - pointer.y + vy * 0.004;
          applyImpulse(dot, pushX, pushY, impulseMoveScale);
        }
      }
    };

    const handleClick = (event) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = event.clientX - rect.left;
      const cy = event.clientY - rect.top;
      const now = performance.now();
      for (const dot of dotsRef.current) {
        if (now - dot.cooldown < 120) continue;
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          applyImpulse(dot, pushX, pushY, impulseClickScale);
        }
      }
    };

    const throttledMove = throttle(handleMove, 40);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', handleClick);
    };
  }, [maxSpeed, speedTrigger, proximity, shockRadius, shockStrength]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;

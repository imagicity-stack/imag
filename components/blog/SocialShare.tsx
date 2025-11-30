import { useMemo } from 'react';

interface Props {
  url: string;
  title: string;
}

export default function SocialShare({ url, title }: Props) {
  const encodedUrl = useMemo(() => encodeURIComponent(url), [url]);
  const encodedTitle = useMemo(() => encodeURIComponent(title), [title]);

  return (
    <div className="flex items-center gap-3 text-sm text-gray-300">
      <span className="uppercase tracking-widest text-gray-400 text-xs">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1 rounded-full bg-scarlet/20 text-scarlet hover:bg-scarlet/30"
      >
        X/Twitter
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1 rounded-full bg-aurum/20 text-aurum hover:bg-aurum/30"
      >
        LinkedIn
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
      >
        Facebook
      </a>
    </div>
  );
}

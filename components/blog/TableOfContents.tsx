interface TOCProps {
  headings: { text: string; id: string; level: number }[];
}

const indentClass = (level: number) => {
  if (level >= 3) return 'pl-6';
  if (level === 2) return 'pl-4';
  return 'pl-2';
};

export default function TableOfContents({ headings }: TOCProps) {
  if (!headings.length) return null;
  return (
    <aside className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4 table-of-contents">
      <p className="text-sm font-semibold text-aurum mb-2">On this page</p>
      {headings.map((heading) => (
        <a key={heading.id} href={`#${heading.id}`} className={`${indentClass(heading.level)} block`}>
          {heading.text}
        </a>
      ))}
    </aside>
  );
}

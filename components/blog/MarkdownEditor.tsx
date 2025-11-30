import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-200">Content (Markdown)</label>
        <textarea
          className="w-full min-h-[240px] rounded-xl bg-gray-900 border border-gray-800 p-4 text-sm text-gray-100"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="# Headings, **bold**, lists, code blocks and more"
        />
      </div>
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-4">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Live Preview</p>
        <div className="prose prose-invert max-w-none text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value || 'Start typing to see the preview.'}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

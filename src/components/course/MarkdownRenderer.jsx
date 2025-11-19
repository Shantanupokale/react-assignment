import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function MarkdownRenderer({ content }) {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-normal tracking-tight text-primary mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-normal mt-8 mb-4 text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font- mt-6 mb-3 text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed my-4 text-foreground/90">
              {children}
            </p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#00BC7D]/70 pl-4 italic text-primary  mt-1 py-0.5 rounded-r-lg">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2">{children}</ol>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-3 py-2 bg-muted text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-2">
              {children}
            </td>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg shadow-lg max-w-full my-6"
            />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              {children}
            </a>
          ),
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-lg my-4"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="px-1 py-0.5 rounded bg-muted text-primary font-mono text-sm">
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}

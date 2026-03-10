import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type SafeMarkdownProps = {
  markdown: string;
};
export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  return (
    <div
      className={clsx(
        "prose",
        "prose-slate",
        "w-full",
        "max-w-none",
        "overflow-hidden",
        "prose-a:text-blue-500",
        "prose-a:hover:text-blue-700",
        "prose-a:no-underline",
        "prose-a:hover:underline",
        "prose-img:mx-auto",
        "lg:prose-lg",
        "dark:prose-invert",
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return "";
            return (
              <div className="overflow-x-auto">
                <table className="w-full min-w-150" {...props}></table>
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

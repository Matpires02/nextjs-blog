import { formatDateTime, formatRelativeDate } from "@/utils/format-datetime";

type PostSummaryProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostSummaryProps) {
  return (
    <time
      className="text-slate-600 text-sm/tight dark:text-slate-50 dark:opacity-75"
      dateTime={dateTime}
      title={formatRelativeDate(dateTime)}
    >
      {formatDateTime(dateTime)}
    </time>
  );
}

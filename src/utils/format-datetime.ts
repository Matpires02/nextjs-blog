import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDateTime(rowDate: string): string {
  const date = new Date(rowDate);

  return format(date, "dd/MM/yyyy 'às' HH'h'mm", { locale: ptBR });
}

export function formatRelativeDate(rowDate: string): string {
  const date = new Date(rowDate);

  return formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
}

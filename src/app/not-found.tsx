import ErrorMessage from "@/components/ErrorMessage";
import clsx from "clsx";

export default function NotFoundPage() {
  return (
    <ErrorMessage
      contentTitle="404"
      pageTitle="Página não encontrada"
      content="Erro 404 - A página que você está tentando acessar não existe neste
            site."
    />
  );
}

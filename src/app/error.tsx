"use client";
import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error }: RootErrorPageProps) {
  useEffect(() => {
    console.error(error); // usado para logar erros ou fazer o log
  }, [error]);
  return (
    <ErrorMessage
      contentTitle="501"
      pageTitle="Internal Server Error"
      content="Ocorreu um erro do qual nossa aplicação não conseguiu se recuperar. Tente novamente mais tarde."
    />
  );
}

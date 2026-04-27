"use client";
import { logoutAction } from "@/actions/login/logout-action";
import clsx from "clsx";
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const [isPending, startTransition] = useTransition();

  const navClasses = clsx(
    "bg-slate-900 text-slate-100 rounded-lg dark:bg-slate-100 dark:text-slate-900",
    "flex flex-col mb-8",
    "sm:flex-row sm:flex-wrap",
    !isOpen && "h-10 overflow-hidden",
    "sm:overflow-visible sm:h-auto",
  );
  const linkClasses = clsx(
    "[&>svg]:w-4 [&>svg]:h-4 px-4 flex items-center gap-2 rounded-lg cursor-pointer",
    "transition hover:bg-slate-800 dark:hover:bg-slate-300",
    "h-10 shrink-0",
  );
  const openCloseBtnClasses = clsx(
    linkClasses,
    "text-blue-200 italic dark:text-blue-950 sm:hidden",
  );
  function handleLogout(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void {
    event.preventDefault();

    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <nav className={navClasses}>
      <button
        onClick={() => setIsOpen((s) => !s)}
        className={openCloseBtnClasses}
        type="button"
        aria-label={`${isOpen ? "Fechar" : "Abrir"} Menu`}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
            Menu
          </>
        )}
      </button>

      <a className={linkClasses} href="/" target="_blank">
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href="/admin/post">
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href="/admin/post/new">
        <PlusIcon />
        Criar Post
      </Link>

      <a onClick={handleLogout} href="#" className={linkClasses}>
        {isPending && (
          <>
            <HourglassIcon />
            Aguarde...
          </>
        )}

        {!isPending && (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </a>
    </nav>
  );
}

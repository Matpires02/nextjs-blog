import Link from "next/link";

export function Footer() {
  return (
    <footer className="pb-16 text-center">
      <p className="">
        <span>Copyright &copy; {new Date().getFullYear()} - </span>
        <Link href="/">The Blog</Link>
      </p>
    </footer>
  );
}

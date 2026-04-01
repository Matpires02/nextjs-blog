import { MenuAdmin } from "@/components/Admin/MenuAdmin";

export default function PostAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}

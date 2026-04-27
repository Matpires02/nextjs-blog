import { MenuAdmin } from "@/components/Admin/MenuAdmin";
import { requireLoginSessionOrRedirect } from "@/lib/login/manage-login";

export default async function PostAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireLoginSessionOrRedirect();
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}

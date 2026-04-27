import { hashPassword } from "@/lib/login/manage-login";

(async () => {
  const suaSenha = "";
  const hashDaSenhaEmBase64 = await hashPassword(suaSenha);
  console.log({ hashDaSenhaEmBase64 });
})();

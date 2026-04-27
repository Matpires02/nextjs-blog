"use client";
import { loginAction } from "@/actions/login/login-action";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { LogInIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export function LoginPage() {
  const initialState = {
    username: "",
    error: "",
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast.dismiss();
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center text-center mt-16 mb-32 mx-auto max-w-md">
      <form
        action={action}
        className="flex-1 flex flex-col gap-6 card-glass py-16 px-8"
      >
        <InputText
          type="text"
          name="username"
          labelText="Usuário"
          placeholder="Seu usuário"
          disabled={isPending}
          defaultValue={state.username}
        />
        <InputText
          type="password"
          name="password"
          labelText="Senha"
          placeholder="Sua senha"
          disabled={isPending}
        />
        <Button disabled={isPending} className="mt-4" type="submit">
          <LogInIcon /> Entrar
        </Button>

        {!!state.error && <p className="text-red-600">{state.error}</p>}
      </form>
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Completa tu correo y contraseña.");
      return;
    }

    try {
      setSubmitting(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      // Si quieres hacer algo con la sesión:
      // console.log("Logged in:", data.session);

      // OPCIONAL: redirigir
      // navigate("/", { replace: true });
    } catch (err: any) {
      toast.error(err?.message ?? "No se pudo iniciar sesión.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-muted-foreground text-balance">
                  Inicia sesión en tu cuenta
                </p>
              </div>

              {/* Error */}
              {/* {errorMsg && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMsg}
                </div>
              )} */}

              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  autoComplete="email"
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Aquí luego puedes implementar "reset password"
                      toast.error(
                        "Aún no implementado: recuperación de contraseña.",
                      );
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  autoComplete="current-password"
                />
              </Field>

              <Field>
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Ingresando…" : "Iniciar sesión"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                ¿No tienes una cuenta?{" "}
                <a
                  href="#"
                  className="underline-offset-2 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.error(
                      "Conecta aquí tu pantalla/modal de registro 🙂",
                    );
                  }}
                >
                  Regístrate
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/fondo-nttdata.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        Un proyecto desarrollado por el equipo <strong>TriByte 👾</strong> para
        el hackathon de <strong>Axet</strong> en <strong>NTT DATA</strong>.
      </FieldDescription>
    </div>
  );
}

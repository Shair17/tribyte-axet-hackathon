import { cn } from "@/lib/utils";
import { paths } from "@/shared/config/paths";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  returnTo?: string;
  returnToText?: string;
};

export function NotFoundError({
  className,
  returnTo,
  returnToText = "Ir a la página de inicio",
}: Props) {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-6 lg:px-8 flex h-full items-center",
        className,
      )}
    >
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="flex max-w-xl flex-col items-center text-center">
          <p className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
            404
          </p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
            Página no encontrada
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </p>
          <Link
            className="mt-4 text-sm font-semibold text-foreground transition hover:text-primary underline"
            to={returnTo || paths.ROOT}
          >
            {returnToText}
          </Link>
        </div>
      </div>
    </div>
  );
}

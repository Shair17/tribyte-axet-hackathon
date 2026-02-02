import { Link } from "react-router-dom";
import { paths } from "../config/paths";

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="flex max-w-xl flex-col items-center text-center">
          <p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
            401
          </p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
            Acceso no autorizado
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Lo sentimos, no tienes acceso a esta página.
          </p>
          <Link
            className="mt-4 text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
            to={paths.ROOT}
          >
            Ir a la página de inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

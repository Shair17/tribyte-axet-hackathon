import { Navigate, Outlet } from "react-router-dom";
import { paths } from "@/shared/config/paths";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useAuth } from "@/hooks/useAuth";
import { safeReturnTo } from "@/shared/utils/url.utils";
import { FullPageLoader } from "@/components/FullPageLoader/FullPageLoader";

export function PublicRoute() {
  const auth = useAuth();
  const searchParams = useSearchParams();

  const nextPage = searchParams.get("next");

  if (auth.loading) {
    return <FullPageLoader />;
  }

  if (auth.user) {
    return <Navigate to={safeReturnTo(nextPage, paths.app.root)} replace />;
  }

  return <Outlet />;
}

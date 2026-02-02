import { Navigate, useLocation } from "react-router-dom";
import { paths } from "@/shared/config/paths";
import { encodeReturnTo } from "@/shared/utils/url.utils";
import { useAuth } from "@/hooks/useAuth";
import { FullPageLoader } from "@/components/FullPageLoader/FullPageLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAuth();
  const location = useLocation();

  const nextPage = encodeReturnTo(
    location.pathname,
    location.search,
    location.hash,
  );

  if (auth.loading) {
    return <FullPageLoader />;
  }

  if (!auth.user) {
    return <Navigate to={`${paths.auth.login}?next=${nextPage}`} replace />;
  }

  return <>{children}</>;
}

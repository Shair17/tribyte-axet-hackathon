import { Fragment } from "react";

import { FullPageLoader } from "@/components/FullPageLoader/FullPageLoader";
import { useAuth } from "@/hooks/useAuth";
import { AdministratorDashboard } from "../sections/AdministratorDashboard";

export default function DashboardPage() {
  const { user, role } = useAuth();

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdministratorDashboard user={user!} />;
      case "leader":
        return <div>leader</div>;
      case "collaborator":
        return <div>collaborator</div>;
      default:
        return <FullPageLoader />;
    }
  };

  if (!user || !role) {
    return <FullPageLoader />;
  }

  return <Fragment>{renderDashboard()}</Fragment>;
}

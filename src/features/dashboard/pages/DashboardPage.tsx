import { Fragment } from "react";

import { FullPageLoader } from "@/components/FullPageLoader/FullPageLoader";
import { useAuth } from "@/hooks/useAuth";
import { AdministratorDashboard } from "../sections/AdministratorDashboard";
import CollaboratorDashboard from "../sections/CollaboratorDashboard";
import LeaderDashboard from "../sections/LeaderDashboard";

export default function DashboardPage() {
  const { user, role } = useAuth();

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdministratorDashboard user={user!} />;
      case "leader":
        return <LeaderDashboard user={user!} />;
      case "collaborator":
        return <CollaboratorDashboard user={user!} />;
      default:
        return <FullPageLoader />;
    }
  };

  if (!user || !role) {
    return <FullPageLoader />;
  }

  return <Fragment>{renderDashboard()}</Fragment>;
}

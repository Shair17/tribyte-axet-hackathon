import { useAuth } from '@/app/contexts/AuthContext';
import SharedLayout from '@/app/components/SharedLayout';
import CollaboratorDashboard from '@/app/components/dashboards/CollaboratorDashboard';
import LeaderDashboard from '@/app/components/dashboards/LeaderDashboard';
import AdministratorDashboard from '@/app/components/dashboards/AdministratorDashboard';

export default function Screen02Dashboard({ onOpenAIChat }: { onOpenAIChat?: () => void }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <SharedLayout activeScreen={2} pageTitle="Dashboard" onOpenAIChat={onOpenAIChat}>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Please log in to view your dashboard</p>
        </div>
      </SharedLayout>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'collaborator':
        return <CollaboratorDashboard user={user} />;
      case 'leader':
        return <LeaderDashboard user={user} />;
      case 'administrator':
        return <AdministratorDashboard user={user} />;
      default:
        return <CollaboratorDashboard user={user} />;
    }
  };

  return (
    <SharedLayout activeScreen={2} pageTitle="Dashboard" onOpenAIChat={onOpenAIChat}>
      <div className="p-6">
        {renderDashboard()}
      </div>
    </SharedLayout>
  );
}

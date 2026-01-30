import { User } from '@/app/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Users,
  AlertCircle,
  TrendingUp,
  Shield,
  Sparkles,
  Database,
  Settings,
  FileWarning,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface AdministratorDashboardProps {
  user: User;
}

export default function AdministratorDashboard({ user }: AdministratorDashboardProps) {
  const systemStats = {
    totalUsers: 248,
    activeUsers: 234,
    leaders: 12,
    collaborators: 222,
    administrators: 2
  };

  const vacationStats = {
    totalRequests: 156,
    approved: 142,
    pending: 11,
    rejected: 3
  };

  const aiInsights = [
    {
      type: 'critical',
      title: 'Data Inconsistency Detected',
      description: '3 employees have overlapping vacation and medical leave records',
      count: 3,
      action: 'Review Now'
    },
    {
      type: 'warning',
      title: 'Expiring Vacation Days',
      description: '18 employees risk losing vacation days by end of quarter',
      count: 18,
      action: 'Send Reminders'
    },
    {
      type: 'info',
      title: 'Approval Delays',
      description: '5 requests pending for more than 7 days',
      count: 5,
      action: 'Notify Leaders'
    },
    {
      type: 'success',
      title: 'System Health',
      description: 'All integrations operational, 99.8% uptime this month',
      count: null,
      action: 'View Details'
    }
  ];

  const departmentOverview = [
    { name: 'Engineering', employees: 89, vacationUsage: 67, alertLevel: 'normal' },
    { name: 'Sales', employees: 45, vacationUsage: 82, alertLevel: 'warning' },
    { name: 'Marketing', employees: 38, vacationUsage: 71, alertLevel: 'normal' },
    { name: 'HR', employees: 22, vacationUsage: 58, alertLevel: 'normal' },
    { name: 'Finance', employees: 31, vacationUsage: 45, alertLevel: 'low' },
    { name: 'Operations', employees: 23, vacationUsage: 76, alertLevel: 'normal' },
  ];

  const recentActivity = [
    { action: 'New user created', user: 'Anna Williams', role: 'Collaborator', time: '2 hours ago', type: 'user' },
    { action: 'Vacation approved', user: 'Michael Chen', duration: '5 days', time: '4 hours ago', type: 'approval' },
    { action: 'System integration synced', user: 'Jira Integration', status: 'Success', time: '6 hours ago', type: 'system' },
    { action: 'AI validation completed', user: 'Axet Gaia', records: '248 records', time: '12 hours ago', type: 'ai' },
  ];

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'success':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
        return <FileWarning className="h-5 w-5" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6" />
                System Administrator
              </CardTitle>
              <CardDescription className="text-base mt-1">
                Full platform overview and control • {user.name}
              </CardDescription>
            </div>
            <Badge variant="outline" className="gap-2 bg-white px-4 py-2">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
              All Systems Operational
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Total Users</CardDescription>
            <CardTitle className="text-3xl">{systemStats.totalUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              +8 this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Active</CardDescription>
            <CardTitle className="text-3xl">{systemStats.activeUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {((systemStats.activeUsers / systemStats.totalUsers) * 100).toFixed(1)}% online
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Leaders</CardDescription>
            <CardTitle className="text-3xl">{systemStats.leaders}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Managing teams
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Pending</CardDescription>
            <CardTitle className="text-3xl text-amber-600">{vacationStats.pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Vacation requests
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">This Month</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{vacationStats.approved}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Requests approved
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights - Priority */}
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Insights by Axet Gaia
              </CardTitle>
              <CardDescription>Automated detection and recommendations</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Configure AI
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${getAlertColor(insight.type)}`}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getAlertIcon(insight.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      {insight.count !== null && (
                        <Badge variant="outline" className="bg-white">
                          {insight.count}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">{insight.description}</p>
                    <Button size="sm" variant="outline" className="mt-2 bg-white">
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Department Overview
          </CardTitle>
          <CardDescription>Vacation usage by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {departmentOverview.map((dept, index) => {
              const alertColors = {
                warning: 'text-amber-600',
                low: 'text-blue-600',
                normal: 'text-emerald-600'
              };
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">{dept.name}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-muted-foreground">
                          <Users className="h-3 w-3 inline mr-1" />
                          {dept.employees} employees
                        </div>
                        <div className={`font-semibold ${alertColors[dept.alertLevel as keyof typeof alertColors]}`}>
                          {dept.vacationUsage}% usage
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${dept.vacationUsage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent System Activity
          </CardTitle>
          <CardDescription>Latest actions and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const typeIcons = {
                user: <Users className="h-4 w-4 text-blue-600" />,
                approval: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
                system: <Database className="h-4 w-4 text-purple-600" />,
                ai: <Sparkles className="h-4 w-4 text-purple-600" />
              };
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    {typeIcons[activity.type as keyof typeof typeIcons]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto flex-col gap-3 py-6">
          <Users className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">Manage Users</p>
            <p className="text-xs text-muted-foreground mt-1">Add, edit, remove</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-3 py-6">
          <Settings className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">System Settings</p>
            <p className="text-xs text-muted-foreground mt-1">Configure platform</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-3 py-6">
          <Database className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">Data Audit</p>
            <p className="text-xs text-muted-foreground mt-1">Review all records</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-3 py-6">
          <Sparkles className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">AI Configuration</p>
            <p className="text-xs text-muted-foreground mt-1">Tune Axet Gaia</p>
          </div>
        </Button>
      </div>
    </div>
  );
}

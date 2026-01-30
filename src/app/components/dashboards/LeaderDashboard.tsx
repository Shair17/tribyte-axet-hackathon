import { User } from '@/app/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import {
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calendar,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

interface LeaderDashboardProps {
  user: User;
}

export default function LeaderDashboard({ user }: LeaderDashboardProps) {
  const teamMembers = [
    { id: 1, name: 'Michael Chen', initials: 'MC', role: 'Senior Engineer', totalDays: 25, consumed: 15, remaining: 10, status: 'Active' },
    { id: 2, name: 'Emily Davis', initials: 'ED', role: 'Engineer', totalDays: 25, consumed: 8, remaining: 17, status: 'Active' },
    { id: 3, name: 'David Lee', initials: 'DL', role: 'Engineer', totalDays: 25, consumed: 20, remaining: 5, status: 'Low Balance' },
    { id: 4, name: 'Lisa Wang', initials: 'LW', role: 'QA Engineer', totalDays: 22, consumed: 10, remaining: 12, status: 'Active' },
    { id: 5, name: 'James Miller', initials: 'JM', role: 'Engineer', totalDays: 25, consumed: 22, remaining: 3, status: 'Critical' },
    { id: 6, name: 'Anna Smith', initials: 'AS', role: 'Tech Lead', totalDays: 28, consumed: 12, remaining: 16, status: 'Active' },
  ];

  const pendingApprovals = [
    {
      id: 1,
      employee: 'Michael Chen',
      type: 'Vacation',
      period: 'Feb 10-14, 2025',
      days: 5,
      submitted: '2025-01-28',
      reason: 'Family trip'
    },
    {
      id: 2,
      employee: 'Emily Davis',
      type: 'Medical Leave',
      period: 'Feb 3-4, 2025',
      days: 2,
      submitted: '2025-01-29',
      reason: 'Medical appointment'
    },
    {
      id: 3,
      employee: 'Lisa Wang',
      type: 'Vacation',
      period: 'Mar 1-7, 2025',
      days: 7,
      submitted: '2025-01-29',
      reason: 'Personal travel'
    },
  ];

  const alerts = [
    { type: 'warning', message: '2 team members have less than 5 vacation days remaining', priority: 'high' },
    { type: 'info', message: 'David Lee vacation expiring soon (Must use before Nov 30)', priority: 'medium' },
    { type: 'success', message: 'All vacation requests processed on time this month', priority: 'low' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Low Balance':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {user.name}</CardTitle>
          <CardDescription className="text-base">
            {user.department} • Managing {teamMembers.length} team members
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Team Size</CardDescription>
            <CardTitle className="text-3xl">{teamMembers.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              Active members
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Pending Approvals</CardDescription>
            <CardTitle className="text-3xl text-amber-600">{pendingApprovals.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Requires action
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Critical Alerts</CardDescription>
            <CardTitle className="text-3xl text-red-600">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertCircle className="h-3 w-3" />
              Low vacation balance
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">This Month</CardDescription>
            <CardTitle className="text-3xl text-emerald-600">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3 w-3" />
              Requests processed
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals - Priority Section */}
      <Card className="border-2 border-amber-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Pending Approvals
              </CardTitle>
              <CardDescription>Requests awaiting your review</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              {pendingApprovals.length} pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApprovals.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">{request.employee}</p>
                    <Badge variant="outline" className="text-xs">
                      {request.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {request.period}
                    </div>
                    <span>•</span>
                    <span>{request.days} days</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Reason: {request.reason} • Submitted {new Date(request.submitted).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Vacation Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Vacation Balance
          </CardTitle>
          <CardDescription>Overview of vacation days for each team member</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => {
              const percentage = (member.consumed / member.totalDays) * 100;
              return (
                <div key={member.id} className="space-y-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{member.remaining} days left</p>
                        <p className="text-xs text-muted-foreground">{member.consumed} / {member.totalDays} used</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Team Alerts & Insights
          </CardTitle>
          <CardDescription>Important notifications and AI-detected patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const icons = {
                warning: <AlertTriangle className="h-5 w-5 text-amber-600" />,
                info: <AlertCircle className="h-5 w-5 text-blue-600" />,
                success: <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              };
              const colors = {
                warning: 'bg-amber-50 border-amber-200',
                info: 'bg-blue-50 border-blue-200',
                success: 'bg-emerald-50 border-emerald-200'
              };
              return (
                <div key={index} className={`flex items-start gap-3 p-4 rounded-lg border ${colors[alert.type as keyof typeof colors]}`}>
                  {icons[alert.type as keyof typeof icons]}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">Priority: {alert.priority}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-auto flex-col gap-3 py-6">
          <FileCheck className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">Review All Requests</p>
            <p className="text-xs text-muted-foreground mt-1">Manage pending approvals</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-3 py-6">
          <TrendingUp className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">Team Analytics</p>
            <p className="text-xs text-muted-foreground mt-1">View detailed reports</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-3 py-6">
          <Calendar className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">Team Calendar</p>
            <p className="text-xs text-muted-foreground mt-1">See who's out when</p>
          </div>
        </Button>
      </div>
    </div>
  );
}

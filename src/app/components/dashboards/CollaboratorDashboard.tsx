import { User } from '@/app/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Separator } from '@/app/components/ui/separator';
import {
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  FileText,
  Plane
} from 'lucide-react';

interface CollaboratorDashboardProps {
  user: User;
}

export default function CollaboratorDashboard({ user }: CollaboratorDashboardProps) {
  const vacationData = user.vacationDays;
  const consumptionPercentage = (vacationData.consumed / vacationData.total) * 100;
  
  const recentVacations = [
    { period: 'Dec 20-27, 2024', days: 7, status: 'Completed', location: 'Remote' },
    { period: 'Aug 5-9, 2024', days: 5, status: 'Completed', location: 'HQ Office' },
  ];

  const upcomingVacations = [
    { period: 'Mar 10-14, 2025', days: 5, status: 'Approved', location: 'Remote' },
  ];

  const pendingRequests = [
    { type: 'Vacation', period: 'Apr 20-24, 2025', days: 5, status: 'Pending Approval', submitted: '2025-01-28' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back, {user.name}!</CardTitle>
          <CardDescription className="text-base">
            Here's your vacation status and personal overview
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Vacation Balance - Primary Focus */}
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Plane className="h-6 w-6 text-blue-600" />
                Your Vacation Balance
              </CardTitle>
              <CardDescription>Current year allocation and consumption</CardDescription>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Request Vacation
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <div className="text-3xl font-bold text-blue-600">{vacationData.total}</div>
              <p className="text-sm text-muted-foreground mt-1">Total Days</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50">
              <div className="text-3xl font-bold text-orange-600">{vacationData.consumed}</div>
              <p className="text-sm text-muted-foreground mt-1">Days Used</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-emerald-50">
              <div className="text-3xl font-bold text-emerald-600">{vacationData.remaining}</div>
              <p className="text-sm text-muted-foreground mt-1">Days Remaining</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Consumption Progress</span>
              <span className="text-muted-foreground">{consumptionPercentage.toFixed(0)}% used</span>
            </div>
            <Progress value={consumptionPercentage} className="h-3" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>0 days</span>
              <span>{vacationData.total} days</span>
            </div>
          </div>

          <Separator />

          {/* Timeline Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Accumulation Start
              </div>
              <p className="font-semibold">{new Date(vacationData.accumulationStartDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                Suggested Consumption
              </div>
              <p className="font-semibold">{vacationData.suggestedConsumptionWindow}</p>
            </div>
          </div>

          {/* Alert if low remaining */}
          {vacationData.remaining < 10 && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-amber-900">Running low on vacation days</p>
                <p className="text-xs text-amber-700 mt-1">
                  You have {vacationData.remaining} days remaining. Consider planning your time off before the year ends.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vacations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              Recent Vacations
            </CardTitle>
            <CardDescription>Your completed time off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentVacations.map((vacation, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{vacation.period}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-700">
                        {vacation.days} days
                      </Badge>
                      <span className="text-xs text-muted-foreground">{vacation.location}</span>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Vacations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              Upcoming Vacations
            </CardTitle>
            <CardDescription>Your approved future time off</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingVacations.length > 0 ? (
              <div className="space-y-3">
                {upcomingVacations.map((vacation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-blue-50 border-blue-200">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">{vacation.period}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">
                          {vacation.days} days
                        </Badge>
                        <span className="text-xs text-muted-foreground">{vacation.location}</span>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {vacation.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No upcoming vacations scheduled</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-amber-600" />
              Pending Requests
            </CardTitle>
            <CardDescription>Awaiting approval from your manager</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-white">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{request.type}</Badge>
                      <span className="font-semibold text-sm">{request.period}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{request.days} days</span>
                      <span>•</span>
                      <span>Submitted {new Date(request.submitted).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common tasks and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Plus className="h-5 w-5" />
              <span className="text-xs">Request Vacation</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <FileText className="h-5 w-5" />
              <span className="text-xs">Medical Leave</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">View History</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Team Calendar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

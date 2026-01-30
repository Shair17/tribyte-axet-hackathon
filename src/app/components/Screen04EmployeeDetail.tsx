import SharedLayout from '@/app/components/SharedLayout';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Separator } from '@/app/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  User,
  CalendarDays,
  Heart,
  Clock,
  FileText,
  Edit,
  ArrowLeft
} from 'lucide-react';

export default function Screen04EmployeeDetail({ onOpenAIChat }: { onOpenAIChat?: () => void }) {
  const vacationHistory = [
    { id: 1, startDate: '2025-01-15', endDate: '2025-01-22', days: 7, status: 'Approved', type: 'Annual Leave' },
    { id: 2, startDate: '2024-12-24', endDate: '2024-12-31', days: 7, status: 'Completed', type: 'Holiday' },
    { id: 3, startDate: '2024-11-10', endDate: '2024-11-12', days: 2, status: 'Completed', type: 'Personal' },
  ];

  const medicalLeaves = [
    { id: 1, startDate: '2024-10-15', endDate: '2024-10-17', days: 2, reason: 'Medical Appointment', status: 'Completed' },
  ];

  return (
    <SharedLayout activeScreen={3} pageTitle="Employee Details" onOpenAIChat={onOpenAIChat}>
      <div className="p-6 space-y-6">
        {/* Back Button */}
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Employees
        </Button>

        {/* Employee Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                  SJ
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Active</Badge>
              </div>

              {/* Employee Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">Sarah Johnson</h2>
                    <p className="text-lg text-muted-foreground">Senior Developer</p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">sarah.j@company.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Department</p>
                      <p className="font-medium">Engineering</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Hire Date</p>
                      <p className="font-medium">January 15, 2020</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Employee ID</p>
                      <p className="font-medium">EMP-2020-1234</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium">New York, NY</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button className="gap-2">
            <CalendarDays className="h-4 w-4" />
            Request Vacation
          </Button>
          <Button variant="outline" className="gap-2">
            <Heart className="h-4 w-4" />
            Register Medical Leave
          </Button>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="vacations">Vacations</TabsTrigger>
            <TabsTrigger value="medical">Medical Leaves</TabsTrigger>
            <TabsTrigger value="history">Administrative History</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Basic employee details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Full Name', value: 'Sarah Elizabeth Johnson' },
                  { label: 'Date of Birth', value: 'March 15, 1992' },
                  { label: 'Address', value: '123 Main Street, Apt 4B, New York, NY 10001' },
                  { label: 'Emergency Contact', value: 'John Johnson - +1 (555) 987-6543' },
                  { label: 'Employment Type', value: 'Full-time' },
                  { label: 'Reports To', value: 'Michael Chen (Engineering Manager)' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vacations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vacation History</CardTitle>
                <CardDescription>All vacation requests and time off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vacationHistory.map((vacation) => (
                    <div key={vacation.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <CalendarDays className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{vacation.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {vacation.startDate} to {vacation.endDate}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={vacation.status === 'Approved' ? 'default' : 'secondary'}>
                            {vacation.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{vacation.days} days</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Remaining vacation days:</span>
                    <span className="font-semibold">18 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Leave History</CardTitle>
                <CardDescription>All medical leaves and sick days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {medicalLeaves.map((leave) => (
                    <div key={leave.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <Heart className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">{leave.reason}</p>
                            <p className="text-sm text-muted-foreground">
                              {leave.startDate} to {leave.endDate}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{leave.status}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">{leave.days} days</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Administrative History</CardTitle>
                <CardDescription>Timeline of all administrative actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Profile Updated', date: '2025-01-20', user: 'Admin User' },
                    { action: 'Vacation Request Approved', date: '2025-01-10', user: 'Michael Chen' },
                    { action: 'Promotion to Senior Developer', date: '2024-12-01', user: 'HR Department' },
                    { action: 'Performance Review Completed', date: '2024-11-15', user: 'Michael Chen' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <div className="flex-1 pb-4 border-b last:border-0">
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">{item.date} • by {item.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedLayout>
  );
}
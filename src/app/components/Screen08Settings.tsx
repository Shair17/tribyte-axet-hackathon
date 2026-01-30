import SharedLayout from '@/app/components/SharedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Separator } from '@/app/components/ui/separator';
import { 
  Users, 
  Shield, 
  Sparkles,
  Mail,
  Plus,
  Edit,
  Trash2,
  Settings as SettingsIcon,
  Bell,
  Lock
} from 'lucide-react';

const users = [
  { id: 1, name: 'Admin User', email: 'admin@company.com', role: 'Administrator', status: 'Active', initials: 'AU' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Manager', status: 'Active', initials: 'SJ' },
  { id: 3, name: 'Michael Chen', email: 'michael.c@company.com', role: 'Manager', status: 'Active', initials: 'MC' },
];

const roles = [
  { 
    name: 'Administrator', 
    users: 2, 
    permissions: ['Full system access', 'User management', 'All reports', 'AI configuration'],
    color: 'bg-red-100 text-red-700'
  },
  { 
    name: 'Manager', 
    users: 12, 
    permissions: ['View employees', 'Approve requests', 'Generate reports', 'View AI insights'],
    color: 'bg-blue-100 text-blue-700'
  },
  { 
    name: 'Employee', 
    users: 234, 
    permissions: ['View own data', 'Submit requests', 'View calendar'],
    color: 'bg-emerald-100 text-emerald-700'
  },
  { 
    name: 'Viewer', 
    users: 8, 
    permissions: ['Read-only access', 'View reports'],
    color: 'bg-gray-100 text-gray-700'
  },
];

const aiSettings = [
  {
    name: 'Data Validation',
    description: 'Automatically validate employee data entries and detect errors',
    enabled: true,
  },
  {
    name: 'Inconsistency Detection',
    description: 'Scan records for conflicts, duplicates, and anomalies',
    enabled: true,
  },
  {
    name: 'Automated Reports',
    description: 'Generate scheduled reports automatically',
    enabled: true,
  },
  {
    name: 'Smart Notifications',
    description: 'AI-powered alerts for important events and patterns',
    enabled: false,
  },
  {
    name: 'Predictive Analytics',
    description: 'Forecast trends and patterns in workforce data',
    enabled: true,
  },
];

export default function Screen08Settings({ onOpenAIChat }: { onOpenAIChat?: () => void }) {
  return (
    <SharedLayout activeScreen={8} pageTitle="Settings" onOpenAIChat={onOpenAIChat}>
      <div className="p-6 space-y-6">
        {/* User Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>Manage system users and their access</CardDescription>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right mr-4">
                      <Badge variant="outline" className="mb-1">
                        {user.role}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{user.status}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roles and Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Roles and Permissions
            </CardTitle>
            <CardDescription>Configure access levels and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role, index) => (
                <div key={index} className="p-5 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={role.color}>
                          {role.name}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{role.users} users</span>
                      </div>
                      <p className="text-sm font-medium">Permissions:</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      {role.name !== 'Administrator' && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {role.permissions.map((permission, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></div>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Automation Settings */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI Automation Settings
            </CardTitle>
            <CardDescription>Configure artificial intelligence features and automation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {aiSettings.map((setting, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`ai-${index}`} className="font-semibold cursor-pointer">
                          {setting.name}
                        </Label>
                        {setting.enabled && (
                          <Badge variant="outline" className="bg-emerald-100 text-emerald-700 text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      id={`ai-${index}`}
                      checked={setting.enabled}
                      className="ml-4"
                    />
                  </div>
                  {index < aiSettings.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Request Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert for pending requests</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>AI Insights</Label>
                  <p className="text-sm text-muted-foreground">Notify about AI findings</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Enhanced security</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Auto-logout after 30 min</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activity Logging</Label>
                  <p className="text-sm text-muted-foreground">Track all actions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Platform configuration and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <div className="p-3 rounded-lg border bg-muted/50">
                  <p className="text-sm">Acme Corporation</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Default Language</Label>
                <div className="p-3 rounded-lg border bg-muted/50">
                  <p className="text-sm">English (US)</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fiscal Year Start</Label>
                <div className="p-3 rounded-lg border bg-muted/50">
                  <p className="text-sm">January 1</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <div className="p-3 rounded-lg border bg-muted/50">
                  <p className="text-sm">EST (UTC-5)</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-end gap-3">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedLayout>
  );
}
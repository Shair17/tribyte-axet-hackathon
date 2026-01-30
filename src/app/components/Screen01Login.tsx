import { useState } from 'react';
import { useAuth, UserRole } from '@/app/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Badge } from '@/app/components/ui/badge';
import { Building2, Lock, Mail, Sparkles, Shield, Users, User } from 'lucide-react';

export default function Screen01Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleLogin = () => {
    if (selectedRole) {
      login(email, password, selectedRole);
    }
  };

  const roleOptions = [
    {
      role: 'administrator' as UserRole,
      title: 'Administrator',
      description: 'Full system access, manage all users and data',
      icon: Shield,
      email: 'admin@company.com',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50 border-red-200'
    },
    {
      role: 'leader' as UserRole,
      title: 'Leader',
      description: 'Manage team members and approve requests',
      icon: Users,
      email: 'sarah.j@company.com',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      role: 'collaborator' as UserRole,
      title: 'Collaborator',
      description: 'View personal data and submit requests',
      icon: User,
      email: 'michael.c@company.com',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50 border-emerald-200'
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="w-full max-w-5xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Building2 className="h-9 w-9 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Administrative Platform</h1>
          <p className="text-lg text-muted-foreground">
            Internal HR Management System powered by AI
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="gap-1.5 px-3 py-1">
              <Sparkles className="h-3 w-3 text-purple-600" />
              AI-Powered with Axet Gaia
            </Badge>
          </div>
        </div>

        {/* Role Selection */}
        {!selectedRole ? (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Select Your Role</h2>
              <p className="text-sm text-muted-foreground">
                Choose a role to experience the platform (Demo Mode)
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roleOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Card 
                    key={option.role}
                    className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-2 ${option.bgColor}`}
                    onClick={() => {
                      setSelectedRole(option.role);
                      setEmail(option.email);
                    }}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-3">
                        <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-md`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{option.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {option.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span className="font-mono">{option.email}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm">
                This is a <strong>demo environment</strong>. Each role provides a different experience tailored to its permissions and data visibility.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <Card className="max-w-md mx-auto shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle>Login as {roleOptions.find(r => r.role === selectedRole)?.title}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedRole(null);
                    setEmail('');
                    setPassword('');
                  }}
                >
                  Change Role
                </Button>
              </div>
              <CardDescription>Enter your credentials to access the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Alert>
                <AlertDescription className="text-xs">
                  Demo mode: Any password will work for demonstration purposes
                </AlertDescription>
              </Alert>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleLogin}
              >
                Sign In
              </Button>

              <div className="pt-4 border-t space-y-2">
                <p className="text-xs text-muted-foreground text-center">
                  Protected by enterprise-grade security
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>• End-to-end encryption</span>
                  <span>• 2FA available</span>
                  <span>• SOC 2 compliant</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-xs text-muted-foreground">
            © 2025 Administrative Platform • Powered by Axet Gaia AI • For Internal Use Only
          </p>
        </div>
      </div>
    </div>
  );
}

import SharedLayout from '@/app/components/SharedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { 
  Sparkles, 
  Shield, 
  AlertTriangle, 
  FileText, 
  TrendingUp,
  CheckCircle2,
  Activity,
  Zap,
  Database,
  BarChart3
} from 'lucide-react';

export default function Screen06AIIntegration({ onOpenAIChat }: { onOpenAIChat?: () => void }) {
  const aiFeatures = [
    {
      title: 'Data Validation',
      description: 'Automatically validates employee data entries and detects missing or incorrect information',
      icon: Shield,
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-700',
      details: [
        'Validates 248 employee records',
        'Real-time validation checks',
        '99.8% accuracy rate'
      ],
      metrics: { processed: 1247, success: 1244, errors: 3 }
    },
    {
      title: 'Inconsistency Detection',
      description: 'Scans administrative records to identify conflicts, duplicates, and anomalies',
      icon: AlertTriangle,
      status: 'Processing',
      statusColor: 'bg-blue-100 text-blue-700',
      details: [
        'Detected 3 inconsistencies',
        'Last scan: 2 hours ago',
        'Auto-correction enabled'
      ],
      metrics: { scanned: 5420, flagged: 3, resolved: 12 }
    },
    {
      title: 'Automated Reports',
      description: 'Generates comprehensive reports on vacations, leaves, and workforce analytics',
      icon: FileText,
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-700',
      details: [
        '24 reports generated this month',
        'Scheduled daily at 9:00 AM',
        'Export to PDF, Excel, CSV'
      ],
      metrics: { generated: 24, scheduled: 30, downloaded: 18 }
    },
    {
      title: 'Predictive Analytics',
      description: 'Forecasts vacation trends, leave patterns, and workforce availability',
      icon: TrendingUp,
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-700',
      details: [
        'Predicts Q2 vacation surge',
        '87% prediction accuracy',
        'Historical data analysis'
      ],
      metrics: { predictions: 156, accuracy: 87, insights: 23 }
    },
  ];

  const aiInsights = [
    { 
      title: 'Peak Vacation Period Detected', 
      description: 'Q2 2025 shows 40% higher vacation requests than average. Consider staffing adjustments.',
      severity: 'warning',
      action: 'View Details'
    },
    { 
      title: 'Data Quality Improvement', 
      description: 'AI validation reduced data errors by 67% compared to last quarter.',
      severity: 'success',
      action: 'View Report'
    },
    { 
      title: 'Automation Efficiency', 
      description: 'Processing time for leave requests decreased by 45% with AI assistance.',
      severity: 'success',
      action: 'See Analytics'
    },
  ];

  return (
    <SharedLayout activeScreen={6} pageTitle="AI Integration & Automation" onOpenAIChat={onOpenAIChat}>
      <div className="p-6 space-y-6">
        {/* Description Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Artificial Intelligence Integration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  La inteligencia artificial se integrará para analizar y procesar automáticamente la información administrativa, 
                  optimizando tareas como la validación de datos, la detección de inconsistencias y la generación de reportes. 
                  De esta manera, se reducen los errores manuales y se mejora la eficiencia en la gestión interna.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                <p className="text-sm font-medium">System Status</p>
              </div>
              <p className="text-2xl font-bold">Operational</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">All systems running</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-5 w-5 text-amber-600" />
                <p className="text-sm font-medium">Processing Speed</p>
              </div>
              <p className="text-2xl font-bold">2.4s</p>
              <p className="text-xs text-muted-foreground mt-2">Average response time</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Database className="h-5 w-5 text-blue-600" />
                <p className="text-sm font-medium">Records Processed</p>
              </div>
              <p className="text-2xl font-bold">12.4K</p>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <p className="text-sm font-medium">Accuracy Rate</p>
              </div>
              <p className="text-2xl font-bold">99.2%</p>
              <p className="text-xs text-muted-foreground mt-2">Overall performance</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription className="mt-1">{feature.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={feature.statusColor}>
                      {feature.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t space-y-3">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {Object.entries(feature.metrics).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <p className="text-xl font-bold">{value}</p>
                          <p className="text-xs text-muted-foreground capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Recent AI Insights
            </CardTitle>
            <CardDescription>Automated analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge 
                        variant={insight.severity === 'success' ? 'default' : 'secondary'}
                        className={
                          insight.severity === 'success' 
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }
                      >
                        {insight.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    {insight.action}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>AI system performance over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Data Validation</span>
                <span className="font-medium">99.8%</span>
              </div>
              <Progress value={99.8} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Inconsistency Detection</span>
                <span className="font-medium">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Report Generation</span>
                <span className="font-medium">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Predictive Accuracy</span>
                <span className="font-medium">87.5%</span>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedLayout>
  );
}
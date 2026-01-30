import SharedLayout from '@/app/components/SharedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { 
  FileText, 
  Download, 
  Calendar,
  Sparkles,
  Filter,
  Eye,
  Send,
  Clock,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { Separator } from '@/app/components/ui/separator';

const reports = [
  {
    id: 1,
    title: 'Monthly Vacation Summary',
    description: 'Comprehensive overview of all vacation requests, approvals, and remaining days for January 2025',
    type: 'Vacation',
    generatedDate: '2025-01-29',
    status: 'Ready',
    fileSize: '2.4 MB',
    format: 'PDF'
  },
  {
    id: 2,
    title: 'Medical Leave Summary - Q1 2025',
    description: 'Detailed analysis of medical leaves including reasons, duration, and trends',
    type: 'Medical Leave',
    generatedDate: '2025-01-28',
    status: 'Ready',
    fileSize: '1.8 MB',
    format: 'Excel'
  },
  {
    id: 3,
    title: 'AI-Generated Workforce Insights',
    description: 'Machine learning analysis of employee patterns, predictions, and recommendations for Q2 2025',
    type: 'AI Insights',
    generatedDate: '2025-01-27',
    status: 'Ready',
    fileSize: '3.1 MB',
    format: 'PDF'
  },
  {
    id: 4,
    title: 'Employee Attendance Report',
    description: 'Monthly attendance tracking with absence patterns and statistics',
    type: 'Attendance',
    generatedDate: '2025-01-26',
    status: 'Processing',
    fileSize: '-',
    format: 'Excel'
  },
  {
    id: 5,
    title: 'Department Workload Analysis',
    description: 'Cross-department comparison of leave requests and workforce availability',
    type: 'Analytics',
    generatedDate: '2025-01-25',
    status: 'Ready',
    fileSize: '2.9 MB',
    format: 'PDF'
  },
];

export default function Screen07Reports({ onOpenAIChat }: { onOpenAIChat?: () => void }) {
  return (
    <SharedLayout activeScreen={7} pageTitle="Reports" onOpenAIChat={onOpenAIChat}>
      <div className="p-6 space-y-6">
        {/* Report Generation Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Generate New Report
            </CardTitle>
            <CardDescription>Create custom reports with AI-powered insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select defaultValue="vacation">
                  <SelectTrigger id="report-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">Vacation Summary</SelectItem>
                    <SelectItem value="medical">Medical Leave Summary</SelectItem>
                    <SelectItem value="ai-insights">AI-Generated Insights</SelectItem>
                    <SelectItem value="attendance">Attendance Report</SelectItem>
                    <SelectItem value="analytics">Workforce Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                <Select defaultValue="this-month">
                  <SelectTrigger id="date-range">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="q1-2025">Q1 2025</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Export Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Filter Bar */}
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="vacation">Vacation</SelectItem>
              <SelectItem value="medical">Medical Leave</SelectItem>
              <SelectItem value="ai">AI Insights</SelectItem>
              <SelectItem value="analytics">Analytics</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="ready">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Available Reports</h3>
            <p className="text-sm text-muted-foreground">{reports.length} reports</p>
          </div>

          <div className="space-y-3">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-7 w-7 text-blue-600" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">{report.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="outline" className="gap-1">
                            <FileText className="h-3 w-3" />
                            {report.type}
                          </Badge>
                          <Badge 
                            variant={report.status === 'Ready' ? 'default' : 'secondary'}
                            className={report.status === 'Ready' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}
                          >
                            {report.status === 'Ready' ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {report.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Generated {report.generatedDate}
                          </span>
                          {report.status === 'Ready' && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{report.fileSize}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{report.format}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      {report.status === 'Ready' ? (
                        <>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                          <Button size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <p className="text-sm font-medium">Total Reports</p>
              </div>
              <p className="text-3xl font-bold">142</p>
              <p className="text-xs text-muted-foreground mt-1">All time generated</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <p className="text-sm font-medium">This Month</p>
              </div>
              <p className="text-3xl font-bold">24</p>
              <p className="text-xs text-muted-foreground mt-1">+8 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Download className="h-5 w-5 text-purple-600" />
                <p className="text-sm font-medium">Downloads</p>
              </div>
              <p className="text-3xl font-bold">387</p>
              <p className="text-xs text-muted-foreground mt-1">Total downloads</p>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scheduled Reports
            </CardTitle>
            <CardDescription>Automatically generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Daily Attendance Summary', frequency: 'Daily at 9:00 AM', nextRun: 'Tomorrow at 9:00 AM' },
                { name: 'Weekly Vacation Report', frequency: 'Every Monday', nextRun: 'Monday, Feb 3 at 8:00 AM' },
                { name: 'Monthly AI Insights', frequency: 'Last day of month', nextRun: 'Friday, Jan 31 at 6:00 PM' },
              ].map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{schedule.name}</p>
                    <p className="text-sm text-muted-foreground">{schedule.frequency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Next: {schedule.nextRun}</p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      Edit Schedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedLayout>
  );
}
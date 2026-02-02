import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  XCircle,
} from "lucide-react";

const vacationRequests = [
  {
    id: 1,
    employee: "Sarah Johnson",
    type: "Annual Leave",
    startDate: "2025-02-15",
    endDate: "2025-02-22",
    days: 7,
    status: "Pending",
    requested: "2025-01-20",
  },
  {
    id: 2,
    employee: "Michael Chen",
    type: "Personal",
    startDate: "2025-02-10",
    endDate: "2025-02-12",
    days: 2,
    status: "Pending",
    requested: "2025-01-18",
  },
  {
    id: 3,
    employee: "Emma Davis",
    type: "Holiday",
    startDate: "2025-03-01",
    endDate: "2025-03-05",
    days: 4,
    status: "Approved",
    requested: "2025-01-15",
  },
  {
    id: 4,
    employee: "James Wilson",
    type: "Annual Leave",
    startDate: "2025-02-20",
    endDate: "2025-02-27",
    days: 7,
    status: "Pending",
    requested: "2025-01-22",
  },
  {
    id: 5,
    employee: "Lisa Anderson",
    type: "Personal",
    startDate: "2025-02-05",
    endDate: "2025-02-06",
    days: 1,
    status: "Rejected",
    requested: "2025-01-10",
  },
];

const medicalLeaves = [
  {
    id: 1,
    employee: "Robert Taylor",
    reason: "Medical Procedure",
    startDate: "2025-02-08",
    endDate: "2025-02-10",
    days: 2,
    status: "Approved",
    submitted: "2025-01-25",
  },
  {
    id: 2,
    employee: "Maria Garcia",
    reason: "Sick Leave",
    startDate: "2025-02-01",
    endDate: "2025-02-02",
    days: 1,
    status: "Pending",
    submitted: "2025-01-28",
  },
  {
    id: 3,
    employee: "David Lee",
    reason: "Family Emergency",
    startDate: "2025-02-12",
    endDate: "2025-02-15",
    days: 3,
    status: "Pending",
    submitted: "2025-01-26",
  },
];

export default function AbsencesPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-700 hover:bg-amber-200"
          >
            Pending
          </Badge>
        );
      case "Approved":
        return (
          <Badge
            variant="default"
            className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
          >
            Approved
          </Badge>
        );
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending Requests</p>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-3xl font-bold">8</p>
          <p className="text-xs text-muted-foreground mt-1">Require action</p>
        </div>

        <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Approved This Month</p>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold">24</p>
          <p className="text-xs text-muted-foreground mt-1">
            +5 from last month
          </p>
        </div>

        <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Leaves</p>
            <Calendar className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">7</p>
          <p className="text-xs text-muted-foreground mt-1">Currently away</p>
        </div>

        <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Rejected</p>
            <XCircle className="h-4 w-4 text-red-600" />
          </div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </div>
      </div>

      {/* Filter and Export */}
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-months">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-months">All Months</SelectItem>
              <SelectItem value="jan">January 2025</SelectItem>
              <SelectItem value="feb">February 2025</SelectItem>
              <SelectItem value="mar">March 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="vacations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vacations">Vacation Requests</TabsTrigger>
          <TabsTrigger value="medical">Medical Leaves</TabsTrigger>
        </TabsList>

        <TabsContent value="vacations" className="space-y-4">
          <div className="border rounded-lg bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vacationRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.employee}</p>
                        <p className="text-xs text-muted-foreground">
                          Requested {request.requested}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.type}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.startDate}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.endDate}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.days} days</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      {request.status === "Pending" ? (
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="default"
                            className="h-8 bg-emerald-600 hover:bg-emerald-700"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="ghost">
                          View Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="medical" className="space-y-4">
          <div className="border rounded-lg bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalLeaves.map((leave) => (
                  <TableRow key={leave.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{leave.employee}</p>
                        <p className="text-xs text-muted-foreground">
                          Submitted {leave.submitted}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {leave.reason}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {leave.startDate}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {leave.endDate}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{leave.days} days</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(leave.status)}</TableCell>
                    <TableCell className="text-right">
                      {leave.status === "Pending" ? (
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="default"
                            className="h-8 bg-emerald-600 hover:bg-emerald-700"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="ghost">
                          View Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

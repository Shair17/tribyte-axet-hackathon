import SharedLayout from '@/app/components/SharedLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Search, Filter, MoreHorizontal, Eye, Edit, UserX, ArrowUpDown, UserPlus } from 'lucide-react';

const employees = [
  { id: 1, name: 'Sarah Johnson', role: 'Senior Developer', department: 'Engineering', status: 'Active', email: 'sarah.j@company.com' },
  { id: 2, name: 'Michael Chen', role: 'Product Manager', department: 'Product', status: 'Active', email: 'michael.c@company.com' },
  { id: 3, name: 'Emma Davis', role: 'UX Designer', department: 'Design', status: 'On Leave', email: 'emma.d@company.com' },
  { id: 4, name: 'James Wilson', role: 'HR Manager', department: 'Human Resources', status: 'Active', email: 'james.w@company.com' },
  { id: 5, name: 'Lisa Anderson', role: 'Data Analyst', department: 'Analytics', status: 'Active', email: 'lisa.a@company.com' },
  { id: 6, name: 'Robert Taylor', role: 'DevOps Engineer', department: 'Engineering', status: 'Active', email: 'robert.t@company.com' },
  { id: 7, name: 'Maria Garcia', role: 'Marketing Lead', department: 'Marketing', status: 'Active', email: 'maria.g@company.com' },
  { id: 8, name: 'David Lee', role: 'Sales Director', department: 'Sales', status: 'On Leave', email: 'david.l@company.com' },
];

export default function Screen03Employees({ onOpenAIChat }: { onOpenAIChat?: () => void }) {
  return (
    <SharedLayout activeScreen={3} pageTitle="Employees" onOpenAIChat={onOpenAIChat}>
      <div className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1 flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees by name, role, or email..."
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">248</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-emerald-600">236</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">On Leave</p>
            <p className="text-2xl font-bold text-amber-600">12</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">Departments</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>

        {/* Employee Table */}
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                    Name
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                    Role
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.role}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.department}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.email}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={employee.status === 'Active' ? 'default' : 'secondary'}
                      className={employee.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : ''}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <UserX className="h-4 w-4 mr-2" />
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 1-8 of 248 employees
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}
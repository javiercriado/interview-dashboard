'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useInterviews } from '@/lib/hooks/use-interviews';
import type { Interview, InterviewFilters } from '@/lib/types';
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, CalendarIcon, Download, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeferredValue, useState } from 'react';

// CSV export function
function exportToCSV(data: Interview[], filename: string) {
  const headers = ['Candidate', 'Email', 'Position', 'Date', 'Score', 'Status', 'Recommendation'];
  const rows = data.map((interview) => [
    interview.candidateName,
    interview.candidateEmail,
    interview.jobPosition,
    interview.completedAt ? format(new Date(interview.completedAt), 'yyyy-MM-dd') : '',
    interview.score.toFixed(1),
    interview.status,
    interview.recommendation,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function InterviewList() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<InterviewFilters>({});
  const [searchInput, setSearchInput] = useState('');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const deferredSearch = useDeferredValue(searchInput);

  // Update filters with deferred search value
  const queryFilters: InterviewFilters = {
    ...filters,
    search: deferredSearch,
    startDate: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    endDate: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
  };

  const { data: interviews, isLoading, error } = useInterviews(queryFilters);

  const columns: ColumnDef<Interview>[] = [
    {
      accessorKey: 'candidateName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Candidate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.original.candidateName}</div>,
    },
    {
      accessorKey: 'jobPosition',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.original.jobPosition}</div>,
    },
    {
      accessorKey: 'completedAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.original.completedAt;
        return <div>{date ? format(new Date(date), 'MMM dd, yyyy') : '-'}</div>;
      },
    },
    {
      accessorKey: 'score',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const score = row.original.score;
        return <div className="text-center font-semibold">{score}/100</div>;
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors: Record<Interview['status'], string> = {
          scheduled: 'bg-blue-500/10 text-blue-500',
          in_progress: 'bg-yellow-500/10 text-yellow-500',
          completed: 'bg-green-500/10 text-green-500',
          cancelled: 'bg-red-500/10 text-red-500',
        };
        return <Badge className={statusColors[status]}>{status.replace('_', ' ')}</Badge>;
      },
    },
    {
      accessorKey: 'recommendation',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Recommendation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const recommendation = row.original.recommendation;
        const recommendationColors: Record<Interview['recommendation'], string> = {
          hire: 'bg-green-500/10 text-green-500',
          strong_hire: 'bg-green-600/10 text-green-600',
          maybe: 'bg-yellow-500/10 text-yellow-500',
          no_hire: 'bg-red-500/10 text-red-500',
        };
        return (
          <Badge className={recommendationColors[recommendation]}>
            {recommendation.replace('_', ' ')}
          </Badge>
        );
      },
    },
  ];

  const table = useReactTable({
    data: interviews || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const handleRowClick = (interview: Interview) => {
    router.push(`/interviews/${interview.id}`);
  };

  // Get unique positions for filter dropdown
  const positions = Array.from(new Set(interviews?.map((i) => i.jobPosition) || [])).sort();

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading interviews</p>
          <p className="text-sm text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd, yyyy')}
                  </>
                ) : (
                  format(dateRange.from, 'MMM dd, yyyy')
                )
              ) : (
                <span className="text-muted-foreground">Select date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Position Filter */}
        <Select
          value={filters.jobPosition || 'all'}
          onValueChange={(value) =>
            setFilters({ ...filters, jobPosition: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All positions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All positions</SelectItem>
            {positions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) =>
            setFilters({ ...filters, status: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {(searchInput || filters.status || filters.jobPosition || dateRange.from) && (
          <Button
            variant="outline"
            onClick={() => {
              setSearchInput('');
              setFilters({});
              setDateRange({ from: undefined, to: undefined });
            }}
          >
            Clear filters
          </Button>
        )}

        {/* Export Button */}
        <Button
          variant="outline"
          onClick={() => {
            if (interviews && interviews.length > 0) {
              exportToCSV(interviews, `interviews-${format(new Date(), 'yyyy-MM-dd')}.csv`);
            }
          }}
          disabled={!interviews || interviews.length === 0}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }, (_, i) => `skeleton-row-${i}`).map((rowKey, i) => (
                <TableRow key={rowKey}>
                  {Array.from({ length: columns.length }, (_, j) => `skeleton-cell-${i}-${j}`).map(
                    (cellKey) => (
                      <TableCell key={cellKey}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(row.original)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRowClick(row.original);
                    }
                  }}
                  tabIndex={0}
                  // biome-ignore lint/a11y/useSemanticElements: TableRow must be tr, role=button is correct for clickable rows
                  role="button"
                  aria-label={`View interview for ${row.original.candidateName}, ${row.original.jobPosition}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="text-muted-foreground">
                    No interviews found
                    {(searchInput || filters.status || filters.jobPosition) &&
                      ' with current filters'}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results count */}
      {!isLoading && (
        <div className="text-sm text-muted-foreground">
          Showing {interviews?.length || 0} interview{interviews?.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import React, { useId } from "react";
import { DEFAULT_TABLE_PAGE_SIZES } from "~/types/constants/table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: readonly number[];
  isInitialLoading?: boolean;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = DEFAULT_TABLE_PAGE_SIZES,
  isInitialLoading,
}: DataTablePaginationProps<TData>) {
  const uniqueId = useId();

  if (isInitialLoading) {
    return (
      <div className="flex w-full  items-center justify-between gap-4 overflow-auto p-1 sm:gap-8">
        <Skeleton className="h-7 w-40 shrink-0" />
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-[4.5rem]" />
          </div>
          <div className="flex items-center justify-center text-sm font-medium">
            <Skeleton className="h-7 w-20" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="hidden size-7 lg:block" />
            <Skeleton className="size-7" />
            <Skeleton className="size-7" />
            <Skeleton className="hidden size-7 lg:block" />
          </div>
        </div>
      </div>
    );
  }
  const rowPerPageSelectId = `per-page-select-${uniqueId}`;

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div>
        {table.options.enableRowSelection ? (
          <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getRowCount()} row(s) selected.
          </div>
        ) : (
          <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
            {table.getRowCount()} results
          </div>
        )}
      </div>
      {table.options.getPaginationRowModel !== undefined && (
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p
              className="whitespace-nowrap text-sm font-medium"
              id={rowPerPageSelectId}
            >
              Rows per page
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger
                className="h-8 w-[4.5rem]"
                aria-labelledby={rowPerPageSelectId}
              >
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

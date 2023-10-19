"use client";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { BsTrash3Fill } from "react-icons/bs";
import { RiRefreshLine } from "react-icons/ri";
import {
  PiRecycleDuotone,
  PiTrashSimpleDuotone,
  PiTrashSimpleThin,
} from "react-icons/pi";
import { useState } from "react";

type DataTableProps<Data> = {
  data: Data[];
  columns: ColumnDef<Data>[];
  deleteData: (id: string) => void;
  cns?: string;
  name?: string;
  refetch?: () => void;
};

export default function DataTable<Data>({
  data,
  columns,
  cns,
  name,
  deleteData,
  refetch,
  Update,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      globalFilter: globalFilter,
    },
  });

  return (
    <div className={cns + " text-primary font-rock tracking-widest font-thin "}>
      {name && name}

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm bg-transparent !border-double border-secondary  border-2"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto bg-transparent !border-double border-secondary text-secondary border-2"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-secondary font-rock"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md !border-double border-secondary border-2">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="!border-double border-secondary border-b-2"
                    >
                      {header.isPlaceholder ? null : (
                        <div className="text-sm ">
                          {header.column.columnDef.header as string}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="!border-double border-secondary border-b-2 hover:bg-opacity-5 backdrop-blur-md hover:bg-white"
                >
                  {row.getVisibleCells().map((cell) => {
                    if (!(cell.column.id != "actions"))
                      return (
                        <TableCell key={"actions"} className="flex py-10">
                          <PiTrashSimpleDuotone
                            onClick={() => {
                              if (
                                confirm(
                                  "Are You Sure You Want to Delete This Item?"
                                )
                              ) {
                                deleteData(row.getValue("id"));
                                refetch();
                              }
                            }}
                            className="text-red-800 text-2xl cursor-pointer"
                          />
                          <Update refetch={refetch} id={row.getValue("id")} />
                        </TableCell>
                      );
                    return (
                      <TableCell key={cell.id}>
                        {
                          //@ts-ignore
                          cell.getValue()
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="!border-double border-secondary border-2 bg-transparent"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="!border-double border-secondary border-2 bg-transparent"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

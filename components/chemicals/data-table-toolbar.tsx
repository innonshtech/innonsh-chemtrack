"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Search, Filter } from "lucide-react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between p-1">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-[150px] lg:w-[250px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chemicals..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-9 pl-9 bg-background"
          />
        </div>
        
        {/* Simulating facet filters for now */}
        <Button variant="outline" size="sm" className="h-9 border-dashed hidden sm:flex">
          <Filter className="mr-2 h-4 w-4" />
          Category
        </Button>
        <Button variant="outline" size="sm" className="h-9 border-dashed hidden sm:flex">
          <Filter className="mr-2 h-4 w-4" />
          Hazard Class
        </Button>
        
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 text-muted-foreground"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
         {/* Saved Views Simulation */}
         <Button variant="outline" size="sm" className="h-9 hidden lg:flex">
           Saved Views
         </Button>
      </div>
    </div>
  )
}

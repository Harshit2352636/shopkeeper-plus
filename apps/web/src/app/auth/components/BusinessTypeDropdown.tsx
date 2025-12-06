"use client"

import { Label } from "@/components/ui/label"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { api } from "@/trpc/client"

type DropdownProps = {
   onSelect: (id: string) => void
   error?: string
}

interface BusinessType {
  businessTypeId: string;
  businessTypeName: string;
}

export default function BusinessTypeDropdown({ onSelect, error }: DropdownProps) {
   const { data: businessTypes } = api.businessTypes.listBusinessTypes.useQuery()

   return (
      <div className="flex flex-col space-y-1.5">
         <Label htmlFor="businessType">Business Type</Label>
         <Select onValueChange={(value) => onSelect(value)}>
            <SelectTrigger id="businessType" className="w-96 lg:w-80 xl:w-72 2xl:w-80">
               <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
               {businessTypes?.map((type: BusinessType) => (
                  <SelectItem key={type.businessTypeId} value={type.businessTypeId}>
                     {type.businessTypeName}
                  </SelectItem>
               ))}
            </SelectContent>
            <p className="text-destructive text-xs font-thin">{error}</p>
         </Select>
      </div>
   )
}

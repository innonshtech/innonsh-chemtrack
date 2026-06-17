import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface InventorySettingsStepProps {
  form: UseFormReturn<any>
}

export function InventorySettingsStep({ form }: InventorySettingsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Inventory Settings</h3>
        <p className="text-sm text-muted-foreground">
          Define tracking metrics to ensure automated stock alerts work correctly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="unitOfMeasure"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Unit of Measure *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tracking unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="KG">Kilograms (KG)</SelectItem>
                  <SelectItem value="G">Grams (G)</SelectItem>
                  <SelectItem value="L">Liters (L)</SelectItem>
                  <SelectItem value="ML">Milliliters (ML)</SelectItem>
                  <SelectItem value="UNIT">Discrete Units (Units)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reorderLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reorder Level *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 50" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minimumStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Absolute Minimum Stock (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 10" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

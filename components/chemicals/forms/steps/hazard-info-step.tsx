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
import { Textarea } from "@/components/ui/textarea"

interface HazardInfoStepProps {
  form: UseFormReturn<any>
}

export function HazardInfoStep({ form }: HazardInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hazard Information</h3>
        <p className="text-sm text-muted-foreground">
          Classify the chemical's primary hazards to enforce strict storage constraints.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="hazardClass"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Hazard Class *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary hazard classification" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NON_HAZARDOUS">Non-Hazardous</SelectItem>
                  <SelectItem value="FLAMMABLE">Flammable</SelectItem>
                  <SelectItem value="CORROSIVE">Corrosive</SelectItem>
                  <SelectItem value="TOXIC">Toxic</SelectItem>
                  <SelectItem value="OXIDIZER">Oxidizer</SelectItem>
                  <SelectItem value="EXPLOSIVE">Explosive</SelectItem>
                  <SelectItem value="COMPRESSED_GAS">Compressed Gas</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storageCondition"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Required Storage Conditions *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="e.g. Store in a cool, well-ventilated place away from strong acids." 
                  className="resize-none h-20"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="safetyNotes"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Internal Safety Notes (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Requires manager approval before dispensing." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

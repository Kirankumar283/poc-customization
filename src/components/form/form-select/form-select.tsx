"use client";

import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSelectProps } from "./form-select.types";

export function FormSelect({
  name,
  label,
  placeholder = "Select an option",
  options,
  disabled = false,
  required = false,
  className,
}: FormSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <div className={cn("flex w-full flex-col gap-2", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(hasError && "text-destructive")}
              >
                {label}

                {required && <span className="ml-1 text-destructive">*</span>}
              </Label>
            )}

            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger
                id={name}
                className={cn(
                  "w-full",
                  hasError && "border-destructive focus:ring-destructive",
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasError && (
              <p className="text-sm font-medium text-destructive">
                {fieldState.error?.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}

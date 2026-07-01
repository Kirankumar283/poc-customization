"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { FormComboboxProps } from "./form-combobox.types";

export default function FormCombobox<T extends string = string>({
  name,
  label,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  options,
  disabled = false,
  required = false,
  className,
}: FormComboboxProps<T>) {
  const { control } = useFormContext();

  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedOption = options.find(
          (option) => option.value === field.value,
        );

        const hasError = !!fieldState.error;

        return (
          <div className={cn("flex w-full flex-col gap-2", className)}>
            {label && (
              <Label className={cn(hasError && "text-destructive")}>
                {label}

                {required && <span className="ml-1 text-destructive">*</span>}
              </Label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  disabled={disabled}
                  aria-expanded={open}
                  className={cn(
                    "justify-between",
                    hasError && "border-destructive",
                  )}
                >
                  {selectedOption ? selectedOption.label : placeholder}

                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder={searchPlaceholder} />

                  <CommandList>
                    <CommandEmpty>{emptyMessage}</CommandEmpty>

                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={String(option.value)}
                          value={option.label}
                          disabled={option.disabled}
                          onSelect={() => {
                            field.onChange(option.value);

                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-full",
                              field.value === option.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />

                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

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

"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "../../ui/label";
import { FormInputProps } from "./form-input.types";

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, description, type = "text", ...props }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error;

          return (
            <div
              className="flex flex-col gap-1.5 w-full"
              data-invalid={hasError}
            >
              {label && (
                <Label
                  htmlFor={name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                >
                  {label}
                </Label>
              )}

              <Input
                {...field}
                {...props}
                id={name}
                type={type}
                ref={ref}
                aria-invalid={hasError}
                value={field.value ?? ""} // Prevents uncontrolled-to-controlled warning
                className={
                  hasError
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />

              {description && !hasError && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}

              {hasError && (
                <p className="text-xs font-medium text-destructive">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  },
);

FormInput.displayName = "FormInput";

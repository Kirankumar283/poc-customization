"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input/form-input";
import { UserFormValues, userSchema } from "@/schemas/userSchema";
import { FormSelect } from "./form-select/form-select";
import { FormCombobox } from "./form-combobox/form-combobox";
import { Combobox } from "../ui/combobox";

export default function UserRegistrationForm() {
  const methods = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: undefined,
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: UserFormValues) => {
    try {
      console.log("Registered User Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      reset();
      alert("Account created successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const roleOptions = [
    { label: "Standard User", value: "user" },
    { label: "Administrator", value: "admin" },
    { label: "Moderator", value: "moderator" },
  ];

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-xl shadow-sm bg-background">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Create an account
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your details below to register.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput name="name" label="Full Name" placeholder="John Doe" />

          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="m@example.com"
          />

          <FormInput
            name="phone"
            label="Mobile Number"
            type="tel"
            placeholder="1234567890"
            maxLength={10}
          />

          <FormSelect
            name="role"
            label="Account Role"
            placeholder="Select a platform role"
            options={roleOptions}
          />

          <FormCombobox
            name="role"
            label="Role"
            placeholder="Select role"
            searchPlaceholder="Search role..."
            options={roleOptions}
          />

          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting
              ? "Creating account..."
              : "Register"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

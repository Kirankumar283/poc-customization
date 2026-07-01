import { SelectOption } from "@/types/select-options";

export interface FormSelectProps<T = string> {
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectOption<T>[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

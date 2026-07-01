import { SelectOption } from "@/types/select-options";

export interface FormComboboxProps<T = string> {
  name: string;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  options: SelectOption<T>[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

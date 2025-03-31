import { fieldContext, formContext } from "@/components/form/context";
import { TextField } from "@/components/form/text-field";
import { createFormHook } from "@tanstack/react-form";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {TextField},
  formComponents: {},
})

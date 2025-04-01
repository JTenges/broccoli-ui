import { useAppForm } from '@/components/form/app-form';
import { Button } from '@/components/ui/button';
import { submitDetails } from '@/service/enter-details';
import { z } from 'zod'

const EnterDetailsSchema = z.object({
  fullName: z.string().min(3, "Must be at least 3 characters"),
  email: z.string().min(1, { message: "Email cannot be empty" }).email({ message: "Invalid email address" }),
  confirmEmail: z.string().min(1, { message: "Confirmation email cannot be empty" }).email({ message: "Invalid confirmation email address" }),
}).refine(data => data.email === data.confirmEmail, {
  message: "Emails do not match",
  path: ["confirmEmail"],
});
type EnterDetailsSchemaType = z.infer<typeof EnterDetailsSchema>

export function EnterDetailsForm({onCompleted}: {onCompleted: () => void}) {
  const form = useAppForm({
    defaultValues: {
      fullName: "",
      email: "",
      confirmEmail: ""
    } as EnterDetailsSchemaType,
    onSubmit: () => {
      onCompleted()
    },
    validators: {
      onSubmit: EnterDetailsSchema,
      onSubmitAsync: async ({value}) => {
        const result = await submitDetails({
          name: value.fullName,
          email: value.email
        })
        return result.error?.message
      }
    }
  })
  return (<form
    onSubmit={(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }}
    className='flex flex-col gap-4'>

    <form.AppField
      name="fullName"
      children={(field) => <field.TextField label="Full Name" />}
    />
    <form.AppField
      name="email"
      children={(field) => <field.TextField label="Email" />}
    />
    <form.AppField
      name="confirmEmail"
      children={(field) => <field.TextField label="Confirm Email" />}
    />
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <>
          <Button type="submit" disabled={!canSubmit} className='mt-8'>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        </>
      )}
    />
     <form.Subscribe
      selector={(state) => [state.errorMap]}
      children={([errorMap]) => (
        <div className='text-sm text-red-600'>
          {typeof errorMap.onSubmit === 'string' ? errorMap.onSubmit : ""}
        </div>
      )}
    />
  </form>)
}
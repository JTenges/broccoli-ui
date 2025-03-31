import { useAppForm } from '@/components/form/app-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod'

const RequestInviteSchema = z.object({
  fullName: z.string().min(3, "Must be at least 3 characters"),
  email: z.string().min(1, { message: "Email cannot be empty" }).email({ message: "Invalid email address" }),
  confirmEmail: z.string().min(1, { message: "Confirmation email cannot be empty" }).email({ message: "Invalid confirmation email address" }),
}).refine(data => data.email === data.confirmEmail, {
  message: "Emails do not match",
  path: ["confirmEmail"],
});
type RequestInviteSchemaType = z.infer<typeof RequestInviteSchema>

export function EnterDetailsForm({onCompleted}: {onCompleted: () => void}) {
  const form = useAppForm({
    defaultValues: {
      fullName: "",
      email: "",
      confirmEmail: ""
    } as RequestInviteSchemaType,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
      onCompleted()
    },
    validators: {
      onSubmit: RequestInviteSchema
    }
  })
  return (<form
    onSubmit={(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }}
    className='flex flex-col'>

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
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        </>
      )}
    />
  </form>)
}
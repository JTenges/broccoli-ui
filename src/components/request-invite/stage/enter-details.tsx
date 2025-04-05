import { Button } from "@/components/ui/button";
import { submitDetails } from "@/service/enter-details";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const EnterDetailsSchema = z
  .object({
    fullName: z.string().min(3, "Must be at least 3 characters"),
    email: z
      .string()
      .min(1, { message: "Email cannot be empty" })
      .email({ message: "Invalid email address" }),
    confirmEmail: z
      .string()
      .min(1, { message: "Confirmation email cannot be empty" })
      .email({ message: "Invalid confirmation email address" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });
type EnterDetailsSchemaType = z.infer<typeof EnterDetailsSchema>;

export function EnterDetailsForm({ onCompleted }: { onCompleted: () => void }) {
  const form = useForm<EnterDetailsSchemaType>({
    resolver: zodResolver(EnterDetailsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      confirmEmail: "",
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const {
    mutateAsync: submitDetailsMutateAsync,
    isPending: submitDetailsPending,
  } = useMutation({
    mutationFn: submitDetails,
  });

  const onSubmit = handleSubmit(async (d) => {
    const { error } = await submitDetailsMutateAsync({
      name: d.fullName,
      email: d.email,
    });

    if (error) {
      setError("root", { type: "custom", message: error.message });
    } else {
      onCompleted();
    }
  });

  return (
    <>
      <div className="mx-auto text-2xl font-semibold my-4">
        Request an invite
      </div>
      <hr className="mx-auto w-32" />
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="flex">
                  <FormLabel>Full Name</FormLabel>
                  <FormMessage className="ml-auto" />
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex">
                  <FormLabel>Email</FormLabel>
                  <FormMessage className="ml-auto" />
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmEmail"
            render={({ field }) => (
              <FormItem>
                <div className="flex">
                  <FormLabel>Confirm Email</FormLabel>
                  <FormMessage className="ml-auto" />
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={submitDetailsPending}
            className="mt-8"
          >
            {submitDetailsPending ? <Spinner /> : "Submit"}
          </Button>

          <div className="mx-auto italic text-red-600">
            {errors.root?.message}
          </div>
        </form>
      </Form>
    </>
  );
}

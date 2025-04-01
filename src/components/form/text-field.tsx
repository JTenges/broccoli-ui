import { useFieldContext } from "@/components/form/context"
import { Input } from "@/components/ui/input"

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>()

  return (
    <div>
      <div className="text-sm flex items-center">
        <label htmlFor={field.name}>{label}</label>
        {field.state.meta.errors.length ? (
          <span className="ml-auto  text-red-600">{field.state.meta.errors.map(e => e.message).join(', ')}</span>
        ) : null}
      </div>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />

    </div>
  )
}
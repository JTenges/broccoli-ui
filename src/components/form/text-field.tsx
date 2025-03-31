import { useFieldContext } from "@/components/form/context"
import { Input } from "@/components/ui/input"

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>()
  return (
    <label>
      <div>{label}</div>
      <Input
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.errors.length ? (
        <span className="text-sm text-red-600">{field.state.meta.errors.map(e => e.message).join(', ')}</span>
      ) : null}
    </label>
  )
}
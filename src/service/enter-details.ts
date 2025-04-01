import { env } from "@/lib/env"
import { z } from "zod"

const ErrorSchema = z.object({
  errorMessage: z.string()
})

export type SubmitDetailsParams = {
  name: string
  email: string
}
export async function submitDetails(params: SubmitDetailsParams): Promise<{error: {message: string} | undefined}> {
  const response = await fetch(`${env.apiBaseUrl}/fake-auth`, {
    method: 'POST',
    body: JSON.stringify(params)
  })

  const bodyText = await response.text()

  if (response.status !== 200) {
    let bodyJson = undefined
    try {
      bodyJson = JSON.parse(bodyText)
    } catch(e) {
      console.info(`Could not parse error: ${bodyText}`)
    }

    if (bodyJson) {
      const errorParseResult = ErrorSchema.safeParse(bodyJson)

      if (!errorParseResult.success) {
        console.info(`Could not parse error: ${bodyJson}`)
      } else {
        return {error: {message: errorParseResult.data.errorMessage.replace("Bad Request: ", "") || ""}}
      }
    }

    return {error: {message: "An unexpected error occurred please try again later"}}
  }

  return {error: undefined}
}

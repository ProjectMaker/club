const POSTHOG_API_HOST = 'https://eu.posthog.com'

export const queryPostHog = async <TResponse>(query: Record<string, unknown>): Promise<TResponse | null> => {
  const apiKey = process.env.POSTHOG_API_KEY
  const projectId = process.env.POSTHOG_PROJECT_ID

  if (!apiKey || !projectId) {
    console.error('POSTHOG_API_KEY ou POSTHOG_PROJECT_ID manquant')
    return null
  }

  const response = await fetch(`${POSTHOG_API_HOST}/api/projects/${projectId}/query/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error(`PostHog API error ${response.status}: ${await response.text()}`)
  }

  return response.json()
}

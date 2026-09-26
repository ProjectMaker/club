import { PostHog } from 'posthog-node'

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

function getPostHogClient() {
  if (!projectToken) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured')
    }
    return null
  }

  if (!host) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured')
    }
    return null
  }

  return new PostHog(projectToken, {
    host,
    flushAt: 1,
    flushInterval: 0,
    enableExceptionAutocapture: true,
  })
}

export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties: Record<string, unknown> = {},
) {
  const posthog = getPostHogClient()
  if (!posthog) return

  posthog.capture({ distinctId, event, properties })
  await posthog.shutdown()
}

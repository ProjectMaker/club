import { SeverityNumber } from '@opentelemetry/api-logs'
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http'
import { LoggerProvider, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs'

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST
const loggerName = 'club-posthog-exporter'

let loggerProvider: LoggerProvider | null = null
let initialized = false

export function initializePostHogLogs() {
  if (initialized) return
  initialized = true

  if (!projectToken) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured')
    }
    return
  }

  if (!host) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured')
    }
    return
  }

  const exporter = new OTLPLogExporter({
    url: new URL('/i/v1/logs', host).toString(),
    headers: { Authorization: `Bearer ${projectToken}` },
  })

  loggerProvider = new LoggerProvider({
    processors: [new SimpleLogRecordProcessor({ exporter })],
  })
}

export async function logPostHogInfo(body: string, attributes: Record<string, string | number | boolean> = {}) {
  initializePostHogLogs()
  if (!loggerProvider) return

  loggerProvider.getLogger(loggerName).emit({ body, severityNumber: SeverityNumber.INFO, attributes })
  await loggerProvider.forceFlush()
}

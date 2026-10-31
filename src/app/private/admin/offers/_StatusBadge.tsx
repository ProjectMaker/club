import { OFFER_REQUEST_STATUSES } from "@/utils/constants";

export const getStatus = (value: string) => OFFER_REQUEST_STATUSES.find(status => status.value === value)

export default function StatusBadge({ status }: { status: string }) {
  const { label, className } = getStatus(status) || OFFER_REQUEST_STATUSES[0]
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${className}`}>
      {label}
    </span>
  )
}

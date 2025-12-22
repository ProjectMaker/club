type Status = 'available' | 'reserved' | 'sold'

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
    available: {
        label: 'Disponible',
        className: 'bg-lime-500 text-white',
    },
    reserved: {
        label: 'Réservé',
        className: 'bg-amber-500 text-white',
    },
    sold: {
        label: 'Vendu',
        className: 'bg-slate-500 text-white',
    },
}

export default function ChipStatus({ status }: { status: Status }) {
    const config = STATUS_CONFIG[status]

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
            role="status"
            aria-label={`Statut : ${config.label}`}
        >
            {config.label}
        </span>
    )
}
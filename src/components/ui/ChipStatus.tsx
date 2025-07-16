export default function Status({ status }: { status: string }) {
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'available'
            ? 'bg-lime-500 text-white'
            : status === 'pending'
                ? 'bg-yellow-100 text-white'
                : 'bg-red-100 text-white'
            }`}>
            {status === 'available' ? 'Disponible' :
                status === 'pending' ? 'En attente' : 'Vendue'}
        </span>
    )
}
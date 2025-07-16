import { Laundry } from "@/models";

export default function List({initialData}: {initialData: any}) {
    return (
        <div>
            <h1>List</h1>
            {initialData.map((laundry: Laundry) => (
                <div key={laundry.id}>
                    <h2>{laundry.name}</h2>
                </div>
            ))}
        </div>
    )
}
import { getLaundries } from "@/data-access-layers/laundries-list";

import List from "./_List";
export default async function Laundries() {
    return (
        <div>
            Laundries
            <br />
            <List />
        </div>
    )
}
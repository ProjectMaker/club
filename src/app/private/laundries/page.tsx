import { logout } from "@/actions/auth-logout";
import { getLaundries } from "@/data-access-layers/laundries-list";

import List from "./_List";
export default async function Laundries() {
    const data = await getLaundries({from: 1, to: 4})
    return (
        <div>
            Laundries
            <br />
            <List initialData={data} />
        </div>
    )
}
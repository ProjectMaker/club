import LaundriesSummary from "@/components/pages/LaundriesSummary";
import List from "./_List";

export default async function Laundries() {    
    return (
        <div className="container mx-auto px-4 py-8">
            <LaundriesSummary />
            <List />
        </div>
    )
}
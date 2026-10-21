import { RoundTable, Consultation, Ebooks, AiDryCleaning, LaundryValuation } from "./_Cards";

export default function Services() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <RoundTable />
      <Consultation />
      <Ebooks />
      <AiDryCleaning />
      <LaundryValuation />
    </div>
  )
}
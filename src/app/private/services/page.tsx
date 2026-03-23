import { Consultation, Webinar, WebinarOzone } from "./_Cards";

export default function Services() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <Consultation />
      <Webinar />
      <WebinarOzone />
    </div>
  )
}
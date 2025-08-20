import { getPressing } from "@/data-access-layers/pressings";
import Form from "./_Form";
const DEFAULT_VALUES = {
  name: '',
  address: '',
  postal_code: '',
  city: '',
  description: '',
  surface: 0,
  rent: 0,
  price: 0,
  materials: [],
  status: 'available',
  pictures: []
};

export default async function Pressing({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let {pictures, ...pressing} = id === 'new' ? DEFAULT_VALUES : await getPressing(parseInt(id))
  pressing = {...pressing, pictures: pictures.map((picture: any) => ({...picture, uuid: picture.id}))}
  return (
    <div className="w-7xl">
      <Form defaultValues={pressing} />
    </div>
  )
}
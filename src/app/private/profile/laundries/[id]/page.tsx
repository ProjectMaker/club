import { getLaundry } from "@/data-access-layers/laundries";
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

export default async function Laundries({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let {laundry_picture, ...laundry} = id === 'new' ? DEFAULT_VALUES : await getLaundry(parseInt(id))
  laundry = {...laundry, pictures: laundry_picture.map((picture: any) => ({...picture, uuid: picture.id}))}
  return (
    <div className="w-7xl">
      <Form defaultValues={laundry} />
    </div>
  )
}
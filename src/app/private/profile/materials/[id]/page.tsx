import { today } from '@internationalized/date';

import { getMaterial } from "@/data-access-layers/materials";
import Form from "./_Form";

const DEFAULT_VALUES = {
  availability_date: today('Europe/Paris').toString(),
  category: '',
  subcategory: '',
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  status: 'available',
  postal_code: '',
  city: '',
  quantity: 1,
  price: 0,
  infos: '',
  pictures: []
};

export default async function Material({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let {pictures, ...material} = id === 'new' ? DEFAULT_VALUES : await getMaterial(parseInt(id))
  material = {...material, pictures: pictures.map((picture: any) => ({...picture, uuid: picture.id}))}
  return (
    <div className="w-7xl">
      <Form defaultValues={material} />
    </div>
  )
}
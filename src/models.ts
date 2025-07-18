export interface User {
    id: string;
    email: string | null;
    firstname: string | null;
    lastname: string | null;
    phone_number: string | null;
    laundries_number: number;
    laundries_owner: boolean;
    created_at: string;
    is_admin: boolean
}

export interface Picture {
    id: number;
    uuid: string;
    name: string;
    data_url: string;
}

export interface Laundry {
    id: number;
    name: string;
    address: string | null;
    postal_code: string;
    city: string;
    description: string;
    surface: number;
    rent: number;
    price: number;
    materials: { name: string }[]
    created_at: string;
    status: 'available' | 'sold' | 'pending';
    updated_at: string;
    user: User;
    pictures: Picture[];
}

export interface Pressing {
    id: number;
    name: string;
    address: string | null;
    postal_code: string;
    city: string;
    description: string;
    surface: number;
    rent: number;
    price: number;
    materials: { name: string }[]
    created_at: string;
    status: 'available' | 'sold' | 'pending';
    updated_at: string;
    pictures: Picture[];
    user: User;
}

export interface Material {
    id: number;
    name: string | null;
    availability_date: string;
    model: string;
    year: number;
    price: number;
    quantity: number;
    infos: string | null;
    created_at: string;
    status: 'available' | 'sold' | 'reserved';
    user_id: string;
    category: string;
    subcategory: string;
    brand: string;
    city: string;
    postal_code: string;
    updated_at: string;
    pictures: Picture[];
    user: User;
}
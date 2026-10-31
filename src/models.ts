export type Status = 'available' | 'reserved' | 'sold'

export interface User {
    id: string;
    email: string | null;
    firstname: string | null;
    lastname: string | null;
    phone_number: string | null;
    laundries_number: number;
    laundries_owner: boolean;
    pressings_number: number;
    carwashes_number: number;
    created_at: string;
    is_admin: boolean
    is_approved: boolean;
}

export interface Picture {
    id: number;
    uuid: string;
    name: string;
    data_url: string;
    thumbnail_url?: string;
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
    status: Status;
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
    status: Status;
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
    status: Status;
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
export interface OfferRequestFile {
    name: string;
    path: string;
    // Lien de téléchargement temporaire, ajouté pour l'admin
    url?: string;
}

export interface OfferRequestAnswer {
    name: string;
    label: string;
    value: string | string[] | OfferRequestFile[] | null;
}

export interface OfferRequestNote {
    id: number;
    created_at: string;
    content: string;
    author: { firstname: string | null; lastname: string | null } | null;
}

export interface OfferRequest {
    id: number;
    reference: string;
    created_at: string;
    updated_at: string;
    user_id: string | null;
    offer: string;
    status: 'new' | 'follow_up' | 'done' | 'archived';
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    phone_number: string | null;
    data: {
        answers: OfferRequestAnswer[];
        user_match: 'session' | 'email' | null;
    };
    notes?: OfferRequestNote[];
}

export interface AddressData {
    alamatLengkap: string;
    kota: string;
    keterangan: string;
    latitude?: number;
    longitude?: number;
}

export interface DeliveryOption {
    id: string;
    title: string;
    price: number;
    eta: string;
    bonus?: string;
    extra?: string;
    icon: React.ReactNode;
}

export interface PriceItem {
    label: string;
    value: number;
    isBold?: boolean;
}

export interface VehicleData {
    plateNumber: string;
    brand: string;
    model: string;
    color: string;
    year: string;
    chassisNumber: string;
    taxValidity: string;
    type: string;
    region: string;
}

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

export interface CreateOrderRequest {
    name: string;
    email: string;
    phoneNumber: string;
    identityNumber: string;
    plateNumber: string;
    chassisNumber: string;
    serviceId: string | number;
    deliveryFee: number;
    totalAmount: number;
    address?: string;
    city?: string;
    addressNote?: string;
    paymentMethod: string;
    voucherCode?: string;
    promoId?: string;
    vehicleType?: string;
    mutationType?: string;
    latitude?: number;
    longitude?: number;
    taxData?: any;
}

export const createOrder = async (data: CreateOrderRequest) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders`, data);
        return response.data;
    } catch (error: any) {
        console.error('Create Order Error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to create order'
        };
    }
};

export const getOrderDetail = async (bookingId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${bookingId}`);
        return response.data;
    } catch (error: any) {
        console.error('Get Order Detail Error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Order not found'
        };
    }
};
export const getPaymentStatus = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${id}/payment-status`);
        return response.data;
    } catch (error: any) {
        console.error('Get Payment Status Error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to get status'
        };
    }
};

export interface VehicleTaxData {
    WILAYAH_SAMSAT: string;
    NO_POLISI: string;
    NO_RANGKA: string;
    NO_MESIN: string;
    NO_KTP: string;
    MILIK_KE: string;
    NM_MEREK_KB: string;
    NM_MODEL_KB: string;
    WARNA_KB: string;
    THN_BUAT: string;
    TGL_AKHIR_PAJAK: string;
    TGL_AKHIR_STNKB: string;
    BBN_POKOK: string;
    BBN_DENDA: string;
    OPSEN_POKOK: string;
    OPSEN_DENDA: string;
    PKB_POKOK: string;
    PKB_DENDA: string;
    SWD_POKOK: string;
    SWD_DENDA: string;
    ADM_STNK: string;
    ADM_TNKB: string;
    JUMLAH_BAYAR: string;
    CAN_BE_PAID: boolean;
    ENABLE_POST_PAYMENT: boolean;
}

export interface VehicleTaxResponse {
    success: boolean;
    message: string;
    data: VehicleTaxData;
}

export const checkVehicleTax = async (plate: string): Promise<VehicleTaxResponse> => {
    const normalizedPlate = plate.replace(/\s/g, '').toUpperCase();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_SAMBARA_TOKEN}`);

    const raw = JSON.stringify({
        "plat": normalizedPlate
    });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_SAMBARA_BASE_URL}/sambara/info-pkb?isFake=true`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error checking vehicle tax:', error);
        throw error;
    }
};

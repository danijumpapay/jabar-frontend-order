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
    // For development: Using dummy
    const dummyData: Record<string, VehicleTaxData> = {
        "F1748ABK": {
            "WILAYAH_SAMSAT": "BOGOR",
            "NO_POLISI": "F1748ABK",
            "NO_RANGKA": "MRHGM2660AP130080",
            "NO_MESIN": "-",
            "NO_KTP": "3271062911910004",
            "MILIK_KE": "1",
            "NM_MEREK_KB": "HONDA",
            "NM_MODEL_KB": "CITY GM2 1.5 E A/T",
            "WARNA_KB": "ABU ABU METAL METALIK",
            "THN_BUAT": "2010",
            "TGL_AKHIR_PAJAK": "24-07-2026",
            "TGL_AKHIR_STNKB": "24-07-2029",
            "BBN_POKOK": "0",
            "BBN_DENDA": "0",
            "OPSEN_POKOK": "1.169.700",
            "OPSEN_DENDA": "0",
            "PKB_POKOK": "1.772.200",
            "PKB_DENDA": "0",
            "SWD_POKOK": "143.000",
            "SWD_DENDA": "0",
            "ADM_STNK": "0",
            "ADM_TNKB": "0",
            "JUMLAH_BAYAR": "3.084.900",
            "CAN_BE_PAID": true,
            "ENABLE_POST_PAYMENT": true
        },
        "D3130ADT": {
            "WILAYAH_SAMSAT": "Bandung II KWLYN",
            "NO_POLISI": "D3130ADT",
            "NO_RANGKA": "MH1JM0217NK743811",
            "NO_MESIN": "-",
            "NO_KTP": "1903045405940001",
            "MILIK_KE": "1",
            "NM_MEREK_KB": "HONDA",
            "NM_MODEL_KB": "F1C02N46L0 A/T",
            "WARNA_KB": "PUTIH",
            "THN_BUAT": "2022",
            "TGL_AKHIR_PAJAK": "18-05-2026",
            "TGL_AKHIR_STNKB": "18-05-2027",
            "BBN_POKOK": "0",
            "BBN_DENDA": "0",
            "OPSEN_POKOK": "59.900",
            "OPSEN_DENDA": "0",
            "PKB_POKOK": "90.700",
            "PKB_DENDA": "0",
            "SWD_POKOK": "35.000",
            "SWD_DENDA": "0",
            "ADM_STNK": "100.000",
            "ADM_TNKB": "60.000",
            "JUMLAH_BAYAR": "345.600",
            "CAN_BE_PAID": true,
            "ENABLE_POST_PAYMENT": true
        }
    };

    const normalizedPlate = plate.replace(/\s/g, '').toUpperCase();
    const data = dummyData[normalizedPlate] || dummyData["F1748ABK"];

    return {
        "success": true,
        "message": "SUCCESS",
        "data": data
    };
};

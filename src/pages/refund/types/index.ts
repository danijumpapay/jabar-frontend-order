export interface RefundFormData {
  orderNumber: string;
  nominalAktual: string;
  catatan: string;
  bank: string;
  rekening: string;
}

export interface RefundErrors {
  nominalAktual: string;
  bank: string;
  rekening: string;
}
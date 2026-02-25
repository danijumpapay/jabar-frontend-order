import { Car, AlertCircle, MotorbikeIcon } from 'lucide-react';
import { VehicleData } from '@/types/payment';

interface VehicleDetailsProps {
    vehicle: VehicleData;
}

export const VehicleDetails = ({ vehicle }: VehicleDetailsProps) => {
    const isMotor = vehicle.type.toLowerCase() === 'motor';

    return (
        <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-sm text-left font-inter transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    {isMotor ? (
                        <MotorbikeIcon className="text-[#27AAE1]" size={20} />
                    ) : (
                        <Car className="text-[#27AAE1]" size={20} />
                    )}
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-base">Data Kendaraan</h3>
                    <p className="text-xs text-gray-500">Pastikan data kendaraan sudah sesuai</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-1">
                    <p className="text-xs text-gray-500">Plat Nomor</p>
                    <p className="font-bold text-gray-800">{vehicle.plateNumber}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500">Wilayah</p>
                    <p className="font-bold text-gray-800">{vehicle.region}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500">Jenis Kendaraan</p>
                    <p className="font-bold text-gray-800">{vehicle.type}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500">Merek / Brand</p>
                    <p className="font-bold text-gray-800">{vehicle.brand}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500">Model / Tipe</p>
                    <p className="font-bold text-gray-800">{vehicle.model}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500">Warna</p>
                    <p className="font-bold text-gray-800">{vehicle.color}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500">Tahun Pembuatan</p>
                    <p className="font-bold text-gray-800">{vehicle.year}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500">Nomor Rangka</p>
                    <p className="font-bold text-gray-800 tracking-wide">
                        {vehicle.chassisNumber.slice(0, -5)}xxxxx
                    </p>
                </div>

                <div className="md:col-span-2 pt-2">
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-start gap-3">
                        <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="text-xs font-bold text-orange-700">Masa Berlaku Pajak</p>
                            <p className="text-sm font-bold text-gray-800">{vehicle.taxValidity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

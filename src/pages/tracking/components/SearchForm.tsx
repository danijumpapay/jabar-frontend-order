import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  orderNumber: string;
  setOrderNumber: (val: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  error: boolean;
  history: string[];
}

export const SearchForm = ({ orderNumber, setOrderNumber, handleSearch, error, history }: SearchFormProps) => (
  <form onSubmit={handleSearch} className="space-y-4 text-left">
    <div className="space-y-2">
      <label className="block text-sm font-bold text-gray-800 ml-1">Nomor Order</label>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Input
            list="order-history"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className={`h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-kang-pajak-blue ${error ? 'border-red-500' : ''
              }`}
            placeholder="Masukkan nomor order (contoh: 12345)"
          />
          <datalist id="order-history">
            {history.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
        </div>
        <Button
          type="submit"
          className="btn-kang-primary h-12 px-10 text-white rounded-2xl font-bold shadow-lg shadow-kang-pajak-blue/20 transition-all active:scale-95"
        >
          Cari Order
        </Button>
      </div>
      {error && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">* Nomor order tidak boleh kosong</p>}
    </div>
  </form>
);
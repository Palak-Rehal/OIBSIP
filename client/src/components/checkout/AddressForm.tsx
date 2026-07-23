import { MapPin, User, Phone, Building2, Landmark } from "lucide-react";

interface AddressData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface AddressFormProps {
  data: AddressData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressForm = ({ data, onChange }: AddressFormProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-[#E8DED3] p-8">

      <div className="flex items-center gap-3 mb-8">
        <MapPin className="text-[#BD6A3C]" size={26} />
        <h2 className="text-2xl font-bold text-[#2E2B27]">
          Delivery Address
        </h2>
      </div>

      <div className="space-y-5">

        <div className="relative">
          <User className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            name="fullName"
            value={data.fullName}
            onChange={onChange}
            placeholder="Full Name"
            className="w-full h-14 rounded-2xl border border-[#E6DED2] pl-12 pr-4 outline-none focus:border-[#BD6A3C] transition"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            name="phone"
            value={data.phone}
            onChange={onChange}
            placeholder="Phone Number"
            className="w-full h-14 rounded-2xl border border-[#E6DED2] pl-12 pr-4 outline-none focus:border-[#BD6A3C] transition"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            name="address"
            value={data.address}
            onChange={onChange}
            placeholder="Street Address"
            className="w-full h-14 rounded-2xl border border-[#E6DED2] pl-12 pr-4 outline-none focus:border-[#BD6A3C] transition"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="relative">
            <Building2 className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              name="city"
              value={data.city}
              onChange={onChange}
              placeholder="City"
              className="w-full h-14 rounded-2xl border border-[#E6DED2] pl-12 pr-4 outline-none focus:border-[#BD6A3C]"
            />
          </div>

          <div className="relative">
            <Landmark className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              name="state"
              value={data.state}
              onChange={onChange}
              placeholder="State"
              className="w-full h-14 rounded-2xl border border-[#E6DED2] pl-12 pr-4 outline-none focus:border-[#BD6A3C]"
            />
          </div>

        </div>

        <input
          name="pincode"
          value={data.pincode}
          onChange={onChange}
          placeholder="Pincode"
          className="w-full h-14 rounded-2xl border border-[#E6DED2] px-5 outline-none focus:border-[#BD6A3C]"
        />

      </div>

    </div>
  );
};

export default AddressForm;
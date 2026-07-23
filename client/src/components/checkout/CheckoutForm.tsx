interface Props {
  form: any;
  setForm: any;
}

const CheckoutForm = ({ form, setForm }: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow border border-[#E7DED3]">

      <h2 className="text-2xl font-bold mb-8">
        Delivery Details
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="border rounded-xl h-12 px-4 outline-none focus:border-[#BD6A3C]" />

        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="border rounded-xl h-12 px-4 outline-none focus:border-[#BD6A3C]" />

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="border rounded-xl h-12 px-4 outline-none focus:border-[#BD6A3C] md:col-span-2" />

        <textarea name="address" value={form.address} onChange={handleChange} placeholder="Full Address" rows={4} className="border rounded-xl p-4 outline-none focus:border-[#BD6A3C] md:col-span-2"></textarea>

        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border rounded-xl h-12 px-4 outline-none focus:border-[#BD6A3C]" />

        <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border rounded-xl h-12 px-4 outline-none focus:border-[#BD6A3C]" />

        <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="border rounded-xl h-12 px-4 outline-none focus:border-[#BD6A3C]" />

        <textarea name="note" value={form.note} onChange={handleChange} placeholder="Delivery Instructions (Optional)" rows={3} className="border rounded-xl p-4 outline-none focus:border-[#BD6A3C] md:col-span-2"></textarea>

      </div>

    </div>
  );
};

export default CheckoutForm;
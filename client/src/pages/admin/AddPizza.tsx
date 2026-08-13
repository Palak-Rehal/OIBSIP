import { useState } from "react";
import {
  Pizza,
  Upload,
  IndianRupee,
  Tag,
  FileText,
  Layers,
  X,
  Image as ImageIcon,
  Save,
  CheckCircle2,
} from "lucide-react";

const AddPizza = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    size: "Medium",
    ingredients: "",
    description: "",
    stock: "Available",
  });

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImagePreview(imageUrl);
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    // Connect add pizza API here
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] px-4 py-6 md:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div>
            <div className="flex items-center gap-2 mb-1">

              <div className="w-8 h-8 rounded-xl bg-[#BD6A3C]/10 flex items-center justify-center">
                <Pizza
                  size={17}
                  className="text-[#BD6A3C]"
                />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#BD6A3C]">
                Pizza Management
              </span>

            </div>

            <h1 className="text-2xl md:text-3xl font-black text-[#2E2B27]">
              Add New Pizza
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create a new pizza for your menu.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-100 px-4 py-2.5 rounded-xl shadow-sm">

            <CheckCircle2
              size={15}
              className="text-green-500"
            />

            Admin Mode

          </div>

        </div>


        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* ================= TOP CARD ================= */}

          <div className="grid lg:grid-cols-[280px_1fr] gap-5">

            {/* IMAGE */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

              <div className="flex items-center justify-between mb-3">

                <div>
                  <h2 className="font-bold text-[#2E2B27]">
                    Pizza Image
                  </h2>

                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG up to 5MB
                  </p>
                </div>

                <ImageIcon
                  size={18}
                  className="text-[#BD6A3C]"
                />

              </div>

              <label className="block cursor-pointer">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {imagePreview ? (

                  <div className="relative">

                    <img
                      src={imagePreview}
                      alt="Pizza preview"
                      className="w-full h-44 object-cover rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
                    >
                      <X size={15} />
                    </button>

                  </div>

                ) : (

                  <div className="h-44 rounded-xl border-2 border-dashed border-[#E8DED4] bg-[#FCFAF7] flex flex-col items-center justify-center hover:border-[#BD6A3C] hover:bg-[#BD6A3C]/5 transition">

                    <div className="w-11 h-11 rounded-xl bg-[#BD6A3C]/10 flex items-center justify-center">

                      <Upload
                        size={20}
                        className="text-[#BD6A3C]"
                      />

                    </div>

                    <p className="text-sm font-semibold text-[#2E2B27] mt-3">
                      Upload image
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Click to browse
                    </p>

                  </div>

                )}

              </label>

            </div>


            {/* BASIC DETAILS */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

              <div className="flex items-center gap-2 mb-5">

                <div className="w-8 h-8 rounded-lg bg-[#BD6A3C]/10 flex items-center justify-center">
                  <Pizza
                    size={16}
                    className="text-[#BD6A3C]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#2E2B27]">
                    Basic Information
                  </h2>

                  <p className="text-xs text-gray-400">
                    Main pizza details
                  </p>
                </div>

              </div>


              <div className="grid md:grid-cols-2 gap-4">

                <InputBox
                  icon={<Pizza size={17} />}
                  label="Pizza Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Cheese Burst"
                />

                <InputBox
                  icon={<Tag size={17} />}
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Classic / Premium"
                />

                <InputBox
                  icon={<IndianRupee size={17} />}
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="299"
                />

                <SelectBox
                  label="Pizza Size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  options={[
                    "Small",
                    "Medium",
                    "Large",
                  ]}
                />

              </div>

            </div>

          </div>


          {/* ================= DESCRIPTION / INGREDIENTS ================= */}

          <div className="grid lg:grid-cols-2 gap-5">

            {/* INGREDIENTS */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

              <div className="flex items-center gap-2 mb-4">

                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">

                  <Layers
                    size={17}
                    className="text-orange-500"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-[#2E2B27]">
                    Ingredients
                  </h2>

                  <p className="text-xs text-gray-400">
                    List the pizza ingredients
                  </p>

                </div>

              </div>

              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Mozzarella, tomato, onion, capsicum..."
                className="w-full h-28 resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#BD6A3C] focus:ring-2 focus:ring-[#BD6A3C]/10 transition"
              />

            </div>


            {/* DESCRIPTION */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

              <div className="flex items-center gap-2 mb-4">

                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">

                  <FileText
                    size={17}
                    className="text-blue-500"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-[#2E2B27]">
                    Description
                  </h2>

                  <p className="text-xs text-gray-400">
                    Short description for customers
                  </p>

                </div>

              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A delicious cheesy pizza with..."
                className="w-full h-28 resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#BD6A3C] focus:ring-2 focus:ring-[#BD6A3C]/10 transition"
              />

            </div>

          </div>


          {/* ================= INVENTORY ================= */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">

                  <Layers
                    size={18}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-[#2E2B27]">
                    Availability
                  </h2>

                  <p className="text-xs text-gray-400">
                    Control whether customers can order this pizza.
                  </p>

                </div>

              </div>


              <select
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full sm:w-52 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#BD6A3C] focus:ring-2 focus:ring-[#BD6A3C]/10"
              >

                <option value="Available">
                  Available
                </option>

                <option value="Out Of Stock">
                  Out Of Stock
                </option>

              </select>

            </div>

          </div>


          {/* ================= ACTION BAR ================= */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-2 text-xs text-gray-500">

              <span className="w-2 h-2 rounded-full bg-green-500" />

              All changes will be saved when you submit.

            </div>


            <div className="flex gap-3">

              <button
                type="button"
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#BD6A3C] hover:bg-[#A95731] text-white text-sm font-bold shadow-lg shadow-[#BD6A3C]/20 transition"
              >

                <Save size={17} />

                Add Pizza

              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};


/* ================= INPUT ================= */

const InputBox = ({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder: string;
  type?: string;
}) => {
  return (
    <div>

      <label className="text-xs font-bold text-[#514B44]">
        {label}
      </label>

      <div className="mt-1.5 flex items-center border border-gray-200 rounded-xl px-3 focus-within:border-[#BD6A3C] focus-within:ring-2 focus-within:ring-[#BD6A3C]/10 transition">

        <span className="text-gray-400">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 text-sm outline-none bg-transparent"
        />

      </div>

    </div>
  );
};


/* ================= SELECT ================= */

const SelectBox = ({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  options: string[];
}) => {
  return (
    <div>

      <label className="text-xs font-bold text-[#514B44]">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#BD6A3C] focus:ring-2 focus:ring-[#BD6A3C]/10 bg-white"
      >

        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
};

export default AddPizza;
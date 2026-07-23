import { useState } from "react";
import {
  Pizza,
  Upload,
  IndianRupee,
  Tag,
  FileText,
  Layers,
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




  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    console.log(formData);

    // connect add pizza API here

  };




  return (

    <div
      className="
        min-h-screen
        bg-[#FAF7F2]
        p-6
        md:p-10
      "
    >


      <div
        className="
          max-w-5xl
          mx-auto
        "
      >


        {/* Header */}

        <div className="mb-10">

          <h1
            className="
              text-4xl
              font-black
              text-[#2E2B27]
            "
          >
            Add New Pizza 🍕
          </h1>


          <p className="text-gray-500 mt-3 text-lg">
            Create and manage delicious pizzas for your customers.
          </p>

        </div>






        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-[35px]
            shadow-xl
            p-8
            md:p-12
            space-y-8
          "
        >



          {/* Image Upload */}

          <div>

            <label
              className="
                font-bold
                text-[#2E2B27]
              "
            >
              Pizza Image
            </label>


            <div
              className="
                mt-3
                h-48
                border-2
                border-dashed
                border-[#E7DED3]
                rounded-3xl
                flex
                flex-col
                items-center
                justify-center
                text-gray-400
                hover:border-[#BD6A3C]
                transition
                cursor-pointer
              "
            >

              <Upload size={40}/>

              <p className="mt-3">
                Upload Pizza Image
              </p>

            </div>


          </div>







          {/* Name + Category */}

          <div
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >

            <InputBox
              icon={<Pizza/>}
              label="Pizza Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Cheese Burst Pizza"
            />



            <InputBox
              icon={<Tag/>}
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Veg / Non Veg"
            />

          </div>







          {/* Price + Size */}

          <div
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >


            <InputBox
              icon={<IndianRupee/>}
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="299"
            />



            <div>

              <label className="font-bold">
                Pizza Size
              </label>


              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="
                  mt-3
                  w-full
                  border
                  border-gray-200
                  rounded-2xl
                  p-4
                  outline-none
                "
              >

                <option>
                  Small
                </option>

                <option>
                  Medium
                </option>

                <option>
                  Large
                </option>

              </select>

            </div>


          </div>







          {/* Ingredients */}

          <div>

            <label className="font-bold">
              Ingredients
            </label>


            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Cheese, Tomato, Onion..."
              className="
                mt-3
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                h-32
                outline-none
              "
            />

          </div>







          {/* Description */}

          <div>

            <label className="font-bold flex gap-2">
              <FileText size={20}/>
              Description
            </label>


            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your pizza..."
              className="
                mt-3
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                h-32
                outline-none
              "
            />

          </div>







          {/* Stock */}

          <div>

            <label className="font-bold flex gap-2">
              <Layers size={20}/>
              Stock Status
            </label>


            <select
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="
                mt-3
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
              "
            >

              <option>
                Available
              </option>

              <option>
                Out Of Stock
              </option>

            </select>


          </div>








          <button
            type="submit"
            className="
              w-full
              bg-[#BD6A3C]
              text-white
              py-4
              rounded-full
              font-bold
              text-lg
              hover:bg-[#a95731]
              transition
            "
          >

            Add Pizza

          </button>





        </form>


      </div>


    </div>

  );

};








const InputBox = ({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
}:any)=>{


return (

<div>

<label className="font-bold">
{label}
</label>


<div
className="
mt-3
flex
items-center
border
border-gray-200
rounded-2xl
px-4
"
>

<span className="text-gray-400">
{icon}
</span>


<input

name={name}

value={value}

onChange={onChange}

placeholder={placeholder}

className="
w-full
p-4
outline-none
"

/>


</div>


</div>

);

};




export default AddPizza;
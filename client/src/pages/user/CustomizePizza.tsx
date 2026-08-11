import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Pizza,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../../context/CartContext";


const sizes = [
  {
    name: "Small",
    price: 149,
    description: "6 inch"
  },
  {
    name: "Medium",
    price: 249,
    description: "9 inch"
  },
  {
    name: "Large",
    price: 349,
    description: "12 inch"
  },
];


const crusts = [
  {
    name: "Classic Hand Tossed",
    price: 0,
  },
  {
    name: "Cheese Burst",
    price: 80,
  },
  {
    name: "Thin Crust",
    price: 50,
  },
];


const toppings = [
  {
    name: "Extra Cheese",
    price: 50,
    icon: "🧀",
  },
  {
    name: "Paneer",
    price: 70,
    icon: "🥘",
  },
  {
    name: "Mushroom",
    price: 40,
    icon: "🍄",
  },
  {
    name: "Olives",
    price: 30,
    icon: "🫒",
  },
  {
    name: "Jalapeno",
    price: 35,
    icon: "🌶️",
  },
  {
    name: "Corn",
    price: 30,
    icon: "🌽",
  },
];


const CustomizePizza = () => {

    const navigate = useNavigate();

    const { addItem } = useCart();

  const [selectedSize,setSelectedSize] =
  useState(sizes[1]);


  const [selectedCrust,setSelectedCrust] =
  useState(crusts[0]);


  const [selectedToppings,setSelectedToppings] =
  useState<any[]>([]);



  const toggleTopping = (item:any)=>{

    const already =
    selectedToppings.some(
      topping=>topping.name===item.name
    );


    if(already){

      setSelectedToppings(
        selectedToppings.filter(
          topping=>topping.name!==item.name
        )
      );

    }
    else{

      setSelectedToppings([
        ...selectedToppings,
        item
      ]);

    }

  };



  const totalPrice =
  selectedSize.price +
  selectedCrust.price +
  selectedToppings.reduce(
    (total,item)=>total+item.price,
    0
  );
    const handleAddCustomizedPizza = async () => {

await addItem(
  "",
  selectedSize.name,
  1,
  {
    name:"Custom Pizza",

    crust:selectedCrust.name,

    toppings:selectedToppings.map(
      item => item.name
    ),

    price:totalPrice,

    isCustomized:true,
  }
);

  navigate("/cart");

};


return (

<motion.div
initial={{
  opacity:0,
  y:40
}}
animate={{
  opacity:1,
  y:0
}}
transition={{
  duration:0.6
}}
className="
min-h-screen
bg-gradient-to-br
from-orange-50
via-white
to-red-50
py-12
"
>


<div className="
max-w-7xl
mx-auto
px-6
grid
lg:grid-cols-2
gap-10
">


{/* Pizza Preview */}

<div className="
bg-white
rounded-[35px]
shadow-2xl
p-10
flex
flex-col
items-center
justify-center
">


<motion.div

animate={{
  y:[0,-15,0],
  rotate:[0,5,-5,0]
}}

transition={{
  duration:4,
  repeat:Infinity,
  ease:"easeInOut"
}}

className="
relative
w-72
h-72
rounded-full
bg-orange-100
flex
items-center
justify-center
shadow-xl
"

>


<div className="
absolute
inset-5
rounded-full
border-8
border-orange-300
">

</div>


<Pizza
size={130}
className="
text-orange-500
relative
"
/>


</motion.div>



<h2 className="
text-3xl
font-bold
mt-8
text-gray-800
">

My Custom Pizza 🍕

</h2>


<p className="
text-gray-500
mt-2
text-center
">

Build your dream pizza with fresh ingredients

</p>



<div className="
mt-8
bg-black
text-white
px-10
py-4
rounded-full
text-2xl
font-bold
">

₹ {totalPrice}

</div>



<div className="
mt-8
w-full
bg-orange-50
rounded-2xl
p-5
">

<h3 className="
font-bold
mb-3
">

Selected Items

</h3>


<p>
Size:
{" "}
{selectedSize.name}
</p>


<p>
Crust:
{" "}
{selectedCrust.name}
</p>


<div className="mt-2">
  Toppings:
  {" "}

  {
    selectedToppings.length ? (

      <span className="inline-flex flex-wrap gap-2">

        <AnimatePresence>

          {
            selectedToppings.map((item) => (

              <motion.span
                key={item.name}

                initial={{
                  scale: 0,
                  opacity: 0,
                  y: 10,
                }}

                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}

                exit={{
                  scale: 0,
                  opacity: 0,
                }}

                transition={{
                  duration: 0.3,
                }}

                className="
                bg-orange-100
                text-orange-700
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
                "
              >

                {item.name}

              </motion.span>

            ))
          }

        </AnimatePresence>

      </span>

    ) : (

      <span className="text-gray-400">
        No toppings
      </span>

    )
  }

</div>


</div>


</div>


{/* Customization Panel */}


<div className="
bg-white
rounded-[35px]
shadow-2xl
p-8
">


<h1 className="
text-4xl
font-extrabold
text-gray-900
">

Customize Pizza

</h1>


<p className="
text-gray-500
mt-2
mb-8
">

Choose everything according to your taste

</p>




{/* SIZE */}

<h3 className="
text-xl
font-bold
mb-4
">

Select Size

</h3>


<div className="
grid
grid-cols-3
gap-4
mb-8
">

{
sizes.map(size=>(

<button

key={size.name}

onClick={()=>setSelectedSize(size)}

className={`
rounded-2xl
border
p-4
transition

${
selectedSize.name===size.name
?
"bg-orange-500 text-white shadow-lg"
:
"hover:border-orange-400"
}

`}
>

<div className="font-bold">
{size.name}
</div>

<div>
{size.description}
</div>

<div>
₹{size.price}
</div>
</button>
))

}

</div>


{/* CRUST */}

<h3 className="
text-xl
font-bold
mb-4
">

Select Crust

</h3>


<div className="
space-y-3
mb-8
">

{
crusts.map(crust=>(

<button

key={crust.name}

onClick={()=>setSelectedCrust(crust)}

className={`
w-full
p-4
rounded-2xl
border
flex
justify-between

${
selectedCrust.name===crust.name
?
"bg-orange-500 text-white"
:
"hover:border-orange-400"
}

`}

>


<span>
{crust.name}
</span>


<span>
+ ₹{crust.price}
</span>


</button>


))
}


</div>

{/* TOPPINGS */}

<h3 className="
text-xl
font-bold
mb-4
">

Add Toppings

</h3>



<div className="
grid
grid-cols-2
gap-4
">


{
toppings.map(item=>{


const active =
selectedToppings.some(
t=>t.name===item.name
);



return (

<button

key={item.name}

onClick={()=>toggleTopping(item)}

className={`
p-4
rounded-2xl
border
flex
justify-between
items-center
transition

${
active
?
"bg-orange-500 text-white"
:
"hover:border-orange-400"
}

`}

>


<span>
{item.icon}
{" "}
{item.name}
</span>


<span>
₹{item.price}
</span>


</button>

)


})

}


</div>


<motion.button

onClick={handleAddCustomizedPizza}

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
className="
mt-10
w-full
bg-black
text-white
py-4
rounded-full
flex
justify-center
items-center
gap-3
font-bold
text-lg
hover:bg-orange-500
transition
"
>

<ShoppingCart size={22}/>

Add Customized Pizza

</motion.button>

</div>
        </div>



</motion.div>
);

};


export default CustomizePizza;
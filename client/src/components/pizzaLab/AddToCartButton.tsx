import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";


interface AddToCartButtonProps {

  totalPrice:number;

  selectedSize:{
    name:string;
    price:number;
  };

  selectedCrust:{
    name:string;
    price:number;
  };

  selectedSauce:{
    name:string;
    price:number;
  };

  selectedCheese:{
    name:string;
    price:number;
  };

  selectedToppings:string[];

}


const AddToCartButton = ({
  totalPrice,
  selectedSize,
  selectedCrust,
  selectedSauce,
  selectedCheese,
  selectedToppings,

}:AddToCartButtonProps)=>{


  const {addItem}=useCart();


  const handleAddToCart = async () => {

  try {

    await addItem(
      "",
      selectedSize.name,
      1,
      {
        name: "Customized Pizza",
        crust: selectedCrust.name,
        sauce: selectedSauce.name,
        cheese: selectedCheese.name,
        toppings: selectedToppings,
        price: totalPrice,
        isCustomized: true,
      }
    );


  } catch(error) {

    console.log("Add cart error:", error);

  }

};

return (

<motion.button

whileTap={{
 scale:0.95
}}

onClick={handleAddToCart}

className="
w-full
flex
items-center
justify-center
gap-2
bg-orange-500
hover:bg-orange-600
text-white
py-3
rounded-2xl
font-semibold
shadow-lg
transition
"

>

<ShoppingCart size={20}/>

Add Customized Pizza

</motion.button>

);

};


export default AddToCartButton;
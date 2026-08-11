import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Topping {
  name: string;
  price: number;
  emoji: string;
}

interface ToppingsSelectorProps {
  selectedToppings: string[];
  setSelectedToppings: React.Dispatch<React.SetStateAction<string[]>>;
}

const toppings: Topping[] = [
  {
    name: "Extra Cheese",
    price: 40,
    emoji: "🧀",
  },
  {
    name: "Paneer",
    price: 50,
    emoji: "🥘",
  },
  {
    name: "Corn",
    price: 30,
    emoji: "🌽",
  },
  {
    name: "Olives",
    price: 35,
    emoji: "🫒",
  },
  {
    name: "Mushroom",
    price: 45,
    emoji: "🍄",
  },
  {
    name: "Jalapeno",
    price: 25,
    emoji: "🌶️",
  },
];


const ToppingsSelector = ({
  selectedToppings,
  setSelectedToppings,
}: ToppingsSelectorProps) => {


  const toggleTopping = (name:string) => {

    if(selectedToppings.includes(name)){
      setSelectedToppings(
        selectedToppings.filter(
          item => item !== name
        )
      );
    }
    else{
      setSelectedToppings([
        ...selectedToppings,
        name
      ]);
    }

  };


  return (
    <div className="space-y-5">


      <div>
        <h2 className="
        text-xl 
        sm:text-2xl 
        font-bold 
        text-[#2B1B12]
        ">
          Choose Your Toppings 🍕
        </h2>

        <p className="
        text-sm 
        text-gray-500
        ">
          Add extra flavors to your pizza
        </p>

      </div>



      <div
      className="
      grid
      grid-cols-2
      sm:grid-cols-3
      gap-3
      "
      >

        {
          toppings.map((item)=>{

            const selected =
            selectedToppings.includes(item.name);


            return (

              <motion.div
              key={item.name}

              whileTap={{
                scale:.95
              }}

              onClick={()=>
                toggleTopping(item.name)
              }

              className={`
              relative
              cursor-pointer
              rounded-2xl
              border
              p-4
              transition

              ${
                selected
                ?
                "border-orange-500 bg-orange-50 shadow-md"
                :
                "border-gray-200 bg-white hover:shadow"
              }

              `}
              >


                {
                  selected && (

                    <div
                    className="
                    absolute
                    top-2
                    right-2
                    bg-orange-500
                    text-white
                    rounded-full
                    p-1
                    "
                    >

                      <Check size={14}/>

                    </div>

                  )
                }



                <div
                className="
                text-3xl
                mb-2
                "
                >
                  {item.emoji}
                </div>


                <h3
                className="
                font-semibold
                text-sm
                text-[#2B1B12]
                "
                >
                  {item.name}
                </h3>


                <p
                className="
                text-xs
                text-gray-500
                mt-1
                "
                >
                  + ₹{item.price}
                </p>


              </motion.div>

            )

          })
        }


      </div>


    </div>
  );
};


export default ToppingsSelector;
import { motion } from "framer-motion";
import {
  Pizza,
  Layers,
  CircleDot,
  Leaf,
  Flame,
} from "lucide-react";


interface SummaryCardProps {

  selectedSize: {
    name: string;
    price: number;
  };

  selectedCrust: {
    name: string;
    price: number;
  };

  selectedSauce: {
    name: string;
    price: number;
  };

  selectedCheese: {
    name: string;
    price: number;
  };

  selectedToppings: string[];

  totalPrice?: number;

}


const SummaryCard = ({
  selectedSize,
  selectedCrust,
  selectedSauce,
  selectedCheese,
  selectedToppings,
  totalPrice,

}: SummaryCardProps) => {


  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        bg-gradient-to-br
        from-orange-50
        to-white
        border
        border-orange-100
        rounded-3xl
        p-5
        shadow-lg
      "

    >


      <div
        className="
          flex
          items-center
          gap-2
          mb-4
        "
      >

        <Pizza
          className="text-orange-500"
          size={22}
        />

        <h2
          className="
            text-lg
            font-bold
            text-gray-800
          "
        >
          Pizza Summary
        </h2>

      </div>



      <div
        className="
          space-y-3
          text-sm
        "
      >


        <SummaryItem

          icon={<CircleDot size={16}/>}

          title="Size"

          value={selectedSize.name}

        />



        <SummaryItem

          icon={<Layers size={16}/>}

          title="Crust"

          value={selectedCrust.name}

        />



        <SummaryItem

          icon={<Flame size={16}/>}

          title="Sauce"

          value={selectedSauce.name}

        />



        <SummaryItem

          icon={<Pizza size={16}/>}

          title="Cheese"

          value={selectedCheese.name}

        />



        {/* Toppings */}

        <div
          className="
            flex
            gap-3
            items-start
          "
        >

          <Leaf
            size={16}
            className="
              text-green-500
              mt-1
            "
          />


          <div>


            <p
              className="
                text-gray-500
              "
            >
              Toppings
            </p>



            {
              selectedToppings.length > 0 ? (

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                    mt-1
                  "
                >

                  {
                    selectedToppings.map(
                      (item,index)=>(

                        <span

                          key={index}

                          className="
                            bg-orange-100
                            text-orange-700
                            px-2
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                          "

                        >

                          {item}

                        </span>

                      )
                    )
                  }

                </div>

              ) : (

                <p
                  className="
                    text-gray-400
                    text-xs
                  "
                >
                  No toppings added
                </p>

              )
            }


          </div>


        </div>



        {
          totalPrice !== undefined && (

            <div
              className="
                mt-4
                pt-3
                border-t
                border-orange-100
                flex
                justify-between
                font-bold
              "
            >

              <span>
                Total
              </span>


              <span
                className="
                  text-orange-600
                "
              >
                ₹{totalPrice}
              </span>


            </div>

          )
        }



      </div>


    </motion.div>

  );

};



const SummaryItem = ({

  icon,

  title,

  value,

}:{

  icon: React.ReactNode;

  title: string;

  value: string;

}) => (

  <div
    className="
      flex
      items-center
      gap-3
    "
  >

    <div
      className="
        text-orange-500
      "
    >
      {icon}
    </div>


    <div
      className="
        flex-1
      "
    >

      <p
        className="
          text-gray-500
        "
      >
        {title}
      </p>


      <p
        className="
          font-semibold
          text-gray-800
        "
      >
        {value}
      </p>


    </div>


  </div>

);



export default SummaryCard;
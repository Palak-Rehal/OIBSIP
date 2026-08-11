import { motion } from "framer-motion";

const ingredients = [
  {
    emoji: "🍅",
    position: "top-5 left-5",
    delay: 0,
  },
  {
    emoji: "🧀",
    position: "top-10 right-8",
    delay: 0.3,
  },
  {
    emoji: "🍄",
    position: "bottom-10 left-10",
    delay: 0.6,
  },
  {
    emoji: "🫒",
    position: "bottom-5 right-5",
    delay: 0.9,
  },
  {
    emoji: "🌽",
    position: "top-1/2 left-0",
    delay: 1.2,
  },
  {
    emoji: "🌶️",
    position: "top-1/2 right-0",
    delay: 1.5,
  },
];


const FloatingIngredients = () => {

  return (

    <div
      className="
      absolute
      inset-0
      pointer-events-none
      overflow-hidden
      "
    >

      {
        ingredients.map((item,index)=>(

          <motion.div

          key={index}

          className={`
          absolute
          ${item.position}
          text-3xl
          sm:text-4xl
          `}
          
          animate={{
            y:[0,-15,0],
            rotate:[0,10,-10,0],
          }}

          transition={{
            duration:3,
            repeat:Infinity,
            delay:item.delay,
            ease:"easeInOut"
          }}

          >

            {item.emoji}

          </motion.div>

        ))
      }


    </div>

  );
};


export default FloatingIngredients;
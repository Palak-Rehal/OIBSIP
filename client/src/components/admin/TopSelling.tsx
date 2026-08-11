interface Pizza {
  name: string;
  image: string;
  orders: number;
  revenue: string;
}


const pizzas: Pizza[] = [
  {
    name: "Margherita Pizza",
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
    orders: 145,
    revenue: "₹32,500",
  },
  {
    name: "Farmhouse Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    orders: 120,
    revenue: "₹28,800",
  },
  {
    name: "Pepperoni Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    orders: 98,
    revenue: "₹24,200",
  },
];


const TopSelling = () => {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/20
      bg-white/10
      backdrop-blur-xl
      p-6
      shadow-lg
      "
    >

      <div className="mb-6">

        <h2
          className="
          text-xl
          font-bold
          text-[#4b2e1f]
          dark:text-white
          "
        >
          Top Selling Pizzas 🍕
        </h2>


        <p
          className="
          text-sm
          text-gray-600
          dark:text-gray-300
          "
        >
          Best performing items
        </p>

      </div>



      <div className="space-y-5">

        {pizzas.map((pizza) => (

          <div
            key={pizza.name}
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-white/20
            p-3
            transition
            hover:bg-white/30
            "
          >

            <div className="flex items-center gap-4">


              <img
                src={pizza.image}
                alt={pizza.name}
                className="
                h-14
                w-14
                rounded-xl
                object-cover
                "
              />


              <div>

                <h3
                  className="
                  font-semibold
                  text-[#4b2e1f]
                  dark:text-white
                  "
                >
                  {pizza.name}
                </h3>


                <p
                  className="
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  "
                >
                  {pizza.orders} orders
                </p>

              </div>

            </div>



            <div
              className="
              font-bold
              text-[#8B4513]
              "
            >
              {pizza.revenue}
            </div>


          </div>

        ))}

      </div>


    </div>
  );
};


export default TopSelling;
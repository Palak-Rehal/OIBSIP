interface StockItem {
  name: string;
  stock: number;
  threshold: number;
}


const lowStockItems: StockItem[] = [
  {
    name: "Cheese",
    stock: 5,
    threshold: 20,
  },
  {
    name: "Pepperoni",
    stock: 8,
    threshold: 15,
  },
  {
    name: "Olives",
    stock: 10,
    threshold: 25,
  },
  {
    name: "Mushrooms",
    stock: 6,
    threshold: 18,
  },
];


const LowStock = () => {
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
          Low Stock Alerts ⚠️
        </h2>


        <p
          className="
          text-sm
          text-gray-600
          dark:text-gray-300
          "
        >
          Items that need restocking
        </p>

      </div>



      <div className="space-y-4">

        {lowStockItems.map((item) => (

          <div
            key={item.name}
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-white/20
            p-4
            "
          >

            <div>

              <h3
                className="
                font-semibold
                text-[#4b2e1f]
                dark:text-white
                "
              >
                {item.name}
              </h3>


              <p
                className="
                text-sm
                text-gray-600
                dark:text-gray-300
                "
              >
                Available: {item.stock}
              </p>

            </div>



            <div
              className="
              rounded-full
              bg-red-100
              px-3
              py-1
              text-xs
              font-semibold
              text-red-600
              "
            >
              Restock
            </div>


          </div>

        ))}

      </div>


    </div>
  );
};


export default LowStock;
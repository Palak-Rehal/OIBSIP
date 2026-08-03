import {
  Pizza,
  ShoppingBag,
  Users,
  IndianRupee,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";


const stats = [
  {
    title: "Total Pizzas",
    value: "50",
    icon: Pizza,
  },
  {
    title: "Total Orders",
    value: "1,250",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    value: "10,500",
    icon: Users,
  },
  {
    title: "Revenue",
    value: "₹85,000",
    icon: IndianRupee,
  },
];



const recentOrders = [
  {
    id: "#PH1024",
    customer: "Aarav Sharma",
    pizza: "Cheese Burst Pizza",
    amount: "₹499",
    status: "Delivered",
  },
  {
    id: "#PH1025",
    customer: "Priya Verma",
    pizza: "Farmhouse Pizza",
    amount: "₹699",
    status: "Preparing",
  },
  {
    id: "#PH1026",
    customer: "Rahul Kapoor",
    pizza: "Pepperoni Pizza",
    amount: "₹599",
    status: "Cancelled",
  },
];




const Dashboard = () => {


  return (

    <div
      className="
        min-h-screen
        bg-[#FAF7F2]
        p-6
        md:p-10
      "
    >

      <div className="max-w-7xl mx-auto">


        {/* Header */}

        <div className="mb-10">

          <h1
            className="
              text-4xl
              font-black
              text-[#2E2B27]
            "
          >
            Admin Dashboard 🍕
          </h1>


          <p className="text-gray-500 mt-3 text-lg">
            Manage PizzaHub orders, users and pizzas from here.
          </p>

        </div>





        {/* Stats Cards */}

        <div
          className="
            grid
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          {stats.map((item)=>{

            const Icon = item.icon;


            return (

              <div
                key={item.title}
                className="
                  bg-white
                  rounded-[30px]
                  p-7
                  shadow-md
                  border
                  border-[#E7DED3]
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#BD6A3C]
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Icon size={28}/>

                </div>


                <h2
                  className="
                    text-3xl
                    font-black
                    mt-6
                    text-[#2E2B27]
                  "
                >
                  {item.value}
                </h2>


                <p className="text-gray-500 mt-2">
                  {item.title}
                </p>


              </div>

            );

          })}

        </div>








        {/* Dashboard Content */}

        <div
          className="
            grid
            lg:grid-cols-3
            gap-8
            mt-10
          "
        >




          {/* Recent Orders */}

          <div
            className="
              lg:col-span-2
              bg-white
              rounded-[30px]
              p-8
              border
              border-[#E7DED3]
            "
          >

            <div className="flex justify-between mb-6">

              <h2
                className="
                  text-2xl
                  font-black
                  text-[#2E2B27]
                "
              >
                Recent Orders
              </h2>


              <ShoppingBag
                className="text-[#BD6A3C]"
              />

            </div>



            <div className="space-y-5">


              {recentOrders.map((order)=>(

                <div
                  key={order.id}
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    justify-between
                    bg-[#FAF7F2]
                    rounded-2xl
                    p-5
                  "
                >

                  <div>

                    <h3 className="font-bold text-[#2E2B27]">
                      {order.id} - {order.customer}
                    </h3>

                    <p className="text-gray-500">
                      {order.pizza}
                    </p>

                  </div>



                  <div className="mt-3 md:mt-0">

                    <p className="font-bold">
                      {order.amount}
                    </p>


                    <Status status={order.status}/>

                  </div>


                </div>

              ))}


            </div>


          </div>







          {/* Quick Actions */}

          <div
            className="
              bg-[#2E2B27]
              text-white
              rounded-[30px]
              p-8
            "
          >

            <h2
              className="
                text-2xl
                font-black
              "
            >
              Quick Overview
            </h2>



            <div className="mt-8 space-y-6">


              <div className="flex gap-4 items-center">

                <TrendingUp/>

                <p>
                  Sales increased by 18%
                </p>

              </div>


              <div className="flex gap-4 items-center">

                <Clock/>

                <p>
                  25 pending orders
                </p>

              </div>


              <div className="flex gap-4 items-center">

                <CheckCircle/>

                <p>
                  120 orders completed today
                </p>

              </div>



            </div>


          </div>




        </div>


      </div>

    </div>

  );
};







const Status = ({
  status
}:{
  status:string
})=>{


  if(status==="Delivered")
  {
    return (
      <span
        className="
          text-green-600
          text-sm
          font-bold
        "
      >
        Delivered
      </span>
    )
  }


  if(status==="Cancelled")
  {
    return (
      <span
        className="
          text-red-500
          text-sm
          font-bold
        "
      >
        Cancelled
      </span>
    )
  }


  return (
    <span
      className="
        text-yellow-600
        text-sm
        font-bold
      "
    >
      Preparing
    </span>
  )

};



export default Dashboard;
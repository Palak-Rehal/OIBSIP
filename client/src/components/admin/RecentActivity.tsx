interface Activity {
  title: string;
  description: string;
  time: string;
}


const activities: Activity[] = [
  {
    title: "New order received",
    description: "Order #ORD105 placed by customer",
    time: "2 minutes ago",
  },
  {
    title: "Payment completed",
    description: "Razorpay payment verified successfully",
    time: "15 minutes ago",
  },
  {
    title: "Inventory updated",
    description: "Cheese stock quantity updated",
    time: "1 hour ago",
  },
  {
    title: "New user registered",
    description: "A new customer joined PizzaHub",
    time: "3 hours ago",
  },
];


const RecentActivity = () => {
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
          Recent Activity
        </h2>


        <p
          className="
          text-sm
          text-gray-600
          dark:text-gray-300
          "
        >
          Latest admin updates
        </p>

      </div>



      <div className="relative space-y-6">


        {/* Timeline Line */}
        <div
          className="
          absolute
          left-[11px]
          top-2
          h-[90%]
          w-[2px]
          bg-gray-300
          "
        />



        {activities.map((activity, index) => (

          <div
            key={index}
            className="
            relative
            flex
            gap-4
            "
          >

            {/* Dot */}
            <div
              className="
              z-10
              mt-1
              h-6
              w-6
              rounded-full
              bg-[#8B4513]
              shadow-md
              "
            />



            <div
              className="
              flex-1
              rounded-2xl
              bg-white/20
              p-4
              "
            >

              <div
                className="
                flex
                justify-between
                gap-3
                "
              >

                <h3
                  className="
                  font-semibold
                  text-[#4b2e1f]
                  dark:text-white
                  "
                >
                  {activity.title}
                </h3>


                <span
                  className="
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                  "
                >
                  {activity.time}
                </span>

              </div>


              <p
                className="
                mt-1
                text-sm
                text-gray-600
                dark:text-gray-300
                "
              >
                {activity.description}
              </p>


            </div>


          </div>

        ))}


      </div>


    </div>
  );
};


export default RecentActivity;
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";


const revenueData = [
    {
        month: "Jan",
        revenue: 12000,
    },
    {
        month: "Feb",
        revenue: 18000,
    },
    {
        month: "Mar",
        revenue: 15000,
    },
    {
        month: "Apr",
        revenue: 24000,
    },
    {
        month: "May",
        revenue: 32000,
    },
    {
        month: "Jun",
        revenue: 28000,
    },
];


const RevenueChart = () => {
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
                    Revenue Overview
                </h2>

                <p
                    className="
          text-sm
          text-gray-600
          dark:text-gray-300
          "
                >
                    Monthly sales performance
                </p>
            </div>


            <div className="h-[320px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={revenueData}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis />


                        <Tooltip
                            formatter={(value) => [
                                `₹${String(value)}`,
                                "Revenue"
                            ]}
                        />


                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8B4513"
                            strokeWidth={3}
                            dot={{
                                r: 5
                            }}
                            activeDot={{
                                r: 8
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};


export default RevenueChart;
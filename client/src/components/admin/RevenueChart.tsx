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
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 24000 },
  { month: "May", revenue: 32000 },
  { month: "Jun", revenue: 28000 },
];

const RevenueChart = () => {
  return (
    <div className="h-full rounded-[22px] border border-[#E8E2DA] bg-white p-5 shadow-[0_8px_25px_rgba(46,43,39,0.05)]">

      {/* ================= HEADER ================= */}

      <div className="mb-4 flex items-start justify-between">

        <div>
          <div className="flex items-center gap-2">

            <h2 className="text-[17px] font-black tracking-tight text-[#292622]">
              Revenue Overview
            </h2>

            <span className="rounded-full bg-[#E7F5EB] px-2 py-1 text-[9px] font-bold text-[#26924D]">
              +8.7%
            </span>

          </div>

          <p className="mt-1 text-[11px] text-[#958C82]">
            Monthly sales performance
          </p>
        </div>


        {/* Period Badge */}

        <div className="rounded-xl border border-[#EEE8E1] bg-[#FAF7F2] px-3 py-1.5">
          <span className="text-[10px] font-bold text-[#756C63]">
            2026
          </span>
        </div>

      </div>


      {/* ================= CHART ================= */}

      <div className="h-[250px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={revenueData}
            margin={{
              top: 10,
              right: 8,
              left: -12,
              bottom: 0,
            }}
          >

            <CartesianGrid
              stroke="#F0ECE7"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#958C82",
                fontSize: 10,
                fontWeight: 600,
              }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#958C82",
                fontSize: 10,
                fontWeight: 600,
              }}
              tickFormatter={(value) =>
                `₹${value / 1000}k`
              }
            />


            <Tooltip
              cursor={{
                stroke: "#E7DED5",
                strokeWidth: 1,
              }}
              contentStyle={{
                background: "#292622",
                border: "none",
                borderRadius: "12px",
                padding: "9px 12px",
                boxShadow:
                  "0 10px 30px rgba(46,43,39,0.18)",
              }}
              labelStyle={{
                color: "#FFFFFF",
                fontSize: "10px",
                fontWeight: 700,
                marginBottom: "3px",
              }}
              itemStyle={{
                color: "#E7A77A",
                fontSize: "12px",
                fontWeight: 800,
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />


            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#BD6A3C"
              strokeWidth={3}
              dot={{
                r: 3.5,
                fill: "#FFFFFF",
                stroke: "#BD6A3C",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#BD6A3C",
                stroke: "#FFFFFF",
                strokeWidth: 3,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* ================= FOOTER ================= */}

      <div className="mt-3 flex items-center justify-between border-t border-[#F0ECE7] pt-3">

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[#A29A91]">
            Highest Revenue
          </p>

          <p className="mt-0.5 text-xs font-black text-[#292622]">
            May · ₹32,000
          </p>
        </div>


        <div className="text-right">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[#A29A91]">
            Average
          </p>

          <p className="mt-0.5 text-xs font-black text-[#292622]">
            ₹21,500
          </p>
        </div>

      </div>

    </div>
  );
};

export default RevenueChart;
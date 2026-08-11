import User from "../models/User";
import Pizza from "../models/Pizza";
import Order from "../models/Order";

export const getDashboard = async (req: any, res: any) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalPizzas = await Pizza.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: { $ne: "Delivered" },
    });

    const deliveredOrders = await Order.find({
      status: "Delivered",
    });

    const revenue = deliveredOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

  const recentOrders = await Order.find()
  .populate("user", "name email")
  .populate("items.pizza", "name")
  .sort({ createdAt: -1 })
  .limit(5);

const latestUsers = await User.find()
  .select("name email")
  .sort({ createdAt: -1 })
  .limit(5);

res.json({
  success: true,
  dashboard: {
    totalUsers,
    totalPizzas,
    totalOrders,
    pendingOrders,
    revenue,
  },
  recentOrders,
  latestUsers,
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Dashboard Error",
    });

  }
};
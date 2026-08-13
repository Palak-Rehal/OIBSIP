import User from "../models/User";
import Pizza from "../models/Pizza";
import Order from "../models/Order";


// =====================================================
// ADMIN DASHBOARD
// =====================================================

export const getDashboard = async (req: any, res: any) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalPizzas = await Pizza.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: {
        $nin: ["Delivered", "Cancelled"],
      },
    });

    const deliveredOrders = await Order.find({
      orderStatus: "Delivered",
    });

    const revenue = deliveredOrders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );


    const recentOrders = await Order.find()
      .populate("user", "name email")
      .populate("items.pizza", "name")
      .sort({ createdAt: -1 })
      .limit(5);


    const latestUsers = await User.find()
      .select("name email role isVerified createdAt")
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

    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Dashboard Error",
    });

  }
};


// =====================================================
// GET ALL USERS
// =====================================================

export const getAllUsers = async (req: any, res: any) => {

  try {

    const users = await User.find()
      .select("name email role isVerified createdAt")
      .sort({ createdAt: -1 });


    res.status(200).json({

      success: true,

      count: users.length,

      users,

    });

  } catch (error) {

    console.error("Get All Users Error:", error);

    res.status(500).json({

      success: false,

      message: "Failed to fetch users",

    });

  }

};
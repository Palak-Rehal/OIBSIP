import Inventory from "../models/Inventory";

export const getInventory = async (req: any, res: any) => {
  try {
    const inventory = await Inventory.find().sort({
      category: 1,
      name: 1,
    });

    res.json({
      success: true,
      inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory",
    });
  }
};
export const updateInventory = async (req: any, res: any) => {
  try {
    const { stock, threshold } = req.body;

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        stock,
        threshold,
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};
export const checkLowStock = async () => {
  try {
    const lowStockItems = await Inventory.find({
      $expr: {
        $lte: ["$stock", "$threshold"],
      },
    });

    return lowStockItems;
  } catch (error) {
    console.error("Low stock check failed:", error);
    return [];
  }
};
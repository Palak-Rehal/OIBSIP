import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Pizza from "../models/Pizza";

dotenv.config();

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

interface ProductConfig {
  folder: string;
  category:
    | "Veg"
    | "Non-Veg"
    | "Cheese Burst"
    | "Dessert"
    | "Beverages"
    | "Sides"
    | "Combos";
}

// ==========================================
// FOLDER → CATEGORY
// ==========================================

const folders: ProductConfig[] = [
  {
    folder: "pizzas",
    category: "Veg",
  },
  {
    folder: "desserts",
    category: "Dessert",
  },
  {
    folder: "drinks",
    category: "Beverages",
  },
  {
    folder: "sides",
    category: "Sides",
  },
  {
    folder: "combos",
    category: "Combos",
  },
];

// ==========================================
// VEG PIZZAS
// ==========================================

const vegPizzas = new Set([
  "farmhouse",
  "corn-cheese",
  "double-cheese",
  "four-cheese",
  "garlic-parmesan",
  "italian-veg-deluxe",
  "margherita",
  "mediterranean-veg",
  "mexican-green-wave",
  "mushroom-supreme",
  "paneer-makhani",
  "paneer-tikka",
  "pesto-veg",
  "quattro-formaggi",
  "roasted-garlic-herb",
  "roasted-veggie",
  "sicilian",
  "spicy-jalapeno",
  "spinach-feta",
  "tandoori-paneer",
  "truffle-burrata",
  "ultimate-veg-supreme",
  "veg-extravaganza",
  "veggie-delight",
  "veggie-paradise",
]);

// ==========================================
// CHEESE BURST
// ==========================================

const cheeseBurstPizzas = new Set([
  "cheese-burst",
  "cheese-volcano",
]);

// ==========================================
// NON-VEG PIZZAS
// ==========================================

const nonVegPizzas = new Set([
  "bbq-chicken",
  "buffalo-chicken",
  "chicken-alfredo",
  "chicken-dominator",
  "chicken-fiesta",
  "chipotle-chicken",
  "hawaiian",
  "hot-spicy-chicken",
  "italian-sausage",
  "meat-lovers",
  "mediterranean-chicken",
  "pepperoni",
  "peri-peri-chicken",
  "prosciutto-arugula",
  "seafood-supreme",
  "smoky-bbq-chicken",
  "smoked-salmon",
  "supreme-deluxe",
]);

// ==========================================
// HELPERS
// ==========================================

const formatName = (filename: string) => {
  return filename
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getRandomRating = () => {
  return Number((4.2 + Math.random() * 0.8).toFixed(1));
};

const getRandomReviews = () => {
  return Math.floor(50 + Math.random() * 450);
};

const getPizzaSizes = (category: string) => {
  if (category === "Dessert") {
    return [
      {
        size: "Small",
        price: Math.floor(129 + Math.random() * 100),
      },
    ];
  }

  if (category === "Beverages") {
    return [
      {
        size: "Small",
        price: Math.floor(79 + Math.random() * 70),
      },
    ];
  }

  if (category === "Sides") {
    return [
      {
        size: "Small",
        price: Math.floor(99 + Math.random() * 100),
      },
    ];
  }

  if (category === "Combos") {
    return [
      {
        size: "Small",
        price: Math.floor(299 + Math.random() * 200),
      },
    ];
  }

  const basePrice = Math.floor(199 + Math.random() * 150);

  return [
    {
      size: "Small",
      price: basePrice,
    },
    {
      size: "Medium",
      price: basePrice + 100,
    },
    {
      size: "Large",
      price: basePrice + 200,
    },
  ];
};

const getCategoryForPizza = (filename: string) => {
  const name = filename.replace(/\.(jpg|jpeg|png|webp)$/i, "");

  if (cheeseBurstPizzas.has(name)) {
    return "Cheese Burst";
  }

  if (nonVegPizzas.has(name)) {
    return "Non-Veg";
  }

  if (vegPizzas.has(name)) {
    return "Veg";
  }

  // Unknown pizza names default to Veg.
  return "Veg";
};

// ==========================================
// CREATE PRODUCT
// ==========================================

const createProduct = (
  filename: string,
  folder: string,
  category: ProductConfig["category"]
) => {
  const name = formatName(filename);

  let finalCategory = category;

  // Special classification for pizza folder
  if (folder === "pizzas") {
    finalCategory = getCategoryForPizza(filename);
  }

  const image = `/uploads/${folder}/${filename}`;

  return {
    name,

    description:
      finalCategory === "Dessert"
        ? `Delicious ${name.toLowerCase()} for a sweet finish.`
        : finalCategory === "Beverages"
        ? `Refreshing ${name.toLowerCase()} to enjoy with your meal.`
        : finalCategory === "Sides"
        ? `Crispy and delicious ${name.toLowerCase()} served fresh.`
        : finalCategory === "Combos"
        ? `Perfect ${name.toLowerCase()} combo for a delicious meal.`
        : `Freshly prepared ${name.toLowerCase()} loaded with delicious ingredients.`,

    category: finalCategory,

    image,

    rating: getRandomRating(),

    totalReviews: getRandomReviews(),

    // Make many products available in Popular section
    isFeatured: Math.random() > 0.35,

    isAvailable: true,

    ingredients: [name],

    sizes: getPizzaSizes(finalCategory),
  };
};

// ==========================================
// SEED DATABASE
// ==========================================

const importData = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("MongoDB connected.");

    // Remove old products
    await Pizza.deleteMany({});

    console.log("Old pizza data removed.");

    const products: any[] = [];

    // ========================================
    // READ EVERY UPLOAD FOLDER
    // ========================================

    for (const config of folders) {
      const folderPath = path.join(
        UPLOADS_DIR,
        config.folder
      );

      if (!fs.existsSync(folderPath)) {
        console.log(
          `Folder not found: ${folderPath}`
        );

        continue;
      }

      const files = fs
        .readdirSync(folderPath)
        .filter((file) =>
          /\.(jpg|jpeg|png|webp)$/i.test(file)
        );

      console.log(
        `${config.folder}: ${files.length} images`
      );

      for (const file of files) {
        products.push(
          createProduct(
            file,
            config.folder,
            config.category
          )
        );
      }
    }

    // ========================================
    // INSERT ALL PRODUCTS
    // ========================================

    if (products.length === 0) {
      console.log("No images found.");
      process.exit(1);
    }

    await Pizza.insertMany(products);

    console.log("");
    console.log("=================================");
    console.log("PIZZA DATA SEEDED SUCCESSFULLY");
    console.log("=================================");
    console.log(`Total products: ${products.length}`);

    // Category summary
    const summary: Record<string, number> = {};

    for (const product of products) {
      summary[product.category] =
        (summary[product.category] || 0) + 1;
    }

    console.log("");
    console.log("Category Summary:");

    Object.entries(summary).forEach(
      ([category, count]) => {
        console.log(
          `${category}: ${count}`
        );
      }
    );

    console.log("");
    console.log("Done!");

    process.exit(0);
  } catch (error) {
    console.error("SEED ERROR:");
    console.error(error);

    process.exit(1);
  }
};

importData();
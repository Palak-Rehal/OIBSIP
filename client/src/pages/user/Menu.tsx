import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../Menu/SearchBar";
import CategoryTabs from "../Menu/CategoryTabs";
import FilterSidebar from "../Menu/FilterSidebar";
import SortDropdown from "../Menu/SortDropdown";
import PizzaGrid from "../Menu/PizzaGrid";
import { getAllPizzas } from "../../api/pizzaApi";


interface Pizza {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  totalReviews: number;
  isFeatured: boolean;
  isAvailable: boolean;
  ingredients: string[];
  sizes: {
    size: string;
    price: number;
  }[];
}

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "All";
  const urlSort = searchParams.get("sort") || "latest";

  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory);
  const [sort, setSort] = useState(urlSort);

  const [maxPrice, setMaxPrice] = useState(1000);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const response = await getAllPizzas(
          search,
          category === "All" ? "" : category,
          sort,
          undefined,
          maxPrice < 1000 ? maxPrice : undefined,
          featured
        );

        setPizzas(response.data.pizzas || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [
    search,
    category,
    sort,
    maxPrice,
    featured,
  ]);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#2E2B27]">
            Pizza Menu
          </h1>

          <p className="mt-2 text-gray-500">
            Fresh handmade pizzas prepared just for you.
          </p>
        </div>

        {/* Search */}
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);

            setSearchParams({
              search: value,
              category,
              sort,
            });
          }}
        />
        {/* Categories */}
        <div className="mt-6">
          <CategoryTabs
            activeCategory={category}
            onCategoryChange={(value) => {
              setCategory(value);

              setSearchParams({
                search,
                category: value,
                sort,
              });
            }}
          />
        </div>

        {/* Content */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-72">
            <FilterSidebar
              maxPrice={maxPrice}
              featured={featured}
              onPriceChange={setMaxPrice}
              onFeaturedChange={setFeatured}
            />
          </aside>

          {/* Main */}
          <main className="flex-1">

            <div className="flex justify-end mb-6">
              <SortDropdown
                value={sort}
                onChange={(value) => {
                  setSort(value);

                  setSearchParams({
                    search,
                    category,
                    sort: value,
                  });
                }}
              />
            </div>

            <PizzaGrid
              pizzas={pizzas}
              loading={loading}
            />

          </main>

        </div>

      </div>
    </div>
  );
};

export default Menu;
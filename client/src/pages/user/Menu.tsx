import SearchBar from "./SearchBar";
import CategoryTabs from "./CategoryTabs";
import FilterSidebar from "./FilterSidebar";
import SortDropdown from "./SortDropdown";
import PizzaGrid from "./PizzaGrid";

const Menu = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#2E2B27]">
            Pizza Menu
          </h1>

          <p className="text-gray-500 mt-2">
            Fresh handmade pizzas prepared just for you.
          </p>
        </div>

        <SearchBar />

        <div className="mt-6">
          <CategoryTabs />
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-8">

          <aside className="lg:w-72">
            <FilterSidebar />
          </aside>

          <main className="flex-1">

            <div className="flex justify-end mb-5">
              <SortDropdown />
            </div>

            <PizzaGrid />

          </main>

        </div>

      </div>
    </div>
  );
};

export default Menu;
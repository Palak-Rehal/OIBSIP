import Hero from "../../components/home/Hero";
import CategoryFilter from "../../components/home/CategoryFilter";
import PopularPizzas from "../../components/home/PopularPizzas";

import Offers from "../../components/home/Offers";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import HowItWorks from "../../components/home/HowItWorks";
import Testimonials from "../../components/home/Testimonials";
import DownloadApp from "../../components/home/DownloadApp";
import Newsletter from "../../components/home/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />

      <CategoryFilter />

      <PopularPizzas />

      <Offers />

      <WhyChooseUs />

      <HowItWorks />

      <Testimonials />

      <DownloadApp />

      <Newsletter />

      <Offers />
    </>
  );
};

export default Home;
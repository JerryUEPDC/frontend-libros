import CarouselTextBanner from "@/components/ui/carousel-text-banner";
import ChooseCategory from "@/components/ui/choose-category";
import FeaturedProducts from "@/components/ui/featured-products";

export default function Home() {
  return (
    <main>
     <CarouselTextBanner></CarouselTextBanner>
     <FeaturedProducts></FeaturedProducts>
     <ChooseCategory></ChooseCategory>
    </main>
  );
}

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Featured from "@/components/Featured";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Featured />
      <Promo />
      <Footer />
    </main>
  );
};

export default Index;
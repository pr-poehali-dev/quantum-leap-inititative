import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Featured from "@/components/Featured";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";
import LeadModal from "@/components/LeadModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Header onCta={() => setModalOpen(true)} />
      <Hero onCta={() => setModalOpen(true)} />
      <Services onCta={() => setModalOpen(true)} />
      <Featured />
      <Promo />
      <Footer />
      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Index;
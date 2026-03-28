import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  onCta?: () => void;
}

export default function Hero({ onCta }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/images/mountain-landscape.jpg"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/40 z-[1]" />
      <div className="relative z-10 text-center text-white px-6">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 opacity-80">Строительство под ключ</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
          СТРОИМ.<br />СДАЁМ.<br />ГАРАНТИРУЕМ.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-10">
          Общестроительные работы любой сложности — от фундамента до финишной отделки. Сроки соблюдаем, качество гарантируем.
        </p>
        <button
          onClick={onCta}
          className="border border-white text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-neutral-900 transition-all duration-300 cursor-pointer"
        >
          Получить расчёт стоимости
        </button>
      </div>
    </div>
  );
}
interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 pt-10 pb-6 px-6 ${className ?? ""}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="text-white text-4xl md:text-6xl lg:text-7xl uppercase font-bold tracking-tight text-center leading-tight">
          СтройПодКлюч
        </div>
        <a
          href="#contact"
          className="border border-white text-white uppercase tracking-widest text-sm px-8 py-3 hover:bg-white hover:text-neutral-900 transition-all duration-300"
        >
          Связаться
        </a>
      </div>
    </header>
  );
}
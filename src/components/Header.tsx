interface HeaderProps {
  className?: string;
  onCta?: () => void;
}

export default function Header({ className, onCta }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 px-6 py-5 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-base uppercase font-bold tracking-widest">
          СтройПодКлюч
        </div>
        <button
          onClick={onCta}
          className="border border-white text-white uppercase tracking-widest text-xs px-5 py-2 hover:bg-white hover:text-neutral-900 transition-all duration-300 cursor-pointer"
        >
          Связаться
        </button>
      </div>
    </header>
  );
}
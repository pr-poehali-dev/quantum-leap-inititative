interface HeaderProps {
  className?: string;
  onCta?: () => void;
}

export default function Header({ className, onCta }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 px-6 py-5 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <img
          src="https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/bucket/8d758af0-7c1b-4a65-98f3-dcc88b1f6a8f.jpg"
          alt="СтройПодКлюч"
          className="h-12 w-auto"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
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
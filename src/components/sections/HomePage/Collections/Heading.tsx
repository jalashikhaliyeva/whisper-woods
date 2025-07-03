export const Heading: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between py-14">
      <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300">
        Summer Deals
        <span className="absolute bottom-0 left-0 w-0 h-0.5 text-brand bg-current transition-all duration-300 group-hover:w-full"></span>
      </p>
      <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300">
        Italian Summer
        <span className="absolute bottom-0 text-brand  left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
      </p>
      <span className="font-[family-name:var(--font-cormorant-garamond)] text-6xl">
        The Collections
      </span>
      <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300">
        Winter Deals
        <span className="absolute bottom-0 text-brand  left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
      </p>
      <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300">
        New Deals
        <span className="absolute bottom-0  text-brand left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
      </p>
    </div>
  );
};

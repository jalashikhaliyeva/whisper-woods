export const Heading: React.FC = () => {
  return (
    <div className="py-14">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-row items-center justify-between">
        <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300">
          Summer Deals
          <span className="absolute bottom-0 left-0 w-0 h-0.5 text-brand bg-current transition-all duration-300 group-hover:w-full"></span>
        </p>
        <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300">
          Italian Summer
          <span className="absolute bottom-0 text-brand left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
        </p>
        <span className="font-[family-name:var(--font-cormorant-garamond)] text-6xl">
          The Collections
        </span>
        <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300">
          Winter Deals
          <span className="absolute bottom-0 text-brand left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
        </p>
        <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300">
          New Deals
          <span className="absolute bottom-0 text-brand left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
        </p>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center">
        {/* Main title centered */}
        <span className="font-[family-name:var(--font-cormorant-garamond)] text-4xl sm:text-5xl text-center mb-6">
          The Collections
        </span>
        
        {/* Scrollable menu items */}
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-6 px-4 min-w-max">
            <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300 whitespace-nowrap">
              Summer Deals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 text-brand bg-current transition-all duration-300 group-hover:w-full"></span>
            </p>
            <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300 whitespace-nowrap">
              Italian Summer
              <span className="absolute bottom-0 text-brand left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </p>
            <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300 whitespace-nowrap">
              Winter Deals
              <span className="absolute bottom-0 text-brand left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </p>
            <p className="font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300 whitespace-nowrap">
              New Deals
              <span className="absolute bottom-0 text-brand left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
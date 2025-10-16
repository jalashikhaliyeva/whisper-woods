// components/layout/StandardLayout.tsx
import { Header } from "@/components/layout/Header";
import { StandardLayoutProps } from "@/types";
// import { Footer } from "@/components/layout/Footer";


export const StandardLayout = ({ 
  children, 
  className = "bg-white",
  containerClassName = "container mx-auto px-4 py-16"
}: StandardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${className}`}>
        <div className={containerClassName}>
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};
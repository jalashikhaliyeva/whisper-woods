import Container from "@/components/layout/Container";
import Image from "next/image";
import React from "react";

export const Banner: React.FC = () => {
  return (
    <div className="bg-brandExtraLight py-14 my-14">
      <Container>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-4">
            <p className="text-brand font-[family-name:var(--font-cormorant-garamond)] text-6xl">
              We're Villa{" "}
              <span className="text-branddark italic">Matchmakers</span>
            </p>

            <div>
              <p className="text-neutral-500 font-[family-name:var(--font-montserrat)] mb-6">
                Let us find your perfect villa
              </p>
              <button className="bg-brand  cursor-pointer text-white px-8 py-3  font-[family-name:var(--font-montserrat)] text-sm tracking-wide hover:bg-branddark transition-colors duration-200">
                BOOK A CALL
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/images/illustrations/oyster.png"
              alt="Banner"
              width={500}
              height={500}
              className="w-[400px] h-[300px] object-contain"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

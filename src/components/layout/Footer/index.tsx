import React from "react";
import Container from "../Container";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 font-[family-name:var(--font-montserrat)]">
      <Container>
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="pb-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      
            <div className="lg:col-span-1">
              <h3 className="text-lg flex gap-2 items-center font-normal text-gray-900 mb-6">
                Join{" "}
                <div className="flex items-center">
                  <span className="font-normal text-2xl mr-1 font-[family-name:var(--font-cormorant-garamond)] text-blackp">
                    Maison
                  </span>
                  <span className="font-normal text-2xl text-neutral-700 font-[family-name:var(--font-cormorant-garamond)]">
                    Lumière
                  </span>
                </div>{" "}
                Family!
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Subscribe to our newsletter to discover our travel
                  inspirations. We have guides, our selection of the
                  world&apos;s most beautiful homes and exclusive benefits.
                </p>
              </div>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="text-lg font-normal text-gray-900 mb-6">
                Destinations
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Saint-Tropez
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Ibiza
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Courchevel
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Alps
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Italy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cap Ferret
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-normal text-gray-900 mb-6">
                Services
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Rent with us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Our magazine
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    La conciergerie
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Corporate & Private Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Travel partners
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Buy a house
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-normal text-gray-900 mb-6">
                Contact us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-600">Call +994 55 555 55 55</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600">Send a message</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600">Schedule a call</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-600">FAQ</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z"
                    />
                  </svg>
                  <span className="text-gray-600">Careers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 pt-8 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-500 mb-4 lg:mb-0">
              <span>2025 All right reserved</span>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Privacy policy
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Manage cookies
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Terms of use
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                T&C&apos;s
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Sitemap
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-3 text-neutral-600">
                <Facebook />
                <Linkedin />
                <Instagram />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

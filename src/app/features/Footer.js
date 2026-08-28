"use client";

import EmailLogo from "../Icons/EmailLogo";
import PhoneLogo from "../Icons/PhoneLogo";
import VectorLogoWhite from "../Icons/VectorLogoWhite";

export const Footer = () => {
return ( <footer className="w-full bg-[#4435d4] px-5 py-7 font-sans text-white sm:px-8 md:px-12 lg:px-[8%]"> <div className="mx-auto flex w-full max-w-360 flex-col gap-7 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
{/* LEFT */} <div className="min-w-0"> <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium"> <VectorLogoWhite /> <span>Movie Z</span> </div>

      <div className="text-[8px] leading-4 text-white/90">
        © 2024 Movie Z. All Rights Reserved.
      </div>
    </div>

    {/* CENTER */}
    <div className="min-w-0">
      <div className="mb-2 text-[9px] font-medium">
        Contact Information
      </div>

      <div className="text-[8px] leading-[1.8]">
        <div className="my-2 flex items-center gap-1.5 whitespace-nowrap">
          <EmailLogo />
          <span>support@moviez.com</span>
        </div>

        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <PhoneLogo />
          <span>+976 1234-5678</span>
        </div>
      </div>
    </div>

    {/* RIGHT */}
    <div className="min-w-0">
      <div className="mb-2 text-[9px] font-medium">
        Follow us
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-2 text-[8px] sm:gap-x-2">
        <span className="cursor-pointer hover:underline">Facebook</span>
        <span className="cursor-pointer hover:underline">Instagram</span>
        <span className="cursor-pointer hover:underline">Twitter</span>
        <span className="cursor-pointer hover:underline">Youtube</span>
      </div>
    </div>
  </div>
</footer>
);
};

export default Footer;

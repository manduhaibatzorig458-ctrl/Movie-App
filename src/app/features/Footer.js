
import EmailLogo from "../Icons/EmailLogo"
import PhoneLogo from "../Icons/PhoneLogo"
import VectorLogoWhite from "../Icons/VectorLogoWhite"

export const Footer = () => {
  return (
    <footer className="w-full bg-[#4435d4] px-[8%] py-7 min-h-35 flex justify-between items-start text-white font-sans">
      
      {/* Left */}
      <div>
        <div className="text-[11px] mb-2 flex gap-1.5">
          <VectorLogoWhite/> Movie Z
        </div>

        <div className="text-[8px]">
          © 2024 Movie Z. All Rights Reserved.
        </div>
      </div>

      {/* Center */}
      <div>
        <div className="text-[9px] mb-2">
          Contact Information
        </div>

        <div className="text-[8px] leading-[1.8]">
        
         <div className="flex gap-1.5 my-2">
          <EmailLogo/> support@moviez.com
         </div>
          
       <div className="flex gap-1.5">
        <PhoneLogo/> +976 1234-5678
       </div>
          
        </div>
      </div>

      {/* Right */}
      <div>
        <div className="text-[9px] mb-2">
          Follow us
        </div>

        <div className="flex gap-2 text-[8px]">
          <span>Facebook</span>
          <span>Instagram</span>
          <span>Twitter</span>
          <span>Youtube</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
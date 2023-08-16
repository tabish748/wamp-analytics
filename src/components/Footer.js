import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <footer className="w-full h-auto bg-white p-4 py-20 border-b">
        <div className="container">
          <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-12 gap-8">
          <div className="col-span-2 sm:col-span-4 p-2">
                <Image
                  src="/images/logo.png"
                  className="h-[70px] w-auto"
                  height={500}
                  width={500}
                  alt="Description of the image"
                />
                <p className="mt-4 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetu. Tempus volutpat tempus
                  faucibus pharetra sem vel. Nulla sed mauris convallis
                  metus.Lorem ipsum dolor sit amet consectetu
                </p>
              </div>
              <div className="col-span-2 sm:col-span-2 p-4">
                <h3 className="font-bold text-2xl mt-4">Pages</h3>
                <ul className="footer-list">
                  <li>Home</li>
                  <li>Portfolio</li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-3 p-4">
                <h3 className="font-bold text-2xl mt-4">Services</h3>
                <ul className="footer-list">
                  <li>IT staff augmentation services</li>
                  <li>Software development</li>
                  <li>Designing & branding</li>
                  <li>Search engine optimisation</li>
                  <li>Hire overseas team</li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-3 p-4">
                <h3 className="font-bold text-2xl mt-4">Company</h3>
                <ul className="footer-list">
                  <li>Team</li>
                  <li>Career</li>
                  <li>About</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-full py-10 px-2">
        <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-8">
  <div className="col-span-12 md:col-span-6">
    <p>@2023 QuiadTechnologies. All right reserved.</p>
  </div>
  <div className="col-span-12 md:col-span-6">
        <div className="flex justify-end space-x-4">
  <div className="flex items-center justify-center w-12 h-12 rounded-full border">
  <FaFacebookF/>

  </div>
  <div className="flex items-center justify-center w-12 h-12 rounded-full border">
    <FaTwitter />
  </div>
  <div className="flex items-center justify-center w-12 h-12 rounded-full border">
    <FaYoutube />
  </div>
  <div className="flex items-center justify-center w-12 h-12 rounded-full border">
    <FaInstagram />
  </div>
  <div className="flex items-center justify-center w-12 h-12 rounded-full border">
    <FaLinkedinIn />
  </div>
</div>

        </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Footer;

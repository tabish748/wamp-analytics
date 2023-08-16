import React from "react";
import Button from "./Button"; // ensure this import path is correct

const ContactUsForm = () => {
  return (
    <div className="w-full p-8 px-6 mt-8 bg-white max-w-[1200px] m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <div className="w-full">
          <h2 className="section-heading text-4xl font-bold">Let’s talk to our experts</h2>
          <p className="mt-6">We are proud of contributing to the success of the world's leading brands.</p>

          <div className="grid gap-6">
            <div className="mt-10">
              <b className="block">Contact Us</b>
              <span>+92 51 8448182</span> | <span>+92-51-5411474</span> 
            </div>

            <div>
              <b className="block">Email</b>
              <span> irfantabish719@gmail.com</span> 
            </div>

            <div>
              <b className="block">Whatsapp at</b>
              <span>+923225135120</span> 
            </div>

            <div>
              <b className="block">Viber</b>
              <span>+923225135120</span> 
            </div>

            <div>
              <b className="block">Address</b>
              <span>House# 72, Khursheed Alam Road, Westridge I, Opposite McDonald's, 46000, Rawalpindi</span> 
            </div>
          </div>
        </div>
        <div className="w-full">
          <input type="text" placeholder="Name" className="mb-6 bg-light-gray-color  h-fit text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
          <input type="text" placeholder="Email" className="mb-6 bg-light-gray-color  h-fit text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
          <input type="text" placeholder="Phone" className="mb-6 bg-light-gray-color  h-fit text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
          <textarea name="" id="" cols="30" rows="10" className="mb-6 bg-light-gray-color  h-fit text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"></textarea>
          <Button variant="primary" classes="w-full">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;

import React from 'react'
export function Footer() {
const logo = "https://cdn.builder.io/api/v1/image/assets/TEMP/fc57725c-8ab0-43ad-a8c1-24eb43956f47?apiKey=0e2d2b3fdaa848b2ac6dc9f62f11a5f8"
  return (
    <section className="relative overflow-hidden py-10 bg-quaternary text-white font-playfair">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-2 inline-flex items-center">
               <img src={logo} className='h-[9vh]' alt="" />
               
              </div>
              <div>
                <p className="mb-4  text-base font-medium">Discover The Epitome of High Fashion</p>
                <p className="text-sm text-gray-900">
                  &copy; Copyright 2024. All Rights Reserved by Fashion.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-900">
                Website
              </h3>
              <ul>
                <li className="mb-4">
                  <a className=" text-base font-medium text-white hover:text-gray-700" href="#">
                    Home
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-white hover:text-gray-700" href="#">
                    For Tenants
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-white hover:text-gray-700" href="#">
                    For Owners
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-900">
                Contact Us
              </h3>
              <ul>
                <li className="mb-4">
                  <a className=" text-base font-medium text-white hover:text-gray-700" href="#">
                    63786450
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-white hover:text-gray-700" href="#">
                    jadoo@gmail.com
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-white hover:text-gray-700" href="#">
                    www.jadoo.com
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-900">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <a className=" text-base font-medium text-white hover:text-gray-700" href="#">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="mb-4">
                  <a className=" text-base font-medium text-white hover:text-gray-700" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className=" text-base font-medium text-white hover:text-gray-700" href="#">
                    Licensing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import {Button} from "@heroui/react";

function Hiro() {
  return (
     <>
        <section className='flex justify-between items-center  flex-col-reverse md:flex-row py-24'>
            <div>
                <div className='lg:pl-28 text-center lg:text-start px-5 mb-20'>
                    <h1 className='text-3xl lg:text-5xl max-w-xl font-bold '>Spend your Cardano anywhere, anytime.</h1>
                    <p className='text-md text-gray-300 lg:max-w-sm  py-8 '>Our user-friendly platform enables businesses and individuals to seamlessly convert and spend their crypto for everyday purchases.</p>
                    <Button radius="full" className='bg-[#772AB3] text-white'>Get Started <i class="fa-solid fa-arrow-right"></i></Button>
                </div>
            </div>

            <div className='pl-5 pb-10'>
               <img className='' src="/Images/Hiro.svg" alt="" />
            </div>
        </section>
     </>
  )
}

export default Hiro;
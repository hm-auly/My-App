import React from 'react'
import {Button} from "@heroui/react";

function DebitCard() {
  return (
    <>
        <section className='flex md:px-24 px-5 py-24 items-center  flex-col-reverse md:flex-row'>
            <div className='w-full md:w-1/2 text-center md:text-start md:mb-8 '>
                <h1 className='text-3xl lg:text-4xl font-bold max-w-lg'>Wern Debit Card</h1>
                <p className='text-md py-5 max-w-md'>More than just a card, it's a bridge to a new financial experience. Embrace the simplicity and security of spending your Cardano with the Wern Card.</p>
                <div className=''>
                     <Button radius="full" className='bg-[#772AB3] text-white'>Create New Card <i class="fa-solid fa-arrow-right"></i></Button>
                     <p className='text-sm md:pl-5  text-primary'>Will be available soon</p>
                </div>

            </div>

            <div className='md:w-1/2 mb-10 '>
                <img className='text-center w-[90%] md:w-full' src="/Images/debit-card.svg" alt="" />
            </div>
        </section>
    </>
  )
}

export default DebitCard;
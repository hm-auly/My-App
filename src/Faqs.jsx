import React from 'react'
//import {Accordion, AccordionItem} from "@heroui/react";

function Faqs() {
    const accoinfo = [
        {
            q: "What credit score do I need to apply for a credit card?",
            a: "The required credit score may vary depending on the specific credit card. Generally, a good to excellent credit score (typically 670 or above) increases your chances of approval for premium credit cards."
        },
        {
            q: "How can I apply for a credit card online?",
            a: "The required credit score may vary depending on the specific credit card. Generally, a good to excellent credit score (typically 670 or above) increases your chances of approval for premium credit cards."
        },
        {
            q: "Are there any annual fees associated with the credit card?",
            a: "The required credit score may vary depending on the specific credit card. Generally, a good to excellent credit score (typically 670 or above) increases your chances of approval for premium credit cards."
        },
        {
            q: "AHow long does it take to receive the credit card once approved?",
            a: "The required credit score may vary depending on the specific credit card. Generally, a good to excellent credit score (typically 670 or above) increases your chances of approval for premium credit cards."
        },
        {
            q: " How can I check my credit card balance and transactions?",
            a: "The required credit score may vary depending on the specific credit card. Generally, a good to excellent credit score (typically 670 or above) increases your chances of approval for premium credit cards."
        },
        {
            q: "What should I do if my credit card is lost or stolen?",
            a: "The required credit score may vary depending on the specific credit card. Generally, a good to excellent credit score (typically 670 or above) increases your chances of approval for premium credit cards."
        },
        {
            q: "Is my credit card information secure?",
            a: "The required credit score may vary depending on the specific credit card. Generally, a good to excellent credit score (typically 670 or above) increases your chances of approval for premium credit cards."
        },
    ]
  return (
     <>
        <section className='md:px-24 px-5 py-20'>
             <h1 className='text-3xl lg:text-4xl text-center mb-10 '>FAQs</h1>
            <div className='md:px-20'>
                
                {accoinfo.map(({a, q}, i) => (
                    <div key={i} aria-label={q} title={q} className='bg-[#27322F3D] backdrop-blur-sm my-2'>
                        <p className='text-sm text-secondary '>{a}</p>
                    </div>))}
               
            </div>
        </section>
     </>
  )
}

export default Faqs
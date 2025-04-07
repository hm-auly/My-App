import React from 'react'

function Hiro() {
    return (
        <>
            <section className='flex justify-between items-center  flex-col-reverse md:flex-row py-24'>
                <div>
                    <div className='lg:pl-28 text-start px-5 mb-20 flex flex-col gap-3' >
                        <h2 class=" text-3xl md:text-4xl lg:text-5xl  font-bold">Hi, I'm <span class="text-blue-400">Auly ullah</span></h2>
                        <p class=" text-lg md:text-2xl lg:text-3xl font-[500] mt-2 max-w-xl">A Frontend Web Developer specializing in React & JavaScript.</p>

                        <p className="text-gray-400 max-w-md mb-6 ">
                            I create modern, responsive and user-friendly web applications using React.js, Next.js, Tailwind CSS, Bootstrap, Material Ui, Hiro Ui, More... Passionate about clean code and great user experiences.
                        </p>

                        <div className='flex gap-4 justify-center md:justify-start pb-4 '>
                            <a href="https://www.facebook.com/m.aul.ulla.2024">
                                <button className='icons'><i class="fa-brands fa-facebook-f text-2xl text-cyan-500"></i></button>
                            </a>
                            <a href="https://www.instagram.com/auly_ullah?igsh=MTFocm13ZHBlOWQ4ag==">
                                <button className='icons'><i class="fa-brands fa-instagram text-2xl text-cyan-500"></i></button>
                            </a>
                            <a href="https://www.youtube.com/@CodedByAuly">
                                <button className='icons'><i class="fa-brands fa-youtube text-2xl text-cyan-500"></i></button>
                            </a>
                            <a href="https://www.linkedin.com/in/auly-ullah-244604352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                                <button className='icons'><i class="fa-brands fa-linkedin-in text-2xl text-cyan-500"></i></button>
                            </a>
                            <button className='icons'><i class="fa-brands fa-whatsapp text-3xl  text-cyan-500"></i></button>


                        </div>
                        <div className=''>
                            <button className='bg-cyan-500 text-xl md:text-2xl px-5 py-2.5 rounded-full text-black font-[600] hover:shadow-lg hover:shadow-cyan-500 hover:bg-black hover:text-white duration-300 block'>Read More</button>
                        </div>

                    </div>
                </div>

                <div className='pl-5 pb-10 md:pr-40 px-5 '>
                    {/* <img className='' src="/Images/Hiro.svg" alt="" /> */}

                    <div className={`bg-[url("/myp2.jpg")]  w-80 md:w-96 h-96 rounded-2xl bg-no-repeat bg-center bg-cover relative filter blur-[2.5px] hover:blur-0`} >

                    </div>

                </div>
            </section>
        </>
    )
}

export default Hiro;
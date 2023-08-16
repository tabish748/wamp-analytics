import React from 'react'
import Button from './Button'
const CallToAction = () => 
{
    
  return (
    <>
        <div className="w-full bg-light-primary-color px-4 py-10 sm:p-16">
            <div className="w-full max-w-[1000px] m-auto">
                <h2 className='text-xl sm:text-4xl font-bold text-center '>
                Are you ready to grow your business with us?
                </h2>
                <p className='mt-4 sm:mt-8 text-center'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.</p>
                <Button variant="primary" classes="mt-4 sm:mt-8 block m-auto">Contact Us</Button>
            </div>
        </div>
    </>
    
  )
}

export default CallToAction

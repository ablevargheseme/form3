import React from 'react'

export default function Footer() {
  return (
    <div className='bg-[#0D0D0D] flex flex-col justify-center'>
        <div className='font-Outfit font-bold text-3xl flex justify-center my-8'>BlockIot</div>
        <div className='flex justify-center font-normal text-sm text-[#D0DAF5] space-x-12'>
            <div>Home</div>
            <div>About Us</div>
            <div>Contact</div>
        </div>
        {/* <div className='flex justify-center mt-6 space-x-6'>
            <img src={'/fb-logo.png'}/>
            <img src={'/twitter.png'}/>
            <img src={'/you-tube.png'}/>
        </div> */}
        <div className='flex justify-center text-[#D0DAF5] font-normal text-xs my-6'>© Copyright 2023 <a href='https://www.trizwit.com/' className='mx-1 underline-offset-3'>Trizwit</a> . All Rights Reserved</div>
    </div>
  )
}

import React from 'react'

function Card() {
  return (
    <div className='card-bg p-[22px] text-white rounded-lg border bg-transparent w-[439px] h-[537px]'>
        <div className='h-[406px]'>
            <img src='/img/missy.png' alt='missy' />
        </div>
        <div className='mt-[16px]'>
            <h2 className='font-bold text-[24px]'>Missy Turco</h2>
            <p className='mt-[8px] text-[18px]'>Product Designer, Postman</p>
        </div>
    </div>
  )
}

export default Card
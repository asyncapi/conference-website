import React from 'react'
import ILink from '../illustration/link'
const PastEditonCard = ({ url }) => {
    let year = url.split('.')[1]
    return (
        <div className='bg-white bg-opacity-10 backdrop-blur-lg bg-clip-padding shadow-lg p-4 w-full mx-auto border-[1.66px] border-[#FFFFFF66] rounded-xl '>
            <div className='flex items-center flex-wrap justify-between'>
                <h1 className='text-2xl text-white font-semibold'>{year}</h1>
                <div>
                    <a href={url} rel='noreferrer' target='_blank' className='flex hover:scale-95 transiti items-center justify-center'>
                       <p className='mr-2 text-white text-sm'>View Website</p> 
                       <ILink className='w-5 ' fill='white' />
                    </a>
                </div>
            </div>


            <iframe src={url} height={250} width={'100%'} scrolling='no' className='pointer-events-none overflow-hidden rounded-lg my-4' />

        </div>
    )
}

export default PastEditonCard

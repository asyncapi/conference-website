import React from 'react'
const PastEditonCard = ({ url }) => {
    let year = url.split('.')[1]
    return (
        <div className='bg-white bg-opacity-10 backdrop-blur-lg bg-clip-padding shadow-lg p-4 w-full mx-auto border-[1.66px] border-[#FFFFFF66] rounded-xl '>
            <div className='flex items-center flex-wrap justify-between'>
                <h1 className='text-2xl text-white font-semibold'>{year}</h1>
                <div>
                    <a href={url} rel='noreferrer' target='_blank' className='flex hover:scale-95 transiti items-center justify-center'>
                       <p className='mr-2 text-white text-sm'>View Website</p> 
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                    </a>
                </div>
            </div>


            <iframe src={url} height={250} width={'100%'} scrolling='no' className='pointer-events-none overflow-hidden rounded-lg my-4' />

        </div>
    )
}

export default PastEditonCard

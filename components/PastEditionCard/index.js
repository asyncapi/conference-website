import React from 'react'
import {ExternalLink} from 'lucide-react'
const PastEditonCard = ({ url }) => {
    let year = url.split('.')[1]
    return (
        <div className='p-4 w-1/3 sm:w-11/12 border-2 border-b-[5px] border-b-white border-violet-800 rounded-xl bg-violet-900'>
            <div className='flex items-center flex-wrap justify-between'>
                <div>
                    <p className='font-semibold tracking-widest opacity-50 text-xl text-white'>{year}</p>
                    <h1 className='text-2xl text-white font-semibold'>AACoT&apos;{String(year).substring(2)}</h1>
                </div>
                <div>
                    <a href={url} rel='noreferrer' target='_blank' className='flex items-center justify-center'>
                       <p className='mr-2 text-white'>View Website</p> 
                       <ExternalLink color='white' size={19} />
                    </a>
                </div>
            </div>


            <iframe src={url} height={250} width={'100%'} scrolling='no' className='pointer-events-none overflow-hidden rounded-lg my-4' />

        </div>
    )
}

export default PastEditonCard
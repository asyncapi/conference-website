import React from 'react'
import PastEditonCard from '../../components/PastEditionCard'
import pastEditionsArchiveLinks from '../../config/editions.json'
const PastEditions = () => {
    return (
        <div >
            <title>Past Editions | AACoT</title>
            <div className='my-[70px]'>
                <p className='text-center text-white tracking-[13px]'>HERE COMES THE</p>
                <h1 className='text-8xl sm:text-6xl sm:w-full text-white my-4 text-center w-1/2 mx-auto font-bold'>
                    Past Editions of AsyncAPI Conf
                </h1>
            </div>

            <div className='my-10 flex gap-10 items-center justify-around flex-wrap'>
                {
                    pastEditionsArchiveLinks.map((item, index) => {
                        return <PastEditonCard key={index} url={item} />
                    })
                }
            </div>
        </div>
    )
}

export default PastEditions

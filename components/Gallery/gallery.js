/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Heading from '../Typography/heading';
import Button from '../Buttons/button';
import Link from 'next/link';

function Gallery() {
    return (
        <div className='p-24 container flex items-center justify-center w-full'>
            <div className='flex flex-col items-center justify-center lg:w-full'>
                <div className='text-center'>
                    <div className='flex items-center justify-center'>
                        <div className='w-[40px] h-[3px] bg-blue-400' />
                        <div className='ml-4 text-lg sm:text-sm text-white font-semibold'> 
                            Our Events Gallery
                        </div>
                    </div>
                    <Heading typeStyle='heading-md' className='text-gradient lg:mt-10'>
                        AACoT'24 Gallery
                    </Heading>
                    <div className='flex flex-wrap gap-4 lg:gap-8 justify-center m-4'>
                        <div
                            style={{ '--image-url': `url('/img/gallery/1.png')` }}
                            className='lg:mt-16 bg-[image:var(--image-url)] bg-center bg-cover w-[470px] h-[550px] sm:w-full sm:h-[500px] rounded-[30px]'
                        />
                        <div className='flex flex-col gap-4 sm:w-full'>
                            <div
                                style={{ '--image-url': `url('/img/gallery/3.png')` }}
                                className='lg:mt-16 bg-[image:var(--image-url)] bg-center bg-cover w-[470px] h-[267px] sm:w-full sm:h-[500px] rounded-[30px]'
                            />
                            <div
                                style={{ '--image-url': `url('/img/gallery/2.png')` }}
                                className='lg:mt-16 bg-[image:var(--image-url)] bg-center bg-cover w-[470px] h-[267px] sm:w-full sm:h-[500px] rounded-[30px]'
                            />
                        </div>
                        
                    </div>

                    <div className='mt-10 flex flex-col items-center gap-4'>
                        <Link href=''>
                            <Button className='w-[200px]'>Browse All</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;

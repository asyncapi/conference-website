import Heading from '../Typography/heading';
import Button from '../Buttons/button';
import Image from 'next/image';

const imageUrls = [
	
    "/img/gallery/1.webp",
    "/img/gallery/2.webp",
    "/img/gallery/3.webp",

    "/img/gallery/4.webp",
    "/img/gallery/5.webp",
    "/img/gallery/6.webp",

    "/img/gallery/7.webp",
    "/img/gallery/8.webp",
    "/img/gallery/9.webp",

    "/img/gallery/10.webp",
    "/img/gallery/11.webp",
    "/img/gallery/12.webp",
    
];

export function Gallery(){
    return(
        <div className='flex flex-col items-center py-12' >
            <div>
                <div className='text-lg capitalize sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1'>gallery</div>
            </div>
            <Heading typeStyle='heading-md' className='capitalize text-gradient text-center lg:mt-10'>
                our event gallery
            </Heading>
            <div className="w-full overflow-x-auto columns-4 sm:columns-2 space-y-5 lg:w-full justify-center my-4 p-4">
                {imageUrls.map((url, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={index}
                        src={url}
                        fill
                        alt={`Gallery Image ${index + 1}`}
                        className="rounded-xl max-w-full h-auto"
                        placeholder='blur'
                    />
                ))}
            </div>
            <a href="https://drive.google.com/drive/folders/15QooKSy__jerOtLSkXzuKQh0hdlhZqo7?usp=drive_link" >
                <Button type='button'className='w-[200px] my-4 px-10'>
                    Browse
                </Button>
            </a>
        </div>
    )
}			

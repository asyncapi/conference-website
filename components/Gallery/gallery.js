import Heading from '../Typography/heading';
import Button from '../Buttons/button';
import Image from 'next/image';

const imageUrls = [
	
    "/img/gallery/IMG_20241204_131757.jpg",
    "/img/gallery/IMG_20240919_113846~2.jpg",
    "/img/gallery/image.png",

    "/img/gallery/IMG_20240918_110337.jpg",
    "/img/gallery/IMG-20241205-WA0007.jpg",
    "/img/gallery/1000149996.jpg",

    "/img/gallery/IMG_20240918_150048.jpg",
    "/img/gallery/IMG_20240918_155145_1726671294545.jpg",
    "/img/gallery/IMG_20241205_100012.jpg",

    "/img/gallery/IMG_20240918_112552.jpg",
    "/img/gallery/IMG_20240918_113924~2.jpg",
    "/img/gallery/IMG_20241205_155556.jpg",
    
  
];

export function Gallery(){
    return(
        <div className='flex flex-col items-center' >
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
                    />
                ))}
            </div>
            <Button type='button' onClick={()=>{console.log("click")}} className='w-[200px] mt-4 px-10'>
                Browse
            </Button>
        </div>
    )
}			

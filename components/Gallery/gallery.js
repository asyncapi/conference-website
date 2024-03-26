import LightGallery from 'lightgallery/react';
import Heading from '../Typography/heading'
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';


// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay'
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import Button from '../Buttons/button';

const images = [
    { src: "/img/1.jpeg", alt: "1" },
    { src: "/img/2.jpeg", alt: "2" },
    { src: "/img/3.jpeg", alt: "3" },
    { src: "/img/4.jpeg", alt: "4", },
    { src: "/img/5.jpeg", alt: "5", },
    { src: "/img/6.jpeg", alt: "6", },
   
]

function Gallery() {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div className="mt-20 mb-24">
            <Heading typeStyle='heading-md' className='text-gradient text-center lg:mt-10'>
					Our Past Event Gallery
			</Heading>
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
            >

                {images.map((image, index) => {
                    return (
                        <a href={image.src} key={index}>
                            <img alt={image.alt} src={image.src} 
                            className="max-w-full block p-5 border-2 border-transparent rounded-lg transition-transform hover:filter hover:opacity-90 hover:scale-101" />
                        </a>
                    )
                })}
            </LightGallery>
            <a className='flex justify-center items-center'>
            <Button overlay={true} className='w-[200px] border' >Browse all</Button>
            </a>
        </div>
    );
}

export default Gallery

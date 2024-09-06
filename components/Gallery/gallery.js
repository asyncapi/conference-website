import Link from "next/link"
import Button from "../Buttons/button"
import Heading from "../Typography/heading"
import Image from "next/image"
import event_image_1 from "../../public/img/about.jpeg"
import event_image_2 from "../../public/event_gallery/event_image_2.jpg"
import event_image_3 from "../../public/event_gallery/event_image_3.jpg"
import event_image_4 from "../../public/event_gallery/event_image_4.jpg"
import event_image_5 from "../../public/event_gallery/event_image_5.jpg"
import event_image_6 from "../../public/event_gallery/event_image_6.jpg"
import event_image_7 from "../../public/event_gallery/event_image_7.jpg"
import event_image_8 from "../../public/event_gallery/event_image_8.jpg"
import event_image_9 from "../../public/event_gallery/event_image_9.jpg"
function Gallery (){
  return (
     <section className="gallery-section text-white  flex flex-col items-center gap-y-10 pb-[181px]">
        <Heading typeStyle='heading-md' className='text-gradient text-center lg:mt-10'>
				Our Events Gallery
				</Heading>
                



                <div class="grid grid-cols-3  md:grid-cols-4 gap-4  w-[1130px] lg:w-full">
    <div class="grid gap-4 ">
        <div className="relative overflow-hidden rounded-lg" >
            <Image className="h-auto max-w-full rounded-lg object-cover hover:scale-110 transition-all " src={event_image_1} alt="" width={400} height={500} layout="responsive"/>
        </div>
        <div className="relative overflow-hidden rounded-lg">
            <Image className="h-auto max-w-full rounded-lg object-cover hover:scale-110 transition-all" src={event_image_2} alt=""  width={400} height={400} layout="responsive"/>
        </div>
        <div className="relative overflow-hidden rounded-lg" >
            <Image className="h-auto max-w-full rounded-lg object-cover hover:scale-110 transition-all" src={event_image_3} alt="" width={400} height={400} layout="responsive"/>
        </div>
    </div>
    <div class="grid gap-4 ">
        <div className="relative overflow-hidden rounded-lg" >
            <Image className="h-auto max-w-full rounded-lg object-cover hover:scale-110 transition-all" src={event_image_4} alt="" width={400} height={400} layout="responsive"/>
        </div>
        <div className="relative overflow-hidden rounded-lg" >
            <Image className="h-auto max-w-full rounded-lg object-cover hover:scale-110 transition-all" src={event_image_5} alt=""  width={400} height={600} layout="responsive"/>
        </div>
        <div className="relative overflow-hidden rounded-lg">
            <Image className="h-auto max-w-full rounded-lg object-cover hover:scale-110 transition-all" src={event_image_6} alt="" width={400} height={300} layout="responsive"/>
        </div>
    </div>
    <div class="grid gap-4 ">
        <div className="relative overflow-hidden rounded-lg" >
            <Image className="h-auto max-w-full rounded-lg object-cover hover:scale-110 transition-all" src={event_image_7} alt="" width={400} height={600} layout="responsive"/>
        </div>
        <div className="relative overflow-hidden rounded-lg">
            <Image className="h-auto max-w-full rounded-lg object-cover hover:scale-110 transition-all" src={event_image_8} alt=""  width={400} height={300} layout="responsive"/>
        </div>
        <div className="relative overflow-hidden rounded-lg">
            <Image className="h-auto max-w-full rounded-lg object-cover hover:scale-110 transition-all" src={event_image_9} alt="" width={400} height={400} layout="responsive"/>
        </div>
    </div>
    
</div>



                <div className='mt-[54px] relative flex items-center justify-center'>
					<Link
									href='https://drive.google.com/drive/folders/1nY7dZF8WFXZ3r2rCWJDDoT2C_GMfQJMV?usp=drive_link' target="_blank"
								>
									<Button className='w-[168px]'>Browse All</Button>
								</Link>
				</div>
     </section>

  )
}

export default Gallery
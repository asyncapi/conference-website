import React from 'react'
import Heading from '../../components/Typography/heading'
import Paragraph from '../../components/Typography/paragraph'
import Button from '../../components/Buttons/button'
import Announcement from '../../components/announcement'
import UpcomingMeetups from '../../components/MeetupsPage/cards'
import GuidelinesPage from '../../components/MeetupsPage/guidlines'
import ProposeMeetup from '../../components/MeetupsPage/propose_meetups'

const Meetups = () => {
    return (
        <div className="relative" >
            <div className="container flex items-center justify-center mt-32 mb-40">   
            <title>AsyncAPI Meetups</title>
            <div>                
            <div className=" text-center">   
              <div className="w-[300px] my-10  mx-auto">
                <Announcement />
                </div>
                <Heading
                     className="text-6xl sm:text-4xl leading-normal sm:leading-38px tracking-[-3px] sm:tracking-[-0.02em] font-extrabold text-gradient"
                     level="h1"
                     typeStyle="heading"
                 >
                    AsyncAPI Meetups
                </Heading>
            </div>
            <div className="w-[824px]  sm:w-full text-center">
                             <Paragraph className="mt-[16px]" textColor="text-gray-200">
                             Connect with the AsyncAPI community through local and virtual meetups. Learn, share knowledge, and collaborate with fellow AsyncAPI enthusiasts.
                             </Paragraph>
            </div>
                <div className="flex justify-center mt-[54px]">
                <div className='flex gap-4 sm:flex-col items-center' >
                <Button className='w-[240px]'>Explore Meetups</Button>
                <Button overlay={true} className='w-[240px] border  hover:bg-white hover:bg-opacity-10 transition'>
                    <div className='flex gap-2 justify-center items-center'>
                        <div>
                            Host a Meetup
                        </div>
                    </div>
                </Button>
                  </div>
                </div>
            </div>
            </div>
            
{/*  about meetups section */}
            <div className=' w-3/4 sm:w-10/12 my-10 mx-auto flex items-center justify-center '>
                {
                <div className='w-[1120px] lg:w-full flex lg:flex-col-reverse items-center justify-between'>
                        
				<div style={{'--image-url': `url('/img/about.jpeg')`}} className='lg:mt-16 bg-[image:var(--image-url)] bg-center bg-cover w-[450px] h-[550px] sm:w-[100%] sm:h-[500px] rounded-[30px]' >
			     </div>

            <div className='w-[600px] ml-10 lg:ml-0 lg:w-full lg:text-center'>
            <div className='flex items-center lg:justify-center'>
            <div className='text-lg sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1'>About Meetups</div>
            
            </div>
            <Heading typeStyle='heading-md' className='text-gradient lg:mt-10'>
                                Why Host a Meetup?
            </Heading>
            <Paragraph typeStyle='body-lg' className="mt-6 text-justify " textColor='text-gray-200' >
            Hosting an AsyncAPI meetup is a powerful way to strengthen the community while developing your own skills and network. As a host, you&apos;ll:
                                </Paragraph>
            <Paragraph className='mt-6 text-justify sm:text-justify lg:text-justify'>
            <ul className="space-y-4">
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-gray-200">•</div>
            <div>
              <span className="font-bold text-gray-200">Establish yourself as a community leader</span>
              <span className="text-gray-200"> - Position yourself and your
              organization as thought leaders in the event-driven architecture space
              by facilitating valuable discussions and knowledge exchange.</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-gray-400">•</div>
            <div>
              <span className="font-bold text-gray-200">Build meaningful connections</span>
              <span className="text-gray-200"> - Create networking opportunities that
              foster collaboration between developers, architects, and decision-
              makers working with AsyncAPI and event-driven systems.</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-gray-200">•</div>
            <div>
              <span className="font-bold text-gray-200">Accelerate the adoption of best practices</span>
              <span className="text-gray-200"> - Help spread practical
              knowledge about AsyncAPI implementation.</span>
            </div>
          </li>
        </ul>
        </Paragraph>
            </div>
            </div>
            }  
            </div>

            <UpcomingMeetups />
            {/* Guidlines and meetups section */}
        <div className="py-8">
             <div className="container mx-auto px-4">
               <Heading
                 className="text-4xl font-bold text-center text-gradient mb-4"
                 level="h2"
                 typeStyle="heading"
               >
                 Guidelines & Requirements
               </Heading>
               <Paragraph className="text-center max-w-2xl mx-auto" textColor="text-gray-200">
               To ensure high-quality meetups that benefit the entire community, we&apos;ve established the following guidelines.
               </Paragraph>             
          </div>
        </div>
            <GuidelinesPage/>
            {/* Propose a meetup section */}
            <div className="py-8">
             <div className="container mx-auto px-4">
               <Heading
                 className="text-4xl font-bold text-center text-gradient mb-4"
                 level="h2"
                 typeStyle="heading"
               >
                 Propose a Meetup
               </Heading>
               <Paragraph className="text-center max-w-2xl mx-auto" textColor="text-gray-200">
                Ready to host an AsyncAPI meetup? Raise a PR to submit your proposal. Our team 
               will review it and get back to you shortly.
               </Paragraph>             
          </div>
        </div>
            <ProposeMeetup/>
        </div>
    )
}
export default Meetups;

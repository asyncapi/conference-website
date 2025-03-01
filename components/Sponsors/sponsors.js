/* eslint-disable @next/next/no-img-element */
// import React from "react";
// import Heading from "../Typography/heading";
// import Paragraph from "../Typography/paragraph";
// import Image from "next/image";
// import Link from "next/link";
//
// function Sponsors({ eventSponsors, financialSponsor }) {
//   //eventSponsors,financialSponsor = [{image: 'url', websiteUrl: 'url' , className: 'string'}] //className for additional styling if needed
//   return (
//     <div
//       className="sponsor-bg container text-center"
//       data-test="sponsor-section"
//     >
//       <div className="py-[80px] flex flex-col items-center">
//         <div className="max-w-3xl sm:w-full">
//           <Paragraph className="mt-[40px]" textColor="text-white">
//             Elevating the future of APIs. Our valued partners and sponsors play
//             a pivotal role in bringing our vision to life. With their support,
//             we orchestrate an unforgettable celebration.
//           </Paragraph>
//         </div>
//         <Heading
//           typeStyle="heading-md"
//           className="text-white mt-10 sm:text-2xl sm:mt-5"
//         >
//           Event and Host Sponsor
//         </Heading>
//         <div className="flex justify-center  w-[650px] sm:w-full flex-col  items-center">
//           {eventSponsors &&
//             eventSponsors.map((sponsor) => (
//               <div
//                 key={sponsor.image}
//                 className={`w-[300px] h-[150px] flex flex-col justify-center items-center ${sponsor.className ? sponsor.className : ""}`}
//               >
//                 <Link href={sponsor.websiteUrl} target="_blank">
//                   <Image
//                     src={sponsor.image}
//                     alt={sponsor.image}
//                     height={230}
//                     width={280}
//                   />
//                 </Link>
//               </div>
//             ))}
//         </div>
//         <div className=" flex space-y-2 flex-col items-center justify-center text-white text-2xl font-bold">
//           <div className="flex flex-col space-y-6">
//             {financialSponsor && (
//               <div>
//                 <Heading
//                   typeStyle="heading-md"
//                   className="text-white mb-12 sm:text-2xl"
//                 >
//                   Financial Sponsor
//                 </Heading>
//                 {financialSponsor.map((sponsor) => (
//                   <div
//                     key={sponsor.image}
//                     className={`${sponsor.className ? sponsor.className : ""}`}
//                   >
//                     <Link href={sponsor.websiteUrl} target="_blank">
//                       <Image
//                         src={sponsor.image}
//                         alt={sponsor.image}
//                         height={210}
//                         width={300}
//                       />
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default Sponsors;



/* eslint-disable @next/next/no-img-element */
import React from "react";
import Heading from "../Typography/heading";
import Paragraph from "../Typography/paragraph";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Sponsors({ eventSponsors, financialSponsor }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const scaleOnHover = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="sponsor-bg container text-center"
      data-test="sponsor-section"
    >
      <div className="py-[80px] flex flex-col items-center">
        <motion.div variants={fadeInUp} className="max-w-3xl sm:w-full">
          <Paragraph className="mt-[40px]" textColor="text-white">
            Elevating the future of APIs. Our valued partners and sponsors play
            a pivotal role in bringing our vision to life. With their support,
            we orchestrate an unforgettable celebration.
          </Paragraph>
        </motion.div>

        <Heading
          typeStyle="heading-md"
          className="text-white mt-10 sm:text-2xl sm:mt-5"
        >
          Event and Host Sponsor
        </Heading>

        <motion.div
          variants={fadeInUp}
          className="flex justify-center w-[650px] sm:w-full flex-col items-center mt-6"
        >
          {eventSponsors &&
            eventSponsors.map((sponsor) => (
              <motion.div
                key={sponsor.image}
                {...scaleOnHover}
                className={`w-[300px] h-[150px] flex flex-col justify-center items-center transition-all duration-300 ${sponsor.className || ""}`}
              >
                <Link href={sponsor.websiteUrl} target="_blank">
                  <Image
                    src={sponsor.image}
                    alt="Sponsor Logo"
                    height={230}
                    width={280}
                    className="rounded-lg shadow-lg"
                  />
                </Link>
              </motion.div>
            ))}
        </motion.div>

        {financialSponsor && (
          <div className="flex flex-col items-center justify-center text-white text-2xl font-bold mt-12">
            <Heading typeStyle="heading-md" className="text-white mb-12 sm:text-2xl">
              Financial Sponsor
            </Heading>
            {financialSponsor.map((sponsor) => (
              <motion.div
                key={sponsor.image}
                {...scaleOnHover}
                variants={fadeInUp}
                className={`${sponsor.className || ""} mb-6`}
              >
                <Link href={sponsor.websiteUrl} target="_blank">
                  <Image
                    src={sponsor.image}
                    alt="Sponsor Logo"
                    height={210}
                    width={300}
                    className="rounded-lg shadow-lg"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

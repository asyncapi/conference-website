import React from "react";

const CallForSpeakers = () => {
  return (
    <>
      <div className=' w-full h-[60vh] bg-[url("/img/CallforSpeakers.png")]  bg-no-repeat bg-cover flex flex-col items-center justify-center'>
        <div className=" bg-black bg-opacity-60 h-full w-full flex flex-col items-center justify-center">
          <h1 className=" text-5xl text-white font-semibold">
            Call for Speakers
          </h1>
          <p className=" mt-4 text-green-500">London Edition</p>
        </div>
      </div>

      {/* this is the wrapper */}
      <div className=" bg-yellow-200 w-full flex  p-10 h-max">
        {/* the left Side */}
        <div className=" w-1/2">
          <div>
            <p>AsyncAPI Conf on Tour in London 2023</p>
            <div>in 135 days</div>
          </div>
          <div>
            <span>event starts</span>
            <span>event starts</span>
          </div>
          <div>
            <h1>20th Sept 2023</h1>
            <h1>20th Sept 2023</h1>
          </div>
          <div>location</div>
          <div>
            Sngular Madrid, C. de Labastida, 1, 28034 <br />
            Madrid, Spain
          </div>
          <div>Buy Tickets</div>
          <div>
            <p>
              Get ready to join the ultimate celebration of cutting-edge
              technology and innovation with AsyncAPI Conf on Tour (AACoT)!
            </p>
            <p>
              Experience the excitement and energy of this series of
              micro-conferences hosted around the globe, where the brightest
              minds and most passionate enthusiasts gather to share their
              knowledge and explore the latest developments in the field.
            </p>
            <p>
              Join a community of experts, developers, and like-minded
              individuals, all eager to learn, collaborate, and push the
              boundaries of what's possible.From insightful talks to interactive
              workshops, AACoT has everything you need to take your skills to
              the next level.
            </p>
            <p>
              Don't miss your chance to be part of this one-of-a-kind event and
              unlock your full potential in the world of technology.
            </p>
          </div>
          <div>
            <h2>Talk Sytle</h2>
            <ul>
              <l1>
                Lighting talks/ Informative sessions (typically 30 mins incl
                Q&A)
              </l1>
              <l1>Session Presentation (typically 45 mins incl Q&A)</l1>
              <l1>Tutorial/Hands-on (typically 1 hour incl Q&A)</l1>
            </ul>
          </div>
          <div>
            <h2>Accepted Talks</h2>
            <ul>
              <l1>
                Selected talks will be emailed (please make sure you check your
                spam folder)
              </l1>
              <l1>
                Speakers will be required to confirm their talks failure to do
                so will result in forfeiting their slot.
              </l1>
            </ul>
          </div>
        </div>
        {/* the right side */}
        <div className=" w-1/2">
          <div>
            <p>Call for Speakers</p>
            <div>in 2 days</div>
          </div>
          <div>
            <span>event starts</span>
            <span>event starts</span>
          </div>
          <div>
            <h1>20th Sept 2023</h1>
            <h1>20th Sept 2023</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallForSpeakers;

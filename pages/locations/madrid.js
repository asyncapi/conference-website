import { React, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import About from "../../components/About/about";
import Speakers from "../../components/Speakers/speakers";
import speakers from "../../components/Speakers/speakersList";
import Scard from "../../components/Cards/speakersCard";
import Image from "next/image";

const Madrid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const arrowClasses = `w-4 h-4 transition-transform text-white ${
    isOpen ? "transform rotate-180" : ""
  }`;

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className=' w-full h-screen bg-[url("/img/Spain.png")] bg-contain bg-no-repeat '>
        <div className=" bg-black bg-opacity-60 h-full">
          <div className=" h-[80vh] flex text-center">
            <div className=" my-auto mx-auto">
              <h1 className=" text-6xl font-bold text-white mb-10">
                Madrid, Spain
              </h1>
              <p className=" text-white text-xl">
                Join us in Madrid for AsyncAPI Conference and learn how to speak
                fluent API! Let&apos;s taco <br /> &apos;bout messaging and have
                a fiesta you won&apos;t forget!
              </p>
              <div className=" flex p-10 items-center justify-center">
                <div className="rounded-full bg-purple-500 text-white text-xl w-10 h-10 flex items-center justify-center mr-4">
                  <FiCalendar />
                </div>
                <div>
                  <p className="text-white text-base pr-5">5-6 Nov, 2023</p>
                </div>
              </div>
              <div className=" text-white text-2xl">
                <p>Calle de Serrano, 125, 28006 Madrid, Spain</p>
                <p>9th of October, 2023</p>
              </div>
            </div>
          </div>
          <div className=" my-auto flex  justify-center">
            <button
              onClick={() => scrollToSection("section1")}
              className=" w-[7rem] mx-8"
            >
              <p className=" p-3 border-2 border-white bg-white bg-opacity-10 rounded-sm text-white font-semibold">
                About
              </p>
            </button>
            <button
              onClick={() => scrollToSection("section2")}
              className=" w-[7rem] mx-8"
            >
              <p className=" p-3 border-2 border-white bg-white bg-opacity-10 rounded-sm text-white font-semibold">
                Agenda
              </p>
            </button>
            <button
              onClick={() => scrollToSection("section3")}
              className=" w-[7rem] mx-8"
            >
              <p className=" p-3 border-2 border-white bg-white bg-opacity-10 rounded-sm text-white font-semibold">
                Speakers
              </p>
            </button>
            <button
              onClick={() => scrollToSection("section4")}
              className=" w-[7rem] mx-8"
            >
              <p className=" p-3 border-2 border-white bg-white bg-opacity-10 rounded-sm text-white font-semibold">
                Sponsors
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------Filter section -------------------------------------- */}

      <div className=" w-full h-[20vh] flex items-center pl-10 border-b border-dark-gray">
        <div className=" flex ">
          <p className=" my-auto mr-5 text-white">Filter: </p>
          <button
            className="relative flex w-60 justify-center items-center bg-white bg-opacity-10 border-2 border-blueGray-700 focus:outline-none shadow text-gray-600 rounded "
            onClick={toggleDropdown}
          >
            <p className="px-4 text-white">
              {selectedOption || "Select an Option"}
            </p>
            <span className=" ml-auto p-2 ">
              <svg
                className={arrowClasses}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path className="fill-current" d="M7 10l5 5 5-5z" />
              </svg>
            </span>
            <div
              className={`absolute ${
                isOpen ? "block" : "hidden"
              } top-full min-w-full w-max bg-white shadow-md mt-1 rounded transition`}
            >
              <ul className="text-left rounded rounded-l-none">
                <li
                  className={`hover:bg-gray-100 ${
                    selectedOption === "item3" ? "bg-gray-100" : ""
                  }`}
                >
                  <div className=" hover:li-gradient">
                    <div
                      className=" px-4 py-2 h-10 border-l-4 border-slate-800 bg-blackGradient text-white font-semibold li-gradient"
                      onClick={() => handleOptionClick("Bengaluru, India")}
                    >
                      Bengaluru, India
                    </div>
                  </div>
                </li>
                <li
                  className={`hover:bg-gray-100 ${
                    selectedOption === "item3" ? "bg-gray-100" : ""
                  }`}
                >
                  <div className=" hover:li-gradient">
                    <div
                      className=" px-4 py-2 h-10 border-l-4 border-slate-800 bg-blackGradient text-white font-semibold li-gradient"
                      onClick={() => handleOptionClick("Berlin, Germany")}
                    >
                      Berlin, Germany
                    </div>
                  </div>
                </li>
                <li
                  className={`hover:bg-gray-100 ${
                    selectedOption === "item3" ? "bg-gray-100" : ""
                  }`}
                >
                  <div className=" hover:li-gradient">
                    <div
                      className=" px-4 py-2 h-10 border-l-4 border-slate-800 bg-blackGradient text-white font-semibold li-gradient"
                      onClick={() => handleOptionClick("Lagos, Nigeria")}
                    >
                      Lagos, Nigeria
                    </div>
                  </div>
                </li>
                <li
                  className={`hover:bg-gray-100 ${
                    selectedOption === "item3" ? "bg-gray-100" : ""
                  }`}
                >
                  <div className=" hover:li-gradient">
                    <div
                      className=" px-4 py-2 h-10 border-l-4 border-slate-800 bg-blackGradient text-white font-semibold li-gradient"
                      onClick={() => handleOptionClick("Madrid, Spain")}
                    >
                      Madrid, Spain
                    </div>
                  </div>
                </li>
                <li
                  className={`hover:bg-gray-100 ${
                    selectedOption === "item3" ? "bg-gray-100" : ""
                  }`}
                >
                  <div className=" hover:li-gradient">
                    <div
                      className=" px-4 py-2 h-10 border-l-4 border-slate-800 bg-blackGradient text-white font-semibold li-gradient"
                      onClick={() => handleOptionClick("London, England")}
                    >
                      London, England
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------------- */}

      <section id="section1">
        <About />
      </section>

      <section id="section2">
        <div className=" w-full h-auto flex justify-center border-t border-dark-gray mb-20">
          {/* create the agenda section here */}
          <div className=" container w-full h-auto mt-28">
            <div className=" text-center mb-8">
              <h1 className=" text-5xl font-bold text-white">Agenda</h1>
              <p className=" mt-10 text-xl font-normal text-white">
                The conference will commence at 8:00am BST (UTC+1)
              </p>
            </div>
            {/* this will be the first section  */}
            <div className=" mx-auto w-[50vw] text-white">
              <div>
                <h2 className=" text-2xl font-semibold mb-5 text-transparent bg-clip-text bg-buttonGradient inline-block">
                  Tuesday, October 4th
                </h2>
                {/* <h1 className=' text-transparent bg-clip-text bg-buttonGradient inline-block'>apple</h1> */}
              </div>
              {/* for each event of a single day */}
              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">Keynote Speaker</p>
                  <h2 className=" text-base font-semibold">
                    The Power of APIs: Driving Innovation <br /> and
                    Collaboration
                  </h2>
                </div>
                <div className=" flex">
                  {/* image */}
                  <div className=" mr-5">
                  <img
                      src="https://avatars.sched.co/f/bf/13884588/avatar.jpg?fa1"
                      alt="person"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  {/* content */}
                  <div>
                    <p className=" font-semibold text-sm mb-2">Fran Méndez</p>
                    <h2>
                      Founder, AsyncAPI and Director of <br /> Engineering,
                      Postman
                    </h2>
                  </div>
                </div>
              </div>

              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">Keynote Speaker</p>
                  <h2 className=" text-base font-semibold">
                    The Power of APIs: Driving Innovation <br /> and
                    Collaboration
                  </h2>
                </div>
                <div className=" flex">
                  {/* image */}
                  <div className=" mr-5">
                    <img
                      src="https://avatars.sched.co/f/bf/13884588/avatar.jpg?fa1"
                      alt="person"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  {/* content */}
                  <div>
                    <p className=" font-semibold text-sm mb-2">Fran Méndez</p>
                    <h2>
                      Founder, AsyncAPI and Director of <br /> Engineering,
                      Postman
                    </h2>
                  </div>
                </div>
              </div>

              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">break</p>
                </div>
              </div>

              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">Keynote Speaker</p>
                  <h2 className=" text-base font-semibold">
                    The Power of APIs: Driving Innovation <br /> and
                    Collaboration
                  </h2>
                </div>
                <div className=" flex">
                  {/* image */}
                  <div className=" mr-5">
                    <img
                      src="https://avatars.sched.co/f/bf/13884588/avatar.jpg?fa1"
                      alt="person"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  {/* content */}
                  <div>
                    <p className=" font-semibold text-sm mb-2">Fran Méndez</p>
                    <h2>
                      Founder, AsyncAPI and Director of <br /> Engineering,
                      Postman
                    </h2>
                  </div>
                </div>
              </div>

              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">Keynote Speaker</p>
                  <h2 className=" text-base font-semibold">
                    The Power of APIs: Driving Innovation <br /> and
                    Collaboration
                  </h2>
                </div>
                <div className=" flex">
                  {/* image */}
                  <div className=" mr-5">
                    <img
                      src="https://avatars.sched.co/f/bf/13884588/avatar.jpg?fa1"
                      alt="person"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  {/* content */}
                  <div>
                    <p className=" font-semibold text-sm mb-2">Fran Méndez</p>
                    <h2>
                      Founder, AsyncAPI and Director of <br /> Engineering,
                      Postman
                    </h2>
                  </div>
                </div>
              </div>

              <div>
                <h2 className=" text-2xl font-semibold mb-5 text-transparent bg-clip-text bg-buttonGradient inline-block">
                  Tuesday, October 4th
                </h2>
                {/* <h1 className=' text-transparent bg-clip-text bg-buttonGradient inline-block'>apple</h1> */}
              </div>

              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">Keynote Speaker</p>
                  <h2 className=" text-base font-semibold">
                    The Power of APIs: Driving Innovation <br /> and
                    Collaboration
                  </h2>
                </div>
                <div className=" flex">
                  {/* image */}
                  <div className=" mr-5">
                    <img
                      src="https://avatars.sched.co/f/bf/13884588/avatar.jpg?fa1"
                      alt="person"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  {/* content */}
                  <div>
                    <p className=" font-semibold text-sm mb-2">Fran Méndez</p>
                    <h2>
                      Founder, AsyncAPI and Director of <br /> Engineering,
                      Postman
                    </h2>
                  </div>
                </div>
              </div>
              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">Keynote Speaker</p>
                  <h2 className=" text-base font-semibold">
                    The Power of APIs: Driving Innovation <br /> and
                    Collaboration
                  </h2>
                </div>
                <div className=" flex">
                  {/* image */}
                  <div className=" mr-5">
                    <img
                      src="https://avatars.sched.co/f/bf/13884588/avatar.jpg?fa1"
                      alt="person"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  {/* content */}
                  <div>
                    <p className=" font-semibold text-sm mb-2">Fran Méndez</p>
                    <h2>
                      Founder, AsyncAPI and Director of <br /> Engineering,
                      Postman
                    </h2>
                  </div>
                </div>
              </div>

              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">break</p>
                </div>
              </div>

              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">Keynote Speaker</p>
                  <h2 className=" text-base font-semibold">
                    The Power of APIs: Driving Innovation <br /> and
                    Collaboration
                  </h2>
                </div>
                <div className=" flex">
                  {/* image */}
                  <div className=" mr-5">
                    <img
                      src="https://avatars.sched.co/f/bf/13884588/avatar.jpg?fa1"
                      alt="person"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  {/* content */}
                  <div>
                    <p className=" font-semibold text-sm mb-2">Fran Méndez</p>
                    <h2>
                      Founder, AsyncAPI and Director of <br /> Engineering,
                      Postman
                    </h2>
                  </div>
                </div>
              </div>

              <div className=" flex mb-10">
                {/* the three horizontal sections inside each event section */}
                <div className=" mr-10 text-xs">
                  <p>9:00 AM UTC+ - 10:00 AM UTC+1 </p>
                </div>
                <div className=" mr-10">
                  <p className=" text-xs mb-4">Keynote Speaker</p>
                  <h2 className=" text-base font-semibold">
                    The Power of APIs: Driving Innovation <br /> and
                    Collaboration
                  </h2>
                </div>
                <div className=" flex">
                  {/* image */}
                  <div className=" mr-5">
                    <img
                      src="https://avatars.sched.co/f/bf/13884588/avatar.jpg?fa1"
                      alt="person"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  {/* content */}
                  <div>
                    <p className=" font-semibold text-sm mb-2">Fran Méndez</p>
                    <h2>
                      Founder, AsyncAPI and Director of <br /> Engineering,
                      Postman
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* this will be the second section  */}
            <div></div>
          </div>
        </div>
      </section>

      {/* ------------------------------------This will be the speakers section ---------------------------------------*/}

      <section id="section3">
        <div className=" min-h-auto md:h-[auto] bg-[#1c1234] border-t border-dark-gray">
          <div className="container mx-auto w-full ">
            <div className="pt-[100px] md:pt-[50px]">
              <div className=" flex flex-col">
                <div className=" flex-col text-center mb-14">
                  <h1 className="text-[84px]  text-white font-[400] tracking-tight md:text-[30px]">
                    Speakers
                  </h1>
                  <h1 className=" text-slate-200">Meet Our Expert Speakers</h1>
                </div>
                <div className="flex justify-between mt-auto w-[60%] mx-auto"></div>
              </div>
              <div className=" md:mb-[100px] w-full min-h-fit p-10 flex flex-wrap justify-evenly">
                {/* <CardSlider> */}
                {speakers.map((speaker) => (
                  <div key={speaker.name} className=" p-5">
                    <Scard
                      title={speaker.name}
                      alt={speaker.name}
                      summary={`${speaker.title}, ${speaker.company}`}
                      img={speaker.avatar}
                    />
                  </div>
                ))}
                {/* </CardSlider> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*---------------------------------------------- this is the sponsors section --------------------------------------*/}

      <section id="section4">
        <div className=" mx-auto w-full bg-[#1c1234] border-t border-dark-gray mb-20 mt-14">
          <div className=" container mx-auto w-full ">
            <div className=" pt-20  text-white  flex-col mx-auto justify-center">
              <h1 className=" text-3xl font-semibold text-center">
                Event Sponsors{" "}
              </h1>
              <p className=" text-center text-xl mt-10">
                Our Heartfelt Appreciation to Our Event Sponsors
              </p>
              <div className="  mb-3  w-[60rem] mx-auto">
                <div className="bg-[rgba(36, -ml-1430, 49, 0.8)] backdrop-blur-sm rounded-lg p-14 flex w-1/2 h-1/2 mx-auto">
                  <img
                    src="/img/postman.png"
                    alt="postman"
                    className=" block w-1/3 h-1/3 mx-10 ml-auto"
                  />
                  <img
                    src="/img/ably.png"
                    alt="ably"
                    className="w-1/3 h-1/3 mr-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*---------------------------------------------- this is the end of the green container ------------------------------*/}

      <div className=" w-full h-[100vh] bg-teal-300 relative flex justify-center items-center gap-5 pt-20">
        {/* we will create the dropdown here */}
        <p className=" text-5xl">Map will be inserted here</p>
      </div>
    </>
  );
};

export default Madrid;

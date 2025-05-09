import React, { useEffect, useRef } from "react";
import Heading from "../Typography/heading";
import Paragraph from "../Typography/paragraph";
import Button from "../Buttons/button";
import cities from "../../config/city-lists.json";
import Venue from "../Venue/venue";
import Announcement from "../announcement";
import Link from "next/link";

function Header() {
  const scrollContainerRef = useRef(null);
  let autoScrollInterval;
  let isDragging = false;
  let startX;
  let scrollLeft;

  useEffect(() => {
    const container = scrollContainerRef.current;

   
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (container) {
          container.scrollLeft += 1; 

          
          if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0; 
          }
        }
      }, 10); 
    };

    
    const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
      setTimeout(startAutoScroll, 1000); 
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.classList.add("dragging");
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; 
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      isDragging = false;
      container.classList.remove("dragging");
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("scroll", stopAutoScroll);

    startAutoScroll();
  
    return () => {
      clearInterval(autoScrollInterval);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      container.removeEventListener("scroll", stopAutoScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div className="container w-full flex items-center justify-center">
        <div className="">
          <div className="flex justify-center w-full mt-32">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="my-10">
                <Announcement />
              </div>
              <div
                className="sm:w-full text-center"
                data-test="landing-heading"
              >
                <Heading
                  className="text-6xl sm:text-4xl leading-normal sm:leading-38px tracking-[-3px] sm:tracking-[-0.02em] font-extrabold text-gradient"
                  level="h1"
                  typeStyle="heading"
                >
                  AsyncAPI Conference 2025
                </Heading>
              </div>
              <div className="w-[624px] sm:w-full text-center">
                <Paragraph className="mt-[16px]" textColor="text-gray-200">
                  Join us for the AsyncAPI Conference, bringing the latest in
                  AsyncAPI technology to locations worldwide!
                </Paragraph>
              </div>
              <div className="mt-[54px] relative flex items-center justify-center">
                <Link href="#tickets">
                  <Button className="w-[250px]">Register Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24">
        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="scroll-container overflow-x-auto whitespace-nowrap scroll-smooth"
        >
          {cities.map((city) => {
            return (
              <div
                key={city.name}
                className="inline-block align-top"
              >
                <Venue city={city} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Header;
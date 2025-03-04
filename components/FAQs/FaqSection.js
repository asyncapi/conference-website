import React, { useState, useRef, useEffect } from 'react';
import Heading from "../Typography/heading";
import Paragraph from "../Typography/paragraph";
import faqs from '../../config/faqs.json';

const FaqDropdown = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-700 rounded-lg mb-4 overflow-hidden">
      <div 
        onClick={onToggle}
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-800 transition-colors duration-300"
      >
        <Paragraph 
          typeStyle="body-lg" 
          textColor="text-white"
          className="font-bold"
        >
          {faq.question}
        </Paragraph>
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'grid-rows-[1fr] opacity-100 visible' 
            : 'grid-rows-[0fr] opacity-0 invisible h-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 bg-gray-800 text-gray-200">
            <Paragraph 
              typeStyle="body-md"
              textColor="text-gray-200"
            >
              {faq.answer}
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const faqRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="container mt-20 mb-20">
      <div className="flex items-center flex-col justify-center">
        <div className="text-lg sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1">
          FAQ
        </div>
        <Heading 
          typeStyle="heading-md" 
          className="text-gradient text-center lg:mt-10 mb-10"
        >
          Frequently Asked Questions
        </Heading>
        <div 
          ref={faqRef}
          className="max-w-3xl sm:w-full w-full px-4 sm:px-2"
        >
          {faqs.map((faq, index) => (
            <FaqDropdown 
              key={index}
              faq={faq}
              isOpen={openFaqIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
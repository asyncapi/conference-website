import React, { useState } from 'react';
import faqsData from '../../config/faq-lists.json';

const FaqPage = () => {
  const [faqs, setFaqs] = useState(faqsData.faqs);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          // Toggle the 'open' property
          return { ...faq, open: !faq.open };
        } else {
          return { ...faq, open: false };
        }
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 flex">
      <div className="w-1/2 pr-8 mb-72">
        <h1 className="text-2xl font-semibold mb-6 text-white text-center">Do you have questions for us? </h1>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full py-2 px-4 border border-gray-300 rounded-lg shadow-md focus:outline-none"
            >
              <span className="text-lg font-medium text-white">{faq.question}</span>
              <span className="text-gray-600">{faq.open ? '-' : '+'}</span>
            </button>
            {faq.open && <p className="mt-2 px-4 text-white">{faq.answer}</p>}
          </div>
        ))}
      </div>
      <div className="w-1/2 mt-16">
        <img src="/img/faq.jpeg" alt="Event" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default FaqPage;

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
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-semibold mb-6 text-center text-white">Do you have questions ?</h1>
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full py-2 px-4 bg-gray-100 rounded-lg focus:outline-none"
              >
                <span className="text-lg font-medium text-black">{faq.question}</span>
                <span className="text-gray-600">{faq.open ? '-' : '+'}</span>
              </button>
              {faq.open && <p className="mt-2 px-4 text-white">{faq.answer}</p>}
            </div>
          ))}
        </div>
        <h2 className='text-white mt-2 mb-24'>Any other questions? Contact us at asyncapi@gmail.com</h2>
      </div>
    );
  };
  
  export default FaqPage;
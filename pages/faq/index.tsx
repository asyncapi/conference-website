import React, { useState } from 'react';
import Head from 'next/head';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Conference",
    question: "When and where is the AsyncAPI Conference taking place?",
    answer: "The AsyncAPI Conference is a global event taking place in multiple cities. Please check our schedule section for specific dates and locations in each city."
  },
  {
    category: "Conference",
    question: "What is the conference about?",
    answer: "The AsyncAPI Conference is dedicated to event-driven architectures, API design, and the AsyncAPI specification. It brings together developers, architects, and industry leaders to share knowledge and experiences."
  },
  {
    category: "Tickets",
    question: "What's included in the conference ticket?",
    answer: "Conference tickets include access to all sessions, workshops, networking events, lunch and refreshments, and conference materials. Some special events might require separate registration."
  },
  {
    category: "Tickets",
    question: "Are there any student discounts available?",
    answer: "Yes, we offer student discounts with valid student ID. Please contact our support team for more information about student pricing."
  },
  {
    category: "Speakers",
    question: "How can I become a speaker?",
    answer: "We welcome speaker applications through our 'Apply as Speaker' form. Speakers should have expertise in AsyncAPI, event-driven architectures, or related technologies."
  },
  {
    category: "Speakers",
    question: "What are the session formats?",
    answer: "We offer various formats including keynotes (45 mins), technical talks (30 mins), workshops (2-3 hours), and lightning talks (10 mins)."
  },
  {
    category: "Sponsors",
    question: "How can my company sponsor the conference?",
    answer: "We offer various sponsorship packages. Please contact our sponsorship team for detailed information about sponsorship opportunities."
  },
  {
    category: "General",
    question: "What's the conference code of conduct?",
    answer: "We are committed to providing a harassment-free conference experience for everyone. All attendees, speakers, and sponsors must abide by our code of conduct."
  }
];

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-primary-800 pt-16">
      <Head>
        <title>FAQ - AsyncAPI Conference</title>
        <meta name="description" content="Frequently Asked Questions about the AsyncAPI Conference" />
      </Head>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="text-lg sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1 inline-block">
            FAQ
          </div>
          <Heading typeStyle="heading-md" className="text-gradient mt-4">
            Frequently Asked Questions
          </Heading>
          <Paragraph typeStyle="body-lg" className="mt-6" textColor="text-gray-200">
            Find answers to common questions about the AsyncAPI Conference
          </Paragraph>
        </div>

        <div className="max-w-3xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div key={category} className="mb-8">
              <Heading typeStyle="heading-sm" className="text-white mb-4">
                {category}
              </Heading>
              <div className="space-y-4">
                {faqs.filter(faq => faq.category === category).map((faq, index) => {
                  const actualIndex = faqs.findIndex(f => f === faq);
                  return (
                    <div 
                      key={index}
                      className="card-bg border border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full px-6 py-4 flex justify-between items-center text-left"
                        onClick={() => toggleItem(actualIndex)}
                      >
                        <span className="text-white font-medium">{faq.question}</span>
                        {openItems.includes(actualIndex) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {openItems.includes(actualIndex) && (
                        <div className="px-6 py-4 border-t border-gray-700">
                          <Paragraph textColor="text-gray-300">
                            {faq.answer}
                          </Paragraph>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Paragraph textColor="text-gray-200">
            Still have questions? Contact us at{' '}
            <a 
              href="mailto:support@asyncapi-conference.com" 
              className="text-blue-400 hover:text-blue-300"
            >
              support@asyncapi-conference.com
            </a>
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
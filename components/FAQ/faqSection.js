"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FAQSection = () => {
  const [faqData, setFaqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    import("../../config/faq.json")
      .then((data) => setFaqData(data.default))
      .catch((error) => console.error("Error loading FAQs:", error));
  }, []);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 text-gray-900 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions?.filter((q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions?.length);

  return (
    <section className="max-w-6xl mx-auto py-16 px-6 sm:px-12 lg:px-20 text-white">
      <h1 className="text-5xl font-bold text-center mb-12 text-pink-400 bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        Frequently Asked Questions
      </h1>

      {/* Search Bar */}
      <div className="relative mb-10 max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {filteredFAQs.length ? (
        filteredFAQs.map((category, catIndex) => (
          <div key={catIndex} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-pink-400">
              {category.category}
            </h2>
            <div className="space-y-6">
              {category.questions?.map((faq, i) => {
                const isOpen = openIndex === `${catIndex}-${i}`;
                return (
                  <div
                    key={i}
                    className="border border-gray-700 rounded-lg overflow-hidden shadow-md transition hover:shadow-lg"
                  >
                    <div
                      className={`flex justify-between items-center p-5 cursor-pointer transition-all ${
                        isOpen ? "bg-gray-700" : "bg-gray-800"
                      } hover:bg-gray-700`}
                      onClick={() => toggleAnswer(`${catIndex}-${i}`)}
                    >
                      <p className="text-lg font-medium">
                        {highlightText(faq.question, searchQuery)}
                      </p>
                      {isOpen ? (
                        <ChevronUp className="w-6 h-6 text-pink-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-pink-400" />
                      )}
                    </div>

                    {isOpen && (
                      <div className="p-5 bg-gray-900 border-t border-gray-700">
                        <p className="text-gray-300 leading-relaxed">
                          {highlightText(faq.answer, searchQuery)}
                          {faq.link && (
                            <span
                              onClick={() => router.push(faq.link)}
                              className="text-blue-400 underline cursor-pointer ml-2"
                            >
                              here
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No FAQs found.</p>
      )}
    </section>
  );
};

export default FAQSection;

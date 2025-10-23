/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';

interface ReviewProps {
  quote: string;
  avatar: string;
  name: string;
}

function Review({ quote, avatar, name }: ReviewProps) {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 lg:p-8 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
            <Image
              src={avatar}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full rounded-full object-cover bg-gray-800"
            />
          </div>
        </div>
        <blockquote className="text-white font-medium text-lg lg:text-xl leading-relaxed">
          "{quote}"
        </blockquote>
        <cite className="text-gray-300 text-sm font-normal not-italic">
          - {name}
        </cite>
      </div>
    </div>
  );
}

function ConferenceReviews() {
  const reviews: ReviewProps[] = [
    {
      quote: "A must-attend for anyone working in event-driven architecture!",
      avatar: "/img/speaker-images/online-conf/Adi.webp",
      name: "Alex Chen"
    },
    {
      quote: "AsyncAPI Conf is where innovation meets community. Loved the sessions and vibes!",
      avatar: "/img/speaker-images/online-conf/Maya.webp", 
      name: "Sarah Johnson"
    },
    {
      quote: "It's not just a conference, it's a hub for collaboration and innovation.",
      avatar: "/img/speaker-images/online-conf/Daniel.webp",
      name: "Michael Rodriguez"
    }
  ];

  return (
    <div className="py-20 lg:py-16 bg-gradient-to-b from-transparent to-purple-950/10">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="text-lg sm:text-sm text-white font-semibold border-b-2 border-blue-400 mb-4 inline-block">
            Reviews
          </div>
          <Heading typeStyle="heading-md" className="text-gradient text-center">
            5K+ Joined Our Last Conference
          </Heading>
          <Paragraph
            typeStyle="body-lg"
            className="text-gray-200 max-w-3xl mx-auto mt-6"
          >
            Hear what our amazing community has to say about their AsyncAPI Conference experience
          </Paragraph>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <Review
              key={index}
              quote={review.quote}
              avatar={review.avatar}
              name={review.name}
            />
          ))}
        </div>

        {/* Call to Action Footer */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 lg:p-10 max-w-4xl mx-auto">
            <Paragraph
              typeStyle="body-lg"
              className="text-gray-200 mb-4"
            >
              Attended AsyncAPI Conf? We'd love your feedback!
            </Paragraph>
            <Paragraph
              typeStyle="body-md"
              className="text-gray-300"
            >
              Drop us a review{' '}
              <a 
                href="#" 
                className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
              >
                here
              </a>
              {' '}or email us at{' '}
              <a 
                href="mailto:asyncapiconf@gmail.com"
                className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
              >
                asyncapiconf@gmail.com
              </a>
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConferenceReviews;

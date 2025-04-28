import React, { useState, useRef, useEffect } from 'react'
import Heading from '../Typography/heading'
import Paragraph from '../Typography/paragraph'
import Button from '../Buttons/button'

/**
 * MeetupCard component to display details of a meetup event
 */
const MeetupCard = ({ 
  status, 
  time, 
  title, 
  description, 
  date, 
  location, 
  host, 
  avatar,
  isEmpty = false 
}) => {
  // If this is an empty card with just an avatar
  if (isEmpty && avatar) {
    return (
      <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full flex justify-center items-center h-full">
        <div className="w-full h-full text-gradient flex items-center justify-center font-bold">
          {avatar}
        </div>
      </div>
    )
  }
  // Full meetup card
  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full h-full">
      <div className="flex justify-between items-center mb-4">
        {status && (
          <span className="text-xs font-medium px-3 py-1 rounded-full gradient-bg text-white">{status}</span>
        )}
        {time && (
          <span className="text-xs text-gray-300">{time}</span>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      
      <p className="text-sm text-gray-300 mb-4">
        {description}
      </p>
      
      <div className="space-y-3 mb-6">
        {date && (
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-sm text-gray-300">{date}</span>
          </div>
        )}
        
        {location && (
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-sm text-gray-300">{location}</span>
          </div>
        )}
        
        {host && (
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span className="text-sm text-gray-300">{host}</span>
          </div>
        )}
      </div>
      <Button className="w-full"> View Details</Button>
    </div>
  )
}

/**
 * Navigation arrow component for the carousel
 */
const CarouselArrow = ({ direction, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute top-1/2 transform -translate-y-1/2 z-20
        ${direction === 'left' ? '-left-4 md:-left-6' : '-right-4 md:-right-6'}
        bg-white bg-opacity-30 p-2 rounded-full 
        hover:bg-opacity-50 transition-all
        disabled:opacity-30 disabled:cursor-not-allowed
      `}
      aria-label={direction === 'left' ? 'Previous slides' : 'Next slides'}
    >
      {direction === 'left' ? (
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      ) : (
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      )}
    </button>
  );
};

/**
 * UpcomingMeetups component with responsive multi-card scrolling carousel
 */
const UpcomingMeetups = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [cardsPerView, setCardsPerView] = useState(3);
  
  // Sample meetup data - in a real app, this would come from props or an API
  const meetups = [
    {
      id: 1,
      status: "Upcoming",
      time: "3:00 PM - 5:00 PM GMT",
      title: "AsyncAPI Community Meetup",
      description: "Join us for a virtual meetup to discuss the latest developments in AsyncAPI and event-driven architectures.",
      date: "December 15, 2023",
      location: "Virtual",
      host: "Hosted by AsyncAPI Community"
    },
    {
      id: 2,
      status: "Upcoming",
      time: "1:00 PM GMT",
      title: "Community Meetup Coming Soon",
      description: "Join us for a virtual meetup to discuss the latest developments in AsyncAPI and event-driven architectures.",
      date: "January 5, 2024",
      location: "Virtual",
      host: "Hosted by API Guild"
    },
    {
      id: 3,
      status: "Planning",
      time: "TBD",
      title: "Tech Conference 2024",
      description: "A major tech conference focusing on API innovations and microservices architecture.",
      date: "January 20, 2024",
      location: "Online",
      host: "Hosted by Tech Community"
    },
    {
      id: 4,
      status: "Upcoming",
      time: "1:00 PM - 3:00 PM EST",
      title: "API Design Workshop",
      description: "Learn best practices for designing robust and scalable APIs with industry experts.",
      date: "December 22, 2023",
      location: "Virtual",
      host: "Hosted by API Enthusiasts"
    },
    {
      id: 5,
      status: "Upcoming",
      time: "10:00 AM - 12:00 PM PST",
      title: "Microservices Architecture",
      description: "Deep dive into microservices architecture and event-driven design patterns.",
      date: "January 10, 2024",
      location: "Virtual",
      host: "Hosted by Cloud Native Group"
    },
    {
      id: 6,
      status: "Planning",
      time: "2:00 PM - 5:00 PM CET",
      title: "AsyncAPI Contributor Day",
      description: "A day dedicated to contributing to AsyncAPI open source projects and documentation.",
      date: "February 5, 2024",
      location: "Virtual",
      host: "Hosted by AsyncAPI Initiative"
    }
  ];

  // Add empty cards
  const allCards = [
    ...meetups,
    { id: 'empty1', isEmpty: true, avatar: 'Coming soon!' },
    { id: 'empty2', isEmpty: true, avatar: 'Coming soon!' }
  ];

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet: 2 cards
      } else {
        setCardsPerView(3); // Desktop: 3 cards exactly
      }
    };

    // Initial call
    updateCardsPerView();

    // Add resize listener
    window.addEventListener('resize', updateCardsPerView);

    // Cleanup
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalPages = Math.ceil(allCards.length / cardsPerView);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= totalPages ? 0 : nextIndex;
    });
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? totalPages - 1 : nextIndex;
    });
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Heading
          className="text-4xl font-bold text-center text-gradient mb-4"
          level="h2"
          typeStyle="heading"
        >
          Upcoming Meetups
        </Heading>
        
        <Paragraph className="text-center mb-16 max-w-2xl mx-auto" textColor="text-gray-200">
          Connect with AsyncAPI enthusiasts around the world. Join one of our upcoming meetups to learn, share, and collaborate.
        </Paragraph>
        
        <div className="container lg:w-5/6 xl:w-4/5 mx-auto relative">
          {/* Left arrow */}
          <CarouselArrow 
            direction="left" 
            onClick={goToPrevSlide} 
            disabled={allCards.length <= cardsPerView}
          />

          {/* Main carousel container */}
          <div 
            ref={carouselRef}
            className="w-full overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                width: `${(totalPages * 100)}%` 
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div 
                  key={`page-${pageIndex}`}
                  className="flex gap-6 w-full"
                  style={{ width: `${100 / totalPages}%` }}
                >
                  {Array.from({ length: cardsPerView }).map((_, cardIndex) => {
                    const cardData = allCards[pageIndex * cardsPerView + cardIndex];
                    if (!cardData) return null;
                    
                    return (
                      <div 
                        key={`card-${pageIndex}-${cardIndex}`}
                        className="flex-1 px-2"
                      >
                        {cardData.isEmpty ? (
                          <MeetupCard isEmpty={true} avatar={cardData.avatar} />
                        ) : (
                          <MeetupCard
                            status={cardData.status}
                            time={cardData.time}
                            title={cardData.title}
                            description={cardData.description}
                            date={cardData.date}
                            location={cardData.location}
                            host={cardData.host}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right arrow */}
          <CarouselArrow 
            direction="right" 
            onClick={goToNextSlide}
            disabled={allCards.length <= cardsPerView}
          />
        </div>
        
        {/* Navigation dots */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-gray-400'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <button className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:bg-opacity-10 transition">
            View All Meetups
          </button>
        </div>
      </div>
    </div>
  );
};

// Make sure to export the component as default
export default UpcomingMeetups;
export { MeetupCard };
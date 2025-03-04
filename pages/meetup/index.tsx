import React, { useState } from 'react';
import Head from 'next/head';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';
import Button from '../../components/Buttons/button';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Meetup {
  id: string;
  title: string;
  date: string;
  time: string;
  location: {
    city: string;
    venue: string;
    address: string;
  };
  description: string;
  attendees: number;
  maxAttendees: number;
  organizer: {
    name: string;
    avatar: string;
  };
  registrationLink: string;
  topics: string[];
  type: 'online' | 'in-person' | 'hybrid';
}

const meetups: Meetup[] = [
  {
    id: '1',
    title: 'AsyncAPI Community Meetup - Getting Started with Event-Driven Architecture',
    date: '2024-04-15',
    time: '18:00-20:00',
    location: {
      city: 'London',
      venue: 'Tech Hub',
      address: '123 Innovation Street',
    },
    description: 'Join us for an evening of learning and networking. We\'ll cover the basics of Event-Driven Architecture and how AsyncAPI fits into the modern API landscape.',
    attendees: 45,
    maxAttendees: 100,
    organizer: {
      name: 'Frank',
      avatar: '/img/paris-images/frank.webp',
    },
    registrationLink: 'https://meetup.com/asyncapi-london',
    topics: ['Event-Driven Architecture', 'AsyncAPI', 'API Design'],
    type: 'hybrid',
  },
  
];

const MeetupPage = () => {
  const [filter, setFilter] = useState<'all' | 'online' | 'in-person' | 'hybrid'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeetups = meetups.filter(meetup => {
    const matchesFilter = filter === 'all' || meetup.type === filter;
    const matchesSearch = meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-primary-800 pt-16">
      <Head>
        <title>Community Meetups - AsyncAPI Conference</title>
        <meta name="description" content="Join AsyncAPI community meetups and connect with fellow developers" />
      </Head>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="text-lg sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1 inline-block">
            Community
          </div>
          <Heading typeStyle="heading-md" className="text-gradient mt-4">
            Upcoming Meetups
          </Heading>
          <Paragraph typeStyle="body-lg" className="mt-6 max-w-2xl mx-auto" textColor="text-gray-200">
            Connect with the AsyncAPI community, share knowledge, and network with fellow developers at our upcoming meetups.
          </Paragraph>
        </div>

        {/* Filters and Search */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2">
              <Button
                className={`px-4 py-2 ${filter === 'all' ? 'gradient-bg' : 'border border-gray-600'}`}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                className={`px-4 py-2 ${filter === 'online' ? 'gradient-bg' : 'border border-gray-600'}`}
                onClick={() => setFilter('online')}
              >
                Online
              </Button>
              <Button
                className={`px-4 py-2 ${filter === 'in-person' ? 'gradient-bg' : 'border border-gray-600'}`}
                onClick={() => setFilter('in-person')}
              >
                In-Person
              </Button>
              <Button
                className={`px-4 py-2 ${filter === 'hybrid' ? 'gradient-bg' : 'border border-gray-600'}`}
                onClick={() => setFilter('hybrid')}
              >
                Hybrid
              </Button>
            </div>
            <input
              type="text"
              placeholder="Search meetups..."
              className="w-full md:w-64 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Meetups Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMeetups.map((meetup) => (
            <div key={meetup.id} className="card-bg border border-gray-700 rounded-xl p-6 hover:border-blue-400 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    meetup.type === 'online' ? 'bg-green-900 text-green-300' :
                    meetup.type === 'in-person' ? 'bg-purple-900 text-purple-300' :
                    'bg-blue-900 text-blue-300'
                  } mb-3`}>
                    {meetup.type.charAt(0).toUpperCase() + meetup.type.slice(1)}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-2">{meetup.title}</h3>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-2" />
                  {formatDate(meetup.date)}
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-2" />
                  {meetup.time}
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2" />
                  {meetup.location.city} - {meetup.location.venue}
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 mr-2" />
                  {meetup.attendees}/{meetup.maxAttendees} attendees
                </div>
              </div>

              <Paragraph textColor="text-gray-300" className="mb-6">
                {meetup.description}
              </Paragraph>

              <div className="flex flex-wrap gap-2 mb-6">
                {meetup.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={meetup.organizer.avatar}
                    alt={meetup.organizer.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-gray-300">Organized by {meetup.organizer.name}</span>
                </div>
                <Link
                  href={meetup.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="flex items-center">
                    Register <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Host a Meetup CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="card-bg border border-gray-700 rounded-xl p-8">
            <Heading typeStyle="heading-sm" className="text-white mb-4">
              Want to Host a Meetup?
            </Heading>
            <Paragraph textColor="text-gray-300" className="mb-6">
              Share your knowledge with the community and help grow the AsyncAPI ecosystem.
              We'll help you organize and promote your meetup!
            </Paragraph>
            <Button className="gradient-bg">
              Host a Meetup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetupPage;
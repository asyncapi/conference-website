import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Twitter, Github, Linkedin, Youtube, Slack, Twitch } from 'lucide-react';

const socialMediaLinks = [
  { label: 'Twitter', url: 'https://twitter.com/AsyncAPISpec', icon: <Twitter className='h-5 w-5' /> },
  { label: 'GitHub', url: 'https://github.com/asyncapi', icon: <Github className='h-5 w-5' /> },
  { label: 'LinkedIn', url: 'https://linkedin.com/company/asyncapi', icon: <Linkedin className='h-5 w-5' /> },
  { label: 'YouTube', url: 'https://youtube.com/asyncapi', icon: <Youtube className='h-5 w-5' /> },
  { label: 'Slack', url: 'https://asyncapi.com/slack-invite', icon: <Slack className='h-5 w-5' /> },
  { label: 'Twitch', url: 'https://www.twitch.tv/asyncapi', icon: <Twitch className='h-5 w-5' /> }
];

const initiativeLinks = [
  { label: 'About', url: '#about' },
  { label: 'Venue', url: '/venue/Online' },
  { label: 'Brand', url: 'https://github.com/asyncapi/brand/blob/master/brand-guidelines/README.md'},
  { label: 'Tickets', url: '#tickets' },
  { label: 'Speakers', url: '#speakers' },
  { label: 'Code of Conduct', url: 'https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md' }
];

const helloVariants = [
  "thank you", "gracias", "धन्यवाद", "merci", "danke", "ありがとう", "谢谢", "Спасибо",
  "شكراً", "감사합니다", "ευχαριστώ", "grazie", "terima kasih", "धन्यबाद", "tack",
  "dziękuję", "mersi", "hvala", "धन्यवाद", "ขอบคุณ", "ありがとう ございます", "salamat",
  "धन्यवाद", "მადლობა", "спасибі", "multumesc", "tänan", "aitäh", "faleminderit",
  "شكرا جزيلا", "धन्यवाद छ", "děkuji", "kiitos", "takk", "tak"
];

export default function ConferenceFooter() {
  const [helloText, setHelloText] = useState('Hello');

  useEffect(() => {
    const interval = setInterval(() => {
      setHelloText(prev => helloVariants[(helloVariants.indexOf(prev) + 1) % helloVariants.length]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className='bg-dark px-6 py-14 text-white'>
      <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left'>

        {/* Left: Logo & Description */}
        <div className='w-full md:w-1/4 flex flex-col items-start'>
          <Link href='/' aria-label='AsyncAPI Conference'>
            <img src='/img/logos/2025-logo.png' alt='AsyncAPI Logo' className='h-10 w-auto mb-4' />
          </Link>
          <p className='font-bold text-lg md:text-2xl mb-3'>
            A Global Gathering for <br /> API Experts, Architects, and Enthusiasts.
          </p>
        </div>

        {/* Center: The Initiative*/}
        <div className='w-full md:w-1/2 flex justify-between px-10'>
          <div className='w-full items-center mt-[-80px]'>
            <h3 className='font-bold text-lg md:text-2xl mb-3'>The Initiative</h3>
            <ul className='text-base'>
              {initiativeLinks.map((link, index) => (
                <li key={index} className='mb-2'>
                  <Link href={link.url} className='hover:text-gray-300 transition duration-300 ease-in-out'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        <div className='w-auto flex justify-between px-10 ml-[-1300px]'>
          <div className='w-full items-center mt-[-80px]'>
            <h3 className='font-bold text-lg md:text-2xl mb-3'>News</h3>
            <p className='text-base'>Stay updated with the latest news and updates.</p>
            <Link href='mailto:press@asyncapi.io' className='text-secondary-500 underline hover:text-gray-300'>Email Us</Link>
          </div>
        </div>
          <div className='flex flex-col items-center mt-[-80px] ml-[-500px]'>
            <h3 className='font-bold text-lg md:text-2xl mb-3'>Follow Us</h3>
            <ul className='text-base'>
              {socialMediaLinks.map((link, index) => (
                <li key={index} className='mb-2 flex items-center'>
                  <a href={link.url} target='_blank' rel='noopener noreferrer' className='flex items-center hover:text-gray-300'>
                    {link.icon}
                    <span className='ml-2'>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='border-t border-gray-600 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center'>
        <p className='text-sm text-center md:text-left'>
          Made with <span className='font-mono text-secondary-500'>❤️</span> by the AsyncAPI Community.
        </p>
        <p className='text-sm text-center md:text-right mt-4 md:mt-0'>
          {helloText}
        </p>
        <p className='text-sm text-center md:text-right mt-4 md:mt-0'>
          Copyright &copy; AsyncAPI Conference. Powered by AsyncAPI Initiative.{' '}
          <a href='https://asyncapi.com' className='text-secondary-500 underline hover:text-gray-300' target='_blank' rel='noopener noreferrer'>
            asyncapi.com
          </a>
        </p>
      </div>
    </footer>
  );
}

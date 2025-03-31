import React, { useState, useEffect } from 'react';
import { Twitter, Github, Linkedin, Youtube, Slack, Twitch } from 'lucide-react';
import Button from '../Buttons/button';

const helloVariants = [
  "Hello", "Hola", "नमस्ते", "Bonjour", "Hallo", "こんにちは", "你好", 
  "Здравствуйте", "مرحبا", "안녕하세요", "Γειά σου", "Ciao", "Selamat", 
  "Szia", "Hej", "Ahoj", "Hei", "Salut", "Olá", "Привіт", "Halo"
];

function Footer() {
  const [greeting, setGreeting] = useState(helloVariants[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(prev => {
        const currentIndex = helloVariants.indexOf(prev);
        const nextIndex = (currentIndex + 1) % helloVariants.length;
        return helloVariants[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* Left Column - Logo & Description */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-4">
              <img src="/img/logos/2025-logo.png" alt="AsyncAPI Logo" className="h-10 mr-3" />
            </div>
            <p className="text-lg text-gray-300">
              A Global Gathering for API Experts, Architects, and Enthusiasts.
            </p>
          </div>

          {/* Middle Column - Subscription */}
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Subscribe for AsyncAPI Conf updates!</h3>
            <a 
              href="https://www.asyncapi.com/newsletter" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block"
            >
              <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </a>
          </div>

          {/* Right Column - Social Links */}
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Twitter size={20} />, name: 'Twitter', url: 'https://x.com/asyncapispec' },
                { icon: <Github size={20} />, name: 'GitHub', url: 'https://github.com/asyncapi' },
                { icon: <Linkedin size={20} />, name: 'LinkedIn', url: 'https://linkedin.com/company/asyncapi' },
                { icon: <Youtube size={20} />, name: 'YouTube', url: 'https://youtube.com/asyncapi' },
                { icon: <Slack size={20} />, name: 'Slack', url: 'https://asyncapi.com/slack-invite' },
                { icon: <Twitch size={20} />, name: 'Twitch', url: 'https://twitch.tv/asyncapi' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <span className="mr-2">{social.icon}</span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            Made with <span className="text-red-500">❤️</span> by the AsyncAPI Community
          </p>
          <p className="text-gray-400 mt-2 md:mt-0 animate-pulse">
            {greeting}!
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

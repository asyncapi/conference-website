import React, { useState, useEffect } from "react";
import Button from "../Buttons/button";

const helloVariants = [
  "Hello", "Hola", "नमस्ते", "Bonjour", "Hallo", "こんにちは", "你好",
  "Здравствуйте", "مرحبا", "안녕하세요", "Γειά σου", "Ciao", "Selamat",
  "Szia", "Hej", "Ahoj", "Hei", "Salut", "Olá", "Привіт", "Halo"
];

const socialLinks = [
  { name: "Twitter", url: "https://x.com/asyncapispec", icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtdHdpdHRlci1pY29uIGx1Y2lkZS10d2l0dGVyIj48cGF0aCBkPSJNMjIgNHMtLjcgMi4xLTIgMy40YzEuNiAxMC05LjQgMTcuMy0xOCAxMS42IDIuMi4xIDQuNC0uNiA2LTJDMyAxNS41LjUgOS42IDMgNWMyLjIgMi42IDUuNiA0LjEgOSA0LS45LTQuMiA0LTYuNiA3LTMuOCAxLjEgMCAzLTEuMiAzLTEuMnoiLz48L3N2Zz4=" },
  { name: "GitHub", url: "https://github.com/asyncapi", icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtZ2l0aHViLWljb24gbHVjaWRlLWdpdGh1YiI+PHBhdGggZD0iTTE1IDIydi00YTQuOCA0LjggMCAwIDAtMS0zLjVjMyAwIDYtMiA2LTUuNS4wOC0xLjI1LS4yNy0yLjQ4LTEtMy41LjI4LTEuMTUuMjgtMi4zNSAwLTMuNSAwIDAtMSAwLTMgMS41LTIuNjQtLjUtNS4zNi0uNS04IDBDNiAyIDUgMiA1IDJjLS4zIDEuMTUtLjMgMi4zNSAwIDMuNUE1LjQwMyA1LjQwMyAwIDAgMCA0IDljMCAzLjUgMyA5LjUgNiA5LjUtLjM5LjQ5LS42OCAxLjA1LS44NSAxLjY1LS4xNy42LS4yMiAxLjIzLS4xNSAxLjg1djQiLz48cGF0aCBkPSJNOSAxOGMtNC41MSAyLTUtMi03LTIiLz48L3N2Zz4=" },
  { name: "LinkedIn", url: "https://linkedin.com/company/asyncapi", icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbGlua2VkaW4taWNvbiBsdWNpZGUtbGlua2VkaW4iPjxwYXRoIGQ9Ik0xNiA4YTYgNiAwIDAgMSA2IDZ2N2gtNHYtN2EyIDIgMCAwIDAtMi0yIDIgMiAwIDAgMC0yIDJ2N2gtNHYtN2E2IDYgMCAwIDEgNi02eiIvPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEyIiB4PSIyIiB5PSI5Ii8+PGNpcmNsZSBjeD0iNCIgY3k9IjQiIHI9IjIiLz48L3N2Zz4=" },
  { name: "YouTube", url: "https://youtube.com/asyncapi", icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUteW91dHViZS1pY29uIGx1Y2lkZS15b3V0dWJlIj48cGF0aCBkPSJNMi41IDE3YTI0LjEyIDI0LjEyIDAgMCAxIDAtMTAgMiAyIDAgMCAxIDEuNC0xLjQgNDkuNTYgNDkuNTYgMCAwIDEgMTYuMiAwQTIgMiAwIDAgMSAyMS41IDdhMjQuMTIgMjQuMTIgMCAwIDEgMCAxMCAyIDIgMCAwIDEtMS40IDEuNCA0OS41NSA0OS41NSAwIDAgMS0xNi4yIDBBMiAyIDAgMCAxIDIuNSAxNyIvPjxwYXRoIGQ9Im0xMCAxNSA1LTMtNS0zeiIvPjwvc3ZnPg==" },
  { name: "Slack", url: "https://asyncapi.com/slack-invite", icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtc2xhY2staWNvbiBsdWNpZGUtc2xhY2siPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjgiIHg9IjEzIiB5PSIyIiByeD0iMS41Ii8+PHBhdGggZD0iTTE5IDguNVYxMGgxLjVBMS41IDEuNSAwIDEgMCAxOSA4LjUiLz48cmVjdCB3aWR0aD0iMyIgaGVpZ2h0PSI4IiB4PSI4IiB5PSIxNCIgcng9IjEuNSIvPjxwYXRoIGQ9Ik01IDE1LjVWMTRIMy41QTEuNSAxLjUgMCAxIDAgNSAxNS41Ii8+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iMyIgeD0iMTQiIHk9IjEzIiByeD0iMS41Ii8+PHBhdGggZD0iTTE1LjUgMTlIMTR2MS41YTEuNSAxLjUgMCAxIDAgMS41LTEuNSIvPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjMiIHg9IjIiIHk9IjgiIHJ4PSIxLjUiLz48cGF0aCBkPSJNOC41IDVIMTBWMy41QTEuNSAxLjUgMCAxIDAgOC41IDUiLz48L3N2Zz4=" },
  { name: "Twitch", url: "https://twitch.tv/asyncapi", icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtdHdpdGNoLWljb24gbHVjaWRlLXR3aXRjaCI+PHBhdGggZD0iTTIxIDJIM3YxNmg1djRsNC00aDVsNC00VjJ6bS0xMCA5VjdtNSA0VjciLz48L3N2Zz4=" }
];

function Footer() {
  const [greeting, setGreeting] = useState(helloVariants[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting((prev) => {
        const currentIndex = helloVariants.indexOf(prev);
        return helloVariants[(currentIndex + 1) % helloVariants.length];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-2/5">
            <div className="flex items-center mb-4">
              <img src="/img/logos/2025-logo.png" alt="AsyncAPI Logo" className="h-12 mr-3" />
            </div>
            <p className="text-lg text-gray-300">
              A Global Gathering for API Experts, Architects, and Enthusiasts.
            </p>
          </div>
          <div className="md:w-3/5 flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold mb-4">Subscribe for AsyncAPI Conf updates!</h3>
              <a href="https://www.asyncapi.com/newsletter" target="_blank" rel="noreferrer" className="inline-block">
                <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </a>
              <div className="mt-4">
                <a
                  href="https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white inline-block px-2 py-2 rounded-lg transition-colors hover:bg-gray-800"
                >
                  Code of Conduct
                </a>
              </div>
            </div>

            {/* Follow Us section */}
            <div className="flex flex-col md:w-auto">
              {/* Mobile View - Horizontal Icons */}
              <div className="md:hidden">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={`mobile-${index}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <img src={social.icon} alt={social.name} className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Desktop View - Vertical List */}
            <div className="md:w-auto md:ml-auto items-center md:justify-end relative top-[-118px]">
              <div className="hidden md:block">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <ul className="flex flex-col space-y-3">
                  {socialLinks.map((social, index) => (
                    <li key={`desktop-${index}`}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-white transition-colors"
                      >
                        <img src={social.icon} alt={social.name} className="w-5 h-5 mr-2" />
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left mb-2 md:mb-0">
            Made with <span className="text-red-500">❤️</span> by the AsyncAPI Community
          </p>
          <p className="text-gray-400 animate-pulse">{greeting}!</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

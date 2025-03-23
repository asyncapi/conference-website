import React from "react";
import { ExternalLink } from "lucide-react";

const PastEditionCard = ({ url }) => {
  let year = url.split(".")[1];

  return (
    <div className="relative group rounded-2xl overflow-hidden transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 p-[3px] rounded-2xl bg-[radial-gradient(circle_at_top_left,#AD20E2_10%,#2DCCFD_90%)] opacity-70 transition-all duration-500 group-hover:blur-md group-hover:opacity-100"></div>

      {/* Inner Card with Glassmorphism */}
      <div className="relative bg-white/10 backdrop-blur-xl shadow-lg border border-white/10 rounded-2xl p-6 w-full mx-auto transition-all duration-500 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-white font-extrabold tracking-wide">{year}</h1>
          <a
            href={url}
            rel="noreferrer"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-lg transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #6B1BBA, #4E0D99)", // Dark Purple Gradient
              boxShadow: "0px 4px 15px rgba(107, 27, 186, 0.5)", // Subtle Glow Effect
            }}
          >
            View Website <ExternalLink size={18} />
          </a>
        </div>

        {/* Website Preview */}
        <div className="relative my-5 rounded-xl overflow-hidden border border-white/15 shadow-lg">
          <iframe
            src={url}
            height={250}
            width="100%"
            scrolling="no"
            className="pointer-events-none overflow-hidden rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40"></div>
        </div>
      </div>
    </div>
  );
};

export default PastEditionCard;

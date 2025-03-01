"use client";
import { Open_Sans } from "next/font/google";
import React, { useEffect, useState } from "react";

const openSans = Open_Sans({ subsets: ["latin"] });

const thankyouList = [
"thank you",   // English
  "gracias",     // Spanish
  "धन्यवाद",    // Hindi
  "merci",       // French
  "danke",       // German
  "ありがとう",    // Japanese
  "谢谢",        // Chinese (Simplified)
  "Спасибо",     // Russian
  "شكراً",      // Arabic
  "감사합니다",    // Korean
  "ευχαριστώ",   // Greek
  "grazie",      // Italian
  "terima kasih",// Indonesian/Malay
  "धन्यबाद",     // Nepali
  "tack",        // Swedish
  "dziękuję",    // Polish
  "mersi",       // Romanian
  "hvala",       // Serbian/Croatian/Bosnian
  "धन्यवाद",     // Marathi
  "ขอบคุณ",      // Thai
  "ありがとう ございます", // Japanese (formal)
  "salamat",     // Filipino (Tagalog)
  "धन्यवाद",     // Sanskrit
  "მადლობა",     // Georgian
  "спасибі",     // Ukrainian
  "multumesc",   // Romanian
  "tänan",       // Estonian
  "aitäh",       // Estonian (alternative)
  "faleminderit",// Albanian
  "شكرا جزيلا",  // Arabic (formal)
  "धन्यवाद छ",   // Maithili
  "děkuji",      // Czech
  "kiitos",      // Finnish
  "takk",        // Norwegian
  "tak",         // Danish
];

function ChangingHello() {
  const [currthank, setCurrThank] = useState(thankyouList[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentIndex = thankyouList.indexOf(currthank);
      const nextIndex = (currentIndex + 1) % thankyouList.length;
      setCurrThank(thankyouList[nextIndex]);
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, [currthank]);

  return (
    <div
      className={`${openSans.className} md:pl-36 flex flex-col items-center justify-center text-6xl font-semibold`}
    >
      <p>
        {currthank === "شكراً" && "!"} {currthank}{" "}
        {currthank !== "شكراً" && "!"}
      </p>
    </div>
  );
}

export default ChangingHello;

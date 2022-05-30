import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from "../illustrations/logo.svg";

function Navbar() {
  return (
    <div
      className="flex justify-between p-3"
      style={{
        borderBottom: "1px solid #2b2146",
      }}
    >
      <div className="flex items-center">
        <Image src={logo} alt="AsyncAPI" />{" "}
        <span className="glow ml-3">Conf</span>
      </div>
      <div className="flex items-center justify-between w-1/5 text-fainted-white font-bold text-sm">
        {/* <Link href="#">Schedule</Link>
        <Link href="#">Speakers</Link>
        <Link href="#">Expo</Link>
        <Link href="#">Jobs</Link> */}
      </div>
    </div>
  );
}

export default Navbar
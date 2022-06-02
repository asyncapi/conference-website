import React from 'react';

function Navbar() {
  return (
    <div
      className="flex justify-between p-3"
      style={{
        borderBottom: "1px solid #2b2146",
      }}
    >
      <div className="flex items-center">
      <img src="logo.svg"/>{" "}
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
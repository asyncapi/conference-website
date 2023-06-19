import Link from 'next/link';

function Navbar() {
  return (
    <div className="flex justify-between h-[84px] sticky top-0 w-full">
      <div className="flex items-center sm:justify-between text-white sm:w-full">
        <Link href="/">
          <div className="flex items-center cursor-pointer w-[60%] sm:w-[30%]">
            <img src="/img/logo.png" alt="conference logo" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar
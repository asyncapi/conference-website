import logo from '../illustration/logo.png';
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  return (
    <div className="flex justify-between h-[84px] sticky top-0 w-full">
      <div className="flex items-center sm:justify-between text-white sm:w-full">
        <Link href="/">
          <div className="flex items-center cursor-pointer w-[60%]">
            <Image src={logo} alt="conference logo" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar
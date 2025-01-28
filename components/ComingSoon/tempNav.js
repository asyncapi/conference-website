import Image from "next/image";
import Button from "../Buttons/button";
import Link from "next/link";
import Arrow from "../illustration/arrow";

export function Nav(){
    return <div className="mt-4 flex justify-between items-center">
        <div>
            <Image src='/img/logo-plain.png' alt='conference logo' width={40} height={40}  />
        </div>
        <div>
            <Link href='/editions'>
            <button
            type="submit"
            className="px-3 py-3 bg-white text-black text-sm hover:bg-gray-100 transition-colors rounded-md flex items-center"
          >
            <span>Past Editions</span> <Arrow className={'w-[15px] h-[15px] ml-2'} fill={'black'} />
          </button></Link>
        </div>
    </div>
}
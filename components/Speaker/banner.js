import Image from 'next/image';

export default function CFSBanner() {
  return (
    <div className='relative bg-black'>
      <div className='w-full opacity-40'>
        <Image
          alt='Call For Speaker Bg'
          src='/img/CFS-Banner.png'
          width={1440}
          height={484}
          layout='responsive'
          objectFit='cover'
        />
      </div>
      <div className='absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 text-center px-4'>
        <h1 className='text-6xl lg:text-3xl  font-workSans font-bold text-white'>
          Call For Speakers
        </h1>
        <h1 className='text-green-500  lg:text-xl text-3xl'>
          Paris Edition
        </h1>
      </div>
    </div>
  );
}

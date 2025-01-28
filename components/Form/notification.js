import Link from 'next/link';
import Button from '../Buttons/button';
import Arrow from '../illustration/arrow';

const NotificationForm = () => {
  return (
    <div className="flex items-center justify-center p-4 mt-10">
      <div className='w-full'>
        <div className="flex p-2 items-center bg-gray-800 rounded-lg flex justify-between px-4">
          <div className='flex items-center text-gray-400'><span>Kindly subscribe to our newsletter to get notified</span> <span><Arrow className={'w-[15px] ml-4'} /></span></div>
          <Link href='https://www.asyncapi.com/en/newsletter' target='_blank' rel='noopener noreferrer'><Button className={'px-6 py-3 font-semibold hover:bg-gray-100 transition-colors rounded-md'}>Notify Me</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationForm;
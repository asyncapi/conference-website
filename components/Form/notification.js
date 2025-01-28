import { useState } from 'react';
import Button from '../Buttons/button';

const NotificationForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="flex items-center justify-center p-4 mt-10">
      <form onSubmit={handleSubmit} className='w-full'>
        <div className="flex p-2 items-center bg-gray-800 rounded-lg overflow-hidden">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your email address"
            className="flex-1 px-4 py-3 bg-transparent text-gray-300 placeholder-gray-400 focus:outline-none"
            required
          />
          <Button className={'px-6 py-3 font-semibold hover:bg-gray-100 transition-colors rounded-md'}>Notify Me</Button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;
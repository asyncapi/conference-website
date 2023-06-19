import React from 'react'

function Subscription() {
    return (
        <form name="form 1" method="POST" className='flex sm:flex-col' data-netlify="true">
            <input type='email' placeholder='Enter your email' required className='w-[90%] sm:w-full p-4 border border-black' />
            <button type='submit' className='p-4 bg-black text-white'>Subscribe</button>
      </form>
  )
}

export default Subscription
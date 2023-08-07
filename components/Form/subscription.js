import React from 'react'

function Subscription() {
    return (
        <form action='asyncapi-website.netlify.app' name="form 1" method="POST" className='flex sm:flex-col' data-netlify="true">
            <input type="hidden" name="form-name" value="form 1" />
            <input type='email' name='email' placeholder='Enter your email' required className='w-[90%] sm:w-full p-4 border border-black' />
            <button type='submit' className='p-4 bg-black text-white'>Subscribe</button>
      </form>
  )
}

export default Subscription

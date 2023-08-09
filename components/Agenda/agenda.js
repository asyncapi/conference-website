import React from 'react'
import Heading from '../Typography/heading'
import Paragraph from '../Typography/paragraph'

function Agenda() {
  return (
		<div className='container flex flex-col justify-center items-center'>
			<Heading className='text-[30px] text-white'>
				Agenda
			</Heading>
			<Paragraph className='mt-[16px]'>
				The conference will commence at 8:00am BST (UTC+1)
			</Paragraph>
			<div className='w-[720px] lg:w-full mt-[140px] text-center'>
				<Heading typeStyle='lg' className='text-white text-[30px]'>
					Agendas Coming Soon - Stay Tuned!
				</Heading>
          </div>
		</div>
	);
}

export default Agenda
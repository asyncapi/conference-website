import React, { useState } from 'react'
import Plus from '../illustration/plus';

const faqs = [
    {
        q: 'I heard you are hosting events in multiple cities. Will I be able to attend in-person?',
        a: "The main event is the October 5th event, online and in San Francisco. We are also piloting small, regional events this year in New York City, Chicago, and London that will not be live streamed. Tickets to all in-person events are very limited, and will be available when registration is opened later this summer. You can also expect to see AsyncAPI community members hosting their own meet-ups and events alongside AsyncAPI Conf. We'll make all of that information available on the AsyncAPI Conf website when ready!"
    },
    {
        q: 'Who can submit a talk?',
        a: "We're excited to have speakers from different parts of the globe sharing how they apply the AsyncAPI Specification in their practical use cases. We encourage proposals from all individuals, regardless of their expertise level, to promote a diverse content track that welcomes everyone."
    }

]

function Faq() {
    const [show, setShow] = useState(null);
  return (
      <div className='z-[9] mt-10'>
          {faqs.map((faq, i) => {
              return <div key={faq.q}>
                  <div className='pb-4 mt-4 ' style={{
                      borderBottom: "1px solid #333"
                  }}>
                      <div className='flex justify-between'>
                          <h2 className={`text-xl w-[90%] ${show === i ? "text-tetiary-pink" : "text-white"}`}>{faq.q}</h2>
                          <button className='pointer border h-[30px] border-[#ffff] mr-[20px] rounded-3xl p-1' onClick={() => {
                              if (show === i) {
                                  setShow(null)
                              } else {
                                  setShow(i)
                              }
                          } }><Plus className={`w-[20px] transition-transform  duration-700 ${show === i ? 'rotate-12' : 'rotate-90'}`} /></button>
                      </div>
                      <p className={`mt-8 text-md ${show === i ? "block" : "hidden"}`}>{faq.a}</p>
                      
                  </div>

              </div>
          })}
    </div>
  )
}

export default Faq
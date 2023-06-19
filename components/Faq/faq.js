import React, { useState } from 'react'
import Plus from '../illustration/plus';

const faqs = [
    {
        q: 'What is AACoT?',
        a: 'AsyncAPI Conf on Tour (AACoT) is a way for you to experience the excitement and energy of this series of micro-conferences hosted around the globe, where the brightest minds and most passionate enthusiasts gather to share their knowledge and explore the latest developments in the field.',
    },

    {
        q: 'I heard you are hosting events in multiple cities. Will I be able to attend in-person?',
        a: "We are piloting a set of regional events this year in London, Madrid, and Banglore. Tickets to some of this events are very limited, and will be available when registration is opened later this summer. We'll make all of that information available on the AsyncAPI Conf website when ready!"
    },
    {
        q: 'Who can submit a talk?',
        a: "We're excited to have speakers from different parts of the globe sharing how they apply the AsyncAPI Specification in their practical use cases. We encourage proposals from all individuals, regardless of their expertise level, to promote a diverse content track that welcomes everyone."
    },
    {
        q: "Talks we don't recommend",
        a: 'Marketing/Sales - rather share your experience or use case using our tools or specification.'
    },
    {
        q: 'Talks Review',
        a: 'Reviews will be kept anonymous, and reviewers will not have access to speaker information such as name, gender or company, etc.'
    },
    {
        q: 'Can I send a virtual talk?',
        a: 'No, this is an in-person event; all speakers must deliver their sessions in person.'
    },
    {
        q: 'Can i get my expenses covered?',
        a: 'We sponsor conference tickets to Speakers, TSC members, and AsyncAPI Ambassadors.'
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
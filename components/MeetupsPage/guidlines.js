import React from 'react';

const GuidelinesPage = () => {
  return (
    <div>
      <div className=" mx-auto container">
        {/* Two column layout for desktop */}
        <div className="md:p-4 grid grid-cols-2 lg:grid-cols-1  gap-6">
          {/* Requirements Column */}
          <div className="bg-white bg-opacity-10  rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-500 rounded-full p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-white text-xl font-bold">Requirements</h2>
            </div>
            {/* Requirements List */}
            <div className="space-y-6">
              <div className="flex">
                <div className="bg-green-500 rounded-full p-1 mr-3 h-6 w-6 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Working Group Membership</h3>
                  <p className="text-gray-300 text-sm mt-1">Be part of the Conference Coordination Working Group to host meetups.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-green-500 rounded-full p-1 mr-3 h-6 w-6 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Planning Responsibility</h3>
                  <p className="text-gray-300 text-sm mt-1">Manage the meetup planning, CFP process, and speaker coordination.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-green-500 rounded-full p-1 mr-3 h-6 w-6 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Advanced Notice</h3>
                  <p className="text-gray-300 text-sm mt-1">Announce meetups at least three months before the intended date.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-green-500 rounded-full p-1 mr-3 h-6 w-6 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Code of Conduct</h3>
                  <p className="text-gray-300 text-sm mt-1">Ensure all participants adhere to the AsyncAPI Code of Conduct.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Guidelines Column */}
          <div className="bg-white bg-opacity-10  rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-500 rounded-full p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-white text-xl font-bold">Guidelines</h2>
            </div>
            
            {/* Guidelines List */}
            <div className="space-y-6">
              <div className="flex">
                <div className="bg-green-500 rounded-full p-1 mr-3 h-6 w-6 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Company Sponsorship</h3>
                  <p className="text-gray-300 text-sm mt-1">Companies can sponsor by hosting meetups or providing equipment for streaming/recording.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-green-500 rounded-full p-1 mr-3 h-6 w-6 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Content Focus</h3>
                  <p className="text-gray-300 text-sm mt-1">Meetups should be educational and focus on knowledge sharing rather than sales or marketing.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-red-500 rounded-full p-1 mr-3 h-6 w-6 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">No Sales Talks</h3>
                  <p className="text-gray-300 text-sm mt-1">Sales or marketing presentations are strictly prohibited during meetups.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-green-500 rounded-full p-1 mr-3 h-6 w-6 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Working Group Coordination</h3>
                  <p className="text-gray-300 text-sm mt-1">Coordinate with design, marketing, and conference website maintainers to ensure smooth organization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Steps to oraganize a meetup*/}  
       
      <div className="py-6  mx-auto">
        <div className="bg-white bg-opacity-10 rounded-lg   py-12 px-8">
          <h2 className="text-white text-2xl font-bold mb-8">Steps to Organize a Meetup</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center text-purple-900 font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-white text-lg font-medium">Open a Discussion</h3>
                <p className="text-gray-300 mt-1">
                  Start a discussion thread on the conference-website outlining your meetup proposal. Tag the{' '}
                  <a href="#" className="text-blue-400 hover:underline">@asyncapi/conference_coordination_wg</a>{' '}
                  members.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center text-purple-900 font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-white text-lg font-medium">Share on Slack</h3>
                <p className="text-gray-300 mt-1">
                  After opening the discussion with the details of your meetup, share your proposal in the{' '}
                  <a href="#" className="text-blue-400 hover:underline">#wg-conference-coordination</a>{' '}
                  Slack channel. It will help gather feedback and support from community members.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center text-purple-900 font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-white text-lg font-medium">Coordinate with the Working Group</h3>
                <p className="text-gray-300 mt-1">
                  Start a discussion thread on the conference-website outlining your meetup proposal. Tag the{' '}
                  <a href="#" className="text-blue-400 hover:underline">@asyncapi/conference_coordination_wg</a>{' '}
                  members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
      </div>
   
  );
};

export default GuidelinesPage;

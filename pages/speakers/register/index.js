import Paper from '../../../components/Form/paper';


export default function SpeakersForm(){
    return(<div className='flex justify-center container border  border-x-0 border-b-0 border-[#333]'>
        <Paper />
    </div>)
}

// export default function SpeakersForm() {
//     function handleSubmit(event) {
//         event.preventDefault();

//         // Get form values
//         const selectedEvent = document.getElementById('event').value;
//         const conferenceTrack = document.getElementById('conferenceTrack').value;
//         const firstName = document.getElementById('firstName').value;
//         const lastName = document.getElementById('lastName').value;
//         const gender = document.querySelector('input[name="gender"]:checked').value;
//         const jobTitle = document.getElementById('jobTitle').value;
//         const company = document.getElementById('company').value;
//         const email = document.getElementById('email').value;
//         const phoneNumber = document.getElementById('phoneNumber').value;
//         const country = document.getElementById('country').value;
//         const linkedinUrl = document.getElementById('linkedinUrl').value;
//         const talkTitle = document.getElementById('talkTitle').value;
//         const talkAbstract = document.getElementById('talkAbstract').value;
//         const previousTalkVideo = document.getElementById('previousTalkVideo').value;
//         const coPresenter = document.getElementById('coPresenter').value;
//         const mcTrack = document.getElementById('mcTrack').checked;
//         const apiExpert = document.getElementById('apiExpert').value;
//         const sponsorship = document.getElementById('sponsorship').checked;
//         const apiInfluencer = document.getElementById('apiInfluencer').checked;
//         const codeOfConduct = document.getElementById('codeOfConduct').checked;

//         // Perform form validation
//         if (!selectedEvent || !conferenceTrack || !firstName || !lastName || !gender || !jobTitle || !company || !email || !phoneNumber || !country || !linkedinUrl || !talkTitle || !talkAbstract || !previousTalkVideo || !coPresenter || !apiExpert) {
//             alert('Please fill in all the required fields.');
//             return;
//         }

//         // Create an object with the form data
//         const formData = [
//             selectedEvent,
//             conferenceTrack,
//             firstName,
//             lastName,
//             gender,
//             jobTitle,
//             company,
//             email,
//             phoneNumber,
//             country,
//             linkedinUrl,
//             talkTitle,
//             talkAbstract,
//             previousTalkVideo,
//             coPresenter,
//             mcTrack,
//             apiExpert,
//             sponsorship,
//             apiInfluencer
//         ];
//         // Import the axios library

//         // Send the form data to the server
//         axios.post('/api/speakers/register', formData)
//             .then(response => {
//                 // Handle the response from the server
//                 console.log(response.data);
//                 alert('Form submitted successfully!');
//             })
//             .catch(error => {
//                 // Handle any errors that occur during the form submission
//                 console.error(error);
//                 alert('An error occurred while submitting the form. Please try again later.');
//             });
//     }
//             return (
//                 <div className="text-white flex flex-col w-[33rem] px-10 ml-24 gap-2"> 
//                     <div>

//                         <label htmlFor="event" className="flex">Which event are you interested in?</label>
//                         <select id="event" className="text-black">
//                             <option value="option1">Option 1</option>
//                             <option value="option2">Option 2</option>
//                             <option value="option3">Option 3</option>
//                         </select>
                    
//                     </div>
//                 <div>

//                     <label htmlFor="conferenceTrack">In what conference track would the talk be the most impactful?</label>
//                     <select id="conferenceTrack" className="text-black">
//                         <option value="track1">Track 1</option>
//                         <option value="track2">Track 2</option>
//                         <option value="track3">Track 3</option>
//                     </select>

//                 </div>
//                     <div>
//                     <label htmlFor="firstName" className="flex">First Name</label>
//                     <input type="text" id="firstName" />

//                     <label htmlFor="lastName" className="flex">Last Name</label>
//                     <input type="text" id="lastName" />
//                     </div>

//                     <div>

//                         <label htmlFor="gender">Gender</label>
//                         <div className="flex gap-4">

//                         <div>
//                             <input type="radio" id="male" name="gender" value="male" />
//                             <label htmlFor="male">Male</label>
//                         </div>
//                         <div>
//                             <input type="radio" id="female" name="gender" value="female" />
//                             <label htmlFor="female">Female</label>
//                         </div>
//                         <div>
//                             <input type="radio" id="nonBinary" name="gender" value="nonBinary" />
//                             <label htmlFor="nonBinary">Non-Binary</label>
//                         </div>
//                         </div>

//                     </div>

//                     <label htmlFor="jobTitle">Job Title</label>
//                     <input type="text" id="jobTitle" />

//                     <label htmlFor="company">Company</label>
//                     <input type="text" id="company" />

//                     <label htmlFor="email">Email</label>
//                     <input type="email" id="email" />

//                     <label htmlFor="phoneNumber">Phone Number</label>
//                     <input type="tel" id="phoneNumber" />

//                     <label htmlFor="country">Country</label>
//                     <input type="text" id="country" />

//                     <label htmlFor="linkedinUrl">LinkedIn Url</label>
//                     <input type="text" id="linkedinUrl" />

//                     <label htmlFor="talkTitle">Please share a title of what you&apos;d like to talk about (70 characters maximum spaces included)</label>
//                     <input type="text" id="talkTitle" />

//                     <label htmlFor="talkAbstract">Can you share a quick abstract describing your talk?</label>
//                     <textarea id="talkAbstract"></textarea>

//                     <label htmlFor="previousTalkVideo">Can you share a video or link of a previous talk?</label>
//                     <input type="text" id="previousTalkVideo" />

//                     <label htmlFor="coPresenter">Are you planning to co-present this talk with a colleague, a partner, or a customer? If yes, can you share his/her name, role, company, and email?</label>
//                     <textarea id="coPresenter"></textarea>
//                     <div className="flex gap-20">
//                         <label htmlFor="mcTrack">Are you interested in being the MC (Master of Ceremony) of a track?</label>
//                         <input type="checkbox" id="mcTrack" />
//                     </div>

//                 <div className="">

//                     <label htmlFor="apiExpert">Which API expert would you recommend us to invite to speak?</label>
//                     <input type="text" id="apiExpert" />
//                 </div>
//                 <div className="flex gap-20">
//                     <label htmlFor="sponsorship">Interested in sponsoring the event?</label>
//                     <input type="checkbox" id="sponsorship" required />
//                 </div>

//                 <div className="flex gap-20">
//                     <label htmlFor="apiInfluencer">Are you interested in joining our API Influencer program to get more exposure of your work and content?</label>
//                     <input type="checkbox" id="apiInfluencer" />
//                 </div>

//                 <div className="flex gap-20">
//                     <label htmlFor="codeOfConduct">I read and have accepted the speaker guidelines and our code of conduct</label>
//                     <input type="checkbox" id="codeOfConduct" />
//                 </div>
//                 <div>
//                     <button onClick={handleSubmit} className="bg-white text-black">Submit</button>
//                 </div>
//                 </div>
//     );
// }


// https://www.apidays.global/speakingguidelines/

// https://www.apidays.global/code-of-conduct/
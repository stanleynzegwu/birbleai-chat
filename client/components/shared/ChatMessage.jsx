// import bot from '/logo.svg'
// import user from'/user.png'

// export const ChatMessage = (isAi, value, uniqueId) => {
//     `<div className=${`wrapper ${isAi && 'ai'}`}>
//         <div className="chat">
//             <div className="profile">
//                 <img 
//                   className="profile_Img"
//                   src="${isAi ? bot : user}"
//                   alt="${isAi ? 'bot' : 'user'}" 
//                 />
//             </div>
//         <   div className="message" id={uniqueId}>${value}</div>
//         </div>
//     </div>`
// }

import bot from '/logo.svg';
import user from '/user.png';

export const ChatMessage = (isAi, value, uniqueId) => (`
  <div class="wrapper ${isAi && 'ai'}">
    <div class="chat">
      <div class="profile">
        <img 
          class="profile_Img"
          src="${isAi ? bot : user}"
          alt="${isAi ? 'bot' : 'user'}" 
        />
      </div>
      <div class="message" id="${uniqueId}">${value}</div>
    </div>
  </div>
`);

export default ChatMessage;

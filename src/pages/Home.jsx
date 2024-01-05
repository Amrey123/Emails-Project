import imgUrl from '../assets/imgs/react.png';
import { emailService } from '../services/email.service.js';

export function Home() {
  // const email = emailService.createEmail(
  //   'id',
  //   'Email subject',
  //   'Email body',
  //   'isRead value',
  //   'isStarred value',
  //   'sentAt value',
  //   'removedAt value',
  //   'from value',
  //   'to value'
  // );

  //console.log(email); // You can log the created email to see the result

  emailService._createEmails() 

  return (
    <section className="home">
      <h1>Welcome to our React App</h1>
      <img src={imgUrl} alt="" />
    </section>
  );
}
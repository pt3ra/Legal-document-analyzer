import React from 'react'
import './feedback.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'

const feedback = () => {

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "7a5fa240-5bfe-4f9a-a00e-06c6599beb25");

        const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
        });

        const data = await response.json();

        if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        } else {
        console.log("Error", data);
        setResult(data.message);
        }
    };

  return (
    <div className='feedback'>
        <div className="feedback-col">
            <h3>Send us a message <img src={msg_icon} alt="" /></h3>
            <p>Feel free to reach out through contact form or find our contact information below. Your feedback, questions and suggestions are important to us as we strive to provide exceptional service to our clients.</p>
            <ul>
                <li><img src={mail_icon} alt="" />LexiScan@gmail.com</li>
                <li><img src={phone_icon} alt="" />+380665161056</li>
                <li><img src={location_icon} alt="" />77 massachusetts Ave, Cambridge <br /> MA 02139, United States</li>
            </ul>
        </div>
        <div className="feedback-col">
            <form onSubmit={onSubmit}>
                <label>Your name</label>
                <input type="text" name='name' placeholder='Enter your name' required />
                <label>Phone number</label>
                <input type="tel" name='phone' placeholder='Enter your phone number' required />
                <label>Write your message here</label>
                <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>
                <button type='submit' className='btn dark-btn'>Submit now <img src={white_arrow} alt="" /></button>
            </form>
            <span>{result}</span>
        </div>
    </div>
  )
}

export default feedback
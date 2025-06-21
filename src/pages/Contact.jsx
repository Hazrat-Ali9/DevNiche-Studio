import { useState } from "react";
import contactimage from "../assets/images/support.png";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
}
export default function Contact() {
  const [contact, setContact] = useState(defaultContactFormData)
  const {user, API, token} = useAuth();
  const [userData, setUserData] = useState(true);
  if(userData && user){
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }
  const handleInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    // setContact({
    //   ...contact,
    //   [name]: value
    // })

    setContact((prev)=>({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!token) {
      toast.error("You must be logged in to send a message.");
      return;
    }
    
    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      if(response.ok){
        setContact(defaultContactFormData);
        toast.success('Message sent successfully');
      }else{
        toast.error("Message not sent")
      }

    } catch (error) {
      toast.error('Internal Error! ', error);
    }
  }
  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src={contactimage} alt="we are always ready to help" />
          </div>

          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input type="text" name="username" value={contact.username} onChange={handleInput} id="username" autoComplete="off" required />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" value={contact.email} onChange={handleInput} id="email" autoComplete="off" required />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea name="message" id="message" value={contact.message} onChange={handleInput} autoComplete="off" cols="30" rows="6" required />
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.2273814068!2d74.00473255689361!3d31.483103667512736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1723898952654!5m2!1sen!2s" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
      </section>
    </>
  )
}

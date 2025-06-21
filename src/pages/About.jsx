import { useState } from "react";
import about_image from "../assets/images/about.png";
import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

// eslint-disable-next-line react/prop-types
const About = ({ company_name }) => {
  const {user} = useAuth();
  const [name, setName] = useState('');
  const [userData, setUserData] = useState(true);
  if(user && userData){
    setName(user.username);
    setUserData(false);
  }
  return (
    <>
      <main>
        {/* 1st section */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>{name.length !== 0 ? name:`Welcome to ${company_name}`}</p>
              <h1>Why Choose Us</h1>
              <p>
                At {company_name}, we are dedicated to delivering top-notch IT solutions that drive business success. Our team of experts leverages the latest technology and industry best practices to provide you with cutting-edge solutions.
              </p>

              <br />

              <p>
                We pride ourselves on our commitment to excellence and our ability to tailor our services to meet your specific needs. Whether you need help with software development, IT consulting, or digital transformation, we`ve got you covered.
              </p>

              <br />

              <p>
                Our approach is centered around understanding your business goals and delivering solutions that not only meet but exceed your expectations. Partner with us to unlock new opportunities and achieve your business objectives.
              </p>

              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">Connect Now</button>
                </a>
                <a href="/service">
                  <button className="btn secondary-btn">Learn More</button>
                </a>
              </div>
            </div>

            {/* hero images */}
            <div className="hero-image">
              <img src={about_image} alt="coding together" width="400" height="500" />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section */}
      <Analytics />
    </>
  );
}


export default About;
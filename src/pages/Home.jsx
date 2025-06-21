import { Link } from "react-router-dom";
import design_image from "../assets/images/design.png";
import home_image from "../assets/images/home.png";
import { Analytics } from "../components/Analytics";

export default function Home ({ company_name }) {

  return (
    <>
      <main>
        {/* 1st section */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the Best IT Company</p>
              <h1>Welcome to {company_name}</h1>
              <p>
              Are you ready to take your business to the next level with  cutting-edge IT solutions? Look no further! At {company_name}, we specialize in providing innovative IT services and solutions tailored to meet your unique needs.
              </p>

              <div className="btn btn-group">
                <Link to="/contact">
                  <button className="btn">Connect Now</button>
                </Link>
                <Link to="/service">
                  <button className="btn secondary-btn">Learn More</button>
                </Link>
              </div>
            </div>

            {/* hero images */}
            <div className="hero-image">
              <img src={home_image} alt="coding together" width="400" height="500" 
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section  */}
      <Analytics />

      {/* 3rd section */}

      <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-image">
              <img src={design_image} alt="coding together" width="400" height="500" 
              />
            </div>

            <div className="hero-content">
              <p>We are here to help you</p>
              <h1>Get Started Today</h1>
              <p>
                Ready to take the first step towards a more efficient and secure IT infrastructure? Contact us today for a free consultation and let`s discuss how {company_name} can help your business thrive in the digital age.
              </p>

              <div className="btn btn-group">
                <Link to="/contact">
                  <button className="btn">Connect Now</button>
                </Link>
                <Link to="/service">
                  <button className="btn secondary-btn">Learn More</button>
                </Link>
              </div>
            </div>        
          </div>
        </section>
    </>
  )
}

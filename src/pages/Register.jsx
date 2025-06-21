import { useState } from "react"
import registerimage from "../assets/images/register.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
export default function Register() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
   const {storeTokenInLS, API} = useAuth();
  // handling the input values
  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    })
  }

  //handling the form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const res_data = await response.json();

      if(response.ok){
        // stored the token in localhost
        storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        })
        toast.success("Registration Successfully!")
        navigate('/');
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message);
        
        
      }

    } catch (error) {
      toast.error(error.message);
    }
   
  }

  return (
    <div className="setHeight">
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src={registerimage} alt="registration" width="500" height="500" />
              </div>

              {/* let tackle registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input 
                      type="text"
                      name="username" 
                      placeholder="username" 
                      id="username" 
                      required 
                      autoComplete="off" 
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input 
                      type="email"
                      name="email" 
                      placeholder="enter your email" 
                      id="email" 
                      required 
                      autoComplete="off" 
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">phone</label>
                    <input 
                      type="number"
                      name="phone" 
                      placeholder="phone" 
                      id="phone" 
                      required 
                      autoComplete="off" 
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input 
                      type="password"
                      name="password" 
                      placeholder="password" 
                      id="password" 
                      required 
                      autoComplete="off" 
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />

                  <button type="submit" className="btn btn-submit">Register Now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  )
}

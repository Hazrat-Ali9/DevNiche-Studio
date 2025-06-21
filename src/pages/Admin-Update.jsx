import { useParams } from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const AdminUpdate = () => {
    const params = useParams();
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });
    const {authorizationToken, API} = useAuth();

    const getSingleUserData = async ()=>{
        try {
            const response = await fetch(`${API}/api/admin/users/${params.id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                }
            );
            const data = await response.json()
            setData(data);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(()=> {
        getSingleUserData();
    }, [])
  
    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        })
    }

    // to update the data dynamically
    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/admin/users/update/${params.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });
            if(response.ok){
                toast.success("Updated successfully");
            }else{
                toast.error("Not updated");
            }
        } catch (error) {
            toast.error(error);
        }
    }
  return (
    <div className="setHeight">
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">

              {/* let tackle registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Update User</h1>
                <br />
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                      type="text"
                      name="username" 
                      placeholder="enter your username" 
                      id="username" 
                      required 
                      autoComplete="off" 
                      value={data.username}
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
                      value={data.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input 
                      type="number"
                      name="phone" 
                      placeholder="phone" 
                      id="phone" 
                      required 
                      autoComplete="off" 
                      value={data.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <br />

                  <button type="submit" className="btn btn-submit">Update</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  )
}

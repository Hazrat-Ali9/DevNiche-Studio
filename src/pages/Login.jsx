import { useEffect, useState } from "react";
import loginimage from "../assets/images/login.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function Login() {
    const { API, isAdmin, userAuthentication, storeTokenInLS } = useAuth();
    const URL = `${API}/api/auth/login`;
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const res_data = await response.json();
            if (response.ok) {
                storeTokenInLS(res_data.token);
                toast.success("Login Successful");
                setUser({ email: "", password: "" });
                await userAuthentication(); // Refresh user data
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            toast.error("Internal Error!", error);
        }
    };

    useEffect(() => {

    }, [isAdmin]);

    return (
        <div className="setHeight">
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src={loginimage} alt="login" width="500" height="500" />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            id="email"
                                            required
                                            autoComplete="off"
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            id="password"
                                            required
                                            autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
}

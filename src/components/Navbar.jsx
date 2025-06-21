import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { AdminLayout } from "./layouts/Admin-Layout";

// eslint-disable-next-line react/prop-types
export const Navbar = ({ company_name }) => {
    const { isLoggedIn, admin } = useAuth();
    const location = useLocation();
    const [isAdminUser, setIsAdminUser] = useState(admin);

    useEffect(() => {
        setIsAdminUser(admin);
    }, [admin]);

    const isAdminPath = location.pathname.startsWith("/admin");

    return (
        <header>
            <div className="container grid grid-two-cols">
                <div className="logo-brand">
                    <NavLink to="/">{company_name}</NavLink>
                </div>

                {isAdminPath ? (
                    <AdminLayout />
                ) : (
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/service">Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                            {isAdminUser &&
                                <li>
                                    <NavLink to="/admin/users">Admin</NavLink>
                                </li>
                            }
                            {isLoggedIn ? (
                                <li>
                                    <NavLink to="/logout">Logout</NavLink>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/register">Register</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};

import { FaHome, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import {useAuth} from "../../store/auth";
export const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
      return <h1>Loading ...</h1>;
  }
  console.log("User: ", user)
  if (!user.isAdmin) {
    console.log("calling", user.isAdmin);
    return <Navigate to="/" />;
  }

  return (
      <>
          <header>
              <div className="admin-layout">
                  <nav>
                      <ul>
                          <li>
                              <NavLink to="/admin/users">
                                  <FaUser /> Users
                              </NavLink>
                          </li>
                          <li>
                              <NavLink to="/admin/contacts">
                                  <FaMessage /> Contacts
                              </NavLink>
                          </li>
                          <li>
                              <NavLink to="/">
                                  <FaHome /> Home
                              </NavLink>
                          </li>
                      </ul>
                  </nav>
              </div>
          </header>

          <Outlet />
      </>
  );
};

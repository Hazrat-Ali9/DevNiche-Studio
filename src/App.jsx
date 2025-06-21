import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { PageNotFound } from "./pages/PageNotFound";
import {Logout} from "./pages/Logout";
import {AdminContacts} from "./pages/Admin-Contacts";
import {AdminUsers} from "./pages/Admin-Users";
import { AdminUpdate } from "./pages/Admin-Update";
const App = ()=>{
  const company_name = "DevNiche Studio";
  return (
    <>
      <BrowserRouter>
        <Navbar company_name={company_name}/>
        <Routes>
          <Route path="/" element={<Home company_name={company_name} />}/>
          <Route path="/about" element={<About company_name={company_name} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Nested Route and Admin Route */}
          <Route path="/admin">
            <Route index element={<Navigate to="users" />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
          </Route>
        </Routes>
        <Footer company_name={company_name} />
      </BrowserRouter>
    </>
  )
}

export default App;
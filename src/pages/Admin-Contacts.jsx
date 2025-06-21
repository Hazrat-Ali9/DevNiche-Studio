import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import Modal from 'react-modal';
import { BallTriangle } from "react-loader-spinner";

const customStyles = {
  content: {
    width: '50vw',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const AdminContacts = () => {
  const [users, setUsers] = useState([]);
  const [contact, setContact] = useState(null);
  const { authorizationToken, API, isLoading } = useAuth();
  const [modaldata, setModalData] = useState(null);
  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
        setContact(data.length || 0);
      } else {
        toast.error("Failed to fetch contacts!");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        }
      });
      if (response.ok) {
        getAllUsersData();
        toast.success("Contact deleted successfully!");
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(index) {
    setModalData(users[index]); // Correctly set the user data
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <section className="admin-users-section setHeight">
        <div className="container">
          <h1>Users Contacts</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th colSpan="2">Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr style={{display: 'flex', justifyContent: 'center'}}>
                  <td colSpan="5"  >
                    <BallTriangle 
                      height={100}
                      width={100}
                      color="#4fa94d"
                      ariaLabel="ball-triangle-loading"
                    /> 
                  </td>
                </tr>
              ) : contact === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Message Found!
                  </td>
                </tr>
              ) : (
                users.map((curUser, index) => (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td colSpan="2">{curUser.message.slice(0, 30)} {curUser.message.length > 30 ? "..." : ""}</td>
                    <td>
                      <button className="info" onClick={() => openModal(index)}>Detail</button>
                      <button className="danger" onClick={() => deleteContactById(curUser._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Contact Detail"
      >
        <div className="content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{color: "#000"}}>Message Detail</h2>
          <button onClick={closeModal} style={{ padding: '0.2vw 0.5vw', background: "#ff4d4d" }}>Close</button>
        </div>
        <div>
          <p style={{ color: "#000" }}>{modaldata ? modaldata.message : "No data available"}</p>
        </div>
      </Modal>
    </>
  );
};

import React, { useEffect, useState } from "react";
import "./Member.css";

function Member() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    firstname: "",
    lastname: "",
    country: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/members/");
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/members/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMembers(members.filter((member) => member.id !== id));
      }
    } catch (error) {
      alert("Failed to delete member");
    }
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewMember({
      firstname: "",
      lastname: "",
      country: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMember.firstname && newMember.lastname && newMember.country) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/members/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMember),
        });
        const data = await response.json();
        setMembers([...members, data]);
        handleCloseModal();
      } catch (error) {
        alert("Failed to add member");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleEdit = (member) => {
    setEditMember({ ...member });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditMember({ ...editMember, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editMember.firstname && editMember.lastname && editMember.country) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/members/${editMember.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editMember),
          }
        );
        const data = await response.json();
        setMembers(
          members.map((member) =>
            member.id === data.id ? { ...member, ...data } : member
          )
        );
        setIsEditModalOpen(false);
      } catch (error) {
        alert("Failed to edit member");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        padding: "2rem",
        height: "92vh",
      }}
    >
      <h1>MARHBEE BIK!</h1>
      <p>DJANGO REACT CRUD</p>

      <div style={{ marginBottom: "1rem", marginTop: "1%" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "0.5rem",
            width: "300px",
            border: "1px solid #9000ff",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={handleAdd}
          style={{
            backgroundColor: "#9000ff",
            color: "white",
            padding: "0.7rem 1.2rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Member
        </button>
      </div>

      <table className="member-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.firstname}</td>
              <td>{member.lastname}</td>
              <td>{member.country}</td>
              <td>
                <button
                  onClick={() => handleDelete(member.id)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    padding: "0.3rem 0.6rem",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(member)}
                  style={{
                    backgroundColor: "#f39c12",
                    color: "white",
                    padding: "0.3rem 0.6rem",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <h2 style={{ color: "#8149ac" }}>Add New Member</h2>

          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={newMember.firstname}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={newMember.lastname}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={newMember.country}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button
                type="submit"
                style={{
                  backgroundColor: "#9000ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                Add Member
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  padding: "0.7rem 1.2rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "1rem",
                  marginLeft: "0.5rem",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Member</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstname"
                  value={editMember.firstname}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastname"
                  value={editMember.lastname}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
              <label>
                Country:
                <input
                  type="text"
                  name="country"
                  value={editMember.country}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
              <button
                type="submit"
                style={{
                  backgroundColor: "#9000ff",
                  color: "white",
                  padding: "0.7rem 1.2rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  padding: "0.7rem 1.2rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "1rem",
                  marginLeft: "0.5rem",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Member;

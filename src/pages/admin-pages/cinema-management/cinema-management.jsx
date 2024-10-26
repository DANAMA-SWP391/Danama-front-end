
import React, { useState, useEffect } from 'react';
import { fetchAddCinema, fetchCinemaList, fetchDeleteCinema, fetchUpdateCinema } from "../../../api/admin-api.js";
import Sidebar from "../../../components/common/AdminSideBar/AdminSideBar.jsx";
import CustomModal from "../../../components/common/CustomModal/CustomModal.jsx";
import {upFileToAzure} from "../../../api/webAPI.jsx";
import "./cinema-management.css";
import Header from "../../../components/common/Header/Header.jsx";
  // Import your custom modal

const CinemaManagement = () => {
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCinema, setNewCinema] = useState({ name: '', logo: '', address: '', description: '', managerId: '' });
    const [editCinemaId, setEditCinemaId] = useState(null);

    // State for controlling modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // 'view', 'edit', or 'delete'
    const [selectedFile, setSelectedFile] = useState(null); // State để lưu ảnh được chọn


    useEffect(() => {
        const getCinemas = async () => {
            try {
                const data = await fetchCinemaList();
                if (data) {
                    setCinemas(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getCinemas();
    }, []);


    const handleAddCinema = async () => {
        let logoUrl = newCinema.logo;

        // Nếu người dùng đã chọn một ảnh mới, upload ảnh đó trước khi thêm mới
        if (selectedFile) {
            const uploadedImageUrl = await upFileToAzure(selectedFile);
            if (uploadedImageUrl) {
                logoUrl = uploadedImageUrl; // Cập nhật logo URL sau khi upload
            } else {
                alert('Failed to upload image.');
                return;
            }
        }

        const success = await fetchAddCinema({ ...newCinema, logo: logoUrl });
        if (success) {
            alert('Cinema added successfully!');
            setCinemas([...cinemas, { ...newCinema, logo: logoUrl }]);
            setNewCinema({ name: '', logo: '', address: '', description: '', managerId: '' });
            setIsModalOpen(false); // Close modal after addition
            setSelectedFile(null); // Reset selected file
        } else {
            alert('Failed to add cinema.');
        }
    };

    const handleEditCinema = (cinema) => {
        setEditCinemaId(cinema.cinemaId);
        setNewCinema({
            cinemaId: cinema.cinemaId,
            name: cinema.name,
            logo: cinema.logo,
            address: cinema.address,
            description: cinema.description,
            managerId: cinema.managerId
        });
        setModalType('edit');
        setIsModalOpen(true); // Open modal for editing
    };


    const handleUpdateCinema = async () => {
        let logoUrl = newCinema.logo;

        // Nếu người dùng đã chọn một ảnh mới, upload ảnh đó trước khi cập nhật
        if (selectedFile) {
            const uploadedImageUrl = await upFileToAzure(selectedFile);
            if (uploadedImageUrl) {
                logoUrl = uploadedImageUrl; // Cập nhật logo URL sau khi upload
            } else {
                alert('Failed to upload image.');
                return;
            }
        }

        const success = await fetchUpdateCinema({ ...newCinema, logo: logoUrl });
        if (success) {
            alert('Cinema updated successfully!');
            setCinemas(cinemas.map((cinema) => (cinema.cinemaId === newCinema.cinemaId ? { ...cinema, ...newCinema, logo: logoUrl } : cinema)));
            setEditCinemaId(null);
            setNewCinema({ name: '', logo: '', address: '', description: '', managerId: '' });
            setIsModalOpen(false); // Close modal after update
            setSelectedFile(null); // Reset selected file
        } else {
            alert('Failed to update cinema.');
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Lưu ảnh đã chọn vào state
    };

    const handleDeleteCinema = async (cinemaId) => {
        const success = await fetchDeleteCinema(cinemaId);
        if (success) {
            alert('Cinema deleted successfully!');
            setCinemas(cinemas.filter((cinema) => cinema.cinemaId !== cinemaId));
            setIsModalOpen(false); // Close modal after deletion
        } else {
            alert('Failed to delete cinema.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCinema((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    if (loading) {
        return <p>Loading cinemas...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <Header />
            <div className="cinema-list-container">
                <Sidebar />
                <div className="cinema-list-content">

                    <div className="cinema-list-header">
                        {/*<h2>{editCinemaId ? 'EDIT CINEMA' : 'ADD CINEMA'}</h2>*/}
                        <h2 className="title">Cinema List</h2>
                        <button className="add-cinema-btn" onClick={() => {
                            setModalType('add');
                            setIsModalOpen(true);
                        }}>+ Add new cinema
                        </button>
                    </div>

                    <table className="cinema-table">
                        <thead>
                        <tr>
                            <th>Cinema's ID</th>
                            <th>Name</th>
                            <th>Logo</th>
                            <th>Manager</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cinemas.map((cinema) => (
                            <tr key={cinema.cinemaId}>
                                <td>{cinema.cinemaId}</td>
                                <td>{cinema.name}</td>
                                <td><img src={cinema.logo} className="cinema-logo"/></td>
                                <td>{cinema.managerId}</td>
                                <td>{cinema.address}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => {
                                        handleEditCinema(cinema);
                                        setEditCinemaId(cinema.cinemaId);
                                        setModalType('edit');
                                        setIsModalOpen(true);
                                    }}>✏️
                                    </button>
                                    <button className="delete-btn" onClick={() => {
                                        setEditCinemaId(cinema.cinemaId);
                                        setModalType('delete');
                                        setIsModalOpen(true);
                                    }}>🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        {modalType === 'add' && (
                            <div>
                                <h3>Add Cinema</h3>
                                <input type="text" name="name" value={newCinema.name} onChange={handleInputChange}
                                       placeholder="Cinema Name"/>
                                <input type="text" name="address" value={newCinema.address} onChange={handleInputChange}
                                       placeholder="Address"/>
                                <input type="text" name="description" value={newCinema.description}
                                       onChange={handleInputChange} placeholder="Description"/>
                                <input type="text" name="managerId" value={newCinema.managerId} onChange={handleInputChange}
                                       placeholder="Manager ID"/>
                                <input type="file" accept="image/*" onChange={handleFileChange}/> {/* Upload ảnh */}
                                <button onClick={handleAddCinema}>Add</button>
                            </div>
                        )}

                        {modalType === 'edit' && (
                            <div>
                                <h3>Edit Cinema</h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={newCinema.name}
                                    onChange={handleInputChange}
                                    placeholder="Cinema Name"
                                />
                                <input type="file" accept="image/*" onChange={handleFileChange}/> {/* Upload ảnh mới */}
                                <input
                                    type="text"
                                    name="address"
                                    value={newCinema.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={newCinema.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                />
                                <input
                                    type="text"
                                    name="managerId"
                                    value={newCinema.managerId}
                                    onChange={handleInputChange}
                                    placeholder="Manager ID"
                                />
                                <button onClick={handleUpdateCinema}>Update</button>
                            </div>
                        )}

                        {modalType === 'delete' && (
                            <div>
                                <h3>Are you sure you want to delete this cinema?</h3>
                                <button onClick={() => handleDeleteCinema(editCinemaId)}>Delete</button>
                                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                            </div>
                        )}
                    </CustomModal>


                </div>
            </div>
        </>

    );
};

export default CinemaManagement;



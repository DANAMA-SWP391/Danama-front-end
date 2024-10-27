import React, { useState, useEffect } from 'react';
import { fetchAddCinema, fetchCinemaList, fetchDeleteCinema, fetchUpdateCinema } from "../../../api/admin-api.js";
import Sidebar from "../../../components/common/AdminSideBar/AdminSideBar.jsx";
import CustomModal from "../../../components/common/CustomModal/CustomModal.jsx";
import { upFileToAzure } from "../../../api/webAPI.jsx";
import "./cinema-management.css";
import AdminHeader from "../../../components/common/AdminHeader/AdminHeader.jsx";
import AdminSidebar from "../../../components/common/AdminSideBar/AdminSideBar.jsx";

const CinemaManagement = () => {
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({});
    const [newCinema, setNewCinema] = useState({ name: '', logo: '', address: '', description: '', managerId: '' });
    const [editCinemaId, setEditCinemaId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // 'add' or 'edit'
    const [selectedFile, setSelectedFile] = useState(null);

    // Hàm reset state newCinema
    const resetForm = () => {
        setNewCinema({ name: '', logo: '', address: '', description: '', managerId: '' });
        setSelectedFile(null);
        setFormError({});
    };

    const [itemsPerPage] = useState(10); // Số mục hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

    const paginatedCinemas = cinemas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < Math.ceil(cinemas.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Khi modal đóng, reset lại form
    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    // Hàm xử lý khi nhấn Cancel
    const handleCancel = () => {
        handleCloseModal();
    };

    // Fetch cinema list on mount
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

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCinema((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!newCinema.name.trim()) errors.name = 'Cinema name is required';
        if (!newCinema.address.trim()) errors.address = 'Address is required';
        if (!newCinema.description.trim()) errors.description = 'Description is required';
        if (!newCinema.managerId.trim()) errors.managerId = 'Manager ID is required';
        setFormError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddCinema = async () => {
        if (!validateForm()) {
            return;
        }

        let logoUrl = newCinema.logo;
        if (selectedFile) {
            const uploadedImageUrl = await upFileToAzure(selectedFile);
            if (uploadedImageUrl) {
                logoUrl = uploadedImageUrl;
            } else {
                alert('Failed to upload image.');
                return;
            }
        }

        const success = await fetchAddCinema({ ...newCinema, logo: logoUrl });
        if (success) {
            // alert('Cinema added successfully!');
            // setCinemas([...cinemas, { ...newCinema, logo: logoUrl }]);
            // handleCloseModal(); // Reset form và đóng modal sau khi thêm thành công
            alert('Cinema added successfully!');

            // Fetch the updated list of cinemas
            const updatedCinemas = await fetchCinemaList();
            if (updatedCinemas) {
                setCinemas(updatedCinemas);
            }

            handleCloseModal(); // Reset form and close modal after successful addition
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
        setIsModalOpen(true);
    };

    const handleUpdateCinema = async () => {
        if (!validateForm()) {
            return;
        }

        let logoUrl = newCinema.logo;
        if (selectedFile) {
            const uploadedImageUrl = await upFileToAzure(selectedFile);
            if (uploadedImageUrl) {
                logoUrl = uploadedImageUrl;
            } else {
                alert('Failed to upload image.');
                return;
            }
        }

        const success = await fetchUpdateCinema({ ...newCinema, logo: logoUrl });
        if (success) {
            alert('Cinema updated successfully!');
            setCinemas(cinemas.map((cinema) => (cinema.cinemaId === newCinema.cinemaId ? { ...cinema, ...newCinema, logo: logoUrl } : cinema)));
            handleCloseModal(); // Reset form và đóng modal sau khi cập nhật thành công
        } else {
            alert('Failed to update cinema.');
        }
    };

    const handleDeleteCinema = async (cinemaId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this cinema?');

        if (isConfirmed) {
            const success = await fetchDeleteCinema(cinemaId);
            if (success) {
                alert('Cinema deleted successfully!');
                setCinemas(cinemas.filter((cinema) => cinema.cinemaId !== cinemaId));
                handleCloseModal(); // Reset form and close modal after successful deletion
            } else {
                alert('Failed to delete cinema.');
            }
        } else {
            // Optional: handle cancel action or close modal
            alert('Delete action canceled.');
        }
    };

    if (loading) {
        return <p>Loading cinemas...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <AdminHeader />
            <div className="cinema-list-container">
                <AdminSidebar />
                <div className="cinema-list-content">
                    <div className="cinema-list-header">
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
                        {paginatedCinemas.map((cinema) => (
                            <tr key={cinema.cinemaId}>
                                <td>{cinema.cinemaId}</td>
                                <td>{cinema.name}</td>
                                <td><img src={cinema.logo} className="cinema-logo" alt="cinema logo"/></td>
                                <td>{cinema.managerId}</td>
                                <td>{cinema.address}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditCinema(cinema)}>✏️</button>
                                    <button className="delete-btn"
                                            onClick={() => handleDeleteCinema(cinema.cinemaId)}>🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="pagination-controls">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage} of {Math.ceil(cinemas.length / itemsPerPage)}</span>
                        <button onClick={handleNextPage}
                                disabled={currentPage === Math.ceil(cinemas.length / itemsPerPage)}>Next
                        </button>
                    </div>

                    <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
                        {modalType === 'add' && (
                            <div>
                                <h3>Add Cinema</h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={newCinema.name}
                                    onChange={handleInputChange}
                                    placeholder="Cinema Name"
                                    className={formError.name ? 'input-error' : ''}
                                />
                                {formError.name && <p className="error-message">{formError.name}</p>}

                                <input
                                    type="text"
                                    name="address"
                                    value={newCinema.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                    className={formError.address ? 'input-error' : ''}
                                />
                                {formError.address && <p className="error-message">{formError.address}</p>}

                                <input
                                    type="text"
                                    name="description"
                                    value={newCinema.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                    className={formError.description ? 'input-error' : ''}
                                />
                                {formError.description && <p className="error-message">{formError.description}</p>}

                                <input
                                    type="text"
                                    name="managerId"
                                    value={newCinema.managerId}
                                    onChange={handleInputChange}
                                    placeholder="Manager ID"
                                    className={formError.managerId ? 'input-error' : ''}
                                />
                                {formError.managerId && <p className="error-message">{formError.managerId}</p>}

                                <input type="file" accept="image/*" onChange={handleFileChange}/>
                                <button onClick={handleAddCinema}>Add</button>
                                <button onClick={handleCancel}>Cancel</button>
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
                                    className={formError.name ? 'input-error' : ''}
                                />
                                {formError.name && <p className="error-message">{formError.name}</p>}

                                <input type="file" accept="image/*" onChange={handleFileChange}/>
                                <input
                                    type="text"
                                    name="address"
                                    value={newCinema.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                    className={formError.address ? 'input-error' : ''}
                                />
                                {formError.address && <p className="error-message">{formError.address}</p>}

                                <input
                                    type="text"
                                    name="description"
                                    value={newCinema.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                    className={formError.description ? 'input-error' : ''}
                                />
                                {formError.description && <p className="error-message">{formError.description}</p>}

                                <input
                                    type="text"
                                    name="managerId"
                                    value={newCinema.managerId}
                                    onChange={handleInputChange}
                                    placeholder="Manager ID"
                                    className={formError.managerId ? 'input-error' : ''}
                                />
                                {formError.managerId && <p className="error-message">{formError.managerId}</p>}

                                <button onClick={handleUpdateCinema}>Update</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        )}
                    </CustomModal>
                </div>
            </div>
        </>
    );
};

export default CinemaManagement;

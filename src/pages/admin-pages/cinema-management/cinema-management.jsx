import React, { useState, useEffect } from 'react';
import { fetchAddCinema, fetchCinemaList, fetchDeleteCinema, fetchUpdateCinema } from "../../../api/admin-api.js";
import Sidebar from "../../../components/common/AdminSideBar/AdminSideBar.jsx";

const CinemaManagement = () => {
    const [cinemas, setCinemas] = useState([]);  // Quản lý danh sách rạp chiếu phim
    const [loading, setLoading] = useState(true);  // Quản lý trạng thái loading
    const [error, setError] = useState(null);  // Quản lý lỗi nếu có
    const [newCinema, setNewCinema] = useState({ name: '', logo: '', address: '', description: '', managerId: '' }); // Quản lý thông tin rạp mới
    const [editCinemaId, setEditCinemaId] = useState(null); // Quản lý ID rạp đang chỉnh sửa

    // Lấy danh sách rạp chiếu phim khi component mount
    useEffect(() => {
        const getCinemas = async () => {
            try {
                const data = await fetchCinemaList();  // Gọi API lấy danh sách rạp
                if (data) {
                    setCinemas(data);  // Lưu danh sách rạp vào state
                }
            } catch (err) {
                setError(err.message);  // Bắt lỗi nếu có
            } finally {
                setLoading(false);  // Tắt trạng thái loading khi API hoàn tất
            }
        };
        getCinemas();
    }, []);

    // Thêm mới rạp chiếu phim
    const handleAddCinema = async () => {
        const success = await fetchAddCinema(newCinema);
        if (success) {
            alert('Cinema added successfully!');
            setCinemas([...cinemas, newCinema]); // Cập nhật danh sách rạp
            setNewCinema({ name: '', logo: '', address: '', description: '', managerId: '' }); // Reset form
        } else {
            alert('Failed to add cinema.');
        }
    };

    // Khi nhấn nút Edit, hiển thị thông tin rạp trong form để chỉnh sửa
    const handleEditCinema = (cinema) => {
        setEditCinemaId(cinema.cinemaId); // Đặt ID rạp đang chỉnh sửa
        setNewCinema({  // Đưa thông tin rạp hiện tại vào form
            cinemaId: cinema.cinemaId,
            name: cinema.name,
            logo: cinema.logo,
            address: cinema.address,
            description: cinema.description,
            managerId: cinema.managerId
        });
    };

    // Cập nhật rạp chiếu phim
    const handleUpdateCinema = async () => {
        console.log("Updating cinema with ID:", newCinema.cinemaId);
        console.log("Cinema details:", newCinema);

        const success = await fetchUpdateCinema(newCinema); // Gọi API với đối tượng cinema
        if (success) {
            alert('Cinema updated successfully!');
            setCinemas(cinemas.map((cinema) => (cinema.cinemaId === newCinema.cinemaId ? { ...cinema, ...newCinema } : cinema)));
            setEditCinemaId(null);
            setNewCinema({ name: '', logo: '', address: '', description: '', managerId: '' });
        } else {
            alert('Failed to update cinema.');
        }
    };

    // Xóa rạp chiếu phim
    const handleDeleteCinema = async (cinemaId) => {
        const success = await fetchDeleteCinema(cinemaId);
        if (success) {
            alert('Cinema deleted successfully!');
            setCinemas(cinemas.filter((cinema) => cinema.cinemaId !== cinemaId)); // Loại bỏ rạp khỏi danh sách
        } else {
            alert('Failed to delete cinema.');
        }
    };

    // Xử lý khi người dùng nhập dữ liệu vào form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCinema((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Hiển thị loading
    if (loading) {
        return <p>Loading cinemas...</p>;
    }

    // Hiển thị lỗi nếu có
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="cinema-list-container">
            <Sidebar /> {/* Sidebar */}
            <div className="cinema-list-content">
                <div className="cinema-list-header">
                    <h2>{editCinemaId ? 'EDIT CINEMA' : 'ADD CINEMA'}</h2>
                    {editCinemaId ? (
                        <button className="save-cinema-btn" onClick={handleUpdateCinema}>Save Cinema</button>
                    ) : (
                        <button className="add-cinema-btn" onClick={handleAddCinema}>+ Add new cinema</button>
                    )}
                </div>

                {/* Form thêm mới hoặc chỉnh sửa rạp chiếu */}
                <div className="cinema-form">
                    <input type="text" name="name" value={newCinema.name} onChange={handleInputChange} placeholder="Cinema Name" />
                    <input type="text" name="logo" value={newCinema.logo} onChange={handleInputChange} placeholder="Logo URL" />
                    <input type="text" name="address" value={newCinema.address} onChange={handleInputChange} placeholder="Address" />
                    <input type="text" name="description" value={newCinema.description} onChange={handleInputChange} placeholder="Description" />
                    <input type="text" name="managerId" value={newCinema.managerId} onChange={handleInputChange} placeholder="Manager ID" />
                </div>

                {/* Danh sách rạp chiếu */}
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
                            <td><img src={cinema.logo} alt={cinema.name} className="cinema-logo" /></td>
                            <td>{cinema.managerId}</td>
                            <td>{cinema.address}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditCinema(cinema)}>✏️</button>
                                <button className="delete-btn" onClick={() => handleDeleteCinema(cinema.cinemaId)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CinemaManagement;

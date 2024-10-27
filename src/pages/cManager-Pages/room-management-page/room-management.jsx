import { useEffect, useState } from "react";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import "./room-management.css";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import { fetchRoomList } from "../../../api/cManagerAPI.js";
import { fetchDeleteRoom ,fetchAddRoom, fetchUpdateRoom } from "../../../api/cManagerAPI.js";
import Button from "../../../components/common/Button/Button.jsx";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';

import { MdDeleteOutline } from "react-icons/md";
import { MdEventSeat } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function RoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({ roomId: '', name: '', numberOfSeat: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const roomsPerPage = 10;
    const storagecinema = localStorage.getItem('cinema');
    const cinema = JSON.parse(storagecinema);
    const cinemaId = cinema.cinemaId;

    // Fetch room list on component mount
    const getRooms = async () => {
        setLoading(true);
        try {
            const data = await fetchRoomList(cinemaId);
            setRooms(data.rooms || []);
        } catch (error) {
            console.error('Error fetching booking list:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getRooms();
    }, [cinemaId]);

    // Handle room deletion
    const handleDeleteRoom = async () => {
        const result = await fetchDeleteRoom(roomToDelete);
        if (result) {
            setRooms(rooms.filter(room => room.roomId !== roomToDelete));
            setIsDeleteModalOpen(false);
        } else {
            console.error('Failed to delete room');
        }
    };

    const handleNavigate = (room) => {
        navigate(`/seat-management/${room.roomId}` , {state: {room}}) ;
    };

    const openDeleteModal = (roomId) => {
        setRoomToDelete(roomId);
        setIsDeleteModalOpen(true);
    };

    const openAddRoomModal = () => {
        setIsEdit(false);
        setFormData({ name: ''});
        setError('');
        setIsModalOpen(true);
    };

    const openUpdateRoomModal = (room) => {
        setIsEdit(true);
        setFormData({ roomId: room.roomId, name: room.name, numberOfSeat: room.numberOfSeat});
        setError('');
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            setError('Room Name is required.');
            return;
        }

        const dataToSend = {
            name: formData.name,
            numberOfSeat: formData.numberOfSeat, // Keep the existing number of seats
            cinema: { cinemaId: cinemaId }
        };

        if (isEdit) {
            await fetchUpdateRoom({ ...dataToSend, roomId: formData.roomId });
            setRooms(rooms.map(room => room.roomId === formData.roomId ? { ...dataToSend, roomId: formData.roomId } : room));
        } else {
            await fetchAddRoom(dataToSend);
            await getRooms();
        }
        setIsModalOpen(false);
        setError('');

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "name" && value.trim()) {
            setError('');
        }
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(rooms.length / roomsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="room-management-page">
            {loading && (
                <div className="room-management-loading-overlay">
                    <div className="room-management-spinner"></div>
                </div>
            )}
            <CManagerHeader />
            <div className="layout">
                <Sidebar />
                <div className="room-management-content">
                    <h2 className="title">Room List</h2>
                    <Button className="add-room-button" onClick={openAddRoomModal}>+ Add new room</Button>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <table className="room-table">
                                <thead>
                                <tr>
                                    <th>Room ID</th>
                                    <th>Room Name</th>
                                    <th>Num of Seat</th>
                                    <th className="icon-column">Edit seat</th>
                                    <th className="icon-column">Delete room</th>
                                    <th className="icon-column">Update room</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.roomId}>
                                        <td>{room.roomId}</td>
                                        <td>{room.name}</td>
                                        <td>{room.numberOfSeat}</td>
                                        <td>
                                            <Button className="edit-seat-button" onClick={() => handleNavigate(room)}>
                                                <span className="icon"><MdEventSeat style={{fontSize: '20px'}}/></span>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button className="delete-button" onClick={() => openDeleteModal(room.roomId)}>
                                                <span className="icon"><MdDeleteOutline style={{fontSize: '20px'}}/></span>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button className="update-button" onClick={() => openUpdateRoomModal(room)}>
                                                <span className="icon"><FaPencilAlt style={{fontSize: '20px'}}/></span>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="pagination">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={currentPage === 1 ? 'disabled' : ''}
                                >
                                    &laquo;
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={currentPage === totalPages ? 'disabled' : ''}
                                >
                                    &raquo;
                                </button>
                            </div>
                        </div>
                    )}

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel={isEdit ? "Update Room" : "Add Room"}
                        className="modal"
                    >
                        <div className="modal-header">
                            <h2 className="modal-title">{isEdit ? "Update Room" : "Add Room"}</h2>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="label-group" >
                                        <label>Room Name:</label>
                                        {error && <p className="error-message">{error}</p>}
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <Button onClick={handleSubmit}>{isEdit ? "Update" : "Add"}</Button>
                                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={isDeleteModalOpen}
                        onRequestClose={() => setIsDeleteModalOpen(false)}
                        contentLabel="Confirm Delete"
                        className="modal"
                    >
                        <div className="modal-header">
                            <h2 className="modal-title">Confirm Delete</h2>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this room?</p>
                        </div>
                        <div className="modal-footer">
                            <Button onClick={handleDeleteRoom}>Yes</Button>
                            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
export default RoomManagement;

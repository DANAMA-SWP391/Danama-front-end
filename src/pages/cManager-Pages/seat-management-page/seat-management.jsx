import { useEffect, useState } from "react";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import "./seat-management.css";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import { fetchSeatList, fetchDeleteSeat, fetchAddSeat, fetchChangeSeatType } from "../../../api/cManagerAPI.js";
import Button from "../../../components/common/Button/Button.jsx";
import Modal from "react-modal";
import { MdDeleteOutline } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import PropTypes from 'prop-types';  // Import PropTypes
import { useParams } from 'react-router-dom';


function SeatManagement() {
    const { roomId } = useParams();  // Lấy roomId từ URL
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({ seatId: '', row: '', col: '', seatNum: '', type: '' });
    const [seatToDelete, setSeatToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Lấy danh sách ghế khi component được mount
    const getSeats = async () => {
        setLoading(true);
        try {
            const data = await fetchSeatList(roomId);  // Sử dụng roomId lấy từ URL
            console.log(data);
            setSeats(data.seats || []);
        } catch (error) {
            console.error('Error fetching seat list:', error);
            setError('Could not fetch seats.');
        }
        setLoading(false);
    };

    useEffect(() => {
        getSeats();
        console.log("Data seats" ,seats);  // Thêm dòng này để kiểm tra dữ liệu các ghế
    }, [roomId]);

    // Xử lý xóa ghế
    const handleDeleteSeat = async () => {
        const result = await fetchDeleteSeat(seatToDelete);
        if (result) {
            setSeats(seats.filter(seat => seat.seatId !== seatToDelete));
            setIsDeleteModalOpen(false);
        } else {
            console.error('Failed to delete seat');
        }
    };

    const openDeleteModal = (seatId) => {
        setSeatToDelete(seatId);
        setIsDeleteModalOpen(true);
    };

    const openAddSeatModal = () => {
        setIsEdit(false);
        setFormData({ row: '', col: '', seatNum: '', type: '' });
        setIsModalOpen(true);
    };

    const openUpdateSeatModal = (seat) => {
        setIsEdit(true);
        setFormData({ seatId: seat.seatId, row: seat.row, col: seat.col, seatNum: seat.seatNum, type: seat.type });
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        const dataToSend = {
            row: formData.row,
            col: formData.col,
            seatNum: formData.seatNum,
            type: formData.type,
            room: { roomId: roomId }
        };

        // if (isEdit) {
        //     await fetchChangeSeatType({ ...dataToSend, seatId: formData.seatId });
        //     setSeats(seats.map(seat => seat.seatId === formData.seatId ? { ...dataToSend, seatId: formData.seatId } : seat));
        // } else {
        //     await fetchAddSeat(dataToSend);
        //     await getSeats();
        // }
        // setIsModalOpen(false);
        if (isEdit) {
            await fetchChangeSeatType({ ...dataToSend, seatId: formData.seatId });
            setSeats(seats.map(seat => seat.seatId === formData.seatId ? { ...dataToSend, seatId: formData.seatId } : seat));
        } else {
            const newSeat = await fetchAddSeat(dataToSend);  // Thêm ghế mới và nhận phản hồi từ server
            if (newSeat && newSeat.seatId) {
                setSeats([...seats, newSeat]);  // Cập nhật danh sách ghế với ghế mới
            } else {
                await getSeats();  // Nếu không có phản hồi đầy đủ, gọi lại để lấy danh sách ghế mới
            }
        }
        setIsModalOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="seat-management-page">
            <CManagerHeader />
            <div className="seat-layout">
                <Sidebar />
                <div className="seat-management-content">
                    <h2 className="title">Seat List</h2>
                    <Button className="add-seat-button" onClick={openAddSeatModal}>+ Add new seat</Button>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <table className="seat-table">
                            <thead>
                            <tr>
                                <th>Seat ID</th>
                                <th>Row</th>
                                <th>Col</th>
                                <th>SeatNum</th>
                                <th>Type</th>
                                <th className="icon-seat-column">Edit</th>
                                <th className="icon-seat-column">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {seats.map((seat) => (
                                <tr key={seat.seatId}>
                                    <td>{seat.seatId}</td>
                                    <td>{seat.row}</td>
                                    <td>{seat.col}</td>
                                    <td>{seat.seatNum}</td>
                                    <td>{seat.type}</td>
                                    <td>
                                        <Button className="update-seat-button" onClick={() => openUpdateSeatModal(seat)}>
                                            <span className="icon"><FaPencilAlt style={{ fontSize: '20px' }} /></span>
                                        </Button>
                                    </td>
                                    <td>
                                        <Button className="delete-seat-button" onClick={() => openDeleteModal(seat.seatId)}>
                                            <span className="icon"><MdDeleteOutline style={{ fontSize: '20px' }} /></span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel={isEdit ? "Update Seat" : "Add Seat"}
                        className="modal"
                    >
                        <div className="modal-header">
                            <h2 className="modal-title">{isEdit ? "Update Seat" : "Add Seat"}</h2>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Row:</label>
                                    <input
                                        type="text"
                                        name="row"
                                        value={formData.row}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Col:</label>
                                    <input
                                        type="text"
                                        name="col"
                                        value={formData.col}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Seat Number:</label>
                                    <input
                                        type="text"
                                        name="seatNum"
                                        value={formData.seatNum}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/*<div>*/}
                                {/*    <label>Type:</label>*/}
                                {/*    <input*/}
                                {/*        type="text"*/}
                                {/*        name="type"*/}
                                {/*        value={formData.type}*/}
                                {/*        onChange={handleChange}*/}
                                {/*        required*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div>
                                    <label>Type:</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Seat Type</option>
                                        {/* Default placeholder */}
                                        <option value="VIP">VIP</option>
                                        <option value="Standard">Standard</option>
                                    </select>
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
                            <p>Are you sure you want to delete this seat?</p>
                        </div>
                        <div className="modal-footer">
                            <Button onClick={handleDeleteSeat}>Yes</Button>
                            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        </div>
                    </Modal>

                </div>
            </div>
        </div>

    );
}

// Định nghĩa propTypes cho component
SeatManagement.propTypes = {
    roomId: PropTypes.number.isRequired  // Kiểm tra roomId là số và bắt buộc
};

export default SeatManagement;

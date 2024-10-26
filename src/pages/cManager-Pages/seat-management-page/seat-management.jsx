



import { useEffect, useState } from "react";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import "./seat-management.css";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import { fetchSeatList, fetchDeleteSeat, fetchAddSeat, fetchChangeSeatType } from "../../../api/cManagerAPI.js";
import Button from "../../../components/common/Button/Button.jsx";
import Modal from "react-modal";
import {  useLocation,useNavigate } from 'react-router-dom';
import CManagerSeatLayout from "../../../components/container/CManager-page/CManagerSeatLayout/CManagerSeatLayout.jsx";
import BackSpace from "../../../assets/Icons/back-space.svg";

function SeatManagement() {
    // const { roomId } = useParams();
    const location = useLocation(); // Lấy dữ liệu từ state
    const navigate = useNavigate(); // Hook điều hướng
    const room = location.state?.room; // Truy cập object room
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({ seatId: '', row: '', col: '', seatNum: '', type: '' });
    const [seatToDelete, setSeatToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);  // Chứa thông tin của ghế được chọn
    const [errorMessage, setErrorMessage] = useState('');
    const seatsInfo = [
         ["Standard", "#1BA0D4"], ["VIP", "#D64242"]
    ];

    const getSeats = async () => {
        setLoading(true);
        try {
            const data = await fetchSeatList(room.roomId);
            setSeats(data.seats || []);
        } catch (error) {
            setError('Could not fetch seats.');
        }
        setLoading(false);
    };

    useEffect(() => {
        getSeats();
    }, [room.roomId]);

    const handleDeleteSeat = async () => {
        const result = await fetchDeleteSeat(seatToDelete);
        if (result) {
            setSeats(seats.filter(seat => seat.seatId !== seatToDelete));
            setIsDeleteModalOpen(false);
        }
    };

    const openDeleteModal = () => {
        setSeatToDelete(selectedSeat.seatId);
        setIsDeleteModalOpen(true);
        setSelectedSeat(null); // Đóng choice-popup

    };

    const openAddSeatModal = (seat) => {
        setIsEdit(false);
        // Tạo seatNum dựa trên row và col
        const rowLetter = String.fromCharCode(64 + seat.row); // Convert row 1 -> A, row 2 -> B, etc.
        const seatNum = `${rowLetter}${seat.col}`; // Ví dụ: B4

        setFormData({
            row: seat.row,
            col: seat.col,
            seatNum: seatNum, // Tự động set giá trị seatNum
            type: ''
        });
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (!isEdit && formData.row && formData.col) {
            setIsModalOpen(true); // Chỉ mở modal sau khi row và col được cập nhật
            console.log("Modal mở với formData:", formData); // Kiểm tra dữ liệu
        }
    }, [formData.row, formData.col]);


    const openUpdateSeatModal = () => {
        setIsEdit(true);
        setFormData({
            seatId: selectedSeat.seatId,
            row: selectedSeat.row,
            col: selectedSeat.col,
            seatNum: selectedSeat.seatNum,
            type: selectedSeat.type
        });
        setIsModalOpen(true);
        setSelectedSeat(null); // Đóng choice-popup

    };

    const handleSubmit = async () => {
        if (!formData.type) {
            setErrorMessage("Please select a Seat Type");
            return; // Dừng submit nếu không chọn loại ghế
        }

        const dataToSend = {
            row: formData.row,
            col: formData.col,
            seatNum: formData.seatNum,
            type: formData.type,
            room: { roomId: room.roomId }
        };

        if (isEdit) {
            await fetchChangeSeatType({ ...dataToSend, seatId: formData.seatId });
            setSeats(seats.map(seat => seat.seatId === formData.seatId ? { ...dataToSend, seatId: formData.seatId } : seat));
        } else {
            const newSeat = await fetchAddSeat(dataToSend);
            if (newSeat && newSeat.seatId) {
                setSeats([...seats, newSeat]);
            } else {
                await getSeats();
            }
        }
        setIsModalOpen(false);
        setErrorMessage(''); // Reset lại thông báo lỗi sau khi submit thành công

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getSeatColor = (seatType) => {
        switch (seatType) {
            case 'VIP':
                return '#e74c3c';
            case 'Standard':
                return '#3498db';
            case 'Booked':
                return 'black';
            case 'Selected':
                return '#D3D3D3';
            default:
                return '#FFFFFF';
        }
    };

    const handleSeatClick = (seat) => {
        // setSelectedSeat(seat);  // Lưu ghế được chọn
        // Nếu seat có ID, đó là ghế đã có, mở modal Update/Delete
        if (seat.seatId) {
            setSelectedSeat(seat);
        } else {
            // // Nếu seat không có ID, đó là ghế trống, mở modal thêm ghế mới
            // setFormData({ row: seat.row, col: seat.col, seatNum: '', type: '' });
            // // openAddSeatModal();
            // setIsEdit(false);
            // setIsModalOpen(true); // Mở modal để thêm ghế mới ngay lập tức
            openAddSeatModal(seat); // Gọi hàm thêm ghế mới với thông tin row và col

        }
    };

    return (
        <div className="seat-management-page">
            <CManagerHeader  />
            <div className="seat-management-layout">
                <Sidebar />
                <div className="seat-management-content">
                    <div className="seat-header-container">
                        <img
                            src={BackSpace}
                            alt="Back"
                            className="back-icon"
                            onClick={() => navigate('/room-management')}
                        />
                        <div className="room-name-display">{room.name}</div>
                    </div>
                    {/*<h2 className="title">Seat Management</h2>*/}

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                        <CManagerSeatLayout
                            seats={seats}
                            selectedSeats={[]}
                            getSeatColor={getSeatColor}
                            handleClick={handleSeatClick}
                        />

                            <div className="seats-management-info">
                                {seatsInfo.map((info, index) => (
                                    <div className="info" key={index}>
                                        <div className="color" style={{backgroundColor: info[1]}}></div>
                                        <p>{info[0]}</p>
                                    </div>
                                ))}
                            </div>
                        </>


                    )}


                    {selectedSeat && (


                        <div className="choice-popup">
                            <h3>Seat {selectedSeat.seatNum}</h3>
                            <Button onClick={openUpdateSeatModal}>Update</Button>
                            <Button onClick={openDeleteModal}>Delete</Button>
                            <Button onClick={() => setSelectedSeat(null)}>Cancel</Button>

                        </div>


                    )}

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => {
                            setIsModalOpen(false);
                    setErrorMessage(''); // Reset thông báo lỗi khi đóng modal
                        }}
                    contentLabel={isEdit ? "Update Seat" : "Add Seat"}
                        className="seatmanagement-modal"

                    >
                        <div className="seatmanagement-modal-header">
                            <h2 className="modal-title">{isEdit ? "Update Seat" : "Add Seat" }</h2>
                        </div>
                        <div className="seatmanagment-modal-body">
                            <form onSubmit={handleSubmit}>


                                <div>
                                    <div>
                                        <label>Type:</label>
                                    {errorMessage && <p className="seattype-error" style={{ color: 'red' }}>{errorMessage}</p>}
                                    </div>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Seat Type</option>
                                        <option value="VIP">VIP</option>
                                        <option value="Standard">Standard</option>
                                    </select>
                                </div>
                                <div className="seatmanagement-modal-footer">
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
                        className="seatmanagement-modal"
                    >
                        <div className="seatmanagement-modal-header">
                            <h2 className="modal-title">Confirm Delete</h2>
                        </div>
                        <div className="seatmanagement-modal-body">
                            <p>Are you sure you want to delete this seat?</p>
                        </div>
                        <div className="seatmanagement-modal-footer">
                            <Button onClick={handleDeleteSeat}>Yes</Button>
                            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default SeatManagement;


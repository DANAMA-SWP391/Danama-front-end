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
    const location = useLocation(); // Get data from state
    const navigate = useNavigate(); // Navigation Hook
    const room = location.state?.room; // Access object room
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({ seatId: '', row: '', col: '', seatNum: '', type: '' });
    const [seatToDelete, setSeatToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);  // Contains information about selected seats
    const [selectedSeats, setSelectedSeats] = useState([]); //selected seats list
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
        setSelectedSeat(null); // Close choice-popup

    };

    // const openAddSeatModal = (seat) => {
    //     setIsEdit(false);
    //     // Tạo seatNum dựa trên row và col
    //     const rowLetter = String.fromCharCode(64 + seat.row); // Convert row 1 -> A, row 2 -> B, etc.
    //     const seatNum = `${rowLetter}${seat.col}`; // Ví dụ: B4
    //
    //     setFormData({
    //         row: seat.row,
    //         col: seat.col,
    //         seatNum: seatNum, // Tự động set giá trị seatNum
    //         type: ''
    //     });
    //     setIsModalOpen(true);
    // };

    const openAddSeatModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (!isEdit && formData.row && formData.col) {
            setIsModalOpen(true); // Open  modal after row and col are updated
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
        setSelectedSeat(null); // Close choice-popup

    };



    const handleSubmit = async () => {
        if (!formData.type) {
            setErrorMessage("Please select a Seat Type");
            return;
        }

        if (isEdit) {
            // Handle updating seat
            try {
                await fetchChangeSeatType({
                    seatId: formData.seatId,
                    row: formData.row,
                    col: formData.col,
                    seatNum: formData.seatNum,
                    type: formData.type,
                    room: { roomId: room.roomId }
                });
                await getSeats(); //  Reload seat list after updating
                setIsModalOpen(false);
                setSelectedSeat(null); // Delete status of selected seat
            } catch (error) {
                setErrorMessage("An error occurred while updating the seat.");
            }
        } else {
            // Handling add new seats
            const promises = selectedSeats.map(seat => {
                const newSeat = {
                    row: seat.row,
                    col: seat.col,
                    seatNum: `${String.fromCharCode(64 + seat.row)}${seat.col}`,
                    type: formData.type,
                    room: { roomId: room.roomId }
                };
                return fetchAddSeat(newSeat);
            });

            try {
                await Promise.all(promises);
                await getSeats(); // Get new data from server
                setSelectedSeats([]); // delete selected seats
                setIsModalOpen(false);
            } catch (error) {
                setErrorMessage("An error occurred while adding seats.");
            }
        }

        setErrorMessage('');
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
        if (seat.seatId) {
            setSelectedSeat(seat); // If seat has seatID , that's an existing seat
        } else {
            //  Add or delete empty seat into/out of 'selectedSeats'
            const isSeatSelected = selectedSeats.some(s => s.row === seat.row && s.col === seat.col);
            if (isSeatSelected) {
                setSelectedSeats(selectedSeats.filter(s => s.row !== seat.row || s.col !== seat.col));
            } else {
                setSelectedSeats([...selectedSeats, seat]);
            }
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
                            // selectedSeats={[]}
                            selectedSeats={selectedSeats} // transmit list of selected seats
                            getSeatColor={getSeatColor}
                            handleClick={handleSeatClick}
                        />
                            <Button onClick={openAddSeatModal} disabled={selectedSeats.length === 0}>
                                Add New Seats
                            </Button>

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
                                        className="seatType-dropdown"
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


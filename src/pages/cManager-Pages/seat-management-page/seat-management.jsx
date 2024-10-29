import {useEffect, useState} from "react";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import "./seat-management.css";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import {fetchSeatList, fetchDeleteSeat, fetchAddSeat, fetchChangeSeatType} from "../../../api/cManagerAPI.js";
import Button from "../../../components/common/Button/Button.jsx";
import Modal from "react-modal";
import {useLocation, useNavigate} from 'react-router-dom';
import CManagerSeatLayout from "../../../components/container/CManager-page/CManagerSeatLayout/CManagerSeatLayout.jsx";
import BackSpace from "../../../assets/Icons/back-space.svg";
import {useCustomAlert} from "../../../utils/CustomAlertContext.jsx";

function SeatManagement() {
    const location = useLocation();
    const navigate = useNavigate();
    const room = location.state?.room;
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectMode, setSelectMode] = useState("Standard");
    const [actionOption, setActionOption] = useState("Add Seats");
    const showAlert = useCustomAlert();
    const seatsInfo = [
        ["Standard", "#1BA0D4"],
        ["VIP", "#D64242"],
        ["Couple", "#FFD700"],
        ["Selected-Standard", '#A9CCE3'],
        ['Selected-VIP', '#F7DC6F'],
        ["Selected-Couple", "#F1948A"],
        ["Selected","green"]
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

    const handleSeatClick = (seat) => {
        const isSeatExist = Boolean(seat.seatId);
        let seatType = '';

        // Action-specific conditions
        if (actionOption === "Add Seats" && isSeatExist) return; // Add only allows empty seats
        if ((actionOption === "Update Seats" || actionOption === "Delete Seats") && !isSeatExist) return; // Update/Delete only on existing seats

        // Determine seat type based on action
        if (actionOption === "Delete Seats") {
            seatType = "Selected";
            setSelectMode("Standard"); // Lock to Standard for deletion and prevent changing selectMode
        } else if (actionOption === "Update Seats") {
            seatType = selectMode === "Standard" ? "Selected-Standard" :
                selectMode === "VIP" ? "Selected-VIP" : "Selected-Couple";
        } else if (actionOption === "Add Seats") {
            seatType = selectMode === "Standard" ? "Selected-Standard" :
                selectMode === "VIP" ? "Selected-VIP" : "Selected-Couple";
        }

        // Handle Couple Mode Selection
        if (selectMode === "Couple") {
            const adjacentSeat = { row: seat.row, col: seat.col + 1 };
            const isCoupleSelected = selectedSeats.some(
                s => (s.row === seat.row && s.col === seat.col) ||
                    (s.row === adjacentSeat.row && s.col === adjacentSeat.col)
            );

            if (actionOption === "Add Seats" || actionOption === "Update Seats") {
                if (isCoupleSelected) {
                    // Deselect both seats
                    setSelectedSeats(selectedSeats.filter(
                        s => !(s.row === seat.row && s.col === seat.col) && !(s.row === adjacentSeat.row && s.col === adjacentSeat.col)
                    ));
                } else if (adjacentSeat.col <= room.numberOfColumns) {
                    // Select both seats as a couple
                    setSelectedSeats([
                        ...selectedSeats,
                        { ...seat, type: seatType },
                        { ...adjacentSeat, type: seatType }
                    ]);
                } else {
                    showAlert("Couple seats must be selected in pairs.");
                }
            } else if (actionOption === "Delete Seats") {
                if (!isCoupleSelected) {
                    showAlert("Both seats of a couple must be selected for deletion.");
                } else {
                    // Set selected couple seats for deletion
                    setSelectedSeats(selectedSeats.filter(
                        s => !(s.row === seat.row && s.col === seat.col) && !(s.row === adjacentSeat.row && s.col === adjacentSeat.col)
                    ));
                }
            }
        } else {
            // Standard and VIP Mode
            const isSeatSelected = selectedSeats.some(s => s.row === seat.row && s.col === seat.col);
            const coupleSeatsSelected = selectedSeats.filter(s => s.type === "Selected-Couple").length;

            if (isSeatSelected) {
                setSelectedSeats(selectedSeats.filter(s => s.row !== seat.row || s.col !== seat.col));
            } else {
                if (coupleSeatsSelected === 1) {
                    showAlert("Cannot select only one seat in a couple.");
                    return;
                }
                setSelectedSeats([...selectedSeats, { ...seat, type: seatType }]);
            }
        }
    };




    const handleSubmit = async () => {
        if (!selectedSeats.length) {
            setErrorMessage("Please select seats to apply the action.");
            return;
        }

        try {
            if (actionOption === "Add Seats") {
                const promises = selectedSeats.map(seat => {
                    const seatType = seat.type.replace('Selected-', '');
                    const seatNum = `${String.fromCharCode(64 + seat.row)}${seat.col}`;
                    return fetchAddSeat({ row: seat.row, col: seat.col, seatNum, type: seatType, room: { roomId: room.roomId } });
                });
                await Promise.all(promises);
            } else if (actionOption === "Delete Seats") {
                const promises = selectedSeats.map(seat => fetchDeleteSeat(seat.seatId));
                await Promise.all(promises);
            } else if (actionOption === "Update Seats") {
                const promises = selectedSeats.map(seat => {
                    const seatType = seat.type.replace('Selected-', '');
                    return fetchChangeSeatType({ seatId: seat.seatId, type: seatType });
                });
                await Promise.all(promises);
            }
            await getSeats();
            setSelectedSeats([]);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage("An error occurred while processing seats.");
        }
    };

    const getSeatColor = (seatType) => {
        switch (seatType) {
            case 'VIP': return '#e74c3c';
            case 'Standard': return '#3498db';
            case 'Couple': return '#FFD700';
            case 'Selected-Standard': return '#A9CCE3';
            case 'Selected-VIP': return '#F7DC6F';
            case 'Selected-Couple': return '#F1948A';
            case 'Selected' : return 'green';
            default: return '#FFFFFF';
        }
    };
    const handleActionOption = (value) => {
        setActionOption(value);
        setSelectedSeats([]);
    }

    return (
        <div className="seat-management-page">
            <CManagerHeader />
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

                    {loading ? (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                        </div>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            <CManagerSeatLayout
                                seats={seats}
                                selectedSeats={selectedSeats}
                                getSeatColor={getSeatColor}
                                handleClick={handleSeatClick}
                                numberOfRows={parseInt(room.numberOfRows, 10)}
                                numberOfColumns={parseInt(room.numberOfColumns, 10)}
                            />
                            <div className="options-container">
                                <select value={actionOption} onChange={(e) => handleActionOption(e.target.value)}>
                                    <option value="Add Seats">Add Seats</option>
                                    <option value="Update Seats">Update Seats</option>
                                    <option value="Delete Seats">Delete Seats</option>
                                </select>

                                <select value={selectMode} onChange={(e) => setSelectMode(e.target.value)}>
                                    <option value="Standard">Standard</option>
                                    <option value="VIP">VIP</option>
                                    <option value="Couple">Couple</option>
                                </select>

                                <Button onClick={handleSubmit} disabled={selectedSeats.length === 0}>
                                    {actionOption}
                                </Button>
                            </div>

                            <div className="seats-management-info">
                                {seatsInfo.map((info, index) => (
                                    <div className="info" key={index}>
                                        <div className="color" style={{ backgroundColor: info[1] }}></div>
                                        <p>{info[0]}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default SeatManagement;


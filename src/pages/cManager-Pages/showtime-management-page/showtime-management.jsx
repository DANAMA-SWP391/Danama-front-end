import { useEffect, useState } from "react";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import "./showtime-management.css";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import {
    fetchAddShowtime,
    fetchShowtimeList,
    fetchUpdateShowtime,
    fetchDeleteShowtime,
} from "../../../api/cManagerAPI.js";
import Button from "../../../components/common/Button/Button.jsx";
import {MdDeleteOutline} from "react-icons/md";

import {FaPencilAlt} from "react-icons/fa";
import Modal from "react-modal";


function ShowtimeManagement() {
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        showtimeId: '',
        movieId: '',
        moviename: '',
        showDate: '',
        startTime: '00:00:00',
        endTime: '00:00:00',
        basePrice: '',
        roomId: '',
        roomName: '',
        seatAvailable: '',
        status: ''
    }); // Trạng thái dữ liệu form
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal
    const [isEdit, setIsEdit] = useState(false); // Trạng thái là edit hay add

    const cinemaId = 1;


    const getShowtimes = async () => {
        setLoading(true);
        try {
            const data = await fetchShowtimeList(cinemaId);
            console.log(data); // Kiểm tra dữ liệu trả về từ API
            setShowtimes(data.showtimes || []); // Chỉnh sửa tùy theo cấu trúc dữ liệu
        } catch (error) {
            console.error('Error fetching showtime list:', error);
            setError('Could not fetch showtimes.');
        }
        setLoading(false);
    };

    useEffect(() => {
        getShowtimes();
    }, [cinemaId]);

    // Handle room deletion
    const handleDeleteShowtime = async (showtimeId) => {
        console.log(`Attempting to delete room with ID: ${showtimeId}`); // Thêm dòng này

        const result = await fetchDeleteShowtime(showtimeId);
        console.log(`Delete result: ${result}`); // Thêm dòng này

        if (result) {
            setShowtimes(showtimes.filter(showtime => showtime.showtimeId !== showtimeId));
        } else {
            console.error('Failed to delete showtime');
        }
    };

    const openAddShowtimeModal = () => {
        console.log('Opening add showtime modal'); // Thêm dòng này

        setIsEdit(false);
        setFormData({
            movieId: '',
            showDate: new Date().toISOString().split('T')[0],
            startTime: '00:00:00',
            endTime: '00:00:00',
            basePrice: '',
            roomId: '',
            seatAvailable: '',
            status: ''
        }); // Reset dữ liệu
        setIsModalOpen(true);
    };

    // Xử lý mở modal cho việc cập nhật phòng
    const openUpdateShowtimeModal = (showtime) => {
        setIsEdit(true);
        setFormData({
            showtimeId: showtime.showtimeId,
            movieId: showtime.movie.movieId,
            showDate: new Date(showtime.showDate).toISOString().split('T')[0],
            startTime: showtime.startTime,
            endTime: showtime.startTime,
            basePrice: showtime.basePrice,
            roomId: showtime.room.roomId,
            seatAvailable: showtime.seatAvailable,
            status: showtime.status
        });
        setIsModalOpen(true);
    };


    // Xử lý gửi form
    const handleSubmit = async () => {
        // e.preventDefault();
        const formattedStartTime = `${formData.startTime}:00`; // Thêm phần giây
        const formattedEndTime = `${formData.endTime}:00`; // Thêm phần giây

        const dataToSend = {
            showtimeId: formData.showtimeId,
            showDate: formData.showDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            basePrice: formData.basePrice,
            movie: {movieId: formData.movieId},
            room: {roomId: formData.roomId},
            seatAvailable: formData.seatAvailable,
            status: formData.status
        };

            console.log('handleSubmit called'); // Kiểm tra xem hàm có được gọi không
            console.log('Form data before submission:', formData); // Kiểm tra dữ liệu form
        //     // if (isEdit) {
        //     //     await fetchUpdateRoom({ ...dataToSend, roomId: formData.roomId });
        //     //     setRooms(rooms.map(room => room.roomId === formData.roomId ? formData : room));
        //     // } else {
        //     //     const newRoom = await fetchAddRoom(dataToSend);
        //     //     console.log('New room added:', newRoom); // Thêm dòng này
        //     //     setRooms([...rooms, { ...dataToSend, roomId: newRoom.roomId }]);
        //     // }
        //
            if (isEdit) {
                await fetchUpdateShowtime({ ...dataToSend, showtimeId: formData.showtimeId });
                // Cập nhật danh sách phòng trong state
                setShowtimes(showtimes.map(showtime => showtime.showtimeId === formData.showtimeId ? { ...dataToSend, showtimeId: formData.showtimeId } : showtime));
            } else {
                await fetchAddShowtime(dataToSend);
                // Gọi lại danh sách showtime để đảm bảo có dữ liệu mới
                await getShowtimes(); // Gọi lại API để cập nhật danh sách showtime
            }
            setIsModalOpen(false);
        };

        // Xử lý thay đổi dữ liệu form
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        return (
            <div className="showtime-management-page">
                <CManagerHeader/>
                <div className="layout">
                    <Sidebar/>
                    <div className="showtime-management-content">
                        <h2 className="title">Showtime List</h2>
                        <Button className="add-showtime-button" onClick={openAddShowtimeModal}>+ Add new showtime</Button>


                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <table className="showtime-table">
                                <thead>
                                <tr>
                                    <th>Showtime ID</th>
                                    <th>Movie Name</th>
                                    <th>Show Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Base Price</th>
                                    <th>Room Name</th>
                                    <th>Seat Available</th>
                                    <th>Status</th>

                                    <th className="icon-column">Delete Showtime</th>
                                    <th className="icon-column">Update Showtime</th>
                                </tr>
                                </thead>
                                <tbody>
                                {showtimes.map((showtime) => (
                                    <tr key={showtime.showtimeId}>
                                        <td>{showtime.showtimeId}</td>
                                        <td>{showtime.movie ? showtime.movie.name : 'N/A'}</td>
                                        <td>{showtime.showDate
                                            ? new Date(showtime.showDate).toLocaleDateString('vi-VN')
                                            : 'N/A'}</td>
                                        <td>{showtime.startTime}</td>
                                        <td>{showtime.endTime}</td>
                                        <td>{showtime.basePrice}</td>
                                        <td>{showtime.room ? showtime.room.name : 'N/A'}</td>
                                        <td>{showtime.seatAvailable}</td>
                                        <td>{showtime.status}</td>


                                        <td>

                                            <Button

                                                className="delete-button"
                                                onClick={() => handleDeleteShowtime(showtime.showtimeId)}
                                            >
                                                <span className="icon"><MdDeleteOutline
                                                    style={{fontSize: '20px'}}/></span>


                                            </Button>
                                        </td>
                                        <td>

                                            <Button className="update-button" onClick={() => openUpdateShowtimeModal(showtime)}>
                                                <span className="icon"><FaPencilAlt style={{fontSize: '20px'}}/></span>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}

                         {/*Modal cho việc thêm và cập nhật showtime */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            contentLabel={isEdit ? "Update Showtime" : "Add Showtime"}
                            className="modal" // Thêm class để áp dụng CSS
                        >
                            <div className="modal-header">
                                <h2 className="modal-title">{isEdit ? "Update Showtime" : "Add Showtime"}</h2>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label>Movie Id:</label>
                                        <input
                                            type="number"
                                            name="movieId"
                                            value={formData.movieId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Show Date:</label>
                                        <input
                                            type="date"
                                            name="showDate"
                                            value={formData.showDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="time-inputs" >
                                        <label>Start Time:</label>
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            required
                                        />

                                        <label>End Time:</label>
                                        <input
                                            type="time"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label>Base Price:</label>
                                        <input
                                            type="text"
                                            name="basePrice"
                                            value={formData.basePrice}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Room ID:</label>
                                        <input
                                            type="number"
                                            name="roomId"
                                            value={formData.roomId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Available Seats:</label>
                                        <input
                                            type="number"
                                            name="seatAvailable"
                                            value={formData.seatAvailable}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Status:</label>
                                        <input
                                            type="number"
                                            name="status"
                                            value={formData.status}
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
                    </div>
                </div>
            </div>
        );
}

export default ShowtimeManagement;




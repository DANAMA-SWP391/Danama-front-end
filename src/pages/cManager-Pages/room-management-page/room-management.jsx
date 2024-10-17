

import { useEffect, useState } from "react";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import "./room-management.css";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import { fetchRoomList } from "../../../api/cManagerAPI.js";
import { fetchDeleteRoom ,fetchAddRoom, fetchUpdateRoom } from "../../../api/cManagerAPI.js";
import Button from "../../../components/common/Button/Button.jsx";
import Modal from "react-modal"; // Import Modal

import { MdDeleteOutline } from "react-icons/md";
import { MdEventSeat } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";




function RoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [newRoom, setNewRoom] = useState({ name: '', numberOfSeat: 0 }); // Đối tượng phòng mới
    // const [roomToUpdate, setRoomToUpdate] = useState(null); // Phòng cần cập nhật
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal
    const [isEdit, setIsEdit] = useState(false); // Trạng thái là edit hay add
    const [formData, setFormData] = useState({ roomId: '', name: '', numberOfSeat: '' }); // Trạng thái dữ liệu form

    const cinemaId = 1;

    // Fetch room list on component mount
    const getRooms = async () => {
        setLoading(true);
        try {
            const data = await fetchRoomList(cinemaId);
            console.log(data); // Kiểm tra dữ liệu trả về từ API
            setRooms(data.rooms || []); // Chỉnh sửa tùy theo cấu trúc dữ liệu
        } catch (error) {
            console.error('Error fetching booking list:', error);
            setError('Could not fetch bookings.');
        }
        setLoading(false);
    };

    useEffect(() => {
        getRooms();
    }, [cinemaId]);

    // Handle room deletion
    const handleDeleteRoom = async (roomId) => {
        console.log(`Attempting to delete room with ID: ${roomId}`); // Thêm dòng này

        const result = await fetchDeleteRoom(roomId);
        console.log(`Delete result: ${result}`); // Thêm dòng này

        if (result) {
            setRooms(rooms.filter(room => room.roomId !== roomId));
        } else {
            console.error('Failed to delete room');
        }
    };



    const openAddRoomModal = () => {
        console.log('Opening add room modal'); // Thêm dòng này

        setIsEdit(false);
        setFormData({  name: '', numberOfSeat: '' }); // Reset dữ liệu
        setIsModalOpen(true);
    };

    // Xử lý mở modal cho việc cập nhật phòng
    const openUpdateRoomModal = (room) => {
        setIsEdit(true);
        setFormData({  roomId: room.roomId, name: room.name, numberOfSeat: room.numberOfSeat });
        setIsModalOpen(true);
    };

    // Xử lý gửi form
    const handleSubmit = async () => {
        // e.preventDefault();
        const dataToSend = {
            name: formData.name,
            numberOfSeat: formData.numberOfSeat,
            cinema: { cinemaId: cinemaId } // Đảm bảo cinemaId được gửi
        };

        console.log('handleSubmit called'); // Kiểm tra xem hàm có được gọi không
        console.log('Form data before submission:', formData); // Kiểm tra dữ liệu form
        // if (isEdit) {
        //     await fetchUpdateRoom({ ...dataToSend, roomId: formData.roomId });
        //     setRooms(rooms.map(room => room.roomId === formData.roomId ? formData : room));
        // } else {
        //     const newRoom = await fetchAddRoom(dataToSend);
        //     console.log('New room added:', newRoom); // Thêm dòng này
        //     setRooms([...rooms, { ...dataToSend, roomId: newRoom.roomId }]);
        // }

        if (isEdit) {
            await fetchUpdateRoom({ ...dataToSend, roomId: formData.roomId });
            // Cập nhật danh sách phòng trong state
            setRooms(rooms.map(room => room.roomId === formData.roomId ? { ...dataToSend, roomId: formData.roomId } : room));
        } else {
            await fetchAddRoom(dataToSend);
            // Gọi lại danh sách phòng để đảm bảo có dữ liệu mới
            await getRooms(); // Gọi lại API để cập nhật danh sách phòng
        }
        setIsModalOpen(false);
    };

    // Xử lý thay đổi dữ liệu form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="room-management-page">
            <CManagerHeader />
            <div className="layout">
                <Sidebar />
                <div className="room-management-content">
                    <h2 className="title">Room List</h2>
                    {/*<button className="add-room-button">+ Add new room</button>*/}
                    {/*<Button className="add-room-button" to="/add-room">+ Add new room</Button>*/}
                    <Button className="add-room-button" onClick={openAddRoomModal}>+ Add new room</Button>


                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
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
                            {rooms.map((room) => (
                                <tr key={room.roomId}>
                                    <td>{room.roomId}</td>
                                    <td>{room.name}</td>
                                    <td>{room.numberOfSeat}</td>
                                    <td>
                                        <Button className="edit-seat-button" to="/seat-management">
                                            {/* Add edit icon here */}
                                            <span className="icon"><MdEventSeat style={{fontSize: '20px'}}/></span>


                                        </Button>
                                    </td>
                                    <td>

                                    <Button

                                            className="delete-button"
                                            onClick={() => handleDeleteRoom(room.roomId)}
                                        >
                                            <span className="icon"><MdDeleteOutline style={{fontSize: '20px'}}/></span>



                                            {/* Add delete icon here */}
                                        </Button>
                                    </td>
                                    <td>
                                    {/*<Button className="update-button">*/}
                                    {/*        /!* Add edit icon here *!/*/}
                                    {/*        <span className="icon"><FaPencilAlt style={{fontSize: '20px'}}/></span>*/}


                                    {/*    </Button>*/}
                                        <Button className="update-button" onClick={() => openUpdateRoomModal(room)}>
                                            <span className="icon"><FaPencilAlt style={{ fontSize: '20px' }} /></span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}

                    {/* Modal cho việc thêm và cập nhật phòng */}
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel={isEdit ? "Update Room" : "Add Room"}
                        className="modal" // Thêm class để áp dụng CSS
                    >
                        <div className="modal-header">
                            <h2 className="modal-title">{isEdit ? "Update Room" : "Add Room"}</h2>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Room Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Number of Seats:</label>
                                    <input
                                        type="number"
                                        name="numberOfSeat"
                                        value={formData.numberOfSeat}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <Button onClick={handleSubmit}>Submit</Button>
                                    <Button onClick=  {handleSubmit} >{isEdit ? "Update" : "Add"}</Button>
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

export default RoomManagement;

import {useContext, useEffect, useState} from "react";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import "./showtime-management.css";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import {
    fetchAddShowtime,
    fetchShowtimeList,
    fetchUpdateShowtime,
    fetchDeleteShowtime, fetchRoomList,
} from "../../../api/cManagerAPI.js";
import Button from "../../../components/common/Button/Button.jsx";
import {MdDeleteOutline} from "react-icons/md";

import {FaPencilAlt} from "react-icons/fa";
import Modal from "react-modal";
import {WebContext} from "../../../utils/webContext.jsx";


function ShowtimeManagement() {
    const [showtimes, setShowtimes] = useState([]);
    const {filmList} = useContext(WebContext);
    const [roomlist, setRoomlist] = useState([]);

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
        seatAvailable:'',
        status: '',
        duration: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showtimeToDelete, setShowtimeToDelete] = useState(null);
    const [formError, setFormError] = useState({
        movieId: '',
        showDate: '',
        startTime: '',
        endTime: '',
        basePrice: '',
        roomId: '',
        status: ''
    });
    const showtimesPerPage = 10;
    const storagecinema = localStorage.getItem('cinema');
    const cinema = JSON.parse(storagecinema);
    const cinemaId = cinema.cinemaId;


    const getShowtimes = async () => {
        setLoading(true);
        try {
            const data = await fetchShowtimeList(cinemaId);
            setShowtimes(data.showtimes || []);
        } catch (error) {
            console.error('Error fetching showtime list:', error);
            setError('Could not fetch showtimes.');
        }
        setLoading(false);
    };

    const getRooms = async () => {
        setLoading(true);
        try {
            const data = await fetchRoomList(cinemaId);
            setRoomlist(data.rooms || []);
        } catch (error) {
            console.error('Error fetching booking list:', error);
        }
        // setLoading(false);
    };




    useEffect(() => {
        getShowtimes();
        getRooms();
    }, [cinemaId]);

    // Handle room deletion
    const handleConfirmDelete = async () => {

        const result = await fetchDeleteShowtime(showtimeToDelete);

        if (result) {
            setShowtimes(showtimes.filter(showtime => showtime.showtimeId !== showtimeToDelete));
            setIsDeleteModalOpen(false);
            setShowtimeToDelete(null);

        } else {
            console.error('Failed to delete showtime');
        }
    };

    const openDeleteModal = (showtimeId) => {
        setShowtimeToDelete(showtimeId);
        setIsDeleteModalOpen(true);
    };

    const openAddShowtimeModal = () => {

        setIsEdit(false);
        setFormData({
            movieId: '',
            // showDate: new Date().toISOString().split('T')[0],
            showDate: new Date().toLocaleDateString('en-CA'),
            startTime: '00:00:00',
            endTime: '00:00:00',
            basePrice: '',
            roomId: '',
            // status: ''
        }); // Reset data
        setFormError({ // Reset error when open form
            movieId: '',
            showDate: '',
            startTime: '',
            endTime: '',
            basePrice: '',
            roomId: '',
            // status: ''
        });
        setIsModalOpen(true);
    };

    const openUpdateShowtimeModal = (showtime) => {
        setIsEdit(true);

        setFormData({
            showtimeId: showtime.showtimeId,
            movieId: showtime.movie.movieId,
            showDate: new Date(showtime.showDate).toLocaleDateString('en-CA'),

            // startTime:  showtime.startTime.slice(0, 5),  // Just select HH:mm for time picker
            // endTime: showtime.endTime.slice(0, 5),

            startTime: convertTo24HourFormat(showtime.startTime),  // Chỉ lấy phần HH:mm:ss
            endTime: convertTo24HourFormat(showtime.endTime),
            // startTime:  convertTo24HourFormat(showtime.startTime),  // Just select HH:mm for time picker
            // endTime: convertTo24HourFormat(showtime.endTime),
            basePrice: showtime.basePrice,
            roomId: showtime.room.roomId,
            // status: showtime.status
        });

        setFormError({ // Reset error when open form
            movieId: '',
            showDate: '',
            startTime: '',
            endTime: '',
            basePrice: '',
            roomId: '',
            // status: ''
        });
        setIsModalOpen(true);
    };

    function convertTo24HourFormat(timeString) {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes, seconds = "00"] = time.split(':');

        if (modifier === 'AM' && hours === '12') {
            hours = '00';
        } else if (modifier === 'PM' && hours !== '12') {
            hours = String(parseInt(hours, 10) + 12);
        }

        return `${hours.padStart(2, '0')}:${minutes}:${seconds}`;
    }

    // Update endTime when chosing new film
    const handleMovieChange = (e) => {
        const selectedMovieId = Number(e.target.value);
        const selectedMovie = filmList.find(film => film.movieId === selectedMovieId);
        const duration = selectedMovie ? selectedMovie.duration : 0;

        setFormData(prev => ({
            ...prev,
            movieId: selectedMovieId,
            duration: duration,
            endTime: calculateEndTime(prev.startTime, duration) // Calculate endTime imediately when movie chosed
        }));

        setFormError(prev => ({ ...prev, movieId: '' }));
    };

    // Cập nhật endTime khi startTime thay đổi
    const handleStartTimeChange = (e) => {
        const startTime = e.target.value;

        // Lấy `duration` từ phim hiện tại
        const selectedMovie = filmList.find(film => film.movieId === formData.movieId);
        const duration = selectedMovie ? selectedMovie.duration : formData.duration;

        setFormData(prev => ({
            ...prev,
            startTime: startTime,
            duration: duration,
            endTime: calculateEndTime(startTime, duration)

        }));

        setFormError(prev => ({ ...prev, startTime: '' }));
    };

    // Method endTime base on startTime and duration

    const calculateEndTime = (startTime, duration) => {
        const [hours, minutes] = startTime.split(':').map(Number);

        // Create new  Date for startTime
        const endDate = new Date();
        endDate.setHours(hours);
        endDate.setMinutes(minutes + duration); // Add duration to minute

        // Select hour and minute from endDate after adding duration
        const endHours = String(endDate.getHours()).padStart(2, '0');
        const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

        return `${endHours}:${endMinutes}:00`;
    };


    const handleSubmit = async () => {
        logShowtimeDetails(); // In startTime và endTime

        let hasError = false;
        let errors = {
            movieId: '',
            showDate: '',
            startTime: '',
            endTime: '',
            basePrice: '',
            roomId: '',
            // status: ''
        };

        if (!formData.movieId) {
            errors.movieId = 'Movie is required';
            hasError = true;
        }
        if (!formData.showDate) {
            errors.showDate = 'Show Date is required';
            hasError = true;
        }
        if (!formData.startTime) {
            errors.startTime = 'Start Time is required';
            hasError = true;
        }
        if (!formData.endTime) {
            errors.endTime = 'End Time is required';
            hasError = true;
        }
        if (!formData.basePrice || isNaN(formData.basePrice)) {
            errors.basePrice = 'Base Price must be a valid number';
            hasError = true;
        }
        if (!formData.roomId) {
            errors.roomId = 'Room ID is required';
            hasError = true;
        }



        // if (formData.status === null || formData.status === undefined || formData.status === '') {
        //     errors.status = 'Status is required';
        //     hasError = true;
        // }


        // Create object  Date for startTime and endTime of new showtime
        // const newStartTime = new Date(`${formData.showDate}T${formData.startTime}`);
        // const newEndTime = new Date(`${formData.showDate}T${formData.endTime}`);

        const newStartTime = formData.startTime;
        const newEndTime = formData.endTime;

        console.log("New showtime startTime:", formData.startTime);
        console.log("New showtime endTime:", formData.endTime);
        console.log("New showtime startTime (Date object):", newStartTime);
        console.log("New showtime endTime (Date object):", newEndTime);

        // Check duplicate showtime
        const isConflict = showtimes.some((showtime) => {
            const existingShowDate = new Date(showtime.showDate).toLocaleDateString('en-CA'); // Định dạng yyyy-mm-dd
            if (isEdit && showtime.showtimeId === formData.showtimeId) {
                return false;
            }
            if (String(showtime.room.roomId) === String(formData.roomId) && existingShowDate === formData.showDate) {



                const existingStartTime = convertTo24HourFormat(showtime.startTime);
                const existingEndTime = convertTo24HourFormat(showtime.endTime);



                console.log("Checking against existing showtime:");
                console.log("Existing showtime startTime:", showtime.startTime);
                console.log("Existing showtime endTime:", showtime.endTime);
                console.log("Existing startTime (Date object):", existingStartTime);
                console.log("Existing endTime (Date object):", existingEndTime);
                console.log("New StartTime:", newStartTime);
                console.log("New EndTime:", newEndTime);
                // Check duplicate
                // return (
                //     (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
                //     (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
                //     (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
                // );
                // Thực hiện phép so sánh
                const conflictResult = (
                    (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
                    (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
                    (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
                );

                console.log("Conflict detected:", conflictResult); // Kiểm tra kết quả so sánh
                return conflictResult;

            }
            return false; // No conflict not in the same room or on the same day
        });

        // conflict resolution
        if (isConflict) {
            errors.startTime = 'This showtime conflicts with an existing showtime in the same room and date.';
            setFormError(errors);
            return; // stop if there's conflict
        }


        setFormError(errors);

        if (hasError) {
            return;
        }

        const formattedStartTime = `${(formData.startTime)}:00`; //Add SECOND
        const formattedEndTime = `${(formData.endTime)}:00`;
        const dataToSend = {
            showtimeId: formData.showtimeId,
            showDate: formData.showDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            basePrice: formData.basePrice,
            movie: {movieId: formData.movieId},
            room: {roomId: formData.roomId},
            seatAvailable: formData.seatAvailable,
            // status: formData.status
        };



            if (isEdit) {
                await fetchUpdateShowtime({ ...dataToSend, showtimeId: formData.showtimeId });
                setShowtimes(showtimes.map(showtime =>
                    showtime.showtimeId === formData.showtimeId
                    ? { ...showtime, ...dataToSend, room: { name: showtime.room.name }, seatAvailable: formData.seatAvailable } : showtime));
                await getShowtimes();

            } else {
                await fetchAddShowtime(dataToSend);
                await getShowtimes();
            }
            setIsModalOpen(false);
        };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'movieId' && value) {
            setFormError(prev => ({ ...prev, movieId: '' }));
        }
        if (name === 'showDate' && value) {
            setFormError(prev => ({ ...prev, showDate: '' }));
        }
        if (name === 'startTime' && value) {
            setFormError(prev => ({ ...prev, startTime: '' }));
        }
        if (name === 'endTime' && value) {
            setFormError(prev => ({ ...prev, endTime: '' }));
        }
        if (name === 'basePrice' && !isNaN(value)) {
            setFormError(prev => ({ ...prev, basePrice: '' }));
        }
        if (name === 'roomId' && value) {
            setFormError(prev => ({ ...prev, roomId: '' }));
        }

        // if (name === 'status' && value) {
        //     setFormError(prev => ({ ...prev, status: '' }));
        // }
    };

    const getMovieName = (movieId) => {
        const movie = filmList.find(film => film.movieId === movieId);
        return movie ? movie.name : 'N/A';
    };




    const logShowtimeDetails = () => {
        console.log("Start Time:", formData.startTime);
        console.log("End Time:", formData.endTime);
    };

        const indexOfLastShowtime = currentPage * showtimesPerPage;
        const indexOfFirstShowtime = indexOfLastShowtime - showtimesPerPage;
        const currentShowtimes = showtimes.slice(indexOfFirstShowtime, indexOfLastShowtime);
        const totalPages = Math.ceil(showtimes.length / showtimesPerPage);

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return (
            <div className="showtime-management-page">
                {loading && (
                    <div className="showtime-management-loading-overlay">
                        <div className="showtime-management-spinner"></div>
                    </div>
                )}
                    <CManagerHeader/>
                <div className="layout">
                    <Sidebar/>
                    <div className="showtime-management-content">
                        <h2 className="title">Showtime List</h2>
                        <Button className="add-showtime-button" onClick={openAddShowtimeModal}>+ Add new
                            showtime</Button>


                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div>
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
                                        {/*<th>Status</th>*/}

                                        <th className="icon-column">Delete Showtime</th>
                                        <th className="icon-column">Update Showtime</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {currentShowtimes.map((showtime) => (

                                        <tr key={showtime.showtimeId}>
                                            <td>{showtime.showtimeId}</td>
                                            <td>{getMovieName(showtime.movie.movieId)}</td>
                                            <td>{showtime.showDate
                                                ? new Date(showtime.showDate).toLocaleDateString('vi-VN')
                                                : 'N/A'}</td>

                                            <td>{(showtime.startTime)}</td>
                                            <td>{(showtime.endTime)}</td>
                                            <td>{showtime.basePrice}</td>
                                            <td>{showtime.room ? showtime.room.name : 'N/A'}</td>
                                            <td>{showtime.seatAvailable}</td>
                                            {/*<td>*/}
                                            {/*    {showtime.status === 0 ? 'Coming Soon' : 'Now Showing'}*/}
                                            {/*</td>*/}


                                            <td>

                                                <Button

                                                    className="delete-button"
                                                    onClick={() => openDeleteModal(showtime.showtimeId)}
                                                >
                                                <span className="icon"><MdDeleteOutline
                                                    style={{fontSize: '20px'}}/></span>


                                                </Button>
                                            </td>
                                            <td>

                                                <Button className="update-button"
                                                        onClick={() => openUpdateShowtimeModal(showtime)}>
                                                    <span className="icon"><FaPencilAlt
                                                        style={{fontSize: '20px'}}/></span>
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
                            contentLabel={isEdit ? "Update Showtime" : "Add Showtime"}
                            className="modal"
                        >
                            <div className="modal-header">
                                <h2 className="modal-title">{isEdit ? "Update Showtime" : "Add Showtime"}</h2>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="label-group">
                                            <label>Movie:</label>
                                            {formError.movieId && (
                                                <span className="showtime-error-message">{formError.movieId}</span>
                                            )}
                                        </div>
                                        <select
                                            name="movieId"
                                            value={formData.movieId}
                                            // onChange={handleChange}
                                            onChange={handleMovieChange}
                                            required
                                            className="select-dropdown"

                                        >
                                            <option value="">Select Movie</option>
                                            {filmList.map(film => (
                                                <option key={film.movieId} value={film.movieId}>
                                                    {film.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <div className="label-group">
                                            <label>Show Date:</label>
                                            {formError.showDate && (
                                                <span className="showtime-error-message">{formError.showDate}</span>
                                            )}
                                        </div>
                                        <input
                                            type="date"
                                            name="showDate"
                                            value={formData.showDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="time-inputs">
                                        <div className="label-group">
                                            <label>Start Time:</label>
                                            {formError.startTime && (
                                                <span className="showtime-error-message">{formError.startTime}</span>
                                            )}
                                        </div>
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleStartTimeChange}
                                            required
                                        />

                                        <div className="label-group">
                                            <label>End Time:</label>
                                            {/*{formError.endTime && (*/}
                                            {/*    <span className="showtime-error-message">{formError.endTime}</span>*/}
                                            {/*)}*/}
                                        </div>


                                        <input
                                            type="time"
                                            name="endTime"
                                            value={formData.endTime}
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <div className="label-group">
                                            <label>Base Price:</label>
                                            {formError.basePrice && (
                                                <span className="showtime-error-message">{formError.basePrice}</span>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            name="basePrice"
                                            value={formData.basePrice}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>



                                    <div>
                                        <label>Room:</label>
                                        {formError.roomId && (
                                            <span className="showtime-error-message">{formError.roomId}</span>
                                        )}
                                        <select
                                            name="roomId"
                                            value={formData.roomId}
                                            onChange={handleChange}
                                            required
                                            className="select-dropdown"

                                        >
                                            <option value="">Select Room</option>
                                            {roomlist.map(room => (


                                                    <option key={room.roomId} value={room.roomId}>
                                                        {room.name}
                                                    </option>

                                            ))}
                                        </select>
                                    </div>


                                    {/*<div>*/}
                                    {/*    <div className="label-group">*/}
                                    {/*        <label>Status:</label>*/}
                                    {/*        {formError.status && (*/}
                                    {/*            <span className="showtime-error-message">{formError.status}</span>*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*    <select*/}
                                    {/*        name="status"*/}
                                    {/*        value={formData.status}*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        required*/}
                                    {/*    >*/}
                                    {/*        <option value="">Select Status</option>*/}
                                    {/*        <option value="0">Coming Soon</option>*/}
                                    {/*        <option value="1">Now Showing</option>*/}
                                    {/*    </select>*/}
                                    {/*</div>*/}

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
                                <p>Are you sure you want to delete this showtime?</p>
                            </div>
                            <div className="modal-footer">
                                <Button onClick={handleConfirmDelete}>Yes</Button>
                                <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
}

export default ShowtimeManagement;




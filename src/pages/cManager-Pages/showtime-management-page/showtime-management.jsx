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
        seatAvailable:'',
        status: ''
    }); // Trạng thái dữ liệu form
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
    const cinemaId = 1;


    const getShowtimes = async () => {
        setLoading(true);
        try {
            const data = await fetchShowtimeList(cinemaId);
            console.log(data); //Check data
            setShowtimes(data.showtimes || []);
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
    const handleConfirmDelete = async () => {

        const result = await fetchDeleteShowtime(showtimeToDelete);
        console.log(`Delete result: ${result}`);

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
        console.log('Opening add showtime modal');

        setIsEdit(false);
        setFormData({
            movieId: '',
            showDate: new Date().toISOString().split('T')[0],
            startTime: '00:00:00',
            endTime: '00:00:00',
            basePrice: '',
            roomId: '',
            status: ''
        }); // Reset dữ liệu
        setFormError({ // Reset error when open form
            movieId: '',
            showDate: '',
            startTime: '',
            endTime: '',
            basePrice: '',
            roomId: '',
            status: ''
        });
        setIsModalOpen(true);
    };

    const openUpdateShowtimeModal = (showtime) => {
        setIsEdit(true);
        setFormData({
            showtimeId: showtime.showtimeId,
            movieId: showtime.movie.movieId,
            showDate: new Date(showtime.showDate).toISOString().split('T')[0],
            // startTime: convertTo12HourFormat(showtime.startTime),
            // endTime: convertTo12HourFormat(showtime.endTime),
            startTime: convertTo24HourFormat(showtime.startTime), // Chuyển sang 24h
            endTime: convertTo24HourFormat(showtime.endTime) ,// Chuyển sang 24h
            basePrice: showtime.basePrice,
            roomId: showtime.room.roomId,
            status: showtime.status
        });
        console.log('FormData like:', formData);

        setFormError({ // Reset error when open form
            movieId: '',
            showDate: '',
            startTime: '',
            endTime: '',
            basePrice: '',
            roomId: '',
            status: ''
        });
        setIsModalOpen(true);
    };


    const handleSubmit = async () => {
        // e.preventDefault();
        let hasError = false;
        let errors = {
            movieId: '',
            showDate: '',
            startTime: '',
            endTime: '',
            basePrice: '',
            roomId: '',
            status: ''
        };

        if (!formData.movieId) {
            errors.movieId = 'Movie ID is required';
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

        // if (!formData.status) {
        //     errors.status = 'Status is required';
        //     hasError = true;
        // }

        if (formData.status === null || formData.status === undefined || formData.status === '') {
            errors.status = 'Status is required';
            hasError = true;
        }

        setFormError(errors);

        if (hasError) {
            return;
        }

        const formattedStartTime = `${convertTo24HourFormat(formData.startTime)}:00`; //Add SECOND
        const formattedEndTime = `${convertTo24HourFormat(formData.endTime)}:00`;

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

            console.log('handleSubmit called');
            console.log('Form data before submission:', formData);

            if (isEdit) {
                await fetchUpdateShowtime({ ...dataToSend, showtimeId: formData.showtimeId });
                // setShowtimes(showtimes.map(showtime => showtime.showtimeId === formData.showtimeId ? { ...dataToSend, showtimeId: formData.showtimeId } : showtime));
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
        // if (name === 'seatAvailable' && value > 0) {
        //     setFormError(prev => ({ ...prev, seatAvailable: '' }));
        // }
        if (name === 'status' && value) {
            setFormError(prev => ({ ...prev, status: '' }));
        }
    };

    function convertTo12HourFormat(timeString) {
        const [hours, minutes] = timeString.split(':');
        const period = +hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = +hours % 12 || 12; // Chuyển 0h thành 12h
        return `${adjustedHours}:${minutes} ${period}`;
    }

    function convertTo24HourFormat(timeString) {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    }


        const indexOfLastShowtime = currentPage * showtimesPerPage;
        const indexOfFirstShowtime = indexOfLastShowtime - showtimesPerPage;
        const currentShowtimes = showtimes.slice(indexOfFirstShowtime, indexOfLastShowtime);
        const totalPages = Math.ceil(showtimes.length / showtimesPerPage);

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return (
            <div className="showtime-management-page">
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
                                        <th>Status</th>

                                        <th className="icon-column">Delete Showtime</th>
                                        <th className="icon-column">Update Showtime</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*{showtimes.map((showtime) => (*/}
                                    {currentShowtimes.map((showtime) => (

                                        <tr key={showtime.showtimeId}>
                                            <td>{showtime.showtimeId}</td>
                                            <td>{showtime.movie ? showtime.movie.name : 'N/A'}</td>
                                            <td>{showtime.showDate
                                                ? new Date(showtime.showDate).toLocaleDateString('vi-VN')
                                                : 'N/A'}</td>

                                            <td>{convertTo12HourFormat(showtime.startTime)}</td>
                                            {/*<td>{showtime.startTime}</td>*/}
                                            {/*<td>{showtime.endTime}</td>*/}
                                            <td>{convertTo12HourFormat(showtime.endTime)}</td>
                                            <td>{showtime.basePrice}</td>
                                            <td>{showtime.room ? showtime.room.name : 'N/A'}</td>
                                            <td>{showtime.seatAvailable}</td>
                                            {/*<td>{showtime.status}</td>*/}
                                            <td>
                                                {showtime.status === 0 ? 'Coming Soon' : 'Now Showing'}
                                            </td>


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
                                            <label>Movie Id:</label>
                                            {formError.movieId && (
                                                <span className="error-message">{formError.movieId}</span>
                                            )}
                                        </div>
                                        <input
                                            type="number"
                                            name="movieId"
                                            value={formData.movieId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="label-group">
                                            <label>Show Date:</label>
                                            {formError.showDate && (
                                                <span className="error-message">{formError.showDate}</span>
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
                                                <span className="error-message">{formError.startTime}</span>
                                            )}
                                        </div>
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            required
                                        />

                                        <div className="label-group">
                                            <label>End Time:</label>
                                            {formError.endTime && (
                                                <span className="error-message">{formError.endTime}</span>
                                            )}
                                        </div>
                                        <input
                                            type="time"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <div className="label-group">
                                            <label>Base Price:</label>
                                            {formError.basePrice && (
                                                <span className="error-message">{formError.basePrice}</span>
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
                                        <div className="label-group">
                                            <label>Room ID:</label>
                                            {formError.roomId && (
                                                <span className="error-message">{formError.roomId}</span>
                                            )}
                                        </div>
                                        <input
                                            type="number"
                                            name="roomId"
                                            value={formData.roomId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/*<div>*/}
                                    {/*    <div className="label-group">*/}
                                    {/*        <label>Status:</label>*/}
                                    {/*        {formError.status && (*/}
                                    {/*            <span className="error-message">{formError.status}</span>*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*    <input*/}
                                    {/*        type="number"*/}
                                    {/*        name="status"*/}
                                    {/*        value={formData.status}*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        required*/}
                                    {/*    />*/}

                                    {/*</div>*/}
                                    <div>
                                        <div className="label-group">
                                            <label>Status:</label>
                                            {formError.status && (
                                                <span className="error-message">{formError.status}</span>
                                            )}
                                        </div>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Status</option>
                                            <option value="0">Coming Soon</option>
                                            <option value="1">Now Showing</option>
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




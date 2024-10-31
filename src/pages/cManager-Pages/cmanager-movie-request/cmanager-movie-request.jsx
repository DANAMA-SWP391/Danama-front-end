import {useEffect, useState} from "react";
import {
    fetchMovieRequestList,
    fetchDeleteMovieRequest,
    fetchAddMovieRequest,
    fetchViewMovieRequest,
} from "../../../api/cManagerAPI.js";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import Button from "../../../components/common/Button/Button.jsx";
import {MdDeleteOutline} from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import "./cmanager-movie-request.css";
import {upFileToAzure} from "../../../api/webAPI.jsx";
import {useCustomAlert} from "../../../utils/CustomAlertContext.jsx";
import Modal from "../../../components/common/Modal/Modal.jsx";



function CManagerMovieRequestManagement(){
    const showAlert = useCustomAlert();
    const [movierequests, setMovierequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    // const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Xác định trạng thái của modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Trạng thái cho modal xem chi tiết
    const [requestToDelete, setRequestToDelete] = useState(null);
    const [availableGenres, setAvailableGenres] = useState([]);
    const [posterFile, setPosterFile] = useState(null); // New state for file selection
    const [errors, setErrors] = useState({});
    const [selectedMovieRequest, setSelectedMovieRequest] = useState({
        cinemaId: '',
        movie: {
            name: '',
            description: '',
            poster: '',
            trailer: '',
            releaseDate: '',
            country: '',
            director: '',
            ageRestricted: 0,
            actors: '',
            duration: 0,
            genres: []
        },
        message: '',
        status: 0
    });
    const requestsPerPage = 10;
    const storagecinema = localStorage.getItem('cinema');
    const cinema = JSON.parse(storagecinema);
    const cinemaId = cinema.cinemaId;

    const getMovieRequests = async () => {
        setLoading(true);
        try {
            const data = await fetchMovieRequestList(cinemaId);
            setMovierequests(data.movierequests || []);
            setAvailableGenres(data.genres );

        } catch (error) {
            console.error('Error fetching movie request list:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getMovieRequests();

    }, [cinemaId]);

    const handlePosterChange = (e) => {
        setPosterFile(e.target.files[0]); // Track the selected file
    };
    const handleUploadPoster = async () => {
        if (posterFile) {
            setLoading(true);
            const imageUrl = await upFileToAzure(posterFile); // Upload image to Azure
            if (imageUrl) {
                setLoading(false);
                setSelectedMovieRequest(prev => ({
                    ...prev,
                    movie: { ...prev.movie, poster: imageUrl }
                }));
                showAlert("Poster uploaded successfully!");
            } else {
                showAlert("Failed to upload poster.");
            }
        } else {
            showAlert("Please select a file to upload.");
        }
    };

    const handleDeleteRequest = async () => {
        const result = await fetchDeleteMovieRequest(requestToDelete);
        if (result) {
            setMovierequests(movierequests.filter(movierequest => movierequest.requestId !== requestToDelete));
            setIsDeleteModalOpen(false);
        } else {
            console.error('Failed to delete request');
        }
    };

    const handleViewRequestDetails = async (requestId) => {
        try {
            const data = await fetchViewMovieRequest(requestId);
            if (data.movieRequest.status === 2) {
                showAlert("Request has been rejected"); // Hiển thị thông báo từ hook showAlert
                return;
            }
            setSelectedMovieRequest({
                // movieRequest:data.movieRequest,
                requestId:data.movieRequest.requestId,
                message:data.movieRequest.message,
                timestamp:data.movieRequest.timestamp,
                status: data.movieRequest.status,
                movieId: data.movieRequest.movieId,
                cinemaId: data.movieRequest.cinemaId,
                movie:data.movie
            }); // Lưu thông tin yêu cầu phim vào trạng thái
            setIsDetailModalOpen(true); // Mở modal chi tiết
        } catch (error) {
            console.error('Error fetching movie request details:', error);
        }
    };

    // const handleGenreChange = (e, genre) => {
    //     const isChecked = e.target.checked;
    //     const updatedGenres = isChecked
    //         ? [...selectedMovieRequest.movie.genres, genre] // Thêm thể loại nếu được chọn
    //         : selectedMovieRequest.movie.genres.filter((g) => g.genreId !== genre.genreId); // Bỏ thể loại nếu không chọn
    //
    //     setSelectedMovieRequest({ ...selectedMovie, genres: updatedGenres });
    // };
    const handleGenreChange = (e, genre) => {
        const isChecked = e.target.checked;
        const updatedGenres = isChecked
            ? [...selectedMovieRequest.movie.genres, genre] // Thêm thể loại nếu được chọn
            : selectedMovieRequest.movie.genres.filter((g) => g.genreId !== genre.genreId); // Bỏ thể loại nếu không chọn

        setSelectedMovieRequest(prev => ({
            ...prev,
            movie: {
                ...prev.movie,
                genres: updatedGenres // Cập nhật genres trong movie
            }
        }));
    };

    const handleSaveNewMovieRequest = async (e) => {
        e.preventDefault();
        console.log("Submitting form..."); // Kiểm tra xem hàm có được gọi không

        if (!validateForm()) return;

        // Kiểm tra genre hợp lệ
        const movieRequestToAdd = {
            cinemaId: cinemaId,
            movie: {
                ...selectedMovieRequest.movie,
                genres: selectedMovieRequest.movie.genres.map(genre => ({ genreId: genre.genreId }))
            },
            message: selectedMovieRequest.message,
            status: 0
        };

        setLoading(true);
        const success = await fetchAddMovieRequest(movieRequestToAdd);

        if (success) {
            setLoading(false);
            showAlert('Movie request added successfully!');
            getMovieRequests(); // Cập nhật danh sách yêu cầu
            setIsModalOpen(false);
        } else {
            showAlert('Failed to add movie request.');
        }
    };

            // Re-fetch the movie list after adding a new movie
            // const updatedMovies = await fetchMovieList();
            // if (updatedMovies) {
            //     setMovies(updatedMovies.movies); // Use the updated list from the server
            // }



    const openDeleteModal = (requestId) => {
        setRequestToDelete(requestId);
        setIsDeleteModalOpen(true);
    };


    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    //     setSelectedMovieRequest(null);
    // };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedMovieRequest.movie.name || selectedMovieRequest.movie.name.length < 2 || selectedMovieRequest.movie.name.length > 100) {
            newErrors.name = "Title is required and must be between 2 and 100 characters.";
        }
        if (!selectedMovieRequest.movie.releaseDate) {
            newErrors.releaseDate = "Release Date is required.";
        }
        if (!selectedMovieRequest.movie.country || !/^[a-zA-Z\s]+$/.test(selectedMovieRequest.movie.country)) {
            newErrors.country = "Country is required and must contain only letters and spaces.";
        }
        if (!selectedMovieRequest.movie.director || selectedMovieRequest.movie.director.length < 2) {
            newErrors.director = "Director is required and must be at least 2 characters long.";
        }
        if (!selectedMovieRequest.movie.actors || selectedMovieRequest.movie.actors.length < 5) {
            newErrors.actors = "Actors is required and must contain at least 5 characters.";
        }
        if (selectedMovieRequest.movie.duration <= 0) {
            newErrors.duration = "Duration must be a positive number.";
        }
        if (![0, 1, 2].includes(selectedMovieRequest.status)) {
            newErrors.status = "Status is required.";
        }
        if (!selectedMovieRequest.movie.genres || selectedMovieRequest.movie.genres.length === 0) {
            newErrors.genres = "At least one genre must be selected.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const openAddMovieRequestModal = () => {
        setSelectedMovieRequest({
            cinemaId: cinemaId,
            movie: {
                name: '',
                description: '',
                poster: '',
                trailer: '',
                releaseDate: '',
                country: '',
                director: '',
                ageRestricted: 0,
                actors: '',
                duration: 0,
                genres: []
            },
            message: '',
            status: 0
        });
        setIsModalOpen(true);
    };

    const renderStatus = (status) => {
        switch (status) {
            case 0:
                return "Pending";
            case 1:
                return "Approved";
            case 2:
                return "Rejected";
            default:
                return "Unknown";
        }
    };


    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = movierequests.slice(indexOfFirstRequest, indexOfLastRequest);
    const totalPages = Math.ceil(movierequests.length / requestsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


return (
    <div className="movie-request-management-page">
        {loading && (
            <div className="movie-request-management-loading-overlay">
                <div className="movie-request-management-spinner"></div>
            </div>
        )}
        <CManagerHeader />
        <div className="movie-request-layout">
            <Sidebar />
            <div className="movie-request-management-content">
                <h2 className="title">Room List</h2>
                <Button className="add-movie-request-button" onClick={openAddMovieRequestModal}>+ Add new movie request</Button>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <table className="movie-request-table">
                            <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Cinema Id</th>
                                <th>Movie Id</th>
                                <th>Status</th>
                                <th>Message</th>
                                <th>TimeStamp</th>
                                <th className="icon-column">View Request</th>
                                <th className="icon-column">Delete Request</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentRequests.map((movierequest) => (
                                <tr key={movierequest.requestId}>
                                    <td>{movierequest.requestId}</td>
                                    <td>{movierequest.cinemaId}</td>
                                    <td>{movierequest.movieId}</td>
                                    <td>{renderStatus(movierequest.status)}</td>
                                    <td>{movierequest.message}</td>
                                    <td>{movierequest.timestamp}</td>


                                    <td>
                                        <Button className="view-movie-request-button" onClick={() => handleViewRequestDetails(movierequest.requestId)}>
                                            <span className="icon"><FaRegEye  style={{fontSize: '20px'}}/></span>
                                        </Button>
                                    </td>
                                    <td>
                                        <Button className="delete-movie-request-button" onClick={() => openDeleteModal(movierequest.requestId)}>
                                            <span className="icon"><MdDeleteOutline style={{fontSize: '20px'}}/></span>
                                        </Button>
                                    </td>
                                    {/*<td>*/}
                                    {/*    <Button className="update-button" onClick={() => openUpdateRoomModal(room)}>*/}
                                    {/*        <span className="icon"><FaPencilAlt style={{fontSize: '20px'}}/></span>*/}
                                    {/*    </Button>*/}
                                    {/*</td>*/}
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

                {/* Modal Thêm Yêu Cầu Phim */}

                {/*<Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>*/}
                {/*    {isAdding && (*/}
                {/*        <div className="movie-edit-form">*/}
                {/*            <h3>Add New Movie</h3>*/}

                {/* Modal xem chi tiết yêu cầu phim */}
                <Modal  isOpen={isDetailModalOpen} onRequestClose={() => setIsDetailModalOpen(false)}
                       contentLabel="Movie Request Details"

                >
                    <div className="movie-request-details-modal"> {/* Thêm className cho modal */}

                        {selectedMovieRequest && (
                        <div>
                            <h2>Movie Request Details</h2>
                            <p><strong>Request ID:</strong> {selectedMovieRequest.requestId}</p>
                            <p><strong>Cinema ID:</strong> {selectedMovieRequest.cinemaId}</p>
                            <p><strong>Movie ID:</strong> {selectedMovieRequest.movieId}</p>
                            <p><strong>Status:</strong> {selectedMovieRequest.status}</p>
                            <p><strong>Message:</strong> {selectedMovieRequest.message}</p>
                            <p><strong>Timestamp:</strong> {selectedMovieRequest.timestamp}</p>

                            {/* Hiển thị chi tiết phim nếu có */}
                            {selectedMovieRequest.movie && (
                                <div>
                                    <h3>Movie Details</h3>
                                    <p><strong>Name:</strong> {selectedMovieRequest.movie.name}</p>
                                    <p><strong>Description:</strong> {selectedMovieRequest.movie.description}</p>
                                    <p><strong>Poster:</strong> <img src={selectedMovieRequest.movie.poster} alt="Poster" /></p>
                                    <p><strong>Trailer:</strong>
                                        <a href={selectedMovieRequest.movie.trailer} target="_blank"
                                           rel="noopener noreferrer">Watch Trailer</a>
                                    </p>
                                    <p><strong>Release Date:</strong> {selectedMovieRequest.movie.releaseDate}</p>
                                    <p><strong>Country:</strong> {selectedMovieRequest.movie.country}</p>
                                    <p><strong>Director:</strong> {selectedMovieRequest.movie.director}</p>
                                    <p><strong>Actors:</strong> {selectedMovieRequest.movie.actors}</p>
                                    <p><strong>Duration:</strong> {selectedMovieRequest.movie.duration} minutes</p>
                                    <p><strong>Genres:</strong> {selectedMovieRequest.movie.genres.map(genre => genre.name).join(', ')}</p>
                                </div>
                            )}
                            <Button onClick={() => setIsDetailModalOpen(false)}>Close</Button>
                        </div>
                    )}
                    </div>
                </Modal>

                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <div className="request-add-form">
                        <h2 className="modal-request-title">Add New Movie Request</h2>
                        {/*<div className="modal-request-body">*/}
                            <form onSubmit={handleSaveNewMovieRequest} className="edit-request-form-grid">
                                <div>
                                    <label>
                                        <strong>Title: *</strong>
                                        <input
                                            type="text"
                                            value={selectedMovieRequest.movie.name}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                movie: {...prev.movie, name: e.target.value}
                                            }))}
                                        />
                                        {errors.name && <p className="error-message">{errors.name}</p>}
                                    </label>
                                    <label>
                                        <strong>Description:</strong>
                                        <textarea
                                            value={selectedMovieRequest.movie.description}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                movie: {...prev.movie, description: e.target.value}
                                            }))}
                                        />
                                    </label>
                                    <label>
                                        <strong>Message: *</strong>
                                        <input
                                            type="text"
                                            value={selectedMovieRequest.message}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                message: e.target.value
                                            }))}
                                            required
                                        />
                                    </label>
                                    <label>
                                        <strong>Release Date: *</strong>
                                        <input
                                            type="date"
                                            value={selectedMovieRequest.movie.releaseDate}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                movie: {...prev.movie, releaseDate: e.target.value}
                                            }))}
                                        />
                                        {errors.releaseDate && <p className="error-message">{errors.releaseDate}</p>}
                                    </label>
                                    <div>
                                        <label>
                                            <strong>Poster URL:</strong>
                                            <input
                                                type="text"
                                                value={selectedMovieRequest.movie.poster}
                                                onChange={(e) => setSelectedMovieRequest(prev => ({
                                                    ...prev,
                                                    movie: {...prev.movie, poster: e.target.value}
                                                }))}
                                            />
                                        </label>
                                        <label>
                                            <strong>Upload Poster:</strong>
                                            <input type="file" onChange={handlePosterChange}/>
                                            <button type="button" onClick={handleUploadPoster}>Upload Poster</button>
                                        </label>
                                    </div>

                                    <label>
                                        <strong>Trailer URL:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovieRequest.movie.trailer}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                movie: {...prev.movie, trailer: e.target.value}
                                            }))}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <strong>Country: *</strong>
                                        <input
                                            type="text"
                                            value={selectedMovieRequest.movie.country}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                movie: {...prev.movie, country: e.target.value}
                                            }))}
                                        />
                                        {errors.country && <p className="error-message">{errors.country}</p>}
                                    </label>
                                    <label>
                                        <strong>Director: *</strong>
                                        <input
                                            type="text"
                                            value={selectedMovieRequest.movie.director}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                movie: {...prev.movie, director: e.target.value}
                                            }))}
                                        />
                                        {errors.director && <p className="error-message">{errors.director}</p>}
                                    </label>
                                    <label>
                                        <strong>Age Restricted:</strong>
                                        <input
                                            type="number"
                                            value={selectedMovieRequest.movie.ageRestricted}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                movie: {...prev.movie, ageRestricted: e.target.value}
                                            }))}
                                        />
                                    </label>
                                    <label>
                                        <strong>Actors: *</strong>
                                        <textarea
                                            value={selectedMovieRequest.movie.actors}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                movie: {...prev.movie, actors: e.target.value}
                                            }))}
                                        />
                                        {errors.actors && <p className="error-message">{errors.actors}</p>}
                                    </label>
                                    <label>
                                        <strong>Duration (minutes): *</strong>
                                        <input
                                            type="number"
                                            value={selectedMovieRequest.movie.duration}
                                            onChange={(e) => setSelectedMovieRequest(prev => ({
                                                ...prev,
                                                movie: {...prev.movie, duration: e.target.value}
                                            }))}
                                        />
                                        {errors.duration && <p className="error-message">{errors.duration}</p>}
                                    </label>
                                    {/*<label>*/}
                                    <div>
                                        <strong>Genres:</strong>
                                        <div className="genres-request-container">
                                            {availableGenres.map((genre) => (
                                                <div key={genre.genreId} className="genre-request-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        id={`genre-${genre.genreId}`}
                                                        checked={selectedMovieRequest.movie.genres.some((selectedGenre) => selectedGenre.genreId === genre.genreId)}
                                                        onChange={(e) => handleGenreChange(e, genre)}
                                                    />
                                                    <label htmlFor={`genre-${genre.genreId}`}>{genre.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.genres && <p className="error-message">{errors.genres}</p>}
                                    {/*</label>*/}
                                    </div>
                                </div>

                                <div className="form-request-actions">
                                    <button type="submit" className="add-btn">Add Request</button>
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>

                                </div>
                            </form>
                        {/*</div>*/}
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
                        <p>Are you sure you want to delete this request?</p>
                    </div>
                    <div className="modal-footer">
                        <Button onClick={handleDeleteRequest}>Yes</Button>
                        <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
);
}
export default CManagerMovieRequestManagement;
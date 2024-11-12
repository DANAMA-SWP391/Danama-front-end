import React, { useState, useEffect } from 'react';
import { fetchPendingMovieRequests, acceptMovieRequest, rejectMovieRequest } from "../../../api/admin-api.js";
import Modal from "../../../components/common/Modal/Modal.jsx";
import './movie-request-management.css';
import AdminHeader from "../../../components/common/AdminHeader/AdminHeader.jsx";
import AdminSidebar from "../../../components/common/AdminSideBar/AdminSideBar.jsx";
import BackSpace from "../../../assets/Icons/back-space.svg";
import {useNavigate} from "react-router-dom";
import {useCustomAlert} from "../../../utils/CustomAlertContext.jsx"; // Tạo file CSS này để định dạng trang
// eslint-disable-next-line react-hooks/rules-of-hooks



const MovieRequestManagement = () => {
    const showAlert = useCustomAlert();
    const [pendingRequests, setPendingRequests] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);  // Movie details for the selected movie
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const navigate = useNavigate(); // Navigation Hook

    const loadPendingMovieRequests = async () => {
        const data = await fetchPendingMovieRequests();
        if (data) {
            setPendingRequests(data);
        } else {
            console.error('Failed to fetch pending movie requests.');
        }
    };

    const handleAccept = async (requestId, movieId) => {
        const success = await acceptMovieRequest(requestId, movieId);
        if (success) {
            showAlert(`Request ${requestId} accepted.`);
            loadPendingMovieRequests(); // Reload the list after accept
        } else {
            showAlert(`Failed to accept request ${requestId}.`);
        }
    };

    const handleReject = async (requestId, movieId) => {
        const success = await rejectMovieRequest(requestId, movieId);
        if (success) {
            showAlert(`Request ${requestId} rejected.`);
            loadPendingMovieRequests(); // Reload the list after reject
        } else {
            showAlert(`Failed to reject request ${requestId}.`);
        }
    };

    const handleViewMovie = (movie) => {
        setSelectedMovie(movie);       // Store the selected movie details
        setIsViewModalOpen(true);      // Open the modal
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);     // Close the modal
        setSelectedMovie(null);        // Clear the selected movie
    };

    useEffect(() => {
        loadPendingMovieRequests(); // Fetch pending requests when component loads
    }, []);

    return (
        <>
            <AdminHeader />
            <div className="movie-management-container">
                <AdminSidebar/>
                <div className="movie-management-content">
                    <div className="movie-management-header">
                        <img
                            src={BackSpace}
                            alt="Back"
                            className="back-icon"
                            onClick={() => navigate('/movie-management')}
                        />


                    </div>

                    <table className="request-table">
                        <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Cinema ID</th>
                            <th>Movie ID</th>
                                <th>Message</th>
                                <th>Timestamp</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pendingRequests.length > 0 ? (
                                pendingRequests.map((request) => (
                                    <tr key={request.movieRequest.requestId}>
                                        <td>{request.movieRequest.requestId}</td>
                                        <td>{request.movieRequest.cinemaId}</td>
                                        <td>{request.movieRequest.movieId}</td>
                                        <td>{request.movieRequest.message}</td>
                                        <td>{request.movieRequest.timestamp}</td>
                                        <td>
                                            <button
                                                className="acp-btn"  onClick={() => handleAccept(request.movieRequest.requestId, request.movieRequest.movieId)}>Accept
                                            </button>
                                            <button
                                                className="delete-btn" onClick={() => handleReject(request.movieRequest.requestId, request.movieRequest.movieId)}>Reject
                                            </button>
                                            <button onClick={() => handleViewMovie(request.movie)}>👁️</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No pending requests found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                        {/* Modal to show movie details */}
                        {isViewModalOpen && selectedMovie && (
                            <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal}>
                                <div className="movie-details-modal"> {/* Thêm className cho modal */}
                                    <h3>{selectedMovie.name}</h3> {/* Giữ nguyên, h3 đã được CSS */}
                                    <p><img src={selectedMovie.poster} alt={selectedMovie.name}/>
                                    </p> {/* Giữ nguyên, hình ảnh sẽ tự động điều chỉnh */}
                                    <p><strong>Description:</strong> {selectedMovie.description}</p>
                                    <p><strong>Release Date:</strong> {selectedMovie.releaseDate}</p>
                                    <p><strong>Trailer:</strong> <a href={selectedMovie.trailer} target="_blank"
                                                                    rel="noopener noreferrer">Watch Trailer</a>
                                    </p> {/* Link trailer */}
                                    <p><strong>Country:</strong> {selectedMovie.country}</p>
                                    <p><strong>Director:</strong> {selectedMovie.director}</p>
                                    <p><strong>Age Restricted:</strong> {selectedMovie.ageRestricted}</p>
                                    <p><strong>Actors:</strong> {selectedMovie.actors}</p>
                                    <p><strong>Duration:</strong> {selectedMovie.duration} mins</p>
                                    <p>
                                        <strong>Status:</strong> {selectedMovie.status === 1 ? "Available" : "Unavailable"}
                                    </p> {/* Hiển thị trạng thái rõ ràng */}

                                    {/* Hiển thị danh sách thể loại (genres) */}
                                    <p><strong>Genres:</strong></p>
                                    <ul>
                                        {selectedMovie.genres && selectedMovie.genres.length > 0 ? (
                                            selectedMovie.genres.map((genre, index) => (
                                                <li key={index}>{genre.name}</li> /* Thêm key cho mỗi genre */
                                            ))
                                        ) : (
                                            <li>No genres available</li> /* Trường hợp không có thể loại */
                                        )}
                                    </ul>

                                    <button onClick={handleCloseViewModal}>Close</button>
                                    {/* Giữ nút đóng modal */}
                                </div>
                            </Modal>
                        )}
                    </div>
                </div>
            </>
            );
            };

            export default MovieRequestManagement;
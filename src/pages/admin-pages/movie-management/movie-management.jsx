import { useEffect, useState } from 'react';
import './movie-management.css';
import {
    fetchMovieList,
    fetchViewMovie,
    fetchDeleteMovie,
    fetchUpdateMovie,
    fetchAddMovie
} from "../../../api/admin-api.js"; // Đảm bảo tạo file CSS để định dạng style
import Modal from "../../../components/common/Modal/Modal.jsx";
import {upFileToAzure} from "../../../api/webAPI.jsx";
import AdminHeader from "../../../components/common/AdminHeader/AdminHeader.jsx";
import AdminSidebar from "../../../components/common/AdminSideBar/AdminSideBar.jsx";
import {useCustomAlert} from "../../../utils/CustomAlertContext.jsx";
import { useNavigate } from 'react-router-dom';


const MovieManagement = () => {
    const showAlert = useCustomAlert();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);  // Movie được chọn để hiển thị chi tiết
    const [isEditing, setIsEditing] = useState(false);  // Xác định xem có đang chỉnh sửa phim không ----------
    const [isModalOpen, setIsModalOpen] = useState(false); // Xác định trạng thái của modal
    const [availableGenres, setAvailableGenres] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [posterFile, setPosterFile] = useState(null); // New state for file selection
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const [itemsPerPage] = useState(10); // Số mục hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleViewMovieRequests = () => {
        navigate("/movie-management/movie-requests");
    };


    const paginatedMovies = movies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < Math.ceil(movies.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    useEffect(() => {
        const getMoviesAndGenres = async () => {
            try {
                const data = await fetchMovieList();
                if (data) {
                    // Assuming fetchMovieList now returns { movies, genres }
                    const movies = data.movies;
                    const genres = data.genres;
                    setMovies(movies);
                    setAvailableGenres(genres);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getMoviesAndGenres();
    }, []);
    const handlePosterChange = (e) => {
        setPosterFile(e.target.files[0]); // Track the selected file
    };
    const handleUploadPoster = async () => {
        if (posterFile) {
            setLoading(true);
            const imageUrl = await upFileToAzure(posterFile); // Upload image to Azure
            if (imageUrl) {
                setLoading(false);
                setSelectedMovie({ ...selectedMovie, poster: imageUrl }); // Set the new poster URL
                showAlert("Poster uploaded successfully!");
            } else {
                showAlert("Failed to upload poster.");
            }
        } else {
            showAlert("Please select a file to upload.");
        }
    };
    // Mở modal để thêm phim mới
    const handleAddMovie = () => {
        setSelectedMovie({
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
            status: 1,
            genres: []
        });
        setIsAdding(true); // Đang thêm mới phim
        setIsEditing(false); //
        setIsModalOpen(true);
    };
    const handleSaveNewMovie = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Kiểm tra genre hợp lệ
        const hasInvalidGenres = selectedMovie.genres.some(genre => !genre.genreId || genre.genreId === "");
        if (hasInvalidGenres) {
            showAlert('Please ensure all genres have been selected properly.');
            return;
        }

        const movieToAdd = {
            ...selectedMovie,
            genres: selectedMovie.genres.map(genre => ({ genreId: genre.genreId }))
        };
        setLoading(true);
        const success = await fetchAddMovie(movieToAdd);
        if (success) {
            setLoading(false);
            showAlert('Movie added successfully!');

            // Re-fetch the movie list after adding a new movie
            const updatedMovies = await fetchMovieList();
            if (updatedMovies) {
                setMovies(updatedMovies.movies); // Use the updated list from the server
            }

            setIsAdding(false);
            setIsModalOpen(false);
        } else {
            showAlert('Failed to add movie.');
        }
    };
    // Hiển thị chi tiết phim trong modal
    const handleViewMovie = async (movieId) => {
        const movie = await fetchViewMovie(movieId);
        if (movie) {
            setSelectedMovie(movie);  // Set the selected movie including its genres
            setIsEditing(false);      // Ensure we're not in editing mode
            setIsViewModalOpen(true);     // Open the modal to view the movie details
        } else {
            showAlert('Movie not found or error occurred.');
        }
    };
    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
    };
    // Chỉnh sửa phim trong modal
    const handleEditMovie = (movieId) => {
        const movieToEdit = movies.find((movie) => movie.movieId === movieId);
        if (movieToEdit) {
            setSelectedMovie({
                ...movieToEdit,
                releaseDate: formatReleaseDate(movieToEdit.releaseDate) // Định dạng lại ngày khi mở form
            });
            setIsEditing(true);             // Set editing mode
            setIsModalOpen(true);           // Open the modal to edit the movie
            setIsAdding(false);
        }
    };

    const handleUpdateMovie = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Kiểm tra genre hợp lệ
        const hasInvalidGenres = selectedMovie.genres.some(genre => !genre.genreId || genre.genreId === "");
        if (hasInvalidGenres) {
            showAlert('Please ensure all genres have been selected properly.');
            return;
        }

        // Tạo đối tượng phim mới với các thể loại
        const movieToUpdate = {
            ...selectedMovie,
            genres: selectedMovie.genres.map(genre => ({ genreId: genre.genreId }))
        };
        setLoading(true);
        // Gửi yêu cầu cập nhật phim
        const success = await fetchUpdateMovie(movieToUpdate);
        if (success) {
            setLoading(false);
            showAlert('Movie updated successfully!');

            // Định dạng lại ngày của tất cả các phim, bao gồm phim vừa cập nhật
            const updatedMovies = movies.map(movie => {
                if (movie.movieId === selectedMovie.movieId) {
                    return {
                        ...selectedMovie,
                        releaseDate: formatReleaseDate(selectedMovie.releaseDate) // Định dạng lại ngày cho phim vừa được cập nhật
                    };
                } else {
                    return {
                        ...movie,
                        releaseDate: formatReleaseDate(movie.releaseDate) // Định dạng lại ngày cho các phim còn lại
                    };
                }
            });

            // Cập nhật lại danh sách phim
            setMovies(updatedMovies);

            setIsEditing(false);
            setIsModalOpen(false);
        } else {
            showAlert('Failed to update movie.');
        }
    };

    // Xóa phim
    const handleDeleteMovie = async (movieId) => {
        const confirmed = window.confirm('Are you sure you want to delete this movie?');
        if (confirmed) {
            const success = await fetchDeleteMovie(movieId);
            if (success) {
                showAlert('Movie deleted successfully!');
                setMovies(movies.filter((movie) => movie.movieId !== movieId));  // Remove the deleted movie from the list
            } else {
                showAlert('Failed to delete movie.');
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    const handleGenreChange = (e, genre) => {
        const isChecked = e.target.checked;
        const updatedGenres = isChecked
            ? [...selectedMovie.genres, genre] // Thêm thể loại nếu được chọn
            : selectedMovie.genres.filter((g) => g.genreId !== genre.genreId); // Bỏ thể loại nếu không chọn

        setSelectedMovie({ ...selectedMovie, genres: updatedGenres });
    };

    // Hàm format lại ngày để hiển thị trong input type="date"
    const formatReleaseDate = (dateStr) => {
        const date = new Date(dateStr);
        // Sử dụng toLocaleDateString với timezone UTC để tránh sự khác biệt múi giờ
        const offsetDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        return offsetDate.toISOString().split('T')[0];
    };

    const validateForm = () => {
        const newErrors = {};

        if (!selectedMovie.name || selectedMovie.name.length < 2 || selectedMovie.name.length > 100) {
            newErrors.name = "Title is required and must be between 2 and 100 characters.";
        }

        if (!selectedMovie.releaseDate) {
            newErrors.releaseDate = "Release Date is required.";
        }

        if (!selectedMovie.country || !/^[a-zA-Z\s]+$/.test(selectedMovie.country)) {
            newErrors.country = "Country is required and must contain only letters and spaces.";
        }

        if (!selectedMovie.director || selectedMovie.director.length < 2) {
            newErrors.director = "Director is required and must be at least 2 characters long.";
        }

        if (!selectedMovie.actors || selectedMovie.actors.length < 5) {
            newErrors.actors = "Actors is required and must contain at least 5 characters.";
        }

        if (selectedMovie.duration <= 0) {
            newErrors.duration = "Duration must be a positive number.";
        }

        if (![0, 1, 2].includes(selectedMovie.status)) {
            newErrors.status = "Status is required.";
        }

        if (!selectedMovie.genres || selectedMovie.genres.length === 0) {
            newErrors.genres = "At least one genre must be selected.";
        }

        const genreIds = selectedMovie.genres.map(genre => genre.genreId);
        if (new Set(genreIds).size !== genreIds.length) {
            newErrors.genres = "Genres must be unique.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    if (loading) {
        return <div className="loading-overlay">
            <div className="spinner"></div>
        </div>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <>
            <AdminHeader />
            <div className="movie-management-container">
                <AdminSidebar/> {/* Hiển thị Sidebar */}
                <div className="movie-management-content">
                    <div className="movie-management-header">
                        <h2>MOVIE LIST</h2>
                        <div className="func-btn">
                        <button className="add-movie-btn" onClick={handleAddMovie}>+ Add new movie</button>
                        <button className="movie-request-btn" onClick={handleViewMovieRequests}>View Movie Request</button>
                        </div>
                    </div>

                    {/* Danh sách phim */}
                    <table className="movie-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Genres</th>
                            <th>Release Day</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedMovies.map((movie) => (
                            <tr key={movie.movieId}>
                                <td>{movie.movieId}</td>
                                <td>{movie.name}</td>
                                <td>
                                    {movie.genres.map((genre) => genre.name).join(', ')}
                                </td>
                                <td>{movie.releaseDate}</td>
                                <td>
                                    <button className="view-btn" onClick={() => handleViewMovie(movie.movieId)}>👁️
                                    </button>
                                    <button className="edit-btn" onClick={() => handleEditMovie(movie.movieId)}>✏️
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDeleteMovie(movie.movieId)}>🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination-controls">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage} of {Math.ceil(movies.length / itemsPerPage)}</span>
                        <button onClick={handleNextPage}
                                disabled={currentPage === Math.ceil(movies.length / itemsPerPage)}>Next
                        </button>
                    </div>
                    {/* Modal View Movie */}
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
                                    <strong>Status:</strong> {
                                    selectedMovie.status === 1 ? "Now Playing" :
                                        selectedMovie.status === 2 ? "Coming Soon" :
                                            selectedMovie.status === 3 ? "Inactive" :
                                                "Unknown"
                                }
                                </p>

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

                    {/* Modal hiển thị Add */}
                    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                        {isAdding && (
                            <div className="movie-edit-form">
                                <h3>Add New Movie</h3>
                                <form onSubmit={handleSaveNewMovie} className="edit-form-grid">
                                    <div>
                                        <label>
                                            <strong>Title: *</strong>
                                            <input
                                                type="text"
                                                value={selectedMovie.name}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    name: e.target.value
                                                })}
                                            />
                                            {errors.name && <p className="error-message">{errors.name}</p>}
                                        </label>
                                        <label>
                                            <strong>Description:</strong>
                                            <textarea
                                                value={selectedMovie.description}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    description: e.target.value
                                                })}
                                            />
                                        </label>
                                        <label>
                                            <strong>Release Date: *</strong>
                                            <input
                                                type="date"
                                                value={selectedMovie.releaseDate}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    releaseDate: e.target.value
                                                })}
                                            />
                                            {errors.releaseDate && <p className="error-message">{errors.releaseDate}</p>}
                                        </label>
                                        <div>
                                            <label>
                                                <strong>Poster URL:</strong>
                                                <input
                                                    type="text"
                                                    value={selectedMovie.poster}
                                                    onChange={(e) => setSelectedMovie({
                                                        ...selectedMovie,
                                                        poster: e.target.value
                                                    })}
                                                />
                                            </label>
                                            <label>
                                                <strong>Upload Poster:</strong>
                                                <input type="file" onChange={handlePosterChange}/>
                                                <button type="button" onClick={handleUploadPoster}>Upload Poster
                                                </button>
                                            </label>
                                        </div>

                                        <label>
                                            <strong>Trailer URL:</strong>
                                            <input
                                                type="text"
                                                value={selectedMovie.trailer}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    trailer: e.target.value
                                                })}
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            <strong>Country: *</strong>
                                            <input
                                                type="text"
                                                value={selectedMovie.country}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    country: e.target.value
                                                })}
                                            />
                                            {errors.country && <p className="error-message">{errors.country}</p>}
                                        </label>
                                        <label>
                                            <strong>Director: *</strong>
                                            <input
                                                type="text"
                                                value={selectedMovie.director}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    director: e.target.value
                                                })}
                                            />
                                            {errors.director && <p className="error-message">{errors.director}</p>}
                                        </label>
                                        <label>
                                            <strong>Age Restricted:</strong>
                                            <input
                                                type="number"
                                                value={selectedMovie.ageRestricted}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    ageRestricted: e.target.value
                                                })}
                                            />
                                        </label>
                                        <label>
                                            <strong>Actors: *</strong>
                                            <textarea
                                                value={selectedMovie.actors}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    actors: e.target.value
                                                })}
                                            />
                                            {errors.actors && <p className="error-message">{errors.actors}</p>}
                                        </label>
                                        <label>
                                            <strong>Duration (minutes): *</strong>
                                            <input
                                                type="number"
                                                value={selectedMovie.duration}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    duration: e.target.value
                                                })}
                                            />
                                            {errors.duration && <p className="error-message">{errors.duration}</p>}
                                        </label>
                                        <label>
                                            <strong>Status: *</strong>
                                            <select
                                                value={selectedMovie.status}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    status: Number(e.target.value) // Convert to number
                                                })}
                                            >
                                                <option value={1}>Now Playing</option>
                                                <option value={2}>Coming Soon</option>
                                                <option value={0}>Inactive</option>
                                            </select>
                                            {errors.status && <p className="error-message">{errors.status}</p>}
                                        </label>

                                        <label>
                                            <strong>Genres:</strong>
                                            <div className="genres-container">
                                                {availableGenres.map((genre) => (
                                                    <div key={genre.genreId} className="genre-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            id={`genre-${genre.genreId}`}
                                                            checked={selectedMovie.genres.some((selectedGenre) => selectedGenre.genreId === genre.genreId)}
                                                            onChange={(e) => handleGenreChange(e, genre)}
                                                        />
                                                        <label htmlFor={`genre-${genre.genreId}`}>{genre.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            {errors.genres && <p className="error-message">{errors.genres}</p>}
                                        </label>

                                    </div>

                                    <div className="form-actions">
                                        <button type="submit" className="save-btn">Add Movie</button>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => {
                                                setIsAdding(false);  // Tắt trạng thái thêm
                                                setSelectedMovie(null);  // Reset dữ liệu phim
                                                handleCloseModal();  // Đóng modal
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                        {/*Modal Edit*/}
                        {isEditing && selectedMovie && (
                            <div className="movie-edit-form">
                                <h3>Edit Movie</h3>
                                <form onSubmit={handleUpdateMovie} className="edit-form-grid">
                                    <div>
                                        <label>
                                            <strong>Title:</strong>
                                            <input
                                                type="text"
                                                value={selectedMovie.name}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    name: e.target.value
                                                })}
                                            />
                                        </label>
                                        <label>
                                            <strong>Description:</strong>
                                            <textarea
                                                value={selectedMovie.description}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    description: e.target.value
                                                })}
                                            />
                                        </label>
                                        <label>
                                            <strong>Release Date:</strong>
                                            <input
                                                type="date"
                                                value={formatReleaseDate(selectedMovie.releaseDate)} // Chuyển sang định dạng phù hợp
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    releaseDate: e.target.value // Lưu lại giá trị YYYY-MM-DD
                                                })}
                                            />
                                        </label>
                                        <div>
                                            <label>
                                                <strong>Poster URL:</strong>
                                                <input
                                                    type="text"
                                                    value={selectedMovie.poster}
                                                    onChange={(e) => setSelectedMovie({
                                                        ...selectedMovie,
                                                        poster: e.target.value
                                                    })}
                                                />
                                            </label>
                                            <label>
                                                <strong>Upload Poster:</strong>
                                                <input type="file" onChange={handlePosterChange}/>
                                                <button type="button" onClick={handleUploadPoster}>Upload Poster
                                                </button>
                                            </label>
                                        </div>
                                        <label>
                                            <strong>Trailer URL:</strong>
                                            <input
                                                type="text"
                                                value={selectedMovie.trailer}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    trailer: e.target.value
                                                })}
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            <strong>Country:</strong>
                                            <input
                                                type="text"
                                                value={selectedMovie.country}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    country: e.target.value
                                                })}
                                            />
                                        </label>
                                        <label>
                                            <strong>Director:</strong>
                                            <input
                                                type="text"
                                                value={selectedMovie.director}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    director: e.target.value
                                                })}
                                            />
                                        </label>
                                        <label>
                                            <strong>Age Restricted:</strong>
                                            <input
                                                type="number"
                                                value={selectedMovie.ageRestricted}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    ageRestricted: e.target.value
                                                })}
                                            />
                                        </label>
                                        <label>
                                            <strong>Actors:</strong>
                                            <textarea
                                                value={selectedMovie.actors}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    actors: e.target.value
                                                })}
                                            />
                                        </label>
                                        <label>
                                            <strong>Duration (minutes):</strong>
                                            <input
                                                type="number"
                                                value={selectedMovie.duration}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    duration: e.target.value
                                                })}
                                            />
                                        </label>
                                        <label>
                                            <strong>Status:</strong>
                                            <select
                                                value={selectedMovie.status}
                                                onChange={(e) => setSelectedMovie({
                                                    ...selectedMovie,
                                                    status: Number(e.target.value) // Convert to number
                                                })}
                                            >
                                                <option value={1}>Now Playing</option>
                                                <option value={2}>Coming Soon</option>
                                                <option value={0}>Inactive</option>
                                            </select>
                                        </label>
                                        <label>
                                            <strong>Genres:</strong>
                                            <div className="genres-container">
                                                {availableGenres.map((genre) => (
                                                    <div key={genre.genreId} className="genre-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            id={`genre-${genre.genreId}`}
                                                            checked={selectedMovie.genres.some((selectedGenre) => selectedGenre.genreId === genre.genreId)}
                                                            onChange={(e) => handleGenreChange(e, genre)}
                                                        />
                                                        <label htmlFor={`genre-${genre.genreId}`}>{genre.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            {errors.genres && <p className="error-message">{errors.genres}</p>}
                                        </label>
                                    </div>

                                    <div className="form-actions">
                                        <button type="submit" className="save-btn">Save Changes</button>
                                        <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Modal>

                </div>
            </div>
        </>


    );
};

export default MovieManagement;

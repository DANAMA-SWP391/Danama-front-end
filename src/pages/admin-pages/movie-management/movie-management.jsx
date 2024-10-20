import React, { useEffect, useState } from 'react';
import './movie-management.css';
import Sidebar from "../../../components/common/AdminSideBar/AdminSideBar.jsx";
import {
    fetchMovieList,
    fetchViewMovie,
    fetchDeleteMovie,
    fetchUpdateMovie,
    fetchAddMovie
} from "../../../api/admin-api.js"; // Đảm bảo tạo file CSS để định dạng style
import Modal from "../../../components/common/Modal/Modal.jsx";

const MovieManagement = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);  // Movie được chọn để hiển thị chi tiết
    const [isEditing, setIsEditing] = useState(false);  // Xác định xem có đang chỉnh sửa phim không
    const [isModalOpen, setIsModalOpen] = useState(false); // Xác định trạng thái của modal
    const [availableGenres, setAvailableGenres] = useState([]);
    const [isAdding, setIsAdding] = useState(false);


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
                    console.log(genres);
                    console.log(movies);// Store the list of genres so it can be used for selection
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getMoviesAndGenres();
    }, []);

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
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleSaveNewMovie = async (e) => {
        e.preventDefault();

        // Kiểm tra genre hợp lệ
        const hasInvalidGenres = selectedMovie.genres.some(genre => !genre.genreId || genre.genreId === "");
        if (hasInvalidGenres) {
            alert('Please ensure all genres have been selected properly.');
            return;
        }

        const movieToAdd = {
            ...selectedMovie,
            genres: selectedMovie.genres.map(genre => ({ genreId: genre.genreId }))
        };

        const success = await fetchAddMovie(movieToAdd);
        if (success) {
            alert('Movie added successfully!');
            setMovies([...movies, movieToAdd]); // Thêm phim mới vào danh sách phim
            setIsAdding(false);
            setIsModalOpen(false);
        } else {
            alert('Failed to add movie.');
        }
    };

    // Hiển thị chi tiết phim trong modal
    const handleViewMovie = async (movieId) => {
        const movie = await fetchViewMovie(movieId);
        if (movie) {
            setSelectedMovie(movie);  // Set the selected movie including its genres
            setIsEditing(false);      // Ensure we're not in editing mode
            setIsModalOpen(true);     // Open the modal to view the movie details
        } else {
            alert('Movie not found or error occurred.');
        }
    };

    // Chỉnh sửa phim trong modal
    const handleEditMovie = (movieId) => {
        const movieToEdit = movies.find((movie) => movie.movieId === movieId);
        if (movieToEdit) {
            setSelectedMovie(movieToEdit);  // Set the movie for editing, including genres
            setIsEditing(true);             // Set editing mode
            setIsModalOpen(true);           // Open the modal to edit the movie
            setIsAdding(false);
        }
    };

    const handleUpdateMovie = async (e) => {
        e.preventDefault();

        // Check if any genres have invalid (empty) genreId
        const hasInvalidGenres = selectedMovie.genres.some(genre => !genre.genreId || genre.genreId === "");

        if (hasInvalidGenres) {
            alert('Please ensure all genres have been selected properly.');
            return; // Stop the form submission if there are invalid genres
        }

        // Create a new object where genres only contain genreId
        const movieToUpdate = {
            ...selectedMovie,
            genres: selectedMovie.genres.map(genre => ({ genreId: genre.genreId }))
        };

        const success = await fetchUpdateMovie(movieToUpdate); // Proceed with updating the movie
        if (success) {
            alert('Movie updated successfully!');
            // Cập nhật lại danh sách phim sau khi chỉnh sửa thành công
            // setMovies((prevMovies) =>
            //     prevMovies.map((movie) =>
            //         movie.movieId === selectedMovie.movieId ? { ...selectedMovie } : movie
            //     )
            // );
            setMovies(movies.map(movie => movie.movieId === selectedMovie.movieId ? selectedMovie : movie)); // Cập nhật danh sách phim


            setIsEditing(false);
            setIsModalOpen(false);
        } else {
            alert('Failed to update movie.');
        }
    };

    // Xóa phim
    const handleDeleteMovie = async (movieId) => {
        const confirmed = window.confirm('Are you sure you want to delete this movie?');
        if (confirmed) {
            const success = await fetchDeleteMovie(movieId);
            if (success) {
                alert('Movie deleted successfully!');
                setMovies(movies.filter((movie) => movie.movieId !== movieId));  // Remove the deleted movie from the list
            } else {
                alert('Failed to delete movie.');
            }
        }
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    // Thay đổi nội dung của một thể loại (genre)
    const handleGenreChange = (e, index) => {
        const updatedGenres = [...selectedMovie.genres];
        updatedGenres[index].genreId = parseInt(e.target.value); // Update genreId based on selected value
        setSelectedMovie({ ...selectedMovie, genres: updatedGenres });
    };

// Thêm một thể loại mới
    const handleAddGenre = () => {
        const newGenre = { genreId: '', name: '' }; // New empty genre to add
        setSelectedMovie({ ...selectedMovie, genres: [...selectedMovie.genres, newGenre] });
    };

// Xóa một thể loại
    const handleRemoveGenre = (index) => {
        const updatedGenres = selectedMovie.genres.filter((_, i) => i !== index);
        setSelectedMovie({ ...selectedMovie, genres: updatedGenres });
    };
    if (loading) {
        return <p>Loading movies...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return (
        <div className="movie-management-container">
            <Sidebar/> {/* Hiển thị Sidebar */}
            <div className="movie-management-content">
                <div className="movie-management-header">
                    <h2>MOVIE LIST</h2>
                    <button className="add-movie-btn" onClick={handleAddMovie}>+ Add new movie</button>
                </div>

                {/* Danh sách phim */}
                <table className="movie-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Release Day</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.movieId}>
                            <td>{movie.movieId}</td>
                            <td>{movie.name}</td>
                            <td>
                                {movie.genres.map((genre) => genre.name).join(', ')}
                            </td>
                            <td>{movie.releaseDate}</td>
                            <td>
                                <button className="view-btn" onClick={() => handleViewMovie(movie.movieId)}>👁️</button>
                                <button className="edit-btn" onClick={() => handleEditMovie(movie.movieId)}>✏️</button>
                                <button className="delete-btn" onClick={() => handleDeleteMovie(movie.movieId)}>🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination">
                    <button className="pagination-btn">{'<'}</button>
                    <span>1</span>
                    <button className="pagination-btn">{'>'}</button>
                </div>

                {/* Modal hiển thị chi tiết phim hoặc form chỉnh sửa */}
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {isAdding && (
                        <div className="movie-edit-form">
                            <h3>Add New Movie</h3>
                            <form onSubmit={handleSaveNewMovie} className="edit-form-grid">
                                <div>
                                    <label>
                                        <strong>Title:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovie.name}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, name: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Description:</strong>
                                        <textarea
                                            value={selectedMovie.description}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, description: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Release Date:</strong>
                                        <input
                                            type="date"
                                            value={selectedMovie.releaseDate}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, releaseDate: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Poster URL:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovie.poster}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, poster: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Trailer URL:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovie.trailer}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, trailer: e.target.value })}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <strong>Country:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovie.country}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, country: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Director:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovie.director}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, director: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Age Restricted:</strong>
                                        <input
                                            type="number"
                                            value={selectedMovie.ageRestricted}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, ageRestricted: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Actors:</strong>
                                        <textarea
                                            value={selectedMovie.actors}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, actors: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Duration (minutes):</strong>
                                        <input
                                            type="number"
                                            value={selectedMovie.duration}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, duration: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Status:</strong>
                                        <select
                                            value={selectedMovie.status}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, status: e.target.value })}
                                        >
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </label>
                                    <label>
                                        <strong>Genres:</strong>
                                        <div className="genres-container">
                                            {selectedMovie.genres.map((genre, index) => (
                                                <div key={index} className="genre-input">
                                                    <select
                                                        value={genre.genreId} // Bind the selected genre by its ID
                                                        onChange={(e) => handleGenreChange(e, index)} // Handle change
                                                    >
                                                        {/* Populate the dropdown with available genres */}
                                                        {availableGenres.map((availableGenre) => (
                                                            <option key={availableGenre.genreId} value={availableGenre.genreId}>
                                                                {availableGenre.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button type="button" onClick={() => handleRemoveGenre(index)}>X</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={handleAddGenre}>+ Add Genre</button>
                                        </div>
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
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, name: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Description:</strong>
                                        <textarea
                                            value={selectedMovie.description}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, description: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Release Date:</strong>
                                        <input
                                            type="date"
                                            value={selectedMovie.releaseDate}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, releaseDate: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Poster URL:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovie.poster}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, poster: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Trailer URL:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovie.trailer}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, trailer: e.target.value })}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <strong>Country:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovie.country}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, country: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Director:</strong>
                                        <input
                                            type="text"
                                            value={selectedMovie.director}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, director: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Age Restricted:</strong>
                                        <input
                                            type="number"
                                            value={selectedMovie.ageRestricted}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, ageRestricted: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Actors:</strong>
                                        <textarea
                                            value={selectedMovie.actors}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, actors: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Duration (minutes):</strong>
                                        <input
                                            type="number"
                                            value={selectedMovie.duration}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, duration: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        <strong>Status:</strong>
                                        <select
                                            value={selectedMovie.status}
                                            onChange={(e) => setSelectedMovie({ ...selectedMovie, status: e.target.value })}
                                        >
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </label>
                                    <label>
                                        <strong>Genres:</strong>
                                        <div className="genres-container">
                                            {selectedMovie.genres.map((genre, index) => (
                                                <div key={index} className="genre-input">
                                                    <select
                                                        value={genre.genreId}
                                                        onChange={(e) => handleGenreChange(e, index)}
                                                    >
                                                        {availableGenres.map((availableGenre) => (
                                                            <option key={availableGenre.genreId} value={availableGenre.genreId}>
                                                                {availableGenre.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button type="button" onClick={() => handleRemoveGenre(index)}>X</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={handleAddGenre}>+ Add Genre</button>
                                        </div>
                                    </label>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="save-btn">Save Changes</button>
                                    <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </Modal>
            </div>
        </div>

    );
};

export default MovieManagement;

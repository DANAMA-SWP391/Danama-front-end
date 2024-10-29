import {useEffect, useState} from "react";
import {
    fetchMovieRequestList,
    fetchUpdateMovieRequest,
    fetchDeleteMovieRequest,
    fetchAddMovieRequest,
    fetchDeleteRoom
} from "../../../api/cManagerAPI.js";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import Button from "../../../components/common/Button/Button.jsx";
import {MdDeleteOutline} from "react-icons/md";
// import {FaPencilAlt} from "react-icons/fa";
import Modal from "react-modal";
import "./cmanager-movie-request.css";


function MovieRequestManagement(){
    const [movierequests, setMovierequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    // const [error, setError] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [requestToDelete, setRequestToDelete] = useState(null);
    const requestsPerPage = 10;
    const storagecinema = localStorage.getItem('cinema');
    const cinema = JSON.parse(storagecinema);
    const cinemaId = cinema.cinemaId;

    const getMovieRequests = async () => {
        setLoading(true);
        try {
            const data = await fetchMovieRequestList(cinemaId);
            setMovierequests(data.movierequests || []);
        } catch (error) {
            console.error('Error fetching movie request list:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getMovieRequests();
    }, [cinemaId]);

    const handleDeleteRequest = async () => {
        const result = await fetchDeleteRoom(requestToDelete);
        if (result) {
            setMovierequests(movierequests.filter(movierequest => movierequest.requestId !== requestToDelete));
            setIsDeleteModalOpen(false);
        } else {
            console.error('Failed to delete request');
        }
    };

    const openDeleteModal = (requestId) => {
        setRequestToDelete(requestId);
        setIsDeleteModalOpen(true);
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
                {/*<Button className="add-movie-request-button" onClick={openAddRoomModal}>+ Add new movie request</Button>*/}

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
                                <th className="icon-column">Update Request</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentRequests.map((movierequest) => (
                                <tr key={movierequest.requestId}>
                                    <td>{movierequest.requestId}</td>
                                    <td>{movierequest.cinemaId}</td>
                                    <td>{movierequest.movieId}</td>
                                    <td>{movierequest.status}</td>
                                    <td>{movierequest.message}</td>
                                    <td>{movierequest.timestamp}</td>


                                    {/*<td>*/}
                                    {/*    <Button className="view-movie-request-button" onClick={() => handleNavigate(room)}>*/}
                                    {/*        <span className="icon"><MdEventSeat style={{fontSize: '20px'}}/></span>*/}
                                    {/*    </Button>*/}
                                    {/*</td>*/}
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

                {/*<Modal*/}
                {/*    isOpen={isModalOpen}*/}
                {/*    onRequestClose={() => setIsModalOpen(false)}*/}
                {/*    contentLabel={isEdit ? "Update Room" : "Add Room"}*/}
                {/*    className="modal"*/}
                {/*>*/}
                {/*    <div className="modal-header">*/}
                {/*        <h2 className="modal-title">{isEdit ? "Update Room" : "Add Room"}</h2>*/}
                {/*    </div>*/}
                {/*    <div className="modal-body">*/}
                {/*        <form onSubmit={handleSubmit}>*/}
                {/*            <div>*/}
                {/*                <div className="label-group" >*/}
                {/*                    <label>Room Name:</label>*/}
                {/*                    {error && <p className="error-message">{error}</p>}*/}
                {/*                </div>*/}
                {/*                <input*/}
                {/*                    type="text"*/}
                {/*                    name="name"*/}
                {/*                    value={formData.name}*/}
                {/*                    onChange={handleChange}*/}
                {/*                    required*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div className="modal-footer">*/}
                {/*                <Button onClick={handleSubmit}>{isEdit ? "Update" : "Add"}</Button>*/}
                {/*                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>*/}
                {/*            </div>*/}
                {/*        </form>*/}
                {/*    </div>*/}
                {/*</Modal>*/}

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
export default MovieRequestManagement;
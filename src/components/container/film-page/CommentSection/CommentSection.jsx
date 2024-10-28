import "./CommentSection.css";
import Button from "../../../common/Button/Button.jsx";
import Comment from "../Comment/Comment.jsx";
import { useState, useEffect } from "react";
import CommentBox from "../CommentBox/CommentBox.jsx";
import PropTypes from 'prop-types';
import {fetchJwtToken} from "../../../../api/authAPI.js";
import {deleteReview, updateReview} from "../../../../api/userAPI.js";
import {useCustomAlert} from "../../../../utils/CustomAlertContext.jsx";

function CommentSection({ reviews, movieId }) {
    const showAlert= useCustomAlert();
    const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState(null); // To store user info after JWT validation
    const commentsPerPage = 3; // Adjust this to set how many comments you want per page
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
        : "N/A";
    // Fetch JWT token and set user when component mounts
    useEffect(() => {
        const validateToken = async () => {
            const result = await fetchJwtToken(); // Fetch and validate token
            if (result.success) {
                setUser(result.user); // Set user info if the token is valid
            }

        };

        validateToken();
    }, []);
    useEffect(() => {
        if (reviews) {
            setCommentList(reviews.map(review => ({
                avatar: review.avatar && review.avatar.trim() !== "" ? review.avatar : "/src/assets/avatars/default-avatar.svg",
                user: review.reviewer,
                comment: review.comment,
                date: review.date,
                rating: review.rating || 'N/A',
                reviewId: review.reviewId, // Ensure you have this to update/delete
                uid: review.uid // Store uid for edit/delete permissions
            })));
        }
    }, [reviews]);
    // Calculate the total number of pages
    const totalPages = Math.ceil(commentList.length / commentsPerPage);

    // Get the comments for the current page
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = commentList.slice(indexOfFirstComment, indexOfLastComment);

    const handleCommentClick = () => {
        console.log(user);
        if (user) {
            if(user.roleId === 1 || user.roleId ===2) {
                showAlert("You can't leave comment!!");
            } else {
                setIsCommentBoxVisible(true);
            }
        } else if (window.confirm("You need to login to comment. Do you want to login?")) {
            window.location.href = "/login";
        }
    };

    // Handler to delete a review
    const handleDeleteReview = async (reviewId) => {
        try {
            const result = await deleteReview(reviewId); // Call the API to delete the review
            if (result.success) {
                showAlert("Delete review successfully.");
                window.location.reload();
            } else {
                showAlert("Failed to delete review.");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            showAlert("An error occurred. Please try again.");
        }
    };

    // Handler to update a review
    const handleUpdateReview = async (reviewId, updatedComment, updatedRating) => {
        const updatedReview = {
            reviewId,
            rating: updatedRating, // Updated rating
            comment: updatedComment, // Updated comment content
            date: new Date().toISOString().slice(0, 19).replace('T', ' ') // Current date formatted
        };
        try {
            const result = await updateReview(updatedReview); // Call the API to update the review
            if (result.success) {
                showAlert("Update review successfully.");
                // Update the review in the local state
                window.location.reload();
            } else {
                showAlert("Failed to update review.");
            }
        } catch (error) {
            console.error("Error updating review:", error);
            showAlert("An error occurred. Please try again.");
        }
    };

    // Pagination functions
    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className={`comment-section wrapper ${isCommentBoxVisible ? 'darken' : ''}`}>
            {isCommentBoxVisible && <div className="overlay"></div>}

            {isCommentBoxVisible && (
                <CommentBox setIsCommentBoxVisible={setIsCommentBoxVisible} movieId={movieId} uid={user.UID}/>
            )}
            <Button onClick={handleCommentClick}>Leave rate and comment?</Button>

            {/* Comments Header */}
            <div className="comment-section__header">
                <h3>Comments</h3>
                <p className="average-rating">Rating: {averageRating}/10</p>
            </div>

            {/* Display the current page of comments */}
            {currentComments.map((comment, index) => (
                <Comment
                    key={index}
                    comment={comment}
                    uid={user?.UID} // Pass current logged-in user's UID
                    handleDeleteReview={handleDeleteReview}
                    handleUpdateReview={handleUpdateReview}
                />
            ))}

            {/* Pagination Controls */}
            <div className="pagination">
                <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Prev
                </Button>
                <span>
            Page {currentPage} of {totalPages}
        </span>
                <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        </div>

    );
}

CommentSection.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            avatar: PropTypes.string,
            comment: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            reviewer: PropTypes.string.isRequired,
            rating: PropTypes.number, // Rating might be optional or null
            reviewId: PropTypes.number.isRequired, // Review ID is required for edit/delete
            uid: PropTypes.string.isRequired // UID is required to check permissions
        })
    ).isRequired,
    movieId: PropTypes.number.isRequired
};

export default CommentSection;
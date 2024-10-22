import "./Comment.css";
import { useState } from "react";
import PropTypes from 'prop-types';

function Comment({ comment, uid, handleDeleteReview, handleUpdateReview }) {
    const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
    const [editedComment, setEditedComment] = useState(comment.comment); // For the updated comment content
    const [editedRating, setEditedRating] = useState(comment.rating); // For the updated rating

    const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
    };

    const handleSaveClick = () => {
        handleUpdateReview(comment.reviewId, editedComment, editedRating); // Call update handler
        setIsEditing(false); // Exit edit mode
    };

    const handleCancelClick = () => {
        setIsEditing(false); // Exit edit mode without saving
        setEditedComment(comment.comment); // Reset to the original comment
        setEditedRating(comment.rating); // Reset to the original rating
    };

    return (
        <div className="comment-section__comment">
            <div className="comment-section__comment__user">
                <img src={comment.avatar} alt="user" />
                <div>
                    <h4>{comment.user}</h4>
                    <p className="date">{comment.date}</p>
                </div>
            </div>
            {!isEditing ? (
                <>
                    <div className="comment-section__comment__rating">
                        <p>{comment.rating}/10</p>
                    </div>
                    <div className="comment-section__comment__content">
                        <p>{comment.comment}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="comment-section__comment__rating">
                        <select
                            value={editedRating}
                            onChange={(e) => setEditedRating(e.target.value)}
                        >
                            {[...Array(10).keys()].map((i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="comment-section__comment__content">
                        <textarea
                            className="comment-section__comment__textarea"
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                        />
                    </div>
                </>
            )}
            {uid === comment.uid && (
                <div className="comment-section__actions">
                    {!isEditing ? (
                        <>
                            <button onClick={handleEditClick}>Edit</button>
                            <button onClick={() => handleDeleteReview(comment.reviewId)}>
                                Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSaveClick}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

// PropTypes for Comment
Comment.propTypes = {
    comment: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        reviewId: PropTypes.number.isRequired, // Review ID is required to update or delete
        uid: PropTypes.string.isRequired // UID is required to match the logged-in user
    }).isRequired,
    uid: PropTypes.string, // UID of the logged-in user
    handleDeleteReview: PropTypes.func.isRequired, // Function to delete the review
    handleUpdateReview: PropTypes.func.isRequired // Function to update the review
};

export default Comment;

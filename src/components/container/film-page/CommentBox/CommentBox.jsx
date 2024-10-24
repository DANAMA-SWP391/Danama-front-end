import "./CommentBox.css";
import BackSpace from "../../../../assets/Icons/back-space.svg";
import Button from "../../../common/Button/Button.jsx";
import { useRef, useState} from "react";
import PropTypes from 'prop-types';
import {addReview} from "../../../../api/userAPI.js";

function CommentBox({ setIsCommentBoxVisible, movieId, uid }) {
    const commentRef = useRef(null);
    const rateRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // State for loading

    const handleSubmit = async () => {
        const commentValue = commentRef.current.value;
        const rateValue = rateRef.current.value;

        if (!commentValue) {
            alert("Comment cannot be empty.");
            return;
        }

        setIsSubmitting(true); // Show loading state while submitting

        const review = {
            date: new Date().toISOString().slice(0, 19).replace('T', ' '), // Proper date format
            rating: rateValue,
            comment: commentValue,
            uid: uid, // Use UID from the prop
            movieId: movieId
        };

        try {
            // Submit the review to the backend
            const result = await addReview(review);

            if (result) {
                // Clear the input fields and close the comment box
                commentRef.current.value = "";
                rateRef.current.value = 1;
                setIsCommentBoxVisible(false);
            } else {
                alert("Failed to add comment.");
            }
        } catch (error) {
            console.error('Error while submitting the comment:', error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false); // Remove loading state after submission
        }
    };

    const handleClose = () => {
        // Clear the inputs on close
        commentRef.current.value = "";
        rateRef.current.value = 1;
        setIsCommentBoxVisible(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !isSubmitting) {
            handleSubmit();
        }
    };

    return (
        <div className="comment-box" onKeyDown={handleKeyDown}>
            <img src={BackSpace} alt="back-space" onClick={handleClose} />
            <h2>Comment</h2>
            <input type="text" placeholder="Leave your comment here" ref={commentRef} disabled={isSubmitting} />
            <h2>Rate</h2>
            <select className="rate-input" ref={rateRef} defaultValue={1} disabled={isSubmitting}>
                {[...Array(10).keys()].map(i => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </div>
    );
}

CommentBox.propTypes = {
    setIsCommentBoxVisible: PropTypes.func.isRequired,
    movieId: PropTypes.number.isRequired, // Expecting the movie ID to be passed
    uid: PropTypes.string.isRequired // Now we pass UID as a prop
};

export default CommentBox;
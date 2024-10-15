import "./CommentBox.css";
import BackSpace from "../../../../assets/Icons/back-space.svg";
import Button from "../../../common/Button/Button.jsx";
import { useEffect, useRef } from "react";

function CommentBox({ setIsCommentBoxVisible, setCommentList, user }) {
    const commentRef = useRef(null);
    const rateRef = useRef(null);

    const handleSubmit = () => {
        const commentValue = commentRef.current.value.trim();
        const rateValue = rateRef.current.value;

        if (!commentValue) {
            alert("Comment cannot be empty.");
            return;
        }

        const newComment = {
            user: user.user.name,
            avatar: user.user.avatar,
            date: new Date().toLocaleDateString(),
            rating: rateValue,
            comment: commentValue
        };

        // Prevent adding duplicate comments
        setCommentList(prevList => {
            const isDuplicate = prevList.some(
                item => item.comment === newComment.comment && item.date === newComment.date
            );
            return isDuplicate ? prevList : [...prevList, newComment];
        });

        // Clear the input fields
        commentRef.current.value = "";
        rateRef.current.value = 1;
        setIsCommentBoxVisible(false);
    };


    const handleClose = () => {
        // Clear the inputs on close
        commentRef.current.value = "";
        rateRef.current.value = 1;
        setIsCommentBoxVisible(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    useEffect(() => {
        commentRef.current.focus();
    }, []);

    return (
        <div className="comment-box" onKeyDown={handleKeyDown}>
            <img src={BackSpace} alt="back-space" onClick={handleClose} />
            <h2>Comment</h2>
            <input type="text" placeholder="Leave your comment here" ref={commentRef} />
            <h2>Rate</h2>
            <select className="rate-input" ref={rateRef} defaultValue={1}>
                {[...Array(10).keys()].map(i => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
}

export default CommentBox;

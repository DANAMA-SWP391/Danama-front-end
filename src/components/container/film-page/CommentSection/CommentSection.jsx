import "./CommentSection.css";
import Button from "../../../common/Button/Button.jsx";
import Comment from "../Comment/Comment.jsx";
import { useState } from "react";
import CommentBox from "../CommentBox/CommentBox.jsx";

function CommentSection({ user }) {
    const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
    const [commentList, setCommentList] = useState([
        {
            user: "Nguyễn Trường Giang",
            avatar: "https://via.placeholder.com/50",
            date: "8/10/2024",
            rating: "10",
            comment: "Tuyệt vời"
        }
    ]);

    const handleCommentClick = () => {
        if (user.user) {
            setIsCommentBoxVisible(true);
        } else if (window.confirm("You need to login to comment. Do you want to login?")) {
            window.location.href = "/login";
        }
    };

    return (
        <div className="comment-section">
            {isCommentBoxVisible && <div className="overlay" onClick={() => setIsCommentBoxVisible(false)}></div>}
            <div className="comment-section__header">
                <h3>Comments</h3>
            </div>
            {commentList.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
            <Button onClick={handleCommentClick}>Leave rate and comment?</Button>
            {isCommentBoxVisible && (
                <CommentBox user={user} setIsCommentBoxVisible={setIsCommentBoxVisible} setCommentList={setCommentList} />
            )}
        </div>
    );
}

export default CommentSection;
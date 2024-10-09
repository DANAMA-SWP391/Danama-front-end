import "./CommentSection.css";
import Button from "../../../common/Button/Button.jsx";

function CommentSection() {
    return (
        <div className="comment-section">
            <div className="comment-section__header">
                <h3>Comments</h3>
            </div>
            <div className="comment-section__comment">
                <div className="comment-section__comment__user">
                    <img src="https://via.placeholder.com/50" alt="user" />
                    <div>
                        <h4>Nguyễn Trường Giang</h4>
                        <p className="date">8/10/2024</p>
                    </div>
                </div>
                <div className="comment-section__comment__rating">
                    <p>10/10</p>
                </div>
                <div className="comment-section__comment__content">
                    <p>Tuyệt vời</p>
                </div>
            </div>
            <Button>Leave rate and comment?</Button>
        </div>
    );
}

export default CommentSection;
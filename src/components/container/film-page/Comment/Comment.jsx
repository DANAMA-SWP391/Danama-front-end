import "./Comment.css";

function Comment({ comment }) {
    return (
        <div className="comment-section__comment">
            <div className="comment-section__comment__user">
                <img src={comment.avatar} alt="user"/>
                <div>
                    <h4>{comment.user}</h4>
                    <p className="date">{comment.date}</p>
                </div>
            </div>
            <div className="comment-section__comment__rating">
                <p>{comment.rating}/10</p>
            </div>
            <div className="comment-section__comment__content">
                <p>{comment.comment}</p>
            </div>
        </div>
    )
}

export default Comment;
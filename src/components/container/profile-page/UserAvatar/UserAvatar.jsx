import "./UserAvatar.css";
import PropTypes from 'prop-types';
function UserAvatar({name, avatar}) {
    return (
        <div className="left-container__user">
            <div className="user__avatar">
                <img src={avatar} alt="avatar"/>
            </div>
            <p>{name}</p>
        </div>
    );
}
UserAvatar.propTypes = {
    name: PropTypes.string.isRequired, // Ensure name is a required string
    avatar: PropTypes.string.isRequired, // Ensure avatar is a required string
};
export default UserAvatar;
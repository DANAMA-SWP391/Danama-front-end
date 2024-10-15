import "./HeaderUser.css";
import PropTypes from 'prop-types';

function HeaderUser({ user }) {
    console.log(user)
    return (
        <div className="header-user">
            <div className="container">
                <div className="header-user__user">
                    <img src={user.avatar} alt="avatar"/>
                    {/*<span>{user.name}</span>*/}
                </div>
            </div>
        </div>
    );
}

HeaderUser.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default HeaderUser;
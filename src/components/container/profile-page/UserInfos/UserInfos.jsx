import PropTypes from 'prop-types';
import Box from '../Box/Box';
import './UserInfos.css';

function UserInfos({ infos }) {
    return (
        <div className="box-container"> {/* Make sure you apply this class to the wrapper */}
            {infos.map((info, index) => (
                <Box key={index} title={info.title} content={info.content} img={info.img} />
            ))}
        </div>
    );
}

UserInfos.propTypes = {
    infos: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default UserInfos;

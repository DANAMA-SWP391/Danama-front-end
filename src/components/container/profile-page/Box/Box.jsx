import PropTypes from 'prop-types';
import './Box.css';

function Box({ title, content, img }) {
    return (
        <div className="box-container__item">
            <div className="box-content">
                <p className="box-title">{title}</p>
                <p className="box-description">{content}</p>
            </div>
            <div className="box-image">
                <img src={img} alt={title} />
            </div>
        </div>
    );
}

Box.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default Box;

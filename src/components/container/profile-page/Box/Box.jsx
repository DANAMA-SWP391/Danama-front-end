import "./Box.css";
import PropTypes from 'prop-types';

function Box({title, content, img}) {
    return (
        <div className="right-container__box">
            <p>{title}</p>
            <p>{content}</p>
            <img src={img} alt="person"/>
        </div>
    )
}

Box.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default Box;
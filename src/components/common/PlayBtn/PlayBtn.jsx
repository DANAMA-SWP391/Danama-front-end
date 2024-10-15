import PropTypes from "prop-types";
import PlayIcon from "../../../assets/Icons/play.svg";
import PauseIcon from "../../../assets/Icons/pause.svg";

function PlayBtn({togglePlay, isPlaying}) {
    return (
        <button onClick={togglePlay}>
            <img src={isPlaying ? PauseIcon : PlayIcon} alt="play" />
        </button>
    );
}

PlayBtn.propTypes = {
    togglePlay: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

export default PlayBtn;
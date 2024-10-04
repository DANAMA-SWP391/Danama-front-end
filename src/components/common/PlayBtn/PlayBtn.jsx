import PlayIcon from "../../../assets/Icons/play.svg";
import PauseIcon from "../../../assets/Icons/pause.svg";

// eslint-disable-next-line react/prop-types
function PlayBtn({tooglePlay, isPlaying}) {

    return (
        <button onClick={tooglePlay}>
        <img src={isPlaying ? PauseIcon : PlayIcon} alt="play" />
        </button>
    );
}

export default PlayBtn;
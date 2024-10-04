import volumeUpIcon from "../../../assets/Icons/volumeUp.svg";
import volumeOffIcon from "../../../assets/Icons/volumeMute.svg";

// eslint-disable-next-line react/prop-types
function SoundBtn({ isMuted, toggleSound }) {
  return (
      <button onClick={toggleSound}>
        <img src={isMuted ? volumeOffIcon : volumeUpIcon} alt="sound" />
      </button>
  );
}

export default SoundBtn;
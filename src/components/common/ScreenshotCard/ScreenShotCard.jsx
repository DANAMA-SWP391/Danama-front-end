import "./ScreenShotCard.css";

// eslint-disable-next-line react/prop-types
function ScreenShotCard({screenShot}) {
    return (
        <div className="screen-shot-card">
            <img src={screenShot} alt="screen-shot"/>
        </div>
    );

}

export default ScreenShotCard;
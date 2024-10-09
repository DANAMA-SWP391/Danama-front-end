import { useRef, useEffect, useState } from "react";
import "./Trailer.css";

import SoundBtn from "../SoundBtn/SoundBtn.jsx";
import PlayBtn from "../PlayBtn/PlayBtn.jsx";

function Trailer() {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const handleLoadedData = () => {
            if(videoRef.current) {
                videoRef.current.currentTime = 13;
                videoRef.current.play();
            }
        }
        const videoElement = videoRef.current;
        videoElement.addEventListener("loadeddata", handleLoadedData);

        return() => {
            videoElement.removeEventListener("loadeddata", handleLoadedData);
        }
    }, []);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    return (
        <div className="video-container">
            <video
                ref={videoRef}
                muted={isMuted}
                autoPlay
                loop
            >
                <source src="/trailer/Dune2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="btn-container">
                <PlayBtn isPlaying={isPlaying} togglePlay={togglePlay} />
                <SoundBtn isMuted={isMuted} toggleSound={toggleMute} />
            </div>
        </div>
    );
}

export default Trailer;

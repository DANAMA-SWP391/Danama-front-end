import "./Trailer.css";
import { useRef, useEffect, useState } from "react";

import SoundBtn from "../SoundBtn/SoundBtn.jsx";
import PlayBtn from "../PlayBtn/PlayBtn.jsx";


function Trailer() {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const handleUserInteraction = () => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        };

        // Add the event listener to play the video on first user interaction (e.g., click)
        document.addEventListener("click", handleUserInteraction, { once: true });

        return () => {
            // Ensure the event listener is properly cleaned up
            document.removeEventListener("click", handleUserInteraction);
        };
    }, []);

    // Skip the video to 13 seconds after metadata is loaded
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 13;
        }
    };

    // Replay video starting from 13 seconds when it ends
    const handleEnded = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 13;
            videoRef.current.play();
        }
    };

    // Toggle mute/unmute state for the video
    const toggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted); // Update the state accordingly
        }
    };

    const tooglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }

    return (
        <div className="video-container">
            <video
                ref={videoRef}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                muted={isMuted}
                autoPlay
                width="600"
            >
                <source src="/trailer/Dune2.mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="btn-container">
                <PlayBtn isPlaying={isPlaying} tooglePlay={tooglePlay} />
                <SoundBtn isMuted={isMuted} toggleSound={toggleSound} />
            </div>
        </div>
    );
}

export default Trailer;

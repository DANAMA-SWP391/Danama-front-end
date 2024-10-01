import "./Trailer.css";
import { useRef, useEffect, useState } from "react";


function Trailer() {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

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
            <button onClick={toggleSound} className="sound-button">
                {isMuted ? "Mute" : "Unmute"}
            </button>
        </div>
    );
}

export default Trailer;

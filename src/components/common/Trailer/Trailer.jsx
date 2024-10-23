import { useRef, useEffect, useState } from "react";
import "./Trailer.css";
import ReactPlayer from 'react-player/youtube';
import SoundBtn from "../SoundBtn/SoundBtn.jsx";
import PlayBtn from "../PlayBtn/PlayBtn.jsx";

function Trailer() {
    const playerRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Start playback from 14 seconds once the video is loaded
        if (isLoaded) {
            playerRef.current.seekTo(14, 'seconds');
            setIsPlaying(true);
        }
    }, [isLoaded]);

    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    };

    const toggleMute = () => {
        setIsMuted((prevMuted) => !prevMuted);
    };

    useEffect(() => {
        const mainSlideSection = document.querySelector('.video-container');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && isPlaying) {
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }
            });
        }, {
            threshold: 0.5
        });

        if (mainSlideSection) {
            observer.observe(mainSlideSection);
        }

        return () => {
            if (mainSlideSection) {
                observer.unobserve(mainSlideSection);
            }
        };
    }, [isPlaying]);

    return (
        <div className={`video-container ${isLoaded ? "loaded" : ""}`}>
            <ReactPlayer
                ref={playerRef}
                url="https://www.youtube.com/watch?v=_YUzQa_1RCE&t=4s" // Replace with your YouTube video URL
                playing={isPlaying}
                muted={isMuted}
                loop
                onReady={() => setIsLoaded(true)}
                width="100%"
                height="100%"
                config={{
                    youtube: {
                        playerVars: {
                            controls: 0,        // Hide controls
                            modestbranding: 1,  // Hide YouTube logo
                            rel: 0,             // Disable related videos
                            showinfo: 0,        // Hide video info
                            fs: 0,              // Disable fullscreen button
                        },
                    }
                }}
                className="react-player"
            />
            <div className="btn-container">
                <PlayBtn isPlaying={isPlaying} togglePlay={togglePlay} />
                <SoundBtn isMuted={isMuted} toggleSound={toggleMute} />
            </div>
        </div>
    );
}

export default Trailer;

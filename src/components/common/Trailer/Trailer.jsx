import { useRef, useEffect, useState } from "react";
import "./Trailer.css";
import SoundBtn from "../SoundBtn/SoundBtn.jsx";
import PlayBtn from "../PlayBtn/PlayBtn.jsx";

function Trailer() {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleLoadedData = () => {
            const video = videoRef.current;
            if (video) {
                video.currentTime = 14;
                setIsLoaded(true);
                setIsPlaying(true);
                video.play();
            }
        };
        const video = videoRef.current;
        video.addEventListener("loadeddata", handleLoadedData);

        return () => {
            video.removeEventListener("loadeddata", handleLoadedData);
        };
    }, [videoRef]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    useEffect(() => {
        const mainSlideSection = document.querySelector('.video-container');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting && isPlaying) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            });
        },{
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
    }, []);

    return (
        <div className={`video-container ${isLoaded ? "loaded" : ""}`}>
            <video ref={videoRef} muted={isMuted} autoPlay loop>
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
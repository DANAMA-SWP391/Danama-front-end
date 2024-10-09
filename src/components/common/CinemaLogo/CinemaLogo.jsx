import "./CinemaLogo.css";

// eslint-disable-next-line react/prop-types
function CinemaLogo({logo, name}) {
    return (
        <div className="logo-container">
            <img src={logo} alt={name}/>
            <p>{name}</p>
        </div>
    );
}

export default CinemaLogo;
import "./CinemaLogo.css";

// eslint-disable-next-line react/prop-types
function CinemaLogo({logo, name, onClick}) {
    return (
        <div className="logo-container" onClick={onClick}>
            <img src={logo} alt={name}/>
            <p>{name}</p>
        </div>
    );
}

export default CinemaLogo;
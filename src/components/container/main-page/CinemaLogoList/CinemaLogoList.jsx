import React from 'react';
import CinemaLogo from '../../../common/CinemaLogo/CinemaLogo.jsx';

function CinemaLogoList({ cinemaLogoList }) {
    return (
        <div className="cinema-list">
            {cinemaLogoList.map((logo, index) => (
                <CinemaLogo key={index} logo={logo[0]} name={logo[1]} />
            ))}
        </div>
    );
}

export default CinemaLogoList;
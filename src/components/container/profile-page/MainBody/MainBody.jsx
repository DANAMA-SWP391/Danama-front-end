import "./MainBody.css";
import { useState } from "react";
import LeftContainer from "../LeftContainer/LeftContainer.jsx";
import RightContainer from "../RightContainer/RightContainer.jsx";

function MainBody() {
    const [selectedOption, setSelectedOption] = useState('User information'); // State for the selected option

    // Handler to update the selected option
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="profile-page__main-body">
            <LeftContainer onOptionSelect={handleOptionSelect} /> {/* Pass handler to LeftContainer */}
            <RightContainer selectedOption={selectedOption} /> {/* Pass selected option to RightContainer */}
        </div>
    );
}

export default MainBody;

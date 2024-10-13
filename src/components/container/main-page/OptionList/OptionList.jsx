import "./OptionList.css";

function OptionList() {

    const filmListSection = document.querySelector(".film-lists");
    const cinemaListSection = document.querySelector(".schedule-section");
    const links = document.querySelectorAll(".option a");

    for(let link of links) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
        });
    }

    const handleFilmsClick = () => {
        filmListSection.scrollIntoView({ behavior: "smooth" });
    }

    const handleCinemasClick = () => {
        cinemaListSection.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="option-list">
            <div className="option">
                <a href={""} onClick={handleFilmsClick}>Films</a>
            </div>
            <div className="option">
                <a href="" onClick={handleCinemasClick}>Cinemas</a>
            </div>
            <div className="option">
                <a href="" onClick={handleCinemasClick}>Schedules</a>
            </div>
        </div>
    );
}

export default OptionList;
import "./OptionList.css";

function OptionList() {
    const handleScroll = (selector, event) => {
        event.preventDefault();
        document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="option-list">
            <div className="option">
                <a href="/film-list" >Films</a>
            </div>
            <div className="option">
                <a href="" onClick={(e) => handleScroll(".schedule-section", e)}>Cinemas</a>
            </div>
            <div className="option">
                <a href="" onClick={(e) => handleScroll(".schedule-section", e)}>Schedules</a>
            </div>
        </div>
    );
}

export default OptionList;
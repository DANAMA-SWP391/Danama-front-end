import "./OptionList.css";

function OptionList() {
    return (
        <div className="option-list">
            <div className="option">
                <a href="/login">Films</a>
            </div>
            <div className="option">
                <a href="/signup">Cinemas</a>
            </div>
            <div className="option">
                <a href="/reset-pass">Schedules</a>
            </div>
        </div>
    );
}

export default OptionList;
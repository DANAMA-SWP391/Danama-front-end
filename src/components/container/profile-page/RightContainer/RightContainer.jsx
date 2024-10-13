import "./RightContainer.css";
import person from "../../../../assets/Icons/person.svg";
import mail from "../../../../assets/Icons/mail.svg";
import phone from "../../../../assets/Icons/phone.svg";
import avatar from "../../../../assets/Icons/avatar.svg";
import UserInfos from "../UserInfos/UserInfos.jsx";
import BookingHistory from "../BookingHistory/Booking History.jsx";
import ChangePass from "../ChangePass/ChangePass.jsx";

function RightContainer() {

    const infos = [
        {title: "Name", content: "Châu Tùng Đăng", img: person},
        {title: "Email", content: "Tungdang.nbk.9a5@gmail.com", img: mail},
        {title: "Phone", content: "0912345678", img: phone},
        {title: "Avatar", content: "", img: avatar},
    ];

    return (
        <div className="body__right-container">
            <h2>Change Password</h2>
            <div className="box-container">
                {/*<UserInfos infos={infos} />*/}
                {/*<BookingHistory />*/}
                {/*<ChangePass />*/}
            </div>
        </div>
    );
}

export default RightContainer;
import "./UserInfos.css";
import Box from "../Box/Box.jsx";

// eslint-disable-next-line react/prop-types
function UserInfos({infos}) {
    return(
        <>
            {/* eslint-disable-next-line react/prop-types */}
            {infos.map((info, index) => {
                return (
                    <Box key={index} title={info.title} content={info.content} img={info.img} />
                );
            })}
        </>
    )
}

export default UserInfos;
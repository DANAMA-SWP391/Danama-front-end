import "./InputBox.css";


// eslint-disable-next-line react/prop-types
function InputBox({className, type, placeholder}) {
    return (
        <input className={className} type={type} placeholder={placeholder}/>
    )
}

export default InputBox;
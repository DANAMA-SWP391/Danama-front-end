export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email.toLowerCase());
}

export function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

export function validatePassword(password) {
    return password.length >= 6;
}

export function validateName(name) {
    return name.length >= 3;
}

export function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

export function validateEmailAndPassword(email, password) {
    return validateEmail(email) && validatePassword(password);
}
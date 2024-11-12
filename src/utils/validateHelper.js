import {fetchListEmails} from "../api/authAPI.js";

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
export async function validateExistEmail(email) {
    try {
        const data = await fetchListEmails();
        const emailList= data.listEmails;
        // Check if the provided email exists in the email list
        return emailList.includes(email);  // Return true if exists, false otherwise
    } catch (error) {
        console.error("Error validating email existence:", error);
        throw error;  // Optionally rethrow the error for further handling
    }
}

export function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

export function validateEmailAndPassword(email, password) {
    return validateEmail(email) && validatePassword(password);
}
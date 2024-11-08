import {useCustomAlert} from "../utils/CustomAlertContext.jsx";
import {API_URL} from "../utils/utility.js";


export async function login(email, password) {

    try {
        const response = await fetch(API_URL+'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
         // Return the response data, which includes success and message
        if (data.success && data.jwtToken) {
            // Store the JWT token in localStorage
            localStorage.setItem('jwtToken', data.jwtToken);
            if(data.user && data.user.roleId !== 0) {
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                localStorage.clear();
            }
            // console.log(data);
            if (data.user && data.user.roleId === 2) {
                localStorage.setItem('cinema', JSON.stringify(data.cinema));
            }
        }
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'An error occurred during login.' }; // Handle errors gracefully
    }
}

export async function loginByGoogle(token) {
    try {
        const response = await fetch(API_URL+'loginGoogle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idToken: token })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Return the response data, which includes success and message
        if (data.success && data.jwtToken) {
            // Store the JWT token in localStorage
            localStorage.setItem('jwtToken', data.jwtToken);
            if(data.user.roleId !== 0) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }

        }
        return data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;  // Optionally rethrow the error for further handling
    }
}

export async function sendVerificationCode(email) {
    try {
        const response = await fetch(API_URL+'emailVerify',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
            });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error("Send verification code failed:", error);
        throw error;  // Optionally rethrow the error for further handling
    }
}
export async function register(user) {
    try {
        const response = await fetch(API_URL+'signUp',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error("Register failed:", error);
        throw error;  // Optionally rethrow the error for further handling
    }
}
export async function fetchListEmails() {
    try {
        const response = await fetch(API_URL+'signUp',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed:", error);
        throw error;  // Optionally rethrow the error for further handling
    }
}
// authAPI.js
export async function checkIfHasPassword(UID) {
    try {
        const response = await fetch(API_URL+`changePassword?UID=${UID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        return data.hasPassword; // Return true or false based on the response
    } catch (error) {
        console.error("Failed to check password existence:", error);
        throw error;
    }
}

export async function changePassword(email,oldPassword,newPassword) {
    try {
        const response = await fetch(API_URL+'changePassword',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action:"change", email, oldPassword, newPassword })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed:", error);
        throw error;  // Optionally rethrow the error for further handling
    }
}
export async function resetPassword(email,newPassword) {
    try {
        const response = await fetch(API_URL+'changePassword',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action:"reset", email, newPassword })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed:", error);
        throw error;  // Optionally rethrow the error for further handling
    }
}
export async function fetchJwtToken() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        console.error('No token found');
        return { success: false, message: 'No token available' };
    }

    try {
        const response = await fetch(API_URL+'validateJwtToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });

        const data = await response.json();
        if (data.success) {
            // Token is valid
            return { success: true, user: data.user };
        } else if (data.expired) {
            // Token expired, prompt the user to refresh
            const extendSession = confirm("Your session has expired. Do you want to extend it?");
            if (extendSession) {
                const refreshResponse = await refreshJwtToken(token);
                if (refreshResponse.success) {
                    localStorage.setItem('jwtToken', refreshResponse.refreshedToken);
                    return fetchJwtToken(); // Retry validation with the new token
                } else {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useCustomAlert("Could not extend session. Please log in again.");
                    logoutUser(); // Log out if refresh failed
                    return { success: false, message: "Session expired. Please log in again." };
                }
            } else {
                logoutUser(); // Log out if user declines to extend
                return { success: false, message: "Session expired. Please log in again." };
            }
        } else {
            console.error('Token validation failed:', data.message);
            return { success: false, message: data.message || 'Token validation failed' };
        }
    } catch (error) {
        console.error('Error during token validation:', error);
        return { success: false, message: 'An error occurred during token validation.' };
    }
}

async function refreshJwtToken(token) {
    try {
        const response = await fetch(API_URL+'validateJwtToken', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during token refresh:', error);
        return { success: false, message: 'An error occurred during token refresh.' };
    }
}

export function logoutUser() {
    localStorage.clear();
    window.location.href = "/";
}



export async function login(email, password) {

    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/login', {
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
         // Return the response data, which includes success and message
        if (data.success && data.jwtToken) {
            // Store the JWT token in localStorage
            localStorage.setItem('jwtToken', data.jwtToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            // console.log(data);
            if (data.user && data.user.roleId === 2) {
                localStorage.setItem('cinema', data.cinema);
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
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/loginGoogle', {
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
        console.log(data);
        // Return the response data, which includes success and message
        if (data.success && data.jwtToken) {
            // Store the JWT token in localStorage
            localStorage.setItem('jwtToken', data.jwtToken);
            localStorage.setItem('user', JSON.stringify(data.user));

        }
        return data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;  // Optionally rethrow the error for further handling
    }
}

export async function sendVerificationCode(email) {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/emailVerify',{
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
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/signUp',{
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
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/signUp',{
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
export async function changePassword(email,oldPassword,newPassword) {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/changePassword',{
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
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/changePassword',{
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
        return { success: false, message: 'No token available' }; // Return an error if no token is found
    }

    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/validateJwtToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }), // Send the token in the request body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        if (data.success) {
            // Token is valid, return the account data
            const user = data.user;
            console.log('Token is valid');
            return { success: true, user: user };
        } else {
            // Token is invalid or expired
            console.error('Token validation failed:', data.message);
            return { success: false, message: data.message || 'Token validation failed' };
        }
    } catch (error) {
        console.error('Error during token validation:', error);
        return { success: false, message: 'An error occurred during token validation.' }; // Handle errors gracefully
    }
}

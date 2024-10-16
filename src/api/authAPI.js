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

        return await response.json(); // Return the response data, which includes success and message
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

        return await response.json();  // Optionally return the data for further processing
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
export async function changePassword(user,oldPassword,newPassword) {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/changePassword',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, oldPassword, newPassword })
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
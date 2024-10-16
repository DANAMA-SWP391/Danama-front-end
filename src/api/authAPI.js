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

        const data = await response.json();
        return data;  // Optionally return the data for further processing
    } catch (error) {
        console.error("Login failed:", error);
        throw error;  // Optionally rethrow the error for further handling
    }
}

export function register(user) {

}
export function changePassword(user,password) {

}
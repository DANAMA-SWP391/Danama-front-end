export function login(email,password) {

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
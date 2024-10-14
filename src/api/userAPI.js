export const fetchProfile = async (uid) => {
    try {
        // Make a GET request to the appropriate endpoint where your servlet is mapped
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/profile?uid=${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'  // Include cookies to maintain the session
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Error fetching profile: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Return the user data from the response
        return data.user;  // Assuming the 'user' data is returned in the response JSON
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        throw error;  // Optionally rethrow the error to handle it elsewhere
    }
};

export function updateProfile(user) {
    return fetch('http://localhost:8080/DANAMA_war_exploded/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),  // Convert the user object to JSON
        credentials: 'include',  // Include cookies (for session handling)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating profile: ${response.statusText}`);
            }
            return response.json();  // Parse JSON response
        })
        .then(data => {
            if (data.sucess === "true") {
                console.log('Profile updated successfully');
            } else {
                console.log('Profile update failed');
            }
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export const fetchBookingHistory = async (uid) => {

}

export function addReview(review) {

}

export function updateReview(review) {

}
export function deleteReview(reviewId) {

}
export function addBooking(booking,tickets) {

}
export function paymentConfirm(bookingId) {

}

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
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/bookingHistory?uid=${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch booking history');
        }

        const data = await response.json();
        return data; // Return the booking data received from the server

    } catch (error) {
        console.error('Error fetching booking history:', error);
        throw error; // You can rethrow the error to handle it in the calling function
    }
};


export async function addReview(review) {
    review.reviewId=0;
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'ADD', review }) // Sending review data in the request body
        });

        if (!response.ok) {
            throw new Error('Failed to add review');
        }

        const data = await response.json();
        return data; // Returning the response data

    } catch (error) {
        console.error('Error adding review:', error);
        throw error; // Rethrow the error for handling outside the function
    }
}


export async function updateReview(review) {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'UPDATE', review }) // Sending review update action
        });

        if (!response.ok) {
            throw new Error('Failed to update review');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
}

export async function deleteReview(reviewId) {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'DELETE', reviewId:  reviewId  }) // Sending delete action with reviewId
        });

        if (!response.ok) {
            throw new Error('Failed to delete review');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
}

export async function addBooking(booking, tickets) {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ booking, tickets }), // Send the booking and tickets as JSON
        });

        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const responseData = await response.json();

        // Check if the operation was successful
        if (!responseData.success) {
            throw new Error('Failed to add booking or tickets');
        }

        // Return the booking and tickets data if successful
        return {
            booking: responseData.booking,
            tickets: responseData.tickets,
        };
    } catch (error) {
        console.error('Error adding booking:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export function paymentConfirm(bookingId) {

}

export async function upLoadImage(file, folder) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder); // Folder path you want to store in

        const response = await fetch("http://localhost:8080/DANAMA_war_exploded/uploadImage", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data.location; // This will be the path where the file is saved
        } else {
            console.error("Failed to upload image:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}


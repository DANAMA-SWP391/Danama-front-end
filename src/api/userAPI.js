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
            body: JSON.stringify({ booking, tickets }),
        });

        const responseData = await response.json();

        if (!responseData.success) {
            throw new Error(responseData.error || 'Failed to add booking or tickets');
        }
        return responseData;
    } catch (error) {
        console.error('Error adding booking:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}


export async function cancelBooking(bookingId) {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/cancelBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookingId }) // Send bookingId as JSON in the request body
        });

        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error during booking cancellation:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export async function getBookingDetail(bookingId) {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/booking?bookingId=${bookingId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            // If the response is not ok, handle the error based on status
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch booking details");
        }

        // Parse the JSON response if successful
        const data = await response.json();
        return data.bookingDetail; // Access the booking detail object directly

    } catch (error) {
        console.error("Error fetching booking detail:", error.message);
        throw error; // Re-throw the error so the caller can handle it
    }
}


export const fetchBookingListPage = async (cinemaId) => {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/ListBookingController?cinemaId=${cinemaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cinema booking list:', error);
        return false;
    }
};

export const fetchCinemaDashBoardPage = async (cinemaId) => {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/managerDashBoard?cinemaId=${cinemaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cinema dashboard page:', error);
        return false;
    }
};

export const fetchRoomList = async (cinemaId) => {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/RoomController?cinemaId=${cinemaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching room list:', error);
        return false;
    }
};

export const fetchSeatList = async (roomId) => {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/SeatController?roomId=${roomId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching seat list:', error);
        return false;
    }
};

export const fetchShowtimeList = async (cinemaId) => {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/ShowtimeController?cinemaId=${cinemaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching showtime list:', error);
        return false;
    }
};

export const fetchDeleteRoom = async (roomId) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/RoomController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete',
                roomId: roomId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return success and message from the server
    } catch (error) {
        console.error('Error deleting room:', error);
        return { success: false, message: 'Error deleting room.' };
    }
};


export const fetchDeleteSeat = async (seatId) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/SeatController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete',
                seat: { seatId: seatId }
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting seat:', error);
        return false;
    }
};

export const fetchDeleteShowtime = async (showtimeId) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/ShowtimeController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete',
                showtime: { showtimeId: showtimeId }
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting showtime:', error);
        return false;
    }
};

export const fetchAddShowtime = async (showtime) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/ShowtimeController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add',
                showtime: showtime
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding showtime:', error);
        return false;
    }
};

export const fetchAddRoom = async (room) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/RoomController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add',
                room: room
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return success and message from the server
    } catch (error) {
        console.error('Error adding room:', error);
        return { success: false, message: 'Error adding room.' };
    }
};

export const fetchAddSeat = async (seat) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/SeatController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add',
                seat: seat
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding seat:', error);
        return false;
    }
};

export const fetchUpdateRoom = async (room) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/RoomController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'update',
                room: room,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return success and message from the server
    } catch (error) {
        console.error('Error updating room:', error);
        return { success: false, message: 'Error updating room.' };
    }
};

export const fetchChangeSeatType = async (seat) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/SeatController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'changeSeatType',
                seat: seat
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error changing seat type:', error);
        return false;
    }
};

export const fetchUpdateShowtime = async (showtime) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/ShowtimeController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'update',
                showtime: showtime,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error updating showtime:', error);
        return false;
    }
};

export const fetchMovieRequestList = async (cinemaId) => {
    try {
        const response = await fetch(`http://localhost:8080/DANAMA_war_exploded/MovieRequestController?cinemaId=${cinemaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie request list:', error);
        return false;
    }
};

export const fetchAddMovieRequest = async (movierequest) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieRequestController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add',
                movierequest: movierequest
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding movie request:', error);
        return false;
    }
};

export const fetchUpdateMovieRequest = async (movierequest) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieRequestController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'update',
                movierequest: movierequest,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error updating movie request:', error);
        return false;
    }
};

export const fetchDeleteMovieRequest = async (movierequestId) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieRequestController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete',
                movierequest: { requestId: movierequestId }
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting movie request:', error);
        return false;
    }
};

// export const fetchViewMovieRequest = async (requestId) => {
//     try {
//         const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieRequestController', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 action: 'view',
//                 movie: { movieId: movieId }  // Truyền đối tượng movie với movieId
//             }),
//         });
//
//         const result = await response.json();
//
//         if (result.success) {
//             return result.movie;  // Trả về thông tin movie nếu thành công
//         } else {
//             throw new Error('Movie not found or error occurred');
//         }
//     } catch (error) {
//         console.error('Error fetching movie:', error);
//         return null;
//     }
// };


export const fetchViewMovieRequest = async(requestId) => {
    const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieRequestController', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'view',
            requestId: requestId, // Gửi requestId để lấy thông tin yêu cầu
        }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Chuyển đổi phản hồi về định dạng JSON
    // Kiểm tra và xử lý dữ liệu trả về
    if (data.movieRequest) {
        console.log('Movie Request Details:', data.movieRequest);
    } else {
        console.error('No Movie Request found');
    }

    if (data.movie) {
        console.log('Movie Details:', data.movie);
        console.log('Genres:', data.movie.genres); // In ra danh sách thể loại
    } else {
        console.error('No Movie found for the given requestId');
    }

    return data;
}







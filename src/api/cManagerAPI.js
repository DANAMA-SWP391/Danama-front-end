export const fetchBookingListPage = async (showtimeId) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/ListBookingController', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ showtimeId }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting showtime:', error);
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
                room: { roomId: roomId }
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting room:', error);
        return false;
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
        return data;
    } catch (error) {
        console.error('Error adding room:', error);
        return false;
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

        return true;
    } catch (error) {
        console.error('Error updating room:', error);
        return false;
    }
};

export const fetchChangeSeatType = async (seat) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/SeatController', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seat),
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



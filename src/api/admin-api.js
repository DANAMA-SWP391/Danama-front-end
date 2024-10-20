// Fetch danh sách rạp chiếu phim
export const fetchCinemaList = async () => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/CinemaController', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.cinemas; // Lấy danh sách cinemas từ JSON trả về
    } catch (error) {
        console.error('Error fetching cinema list:', error);
        return null;
    }
};

// Thêm mới một rạp chiếu phim
export const fetchAddCinema = async (cinema) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/CinemaController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add',
                cinema: {
                    name: cinema.name,
                    logo: cinema.logo,
                    address: cinema.address,
                    description: cinema.description,
                    image: cinema.image,
                    managerId: cinema.managerId
                }
            })
        });

        const result = await response.json();
        return result.success;  // Trả về true nếu thêm thành công, false nếu thất bại
    } catch (error) {
        console.error('Error adding cinema:', error);
        return false;
    }
};

// Cập nhật thông tin rạp chiếu phim
export const fetchUpdateCinema = async (cinema) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/CinemaController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'update',
                cinema: cinema, // Gửi toàn bộ đối tượng cinema
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json(); // Nhận phản hồi từ server
        console.log('Update response:', result); // Log phản hồi để kiểm tra kết quả
        return result.success; // Trả về giá trị success từ server
    } catch (error) {
        console.error('Error updating cinema:', error);
        return false; // Trả về false nếu có lỗi xảy ra
    }
};



// Xóa rạp chiếu phim
export const fetchDeleteCinema = async (cinemaId) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/CinemaController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete',
                cinema: { cinemaId: cinemaId } // Truyền đúng dữ liệu cinema để server xử lý
            })
        });

        const result = await response.json();
        console.log('Delete response:', result); // Log kết quả phản hồi
        return result.success; // Trả về true nếu xóa thành công
    } catch (error) {
        console.error('Error deleting cinema:', error);
        return false;
    }
};

// Thêm mới một tài khoản
export const fetchAddAccount = async (account) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/AccountController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add',  // Xác định hành động là "add"
                account: account,  // Gửi đối tượng account chứa các thông tin cần thêm
            }),
        });

        // Kiểm tra phản hồi từ server
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json(); // Lấy kết quả trả về từ server
        console.log('Account added response:', result);  // In kết quả ra để kiểm tra

        return result.success;  // Trả về kết quả từ server
    } catch (error) {
        console.error('Error adding account:', error);
        return false;  // Trả về false nếu có lỗi xảy ra
    }
};


// Xem chi tiết tài khoản
export const fetchAccountById = async (UID) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/AccountController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'view',
                account: {
                    UID: UID,  // UID của tài khoản cần xem chi tiết
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
            return result.account; // Trả về đối tượng account nếu thành công
        } else {
            throw new Error('Account not found');
        }
    } catch (error) {
        console.error('Error fetching account by ID:', error);
        return null; // Trả về null nếu có lỗi
    }
};

// Cấm tài khoản
export const fetchBanAccount = async (UID) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/AccountController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'ban',
                account: {
                    UID: UID,
                },
            }),
        });

        const result = await response.json();
        return result.success; // Trả về true nếu cấm thành công
    } catch (error) {
        console.error('Error banning account:', error);
        return false;
    }
};
// Fetch danh sách tài khoản
export const fetchAccountList = async () => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/AccountController', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.accounts; // Lấy danh sách tài khoản từ JSON trả về
    } catch (error) {
        console.error('Error fetching account list:', error);
        return null; // Hoặc có thể trả về một mảng rỗng nếu bạn muốn
    }
};

// Lấy danh sách phim
export const fetchMovieList = async () => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieController', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error('Error fetching movie list and genres:', error);
        return null; // Return null if an error occurs
    }
};


// Thêm mới một bộ phim
export const fetchAddMovie = async (movie) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add',     // Hành động "add" cho API
                movie: {
                    // Không cần gửi movieId vì movieId sẽ được tự động sinh
                    name: movie.name,
                    description: movie.description,
                    poster: movie.poster,
                    trailer: movie.trailer,
                    releaseDate: movie.releaseDate,
                    country: movie.country,
                    director: movie.director,
                    ageRestricted: movie.ageRestricted,
                    actors: movie.actors,
                    duration: movie.duration,
                    status: movie.status,
                    genres: movie.genres  // Gửi danh sách genres (bao gồm genreId)
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();  // Nhận phản hồi JSON từ server
        console.log('Add movie response:', result);
        return result.success;  // Trả về true nếu thêm thành công
    } catch (error) {
        console.error('Error adding movie:', error);
        return false;  // Trả về false nếu có lỗi xảy ra
    }
};


// Xem chi tiết bộ phim
export const fetchViewMovie = async (movieId) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'view',
                movie: { movieId: movieId }  // Truyền đối tượng movie với movieId
            }),
        });

        const result = await response.json();

        if (result.success) {
            return result.movie;  // Trả về thông tin movie nếu thành công
        } else {
            throw new Error('Movie not found or error occurred');
        }
    } catch (error) {
        console.error('Error fetching movie:', error);
        return null;
    }
};


export const fetchDeleteMovie = async (movieId) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete',
                movie: { movieId: movieId }  // Truyền đối tượng movie với movieId
            }),
        });

        const result = await response.json();
        console.log('Delete response:', result);  // Ghi log kết quả phản hồi
        return result.success;  // Trả về true nếu xóa thành công
    } catch (error) {
        console.error('Error deleting movie:', error);
        return false;
    }
};

export const fetchUpdateMovie = async (movie) => {

    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'update',
                movie: movie,  // Send movie data including genres
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Update movie response:', result);
        return result.success;
    } catch (error) {
        console.error('Error updating movie:', error);
        return false;
    }
};








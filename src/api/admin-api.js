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
export const fetchUpdateCinema = async (cinemaId, cinema) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/CinemaController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'update',
                cinemaId: cinemaId,  // Gửi cinemaId cùng với cinema
                cinema: cinema,      // Gửi toàn bộ đối tượng cinema
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json(); // Nhận phản hồi từ server
        console.log('Update response:', result); // Log phản hồi để kiểm tra kết quả
        return result; // Trả về true nếu cập nhật thành công
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
                action: 'add',
                account: {
                    name: account.name,
                    email: account.email,
                    phone: account.phone,
                    avatar: account.avatar,
                    googleId: account.googleId,
                    roleId: account.roleId,
                    password: account.password,
                },
            }),
        });

        const result = await response.json();
        return result.success; // Trả về true nếu thêm thành công
    } catch (error) {
        console.error('Error adding account:', error);
        return false;
    }
};

// Xem chi tiết tài khoản
export const fetchViewAccount = async (UID) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/AccountController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'view',
                account: {
                    UID: UID,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data; // Trả về đối tượng tài khoản chi tiết
    } catch (error) {
        console.error('Error viewing account:', error);
        return null;
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
        return data.movies; // Lấy danh sách movies từ JSON trả về
    } catch (error) {
        console.error('Error fetching movie list:', error);
        return null; // Hoặc bạn có thể ném lỗi ra ngoài
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
                action: 'add',
                movie: {
                    name: movie.name,
                    description: movie.description,
                    poster: movie.poster,
                    trailer: movie.trailer,
                    releaseDate: movie.releaseDate.toISOString(), // Chuyển đổi sang định dạng ISO
                    country: movie.country,
                    director: movie.director,
                    ageRestricted: movie.ageRestricted,
                    actors: movie.actors,
                    duration: movie.duration,
                    status: movie.status,
                },
            }),
        });

        const result = await response.json();
        return result.success;  // Trả về true nếu thêm thành công, false nếu thất bại
    } catch (error) {
        console.error('Error adding movie:', error);
        return false;
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
                movieId: movieId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data; // Trả về đối tượng chi tiết phim
    } catch (error) {
        console.error('Error viewing movie:', error);
        return null; // Hoặc bạn có thể ném lỗi ra ngoài
    }
};

// Xóa bộ phim
export const fetchDeleteMovie = async (movieId) => {
    try {
        const response = await fetch('http://localhost:8080/DANAMA_war_exploded/MovieController', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete',
                movieId: movieId, // Gửi movieId để xóa
            }),
        });

        const result = await response.json();
        console.log('Delete response:', result); // Log kết quả phản hồi
        return result.success; // Trả về true nếu xóa thành công
    } catch (error) {
        console.error('Error deleting movie:', error);
        return false;
    }
};






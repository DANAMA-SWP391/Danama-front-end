import { useEffect, useState, useRef } from "react";
import Sidebar from "../../../components/common/CMangerSideBar/CManagerSideBar.jsx";
import CManagerHeader from "../../../components/common/CManagerHeader/CManagerHeader.jsx";
import { fetchCinemaDashBoardPage } from "../../../api/cManagerAPI.js";
import "./dash-board.css"; // Import the CSS file for styling
import {
    Chart,
    BarController,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {formatCurrency} from "../../../utils/utility.js";

// Register necessary components
Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CinemaDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);

    const storagecinema = localStorage.getItem('cinema');
    const cinema = JSON.parse(storagecinema);
    const cinemaId = cinema.cinemaId;

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                const data = await fetchCinemaDashBoardPage(cinemaId);
                setDashboardData(data);
            } catch (error) {
                setError("Failed to fetch dashboard data.");
            }
            setLoading(false);
        };
        getDashboardData();
    }, [cinemaId]);

    useEffect(() => {
        if (dashboardData) {
            // Destroy the previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const ctx = document.getElementById("ticketSoldChart").getContext("2d");

            // Create a new chart instance and store it in chartRef
            chartRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Adjust if necessary
                    datasets: [
                        {
                            label: "Tickets Sold",
                            data: dashboardData.ticketsoldpermonth,
                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [dashboardData]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div>{error}</div>;
    // }

    return (
        <div className="cinema-dashboard">
            {loading && (
                <div className="cinema-dashboard-loading-overlay">
                    <div className="cinema-dashboard-spinner"></div>
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                <CManagerHeader />
            <div className="layout">
                <Sidebar />
                <div className="main-content">
                    <div className="cinema-dashboard-content">
                        <div className="revenue-cards">
                            <div className="card">
                                <span className="revenue-icon">💰</span>
                                <div className="revenue-data">
                                    <p>Daily Revenue</p>
                                    <h3>{formatCurrency(dashboardData.dailytotalrevenue)}</h3>
                                </div>
                            </div>
                            <div className="card">
                                <span className="revenue-icon">🎟️</span>
                                <div className="revenue-data">
                                    <p>Tickets Sold (This Month)</p>
                                    <h3>{dashboardData.ticketsoldincurrentmonth.toLocaleString()}</h3>
                                </div>
                            </div>
                            <div className="card">
                                <span className="revenue-icon">💵</span>
                                <div className="revenue-data">
                                    <p>Total Revenue (This Month)</p>
                                    <h3>{formatCurrency(dashboardData.monthtotalrevenue)}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="chart-section">
                            <div className="chart-container">
                                <canvas id="ticketSoldChart"></canvas>
                            </div>
                        </div>


                        <div className="movie-revenue-section">
                            <div className="movie-revenue-table">
                                <h3>Movie Revenue</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Movie Name</th>
                                        <th>Ticket Sold</th>
                                        <th>Total Revenue</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dashboardData?.ticketsoldandtotalcosteachmovie?.map((movie, index) => (
                                        <tr key={index}>
                                            <td>{movie.movieName}</td>
                                            <td>{movie.ticketSold}</td>
                                            <td>{formatCurrency(movie.totalRevenue)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>



                    <div className="most-watched-section">
                        <h3 className="mostwatch">Most Watched</h3>
                        {dashboardData?.popularmovies && dashboardData.popularmovies.length > 0 ? (
                            <ul>
                                {dashboardData.popularmovies.map((movie, index) => (
                                    <li key={index} className="movie-item">
                                        <div className="movie-poster-wrapper">
                                            <img
                                                src={movie.poster}
                                                alt={`${movie.name} Poster`}
                                                className="movie-poster-large"
                                            />
                                        </div>
                                        <div className="movie-info">
                                            <h4 className="movie-title">{movie.name}</h4>
                                            <p className="movie-genre">{movie.genres.map(genre => genre.name).join(', ')}</p> {/* Thể loại phim */}
                        {/*                    <span className="showtime">*/}
                        {/*    {showtime.startTime} - {showtime.endTime}*/}
                        {/*</span>*/}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No data available for most-watched showtimes.</p>
                        )}
                    </div>
                </div>
            </div>
                </>
            )}
        </div>

    );

}

export default CinemaDashboard;

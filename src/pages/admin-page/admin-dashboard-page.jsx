import { useState, useEffect } from 'react';
import Sidebar from "./../../components/common/AdminSideBar/AdminSideBar.jsx";
import { fetchAdminDashBoardPage } from "../../api/admin-api.js";
import './admin-dashboard-page.css';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboardPage() {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAdminDashBoardPage();
                setDashboardData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="dashboard-error-message">{error}</div>;
    }

    const { cinemaRevenues = [], movies = [], popularShowtimes = [] } = dashboardData || {};
    const totalRevenueAmount = cinemaRevenues.reduce((acc, cinema) => acc + (cinema.totalRevenue || 0), 0);

    const pieChartData = {
        labels: cinemaRevenues.map(cinema => cinema.cinemaName),
        datasets: [
            {
                data: cinemaRevenues.map(cinema => cinema.totalRevenue),
                backgroundColor: ['#1CBB8C', '#0F9CF3', '#FCB92C', '#4AA3FF', '#F32F53'],
                hoverBackgroundColor: ['#17A679', '#0D8CD1', '#E5A623', '#3A92E4', '#D42B4D'],
                borderColor: '#fff',
                borderWidth: 2,
                hoverBorderColor: '#000',
                hoverBorderWidth: 3,
            }
        ]
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#ffffff',
                    font: {
                        size: 14
                    },
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const dataset = tooltipItem.dataset;
                        const currentValue = dataset.data[tooltipItem.dataIndex];
                        const percentage = ((currentValue / totalRevenueAmount) * 100).toFixed(2);
                        return `${tooltipItem.label}: $${currentValue} (${percentage}%)`;
                    }
                },
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#444',
                borderWidth: 1,
            }
        }
    };




    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <h1 className="dashboard-title">Admin Dashboard</h1>

                <div className="dashboard-most-watched-movies">
                    <h2>Most Watched Movies</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Name</th>
                            <th>Ticket (Total)</th>
                            <th>Revenue ($)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.map((movie, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={movie.poster} alt={`Poster of ${movie.name}`} className="dashboard-movie-poster" width="100" />
                                </td>
                                <td>{movie.name}</td>
                                <td>{movie.totalTicketsSold}</td>
                                <td>{movie.totalRevenue}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {popularShowtimes.length > 0 && (
                    <div className="dashboard-most-popular-time-slots">
                        <h2>Most Popular Time Slots</h2>
                        <ul>
                            {popularShowtimes.map((showtime, index) => (
                                <li key={index} className="dashboard-time-slot-item">
                                    <img src={showtime.logo} alt={`${showtime.cinemaName} logo`} className="dashboard-cinema-logo" />
                                    <span>{showtime.cinemaName}</span>
                                    <span>{showtime.startTime} - {showtime.endTime}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {cinemaRevenues.length > 0 && (
                    <div className="dashboard-revenue-summary">
                        <h2>This Month</h2>
                        <p>Total revenue: ${totalRevenueAmount.toFixed(2)}</p>
                        <div className="dashboard-cinema-revenue-list">
                            {cinemaRevenues.map((cinema, index) => (
                                <div key={index} className="dashboard-cinema-revenue">
                                    <span>{cinema.cinemaName}</span>
                                    <span>${cinema.totalRevenue}</span>
                                    <div className="dashboard-revenue-bar">
                                        <div className="dashboard-revenue-fill" style={{ width: `${(cinema.totalRevenue / totalRevenueAmount) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {cinemaRevenues.length > 0 && (
                    <div className="dashboard-summary-pie-chart" style={{ width: '100%', height: '500px', margin: '0 auto' }}>
                        <h2>Revenue Distribution by Cinema</h2>
                        <div className="pie-chart-container">
                            <Pie data={pieChartData} options={pieChartOptions} />
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}

export default AdminDashboardPage;

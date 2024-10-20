import React, { useState, useEffect } from 'react';
import {fetchAccountById, fetchAccountList, fetchAddAccount, fetchBanAccount} from "../../../api/admin-api.js";
import Sidebar from "../../../components/common/AdminSideBar/AdminSideBar.jsx";
import Modal from "../../../components/common/Modal/Modal.jsx";


const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [newAccount, setNewAccount] = useState({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        googleId: '',
        roleId: '',
        password: '',
    });
    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
        const loadAccounts = async () => {
            const data = await fetchAccountList();
            setAccounts(data || []); // Đảm bảo dữ liệu luôn là một mảng
        };

        loadAccounts();
    }, []);

    // Hàm mở modal để thêm tài khoản
    const handleAddAccountClick = () => {
        setIsAddModalOpen(true);
    };
// Hàm xử lý khi nhấn vào nút View để xem thông tin chi tiết tài khoản
    const handleViewAccount = async (UID) => {
        const accountDetails = await fetchAccountById(UID); // Gọi API để lấy thông tin tài khoản
        console.log(accountDetails);
        if (accountDetails) {
            setSelectedAccount(accountDetails); // Lưu thông tin tài khoản được chọn
            setIsViewModalOpen(true);    // Mở modal view
        } else {
            alert("Account not found");
        }
    };
    // Hàm đóng modal
    const handleCloseAddModal  = () => {
        setIsAddModalOpen(false);
        setNewAccount({ // Reset lại form khi đóng modal
            name: '',
            email: '',
            phone: '',
            avatar: '',
            googleId: '',
            roleId: '',
            password: '',
        });
    };
    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
    };

    // Hàm xử lý khi có thay đổi trong form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Hàm xử lý thêm tài khoản
    const handleAddAccount = async (e) => {
        e.preventDefault();
        const success = await fetchAddAccount(newAccount); // Gọi API thêm tài khoản
        if (success) {
            alert("Account added successfully!");
            setAccounts((prevAccounts) => [...prevAccounts, newAccount]); // Cập nhật danh sách tài khoản
            handleCloseAddModal(); // Đóng modal sau khi thêm thành công
        } else {
            alert("Failed to add account");
        }
    };


    // Hàm xử lý ban tài khoản
    const handleBanAccount = async (UID) => {
        const confirmed = window.confirm('Are you sure you want to ban this account?');
        if (confirmed) {
            const success = await fetchBanAccount(UID); // Gọi API cấm tài khoản
            if (success) {
                alert('Account banned successfully!');
                setAccounts((prevAccounts) =>
                    prevAccounts.filter((account) => account.UID !== UID) // Loại bỏ tài khoản bị cấm khỏi danh sách
                );
            } else {
                alert('Failed to ban account');
            }
        }
    };
    return (
        <div className="account-management-container">
            <Sidebar /> {/* Sidebar nằm bên trái */}
            <div className="account-management-content">
                <div className="account-management-header">
                    <h2>ACCOUNT MANAGEMENT</h2>
                    <button className="add-account-btn" onClick={handleAddAccountClick}>
                        + Add new account
                    </button>
                </div>
                <table className="account-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Account</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.map((account) => (
                        <tr key={account.id}>
                            <td>{account.id}</td>
                            <td>{account.email}</td>
                            <td>{account.name}</td>
                            <td>{account.phone}</td>
                            <td>{account.roleId}</td>
                            <td>
                                <button className="view-btn" onClick={() => handleViewAccount(account.UID)}>
                                    👁️ View
                                </button>
                                <button className="ban-btn" onClick={() => handleBanAccount(account.UID)}>
                                    Ban
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button className="pagination-btn">{'<'}</button>
                    <span>1</span>
                    <button className="pagination-btn">{'>'}</button>
                </div>
            </div>
            {/* Modal View Account */}
            {isViewModalOpen && selectedAccount && (
                <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal}>
                    <div className="view-account-details">
                        <h3>Account Details</h3>
                        <p><strong>Name:</strong> {selectedAccount.name}</p>
                        <p><strong>Email:</strong> {selectedAccount.email}</p>
                        <p><strong>Phone:</strong> {selectedAccount.phone}</p>
                        <p><strong>Role:</strong> {selectedAccount.roleId}</p>
                        <p><strong>Google ID:</strong> {selectedAccount.googleId}</p>
                        <p><strong>Avatar:</strong> <img src={selectedAccount.avatar} alt="Avatar" /></p>
                        <button onClick={handleCloseViewModal}>Close</button>
                    </div>
                </Modal>
            )}

            {/* Modal Add Account */}
            <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
                <div className="add-account-form">
                    <h3>Add New Account</h3>
                    <form onSubmit={handleAddAccount}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={newAccount.name}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={newAccount.email}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={newAccount.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Avatar URL:
                            <input
                                type="text"
                                name="avatar"
                                value={newAccount.avatar}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Google ID:
                            <input
                                type="text"
                                name="googleId"
                                value={newAccount.googleId}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Role ID:
                            <input
                                type="number"
                                name="roleId"
                                value={newAccount.roleId}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={newAccount.password}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <div className="form-actions">
                            <button type="submit">Add Account</button>
                            <button type="button" onClick={handleCloseAddModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AccountManagement;
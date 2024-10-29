import { useState, useEffect } from 'react';
import {
    fetchAccountById,
    fetchAccountList,
    fetchAddAccount,
    fetchBanAccount,
    fetchUpdateAccount,
} from '../../../api/admin-api.js';
import Modal from '../../../components/common/Modal/Modal.jsx';
import './account-management.css';
import { upFileToAzure } from '../../../api/webAPI.jsx';
import CustomModal from '../../../components/common/CustomModal/CustomModal.jsx';
import AdminHeader from "../../../components/common/AdminHeader/AdminHeader.jsx";
import AdminSidebar from "../../../components/common/AdminSideBar/AdminSideBar.jsx";
import {useCustomAlert} from "../../../utils/CustomAlertContext.jsx";

const AccountManagement = () => {
    const showAlert = useCustomAlert();
    const [accounts, setAccounts] = useState([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [newAccount, setNewAccount] = useState(initialAccountState());
    const [selectedAccount, setSelectedAccount] = useState(null);

    // State for controlling modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // 'view', 'edit', or 'delete'
    const [selectedFile, setSelectedFile] = useState(null); // State để lưu ảnh được chọn
    const [errors, setErrors] = useState({}); // State để lưu lỗi validation

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedAccounts = accounts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const [loading, setLoading] = useState(true);

    // Load accounts on component mount
    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const data = await fetchAccountList();
                setAccounts(data || []);
            } catch (error) {
                console.error('Failed to load accounts:', error);
            }
            setLoading(false);
        };

        loadAccounts();
    }, []);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAccounts = accounts.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(accounts.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    // Hàm kiểm tra email hợp lệ
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Hàm kiểm tra số điện thoại hợp lệ (chỉ chứa 10 chữ số)
    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };

    // Hàm kiểm tra password hợp lệ (hơn 3 kí tự và có chứa kí tự đặc biệt)
    const validatePassword = (password) => {
        const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{4,}$/; // Ít nhất 4 kí tự và có ký tự đặc biệt
        return regex.test(password);
    };

    // Hàm kiểm tra tên hợp lệ (không có kí tự đặc biệt và không quá 100 ký tự)
    const validateName = (name) => {
        const regex = /^[a-zA-Z0-9\s]{1,100}$/; // Không chứa ký tự đặc biệt, tối đa 100 ký tự
        return regex.test(name);
    };

    // Hàm kiểm tra form có hợp lệ hay không
    const validateForm = () => {
        const newErrors = {};

        if (!validateName(newAccount.name)) {
            newErrors.name = 'Name must not contain special characters and should be less than 100 characters.';
        }

        if (!validateEmail(newAccount.email)) {
            newErrors.email = 'Invalid email address.';
        }

        if (!validatePassword(newAccount.password)) {
            newErrors.password = 'Password must be longer than 3 characters and contain at least one special character.';
        }

        if (!validatePhone(newAccount.phone)) {
            newErrors.phone = 'Phone must contain exactly 10 digits.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
    };

    // Initial state for new account
    function initialAccountState() {
        return {
            name: '',
            email: '',
            phone: '',
            avatar: '',
            googleId: '',
            roleId: '',
            password: '',
        };
    }

    // Handle input change in forms
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAccount((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle the addition of a new account
    const handleAddAccount = async (e) => {
        e.preventDefault();

        // Kiểm tra form có hợp lệ không
        if (!validateForm()) {
            showAlert('Please fix the validation errors.');
            return;
        }

        let avatarUrl = newAccount.avatar; // Initially, use the existing avatar URL (if provided)

        // If a new file (image) is selected, upload it first
        if (selectedFile) {
            try {
                const uploadedImageUrl = await upFileToAzure(selectedFile); // Call the upload function
                if (uploadedImageUrl) {
                    avatarUrl = uploadedImageUrl; // Update the avatar URL after a successful upload
                } else {
                    showAlert('Failed to upload image.');
                    return;
                }
            } catch (error) {
                console.error('Image upload failed:', error);
                showAlert('Error uploading image.');
                return;
            }
        }

        // Proceed to add the account using the fetched or existing avatar URL
        try {
            const success = await fetchAddAccount({ ...newAccount, avatar: avatarUrl }); // Add account API call
            if (success) {
                showAlert('Account added successfully!'); // Show success message

                // Update account list in UI
                setAccounts((prevAccounts) => [
                    ...prevAccounts,
                    { ...newAccount, avatar: avatarUrl },
                ]);

                // Reset form data
                setNewAccount(initialAccountState());
                setIsModalOpen(false); // Close modal
                setSelectedFile(null); // Clear selected file
            } else {
                showAlert('Failed to add account.'); // Show error if adding account failed
            }
        } catch (error) {
            console.error('Failed to add account:', error);
            showAlert('Error adding account.');
        }
    };

    // Ban or Unban account based on roleId
    const handleBanUnbanAccount = async (UID, roleId) => {
        const action = roleId === 0 ? 'unban' : 'ban';
        const confirmed = window.confirm(`Are you sure you want to ${action} this account?`);
        if (!confirmed) return;

        try {
            if (roleId === 0) {
                // Unban logic
                const updatedAccount = accounts.find((account) => account.UID === UID);
                const success = await fetchUpdateAccount(UID, { ...updatedAccount, roleId: 3 });
                if (success) {
                    setAccounts((prevAccounts) =>
                        prevAccounts.map((account) =>
                            account.UID === UID ? { ...account, roleId: 3 } : account
                        )
                    );
                    showAlert('Account unbanned successfully!');
                }
            } else {
                // Ban logic
                const success = await fetchBanAccount(UID);
                if (success) {
                    setAccounts((prevAccounts) =>
                        prevAccounts.map((account) =>
                            account.UID === UID ? { ...account, roleId: 0 } : account
                        )
                    );
                    showAlert('Account banned successfully!');
                }
            }
        } catch (error) {
            console.error(`Failed to ${action} account:`, error);
        }
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
    };

    // Open view account modal
    const handleViewAccount = async (UID) => {
        try {
            const accountDetails = await fetchAccountById(UID);
            if (accountDetails) {
                setSelectedAccount(accountDetails);
                setIsViewModalOpen(true);
            } else {
                showAlert('Account not found');
            }
        } catch (error) {
            console.error('Failed to view account:', error);
        }
    };

    // Function to handle the file change event when an image is selected
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Store the selected file in state
    };
    if (loading) {
        return <div className="loading-overlay">
            <div className="spinner"></div>
        </div>;
    }

    return (
        <>
            <AdminHeader />
            <div className="account-management-container">

                <AdminSidebar />
                <div className="account-management-content">
                    <div className="account-management-header">
                        <h2>ACCOUNT MANAGEMENT</h2>
                        <button
                            className="add-account-btn"
                            onClick={() => {
                                setModalType('add');
                                setIsModalOpen(true);
                            }}
                        >
                            + Add new Account
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
                        {paginatedAccounts.map((account) => (
                            <tr key={account.UID}>
                                <td>{account.UID}</td>
                                <td>{account.email}</td>
                                <td>{account.name}</td>
                                <td>{account.phone}</td>
                                <td>{account.roleId}</td>
                                <td>
                                    <button
                                        className="view-btn"
                                        onClick={() => handleViewAccount(account.UID)}
                                    >
                                        👁️
                                    </button>
                                    <button
                                        // className={account.roleId === 3 ? 'ban-btn' : 'ban-btn-disabled'} // Add a conditional class
                                        className={
                                            account.roleId === 3
                                                ? 'ban-btn'
                                                : account.roleId === 0
                                                    ? 'unban-btn'
                                                    : 'ban-btn-disabled'
                                        }
                                        onClick={() => handleBanUnbanAccount(account.UID, account.roleId)}
                                        // disabled={account.roleId !== 3} // Disable the button for roleId 1 and 2
                                    >
                                        {account.roleId === 3 ? 'Ban' : account.roleId === 0 ? 'Unban' : 'Unavailable'}

                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Pagination controls */}
                    <div className="pagination-controls">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage} of {Math.ceil(accounts.length / itemsPerPage)}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(accounts.length / itemsPerPage)}
                        >
                            Next
                        </button>
                    </div>

                    <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        {modalType === 'add' && (
                            <div>
                                <h3 className={'add-account-title'}>Add Account</h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={newAccount.name}
                                    onChange={handleInputChange}
                                    placeholder="Account Name *"
                                    className={errors.name ? 'input-error' : ''}
                                />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                                <input
                                    type="text"
                                    name="email"
                                    value={newAccount.email}
                                    onChange={handleInputChange}
                                    placeholder="Email *"
                                    className={errors.email ? 'input-error' : ''}
                                />
                                {errors.email && <p className="error-message">{errors.email}</p>}
                                <input
                                    type="text"
                                    name="phone"
                                    value={newAccount.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone *"
                                    className={errors.phone ? 'input-error' : ''}
                                />
                                {errors.phone && <p className="error-message">{errors.phone}</p>}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <input
                                    type="text"
                                    name="googleId"
                                    value={newAccount.googleId}
                                    onChange={handleInputChange}
                                    placeholder="Google ID"
                                />
                                <input
                                    type="number"
                                    name="roleId"
                                    value={newAccount.roleId}
                                    onChange={handleInputChange}
                                    placeholder="Role ID"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={newAccount.password}
                                    onChange={handleInputChange}
                                    placeholder="Password *"
                                    className={errors.password ? 'input-error' : ''}
                                />
                                {errors.password && <p className="error-message">{errors.password}</p>}
                                <button onClick={handleAddAccount}>Add</button>
                            </div>
                        )}
                    </CustomModal>

                    {/* Modal View Account */}
                    {isViewModalOpen && selectedAccount && (
                        <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal}>
                            <div className="view-account-details">
                                <h3>Account Details</h3>
                                <p>
                                    <strong>Name:</strong> {selectedAccount.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {selectedAccount.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {selectedAccount.phone}
                                </p>
                                <p>
                                    <strong>Role:</strong> {selectedAccount.roleId}
                                </p>
                                <p>
                                    <strong>Google ID:</strong> {selectedAccount.googleId}
                                </p>
                                <p>
                                    <strong>Avatar:</strong>{' '}
                                    <img src={selectedAccount.avatar} alt="Avatar" />
                                </p>
                                <button onClick={handleCloseViewModal}>Close</button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </>

    );
};

export default AccountManagement;
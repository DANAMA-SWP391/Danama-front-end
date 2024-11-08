import {API_URL} from "../utils/utility.js";

export async function doVNPayPayment(amount, bookingId) {
    try {
        // Prepare the request to send to the backend (VNPAYPaymentController)
        const response = await fetch(API_URL+'vnpay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                amount: amount,  // the amount to be paid
                bankCode: 'NCB',  // optional: specify a bank code
                language: 'vn',  // optional: specify a language code
                bookingId: bookingId  // include the booking ID
            })
        });

        // Parse the response from the servlet
        const data = await response.json();

        // Check if the response is successful
        if (data.code === '00') {
            console.log(data.data);
            // Open the VNPay payment gateway in a new tab
            window.open(data.data, '_blank');
        } else {
            // Handle the error response (if any)
            console.error('VNPay Payment Error:', data.message);
            alert('Payment initiation failed: ' + data.message);
        }
    } catch (error) {
        // Handle fetch errors (e.g., network issues)
        console.error('Error occurred during payment process:', error);
        alert('Error occurred during payment process. Please try again.');
    }
}

export async function checkPaymentStatus(bookingId) {
    try {
        const response = await fetch(API_URL+`checkPaymentStatus?bookingId=${bookingId}`);
        return await response.json(); // { status: 0, 1, or 2 }
    } catch (error) {
        console.error("Error checking payment status:", error);
        return { status: 'error', message: 'Failed to check payment status' };
    }
}

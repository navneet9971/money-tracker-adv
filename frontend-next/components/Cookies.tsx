import Cookies from 'js-cookie';

// Function to clear all cookies
const clearAllCookies = () => {
    const allCookies = Cookies.get(); // Get all cookies
    for (const cookieName in allCookies) {
        Cookies.remove(cookieName); // Remove each cookie
    }
};


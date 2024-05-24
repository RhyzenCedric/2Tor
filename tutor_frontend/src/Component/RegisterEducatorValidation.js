export default function validation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // corrected email pattern
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // corrected password pattern

    if (values.user_username === "") {
        errors.user_username = "Username should not be empty";
    } else {
        errors.user_username = "";
    }

    if (values.user_password === "") {
        errors.user_password = "Password should not be empty";
    } else if (!passwordPattern.test(values.user_password)) {
        errors.user_password = "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number";
    } else {
        errors.user_password = "";
    }
    
    if (values.user_fullname === "") {
        errors.user_fullname = "Full Name should not be empty";
    } else {
        errors.user_fullname = "";
    }

    if (!emailPattern.test(values.user_email)) {
        errors.user_email = "Invalid email format";
    } else {
        errors.user_email = "";
    }

    if (values.user_phonenum === "") {
        errors.user_phonenum = "Phone Number should not be empty";
    } else {
        errors.user_phonenum = "";
    }

    return errors;
}

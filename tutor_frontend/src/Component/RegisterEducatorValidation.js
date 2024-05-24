export default function validation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // corrected email pattern
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // corrected password pattern

    if (values.educator_username === "") {
        errors.educator_username = "Username should not be empty";
    } else {
        errors.educator_username = "";
    }

    if (values.educator_password === "") {
        errors.educator_password = "Password should not be empty";
    } else if (!passwordPattern.test(values.educator_password)) {
        errors.educator_password = "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number";
    } else {
        errors.educator_password = "";
    }
    
    if (values.educator_fullname === "") {
        errors.educator_fullname = "Full Name should not be empty";
    } else {
        errors.educator_fullname = "";
    }

    if (!emailPattern.test(values.educator_email)) {
        errors.educator_email = "Invalid email format";
    } else {
        errors.educator_email = "";
    }

    if (values.educator_phonenum === "") {
        errors.educator_phonenum = "Phone Number should not be empty";
    } else {
        errors.educator_phonenum = "";
    }

    return errors;
}

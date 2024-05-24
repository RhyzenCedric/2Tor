export default function validation(values) {
    let errors = {};

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

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

    return errors;
}

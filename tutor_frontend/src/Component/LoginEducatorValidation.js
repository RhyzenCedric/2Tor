export default function validation(values) {
    let errors = {};

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

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

    return errors;
}

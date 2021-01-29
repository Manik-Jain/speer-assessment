function isValidEmail(email) {
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(mailFormat)
}

function isValidPhoneNumber(phoneNumber) {
    let phoneFormat = /^\d{10}$/;
    return phoneNumber.match(phoneFormat) 
}

function isValidName(input) {
    let nameFormat = /^[A-Z a-z]+$/
    return input === ' '? false : input.match(nameFormat)
}

function isValidPassword(input) {
    return !(input.length === 0 || input === ' ' || input.length < 8)
}

export {
    isValidEmail,
    isValidPhoneNumber,
    isValidName,
    isValidPassword
}
/**
 *
 */
const error = (res, code, err) => {
    let message = typeof err === "string" ? err : err.message;
    let customCode = code;
    if (message === 'jwt expired') {
        message = 'Please login again';
        customCode = 401;
    }
    const networkError = message.split(' ')[0];
    if (networkError === 'getaddrinfo') {
        message = 'Server not connected to internet';
    }
    const duplicateError = message.split(' ')[0];
    if (duplicateError === 'E11000') {
        message = 'Document exist';
    }
    if (customCode === 500) {
        const validations = ["User", "WishList", "Product", "Orders", "Cart", "Address"];
        console.log("Error Message", message);
        const lastMessage = message.substring(message.lastIndexOf(":") + 1).trim();
        const validationError = message.split(" ")[0];
        if (validations.includes(validationError)) {
            return res.status(customCode).json({
                success: 0,
                message: lastMessage,
            });
        }
        if (message === "invalid signature") {
            return res.status(customCode).json({
                success: 0,
                message
            });
        }
        return res.status(customCode).json({
            success: 0,
            message: "Something went wrong please try again",
        });
    }
    return res.status(customCode).json({
        success: 0,
        message: message,
    });
};
const success = (res, statusCode, userData, data) => {
    return res.status(statusCode).send({
        success: 1,
        message: 'Successful',
        data,
        userData,
    });
};
// response.js
export const sendResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({
        success: 1,
        message: 'Successful',
        data,
    });
};
export { error, success };

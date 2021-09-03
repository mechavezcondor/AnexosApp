exports.success = (status, message, data) => {
    return {
        statusCode: status,
        body: JSON.stringify(
            {
                message: message,
                input: data,
            },
            null,
            2
        ),
    };
};

exports.error = (status, message, details) => {
    console.log(`[response error] ${details}`);

    return {
        statusCode: status,
        body: JSON.stringify(
            {
                message: message,
                input: [],
            },
            null,
            2
        ),
    };
}
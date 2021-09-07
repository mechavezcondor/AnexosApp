const logger = require('@condor-labs/logger');

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
    logger.warning(`[response error] ${details}`);

    return {
        statusCode: status,
        body: JSON.stringify(
            {
                message: message,
                input: `[response error] ${details}`,
            },
            null,
            2
        ),
    };
}
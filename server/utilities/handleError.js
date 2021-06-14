function handleError(error, status) {
    console.log(error);
    return { error: true, status };
}

module.exports = handleError();
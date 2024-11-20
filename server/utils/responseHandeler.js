
export const HandelOnSuccess = (res, message, status = 200) => (data) => {
    res.status(status).send({
        status: true,
        message: message || 'Success',
        data: data || {}
    });
};

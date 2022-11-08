export default (err, req, res, _) => {
    let status = 500;

    if(err.status){
        status = err.status
    };

    let message = err;

    if (status === 500) {
        message = 'Internal Server Error, please retry again later…';
    };
    console.log(err)
    res.status(status).render('error', { title: `Error status ${status}`, content: message });
};
exports.notFound = function (req, res, next) {
    // Erreur 404
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

exports.developmentErrors = (err, req, res, next) => {
    // err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        // stackHighlighted: err.stack.replace(
        //     /[a-z_-\d]+.js:\d+:\d+/gi,
        //     '<mark>$&</mark>'
        // ),
    };
    res.status(err.status || 500).render('error', errorDetails);
};

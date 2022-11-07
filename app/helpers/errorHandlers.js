// Un middleware de gestion d'erreur doit FORCEMENT avoir 4 paramètres pour qu'express comprenne que c'est un middleware d'erreur


const errorHandlers = (err, req, res, _) => {
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

module.exports = errorHandlers;

export default (req, _, next) => {
    
    for(const prop in req.body) if(!req.body[prop] || req.body.length === 0) delete req.body[prop]; 
    next()
};
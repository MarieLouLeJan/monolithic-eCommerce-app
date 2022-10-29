
CW : (mdw) => {
    return async (req, res) => {
      try {
        await mdw(req, res);
      } catch (error) {
        res.locals.error = {
          code: 500,
          text: "Query error"
        };
        console.log(error);
      }
    };
}

module.exports = CW;
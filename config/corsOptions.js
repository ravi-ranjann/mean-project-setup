const allowedOriigns = require('./allowedOrigins');

const corsOptions = {
    origin : (oriign, callback) => {
        if(allowedOriigns.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}

module.exports = corsOptions;
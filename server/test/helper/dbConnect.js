const mongoose  = require('mongoose');

function dbconnect() {
    mongoose.connect(
        "mongodb+srv://" + process.env.MONGO_ATLAS_USERNAME + ":" +
        process.env.MONGO_ATLAS_PWD +
        "@cluster0.e5eec.gcp.mongodb.net/test?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
    );
    return mongoose.connection
  }
  
  function dbclose() {
    return mongoose.disconnect();
  }

module.exports = {dbconnect, dbclose};
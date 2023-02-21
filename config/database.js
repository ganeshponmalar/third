const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlparser:true,
        
    }).then(con=>{

        console.log(`MongoDb is connected to the host: ${con.Connection.host}`)
    })
}

module.exports = connectDatabase;






import mongoose from 'mongoose'

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection=mongoose.connection;
        //once you have connected to the database, you can listen for the events using
        //on method and fire a callback
        
        connection.on('connected',()=>{
            console.log('mdb connected successfully')
        })
        connection.on('error',(err)=>{
            console.log('mongoDB'+err);
            process.exit();
        })

    } catch (error) {
        console.log('something went wrong');
        console.log(error);
    }
}

//everytime there is an api call, you have to connect to the database
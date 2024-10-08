
import mongoose from 'mongoose';

interface Connection {
    isConnected?: number;
}

const connection: Connection = {}

export const connectDb = async ():Promise<void> => {
    try {
        if(connection.isConnected) {
            console.log('Using existing connection');
            return;
        }

        if (!process.env.MONGO) {
            throw new Error('MongoDB connection string not found');
        }

        console.log("MongoDB Connection String:", process.env.MONGO);


        const db = await mongoose.connect(process.env.MONGO);
        connection.isConnected = db.connections[0].readyState;
        console.log('New Mongo Connection!');

        } catch (error) {
        console.log(error);
        throw new Error('Unable to connect to database ' + error);
        }
};

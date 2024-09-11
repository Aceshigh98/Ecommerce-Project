
import mongoose from 'mongoose';

let initializedTimes: number = 0;

class MainDB {
    private static instance: MainDB | null = null;

    private constructor() {
        this.initializeDB();
    }

    public static getInstance(): void {
        if (!MainDB.instance) {
            MainDB.instance = new MainDB();
        }
    }

    private async initializeDB() {
        if (!process.env.MONGO) {
            throw new Error('MongoDB connection string not found');
        }

        try {
            initializedTimes++;
            console.log("MongoDB Connection String:", process.env.MONGO);
            const db = await mongoose.connect(process.env.MONGO);
            console.log('New Mongo Connection!');
        } catch (error) {
            console.log(error);
            throw new Error('Unable to connect to database ' + error);
        }
    }

}

export default MainDB;

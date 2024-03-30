
import mongoose from 'mongoose';



export async function connectMongoose() {

    try {
        // await mongoose.connect(`mongodb+srv://${adminUsername}:${adminPassword}@form3.5kgmz7h.mongodb.net/production?retryWrites=true&w=majority`)

        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}


export default connectMongoose;
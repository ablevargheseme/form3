
import mongoose from 'mongoose';
const adminPassword = encodeURIComponent(process.env.ADMIN_PASSWORD);
const adminUsername = encodeURIComponent(process.env.ADMIN_USER);


export async function connectMongoose() {

    try {
        await mongoose.connect(`mongodb+srv://${adminUsername}:${adminPassword}@blockiotcluster0.kibk93w.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}


export default connectMongoose;
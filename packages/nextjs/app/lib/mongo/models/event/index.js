import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    address: String,
    appletName: String,
    appletDescription: String,
    ownershipContractAddress: String,
    actionValue: String,
    triggerBlockchain: String,
    triggerType: String,
    service: String,
    actionType: String,
    createdAt: { type: Date, default: Date.now },
});

const eventModel = mongoose.models.eventModel || mongoose.model('eventModel', eventSchema);

export default eventModel;

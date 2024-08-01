import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    customer_id: {
        type: Number,
        required: true,
        unique: true,
    },
    entity: {
        type: String,
        required: true,
        unique: true,
    },
    speciality: {
        type: mongoose.Schema.Types.ObjectId, ref: "Speciality"
    },
    account_type: {
        type: mongoose.Schema.Types.ObjectId, ref: "AccountType"
    },
}, {timestamps: true});

const Client = mongoose.model("Client", clientSchema);

export default Client;
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    client_name: {
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
    speciality_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "Speciality"
    },
    account_type: {
        type: String,
        enum: ["Trial", "Production", "Live"],
        default: "Trial",
    },
    contact_person: {
        type: String,
    },
    phone: {
        type: String,
    },
    client_address: {
        type: String,
    },
    client_email: {
        type: String,
    },
}, {timestamps: true});

const Client = mongoose.model("Client", clientSchema);

export default Client;
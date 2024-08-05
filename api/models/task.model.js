import mongoose from "mongoose";
import mongooseAutoIncrement from "mongoose-sequence";

const AutoIncrement = mongooseAutoIncrement(mongoose);

const taskSchema = new mongoose.Schema({
    task_num: {
        type: Number,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        default: null,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        default: null,
    },
    internal_assigned_to: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        default: null,
    },
    due_date: {
        type: Date,
        default: null,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Urgent"],
        default: "Low",
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "Client",
        required: true,
    },
    product_type: {
        type: String,
        enum: ["Product", "Service"],
        default: "Product",
    }
}, {timestamps: true});

taskSchema.plugin(AutoIncrement, { inc_field: "task_num" });

const Task = mongoose.model("Task", taskSchema);

export default Task;
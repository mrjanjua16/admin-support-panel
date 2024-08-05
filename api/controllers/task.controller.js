import Task  from '../models/task.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Client from '../models/client.model.js';

export const createTask = async (req, res, next) => {
    const { description, customerId, assigneeId, status, team, priority, dueDate } = req.body;

    const client = await Client.findOne({ customer_id: Number(customerId) });

    if(!client) {
        return next(errorHandler(404, "Client not found"));
    }

    const reporterId = req.user.id;

    try {
        const existingTask = await Task.findOne().sort({ task_num: -1 });
        const newTaskNum = existingTask ? existingTask.task_num + 1 : 1;
        
        const newTask = await Task.create({
            task_num: newTaskNum,
            description,
            client_id: client,
            reporter: reporterId,
            assigned_to: assigneeId,
            status,
            team,
            priority,
            dueDate
        });
        res.status(201).json(newTask);

    } catch (error) {
        next(errorHandler(error.code || 500, error.message || "Internal server error"));
    }
}

export const getTasks = async (req, res, next) => {
    const {keyword, task_num, customer_id, client_name, status, team, assigned_to} = req.body;

    if(!keyword && !task_num && !customer_id && !client_name && !status && !team && !assigned_to) {
        return next(errorHandler(400, "At least one field is required"));
    }

    try {
        const query = {};
        if (keyword) query.description = { $regex: keyword, $options: 'i' };
        if(task_num) query.task_num = task_num;
        if(customer_id) query.client_id = customer_id;
        if(client_name) query.client_name = client_name;
        if(status) query.status = status;
        if(team) query.team = team;
        if(assigned_to) query.assigned_to = assigned_to;

        console.log("query: ", query);

        const tasks = await Task.find(query).populate('task_num client_id reporter assigned_to team due_date');

        console.log("tasks: ", tasks);
        
        if (!tasks) {
            return next(errorHandler(404, "No tasks found"));
        } else {
            res.status(200).json(tasks);
        }
    } catch (error) {
        next(errorHandler(error.code || 500, error.message || "Internal server error"));
    }
}
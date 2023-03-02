import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket.model.js';
import { User } from '../models/user.model.js';

export async function mongoConnect() {
    let dbName;
    if (process.env.NODE_ENV === 'test') {
        dbName = process.env.TESTDBNAME;
    } else {
        dbName = process.env.DBNAME;
    }
    console.log('Connecting to', dbName);
    // const uri = `mongodb+srv://${user}:${password}@cluster0.mrify.mongodb.net/${dbName}`;

    const mongooseConnect = await mongoose.connect(process.env.DATABASE_URL);
    return mongooseConnect;
}
export async function mongoDisconnect() {
    return mongoose.disconnect();
}

export async function installUsers(data) {
    const deleted = await User.deleteMany({});
    const result = await User.insertMany(data);
    return { result, deleted };
}

export async function installTicket(data) {
    const deleted = await Ticket.deleteMany({});
    const result = await Ticket.insertMany(data);
    return { result, deleted };
}

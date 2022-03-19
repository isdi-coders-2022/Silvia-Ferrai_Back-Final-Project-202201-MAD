import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['Sala', 'Cocina'],
        required: true,
        default: 'Sala',
    },
    password: { type: String, required: true },
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

export const User = mongoose.model('User', userSchema);

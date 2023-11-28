import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    emailID: {
        type: String,
        unique: true,
        required: true,
    },
    cGpa: {
        type: Number,
    },
},{timestamps :true});

const student = mongoose.model('student', studentSchema);

export default student;

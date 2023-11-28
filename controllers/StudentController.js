
import student from "../models/Student.js"



//Show the list of the Student 

const index = (req ,res,next)=> {
    student.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch (error => {
        res.json( {
            
            message:"An Error has Occured while Showing all the Student list"
        })
    })
    
}


//Show A particulat Student using emailid

const show = ( req, res,next) => {

    const studentEmail = req.body.emailID;

    student.findOne( {emailID : studentEmail})

    .then(response => {
        res.json( {
            response
        })
    })
    .catch( error => {
        res.json({
            message : "An Error Occurred"
        })
    })

}


//update a Student Using EmailId

const update = async (req, res, next) => {
    const studentEmail = req.body.emailID; // Assuming you're using emailID as the identifier

    try {
        // Find the student with the specified email
        const existingStudent = await student.findOne({ emailID: studentEmail });

        if (!existingStudent) {
            // If no student is found with the specified email
            return res.status(404).json({
                message: 'No user found for the provided email.',
            });
        }

        // Update all information except the email
        existingStudent.name = req.body.name;
        existingStudent.phoneNumber = req.body.phoneNumber;
        existingStudent.cGpa = req.body.cGpa;

        // Save the updated student
        const updatedStudent = await existingStudent.save();

        // Send a success response
        res.json({
            message: 'Student updated successfully',
            student: updatedStudent,
        });
    } catch (error) {
        // If an error occurs during the process, send an error response
        console.error('Error updating student:', error);
        res.status(500).json({
            message: 'An error occurred while updating',
            error: error.message,
        });
    }
};



//creating a new User

const store = async (req, res, next) => {
    const { name, phoneNumber, emailID, cGpa } = req.body;

    try {
        // Check if the emailID is already in use
        const existingStudent = await student.findOne({ emailID });

        if (existingStudent) {
            // If the emailID is not unique, send a response indicating the conflict
            return res.status(409).json({
                message: 'EmailID is already in use. Please choose a different one.',
            });
        }

        // If the emailID is unique, create and save the new student
        const newStudent = new student({
            name,
            phoneNumber,
            emailID,
            cGpa,
        });

        // Save the new student and handle errors
        await newStudent.save();

        // Send a success response
        res.json({
            message: 'Student is successfully created.',
        });
    } catch (error) {
        // If an error occurs during the process, send an error response
        console.error('Error while creating a student:', error);
        res.status(500).json({
            message: 'An error occurred while creating a student.',
            error: error.message, // Include the error message in the response
        });
    }
};


  


//Deleting a existing Student

const destroy  =  (req,res,next) => {
    try {
        const emailId = req.body.emailID;

        //delete the whole user 

        const deletedStudent =  student.findOneAndDelete(emailId);

        if( !deletedStudent){
            return res.status(404).json({
                message:"Student Not Found"

            })
        }

        //if deleted 

        res.json( {
            message:"Student deleted Successfully",
            deletedStudent:deletedStudent,
        });
        
    } catch (error) {
        console.log(`Error Occured While Deleting the Student`,error);
        res.status(500).json( {
            message: "An error Occured while deleting"
        })
        
    }
};

export default {
    index,
    show,
    store,
    update,
    destroy
};
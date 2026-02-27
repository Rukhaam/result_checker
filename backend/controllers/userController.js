import { findByRollNumber } from '../models/userModels.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { ErrorHandler } from '../middleware/errorMiddleWare.js'; // Import your custom class

export const getUserByRollNumber = catchAsyncErrors(async (req, res, next) => {
    const rollNumber = req.params.rollNumber;
    
    const student = await findByRollNumber(rollNumber);

    if (!student) {
        // Use your custom ErrorHandler here
        return next(new ErrorHandler('Student not found in the database', 404)); 
    }

    res.status(200).json({
        success: true,
        data: student
    });
});
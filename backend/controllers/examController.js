import { getActiveExams } from '../models/examModels.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';

export const getAllExams = catchAsyncErrors(async (req, res, next) => {
    const exams = await getActiveExams();
    
    res.status(200).json({
        success: true,
        data: exams
    });
});
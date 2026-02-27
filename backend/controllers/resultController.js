import { getScorecard } from '../models/resultModels.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { ErrorHandler } from '../middleware/errorMiddleWare.js';
// import { getScorecard } from '../models/resultModels.js';
export const searchResult = catchAsyncErrors(async (req, res, next) => {
    const { examId, rollNumber } = req.body;

    // ADD THIS LOG:
    console.log("Postman sent -> Exam ID:", examId, "| Roll Number:", rollNumber);

    if (!examId || !rollNumber) {
        return next(new ErrorHandler('Please provide both Exam ID and Roll Number', 400));
    }

    const scorecard = await getScorecard(examId, rollNumber);
    
    // ADD THIS LOG:
    console.log("Database returned ->", scorecard);

    if (!scorecard) {
        return next(new ErrorHandler('Result not found for the provided details', 404));
    }

    res.status(200).json({
        success: true,
        data: scorecard
    });
});
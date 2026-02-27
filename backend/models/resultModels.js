import db from '../config/db.js';

export const getScorecard = async (examId, rollNumber) => {
    const query = `
        SELECT 
            s.name AS student_name, s.roll_number, s.registration_number,
            e.title AS exam_title, e.date_declared,
            i.name AS institution_name,
            r.total_marks, r.marks_obtained, r.status
        FROM results r
        JOIN students s ON r.student_id = s.id
        JOIN exams e ON r.exam_id = e.id
        JOIN institutions i ON e.institution_id = i.id
        WHERE e.id = ? AND s.roll_number = ?
    `;
    
    const [rows] = await db.execute(query, [examId, rollNumber]);
    return rows[0]; // Returns the single matched scorecard
};
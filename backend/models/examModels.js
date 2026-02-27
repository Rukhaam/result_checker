import db from '../config/db.js';

export const getActiveExams = async () => {
    const query = `
        SELECT e.id, e.title, e.date_declared, i.name AS institution_name 
        FROM exams e
        JOIN institutions i ON e.institution_id = i.id
        WHERE e.is_active = TRUE
        ORDER BY e.date_declared DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
};
import db from '../config/db.js';

export const findByRollNumber = async (rollNumber) => {
    const [rows] = await db.execute('SELECT * FROM students WHERE roll_number = ?', [rollNumber]);
    return rows[0]; 
};

export const create = async ({ roll_number, registration_number, name }) => {
    const [result] = await db.execute(
        'INSERT INTO students (roll_number, registration_number, name) VALUES (?, ?, ?)', 
        [roll_number, registration_number, name]
    );
    return result;
};
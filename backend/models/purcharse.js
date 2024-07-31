import pool from "../database/db.js";


async function createPurchase(user_id, course_id, amount, payment_method) {
    if (typeof user_id !== 'number' || typeof course_id !== 'number' || typeof amount !== 'number' || !payment_method) {
        throw new Error('Invalid input data');
    }

    try {
        const [result] = await pool.execute(
            "INSERT INTO purchases (user_id, course_id, amount, payment_method, purchase_date) VALUES (?, ?, ?, ?, NOW())",
            [user_id, course_id, amount, payment_method]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating purchase:', error);
        throw error;
    }
}


async function getPurchasesForUser(userId) {
    try {
        const [rows] = await pool.execute("SELECT * FROM purchases WHERE user_id=?", [userId]);
        return rows;
    } catch (error) {
        console.error('Error fetching purchases for user:', error);
        throw error;
    }
}

export { createPurchase, getPurchasesForUser };

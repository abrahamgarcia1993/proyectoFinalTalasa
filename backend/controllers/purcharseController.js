import { createPurchase, getPurchasesForUser } from "../models/purcharse.js";


async function createNewPurchase(req, res) {
    const { user_id, course_id, amount, payment_method } = req.body;

    if (typeof user_id !== 'number' || typeof course_id !== 'number' || typeof amount !== 'number' || !payment_method) {
        return res.status(400).json({ message: "Todos los campos son requeridos y deben ser válidos" });
    }

    try {
        const purchaseId = await createPurchase(user_id, course_id, amount, payment_method);
        res.status(201).json({ message: "Compra creada correctamente", purchaseId });
    } catch (error) {
        console.error('Error creating purchase:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


async function getUserPurchases(req, res) {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ message: "ID de usuario inválido" });
    }

    try {
        const purchases = await getPurchasesForUser(userId);
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error fetching purchases for user:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export { createNewPurchase, getUserPurchases };

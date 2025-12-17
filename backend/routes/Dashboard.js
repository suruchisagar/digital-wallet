const express = require('express');

const bcrypt = require('bcrypt');
const pool=require('../db');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware');

const dashboardRouter=express.Router();

// Deposit money into wallet
dashboardRouter.post('/deposit', authenticate, async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id; // comes from JWT (authenticate middleware)

  try {
    // 1️⃣ Validate input
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // 2️⃣ Update the user’s wallet balance atomically
    const result = await pool.query(
      `UPDATE wallets
       SET balance = balance + $1,
           updated_at = NOW()
       WHERE user_id = $2
       RETURNING balance`,
      [amount, userId]
    );

    // 3️⃣ Handle missing wallet (shouldn’t happen if you create one at signup)
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    if (result.rowCount === 0) {
      const newWallet = await pool.query(
        `INSERT INTO wallets(user_id, balance)
         VALUES($1, $2)
         RETURNING balance`,
        [userId, amount]
      );
      return res.json({
        message: 'Wallet created and deposit successful',
        balance: parseFloat(newWallet.rows[0].balance)
      });
    }else{

    // 4️⃣ Send back the updated balance
    res.json({
      message: 'Deposit successful',
      balance: parseFloat(result.rows[0].balance)
    });

    await pool.query(
    `INSERT INTO transactions (user_id, transaction_type, amount)
    VALUES ($1, 'deposit', $2)`,
    [userId, amount]
    );
    }
  } catch (err) {
    console.error('Deposit error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdraw money from wallet
dashboardRouter.post('/withdraw', authenticate, async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  try {
    // 1️⃣ Validate input
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const withdrawAmount = parseFloat(amount);

    // 2️⃣ Fetch the user’s current wallet balance
    const result = await pool.query(
      `SELECT balance FROM wallets WHERE user_id = $1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    const currentBalance = parseFloat(result.rows[0].balance);

    // 3️⃣ Check if sufficient balance
    if (withdrawAmount > currentBalance) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // 4️⃣ Deduct the amount and return new balance
    const updateResult = await pool.query(
      `UPDATE wallets
       SET balance = balance - $1,
           updated_at = NOW()
       WHERE user_id = $2
       RETURNING balance`,
      [withdrawAmount, userId]
    );

    res.json({
      message: 'Withdrawal successful',
      balance: parseFloat(updateResult.rows[0].balance),
    });

        await pool.query(
    `INSERT INTO transactions (user_id, transaction_type, amount)
    VALUES ($1, 'withdraw', $2)`,
    [userId, withdrawAmount]
    );


  } catch (err) {
    console.error('Withdraw error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});




// Simple money transfer route
dashboardRouter.post('/transfer', authenticate, async (req, res) => {
  const { to_email, amount } = req.body;
  const fromUserId = req.user.id;

  try {
    // 1️⃣ Validate input
    if (!to_email || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid recipient email or amount' });
    }

    const transferAmount = parseFloat(amount);

    // 2️⃣ Get recipient details
    const recipientResult = await pool.query(
      `SELECT id, name, email FROM users WHERE email = $1`,
      [to_email]
    );

    if (recipientResult.rowCount === 0) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const toUserId = recipientResult.rows[0].id;

    if (toUserId === fromUserId) {
      return res.status(400).json({ message: 'Cannot transfer to yourself' });
    }

    // 3️⃣ Get sender wallet balance
    const senderResult = await pool.query(
      `SELECT balance FROM wallets WHERE user_id = $1`,
      [fromUserId]
    );

    if (senderResult.rowCount === 0) {
      return res.status(404).json({ message: 'Sender wallet not found' });
    }

    const senderBalance = parseFloat(senderResult.rows[0].balance);

    // 4️⃣ Check balance
    if (transferAmount > senderBalance) {
      return res.status(400).json({
        message: 'Insufficient balance',
        available_balance: senderBalance
      });
    }

    // 4️⃣ Ensure recipient has a wallet; if not, create one
    const recipientWallet = await pool.query(
      `SELECT * FROM wallets WHERE user_id = $1`,
      [toUserId]
    );

    if (recipientWallet.rowCount === 0) {
      await pool.query(
        `INSERT INTO wallets (user_id, balance) VALUES ($1, 0.00)`,
        [toUserId]
      );
    }

    // 5️⃣ Deduct from sender and add to recipient
    await pool.query(
      `UPDATE wallets SET balance = balance - $1 WHERE user_id = $2`,
      [transferAmount, fromUserId]
    );

    await pool.query(
      `UPDATE wallets SET balance = balance + $1 WHERE user_id = $2`,
      [transferAmount, toUserId]
    );

    // 6️⃣ Get updated sender balance
    const updatedSender = await pool.query(
      `SELECT balance FROM wallets WHERE user_id = $1`,
      [fromUserId]
    );

    res.json({
      message: 'Transfer successful',
      transferred_amount: transferAmount,
      available_balance: parseFloat(updatedSender.rows[0].balance),
      recipient_email: recipientResult.rows[0].email
    });

        // sender transaction
    await pool.query(
    `INSERT INTO transactions (user_id, transaction_type, amount, sender_id, receiver_id)
    VALUES ($1, 'transfer_send', $2, $1, $3)`,
    [fromUserId, transferAmount, toUserId]
    );

    // receiver transaction
    await pool.query(
    `INSERT INTO transactions (user_id, transaction_type, amount, sender_id, receiver_id)
    VALUES ($1, 'transfer_receive', $2, $3, $1)`,
    [toUserId, transferAmount, fromUserId]
    );
    } catch (err) {
        console.error('Transfer error:', err);
        res.status(500).json({ message: 'Server error' });
    }
    });


// ✅ Get logged-in user's transaction history with readable sender/receiver names
dashboardRouter.get('/transactions', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(`
      SELECT 
        t.id,
        t.transaction_type,
        t.amount,
        t.sender_id,
        sender.name AS sender_name,
        t.receiver_id,
        receiver.name AS receiver_name,
        TO_CHAR(t.created_at, 'YYYY-MM-DD HH24:MI:SS') AS date
      FROM transactions t
      LEFT JOIN users sender ON t.sender_id = sender.id
      LEFT JOIN users receiver ON t.receiver_id = receiver.id
      WHERE t.user_id = $1
      ORDER BY t.created_at DESC
    `, [userId]);

    if (result.rowCount === 0) {
      return res.status(200).json({ message: "No transactions found" });
    }

    // optional: format cleanly for frontend
    const transactions = result.rows.map(tx => ({
      id: tx.id,
      type: tx.transaction_type,
      amount: parseFloat(tx.amount),
      from: tx.sender_name || null,
      to: tx.receiver_name || null,
      date: tx.date
    }));

    res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports= dashboardRouter;
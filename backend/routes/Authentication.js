//this route is for signup and signin of the user
const express= require('express'); //Import the Express library into this file and store it in a variable named express
const bcrypt = require('bcrypt');
const pool=require('../db');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware');

const authRouter=express.Router();


    //signup route
    authRouter.post('/signup', async(req,res)=>{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;

        try{


            const { name, email, password } = req.body;
                if (!name || !email || !password) {
                  return res.status(400).json({ message: 'name, email and password are required' });
                }

            const data= await pool.query(
              `SELECT FROM users WHERE email=($1)`,
              [email]
            )

            const user=data.rows[0];

            if(user){
              return res.status(401).json({message: 'user already exits'})
            }

            const hashedPassword = await bcrypt.hash(password,10);

            const result= await pool.query(
                `INSERT INTO users(name,email, password)
                VALUES($1,$2,$3) RETURNING id,name,email`,
                [name,email,hashedPassword]
            );

             const newUser = result.rows[0];

            // Create a wallet for that user with balance = 0
            await pool.query(
              `INSERT INTO wallets(user_id, balance)
              VALUES($1, $2)`,
              [newUser.id, 0.00]
            );

            res.status(201).json(result.rows[0]);
        }catch(err){
            if (err.code === '23505') { // unique_violation
              res.status(400).json({ message: "Email already registered" });
            } else {
              console.error(err);
            res.status(500).json({ message: "Server error" });
            }
        }
    })

    //login route
    authRouter.post('/signin', async(req,res)=>{

      const {email,password}=req.body;

      try{

        const result= await pool.query(
          `SELECT* FROM users WHERE email=$1`,
          [email]
        );

        const user = result.rows[0];
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
          { id: user.id, email: user.email, role_id: user.role_id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.json({ token, name:user.name, email:user.email});

      }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }

    })

//get details about the person itself who has signedin
authRouter.get('/me',authenticate, async(req,res)=>{
 try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT u.id, u.name, u.email, COALESCE(w.balance, 0.00) AS balance
       FROM users u
       LEFT JOIN wallets w ON w.user_id = u.id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // balance will be a string from pg's numeric; you can parseFloat if you prefer a number
    const user = result.rows[0];
    user.balance = parseFloat(user.balance); // optional: return numeric as number

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = authRouter;
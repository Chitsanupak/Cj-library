import express from "express"
import connectionPool from "./utils/db.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
const port = 4000;

app.post("/register", async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "username and password are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await connectionPool.query(
            `INSERT INTO users (username, password, first_name, last_name)
             VALUES ($1, $2, $3, $4)
             RETURNING user_id`,
            [username, hashedPassword, firstName, lastName]
        );

        res.json({
            message: "User created successfully",
            user_id: result.rows[0].user_id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.post("/login", async (req,res) => {
    const {username , password} = req.body

    try{
        const result = await connectionPool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({message: "User not found"})
        }
        const user = result.rows[0];

        const isMatch  = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: " Incorrect password"})
        }


        const token = jwt.sign(
            {user_id: user.user_id, firstName: user.first_name, lastName: user.last_name},
            process.env.SECRET_KEY,
            {
                expiresIn: "20m"
            }
        );

        res.json({
            message: "login successful",
            token
        });

    } catch (err) {
        res.status(500).json({message: "server error"});
    }

});

app.post("/create-book", async (req, res) => {
  try {
    const { bookname, bookinfor } = req.body;

    const result = await connectionPool.query(
      `INSERT INTO book (book_name, book_infor)
       VALUES ($1, $2)
       RETURNING book_id`,
      [bookname, bookinfor]
    );

    return res.status(200).json({
      message: "Create Successful",
      book_id: result.rows[0].book_id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

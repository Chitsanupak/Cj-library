import express from "express"
import connectionPool from "./utils/db.mjs";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());
const port = 4000;

app.post("/register", async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        console.log(req.body);


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

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

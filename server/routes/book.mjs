import { Router } from "express";
import connectionPool from "../utils/db.mjs";


const bookRouter = Router();


bookRouter.post("/", async (req, res) => {
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

bookRouter.get("/", async (req,res) => {

    const bookname = req.query.book_name || null
    const bookinfor = req.query.book_infor || null

    try{
        const results = await connectionPool.query(`
            SELECT * FROM book
            WHERE
                ($1 IS NULL OR $1 = '' OR book_name = $1)
                AND
                ($2 IS NULL OR $2 = '' OR book_infor = $2)
        `,[bookname,bookinfor])

        return res.status(200).json({
            data: results.rows
        })

    }catch (err){
        console.error(err);
        return res.status(500).json({ error: "Database error" }); 
    }

});


bookRouter.get("/:bookId", async(req,res) => {

    let result

    try{
        const bookIdFromClient= req.params.bookId

        result = await connectionPool.query(
            `SELECT * FROM book WHERE book_id = $1`,
            [bookIdFromClient]
        );

        if (!result.rows[0]){
            return res.status(404).json({
                message: `can't not find a book 
                (book id: ${bookIdFromClient})`
            })
        }

    } catch (err){
        console.error(err)
        res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json({
        data: result.rows[0]
    });
})


bookRouter.put("/:bookId", async (req,res) => {
    
    try{
        const bookIdFromClient = req.params.bookId;
        const updateBook = {...req.body, updated_at: new Date()};

        await connectionPool.query(
            `
            UPDATE book
            SET book_name = $1,
                book_infor = $2
            WHERE book_id = $3`,
            [
                updateBook.bookname,
                updateBook.bookinfor,
                bookIdFromClient
            ]
        );

    }catch (err){
        console.error(err)
        res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json({
        message: "Updted post sucessfully"
    });
})


bookRouter.delete("/:bookId", async (req,res) => {

    let result
    
    try{
        const bookIdFromClient = req.params.bookId;

        result = await connectionPool.query(
            `DELETE FROM book
            WHERE book_id = $1
            RETURNING book_id`,
            [bookIdFromClient]
        )

        if (!result.rows[0]){
            return res.status(404).json({
                message: `can't not find a book 
                (book id: ${bookIdFromClient})`
            })
        }

    }catch (err){
        console.error(err)
        res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json({
        message : " Delete book sucessfully"
    });
});

export default bookRouter;
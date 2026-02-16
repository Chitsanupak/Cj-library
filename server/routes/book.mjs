import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validatePostData } from "../middlewares/bookpost.validation.mjs";
import { validateGetByIdData } from "../middlewares/bookgetbyid.validation.mjs";
import { validatePutData } from "../middlewares/bookput.validation.mjs";
import { validateDeleteId } from "../middlewares/bookdelete.validation.mjs";

const bookRouter = Router();

// สร้างหนังสือ
bookRouter.post("/", [validatePostData], async (req, res) => {
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
//  ค้นหาหนังสือ
bookRouter.get("/", async (req,res) => {
    let results;

    const bookname = req.query.book_name;
    const bookinfor = req.query.book_infor;

    try{
        results = await connectionPool.query(`
            SELECT * FROM book
            WHERE
                (book_name = $1 or $1 is null or $1 = '')
                AND
                (book_infor = $2 or $2 is null or $2 = '')
        `,[bookname,bookinfor])

        return res.status(200).json({
            data: results.rows
        });

    }catch {
        return res.status(500).json({ massage: "Database error" }); 
    }

});

// ค้นหาหนังสือด้วย ID
bookRouter.get("/:bookId",[validateGetByIdData], async(req,res) => {

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

// อัพเดตหนังสือ
bookRouter.put("/:bookId", [validatePutData] ,async (req,res) => {
    
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
                updateBook.book_name,
                updateBook.book_infor,
                bookIdFromClient
            ]
        );

    }catch{
        res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json({
        message: "Updted post sucessfully"
    });
})

// ลบหนังสือ
bookRouter.delete("/:bookId",[validateDeleteId], async (req,res) => {

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

    }catch {
        res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json({
        message : " Delete book sucessfully"
    });
});

export default bookRouter;
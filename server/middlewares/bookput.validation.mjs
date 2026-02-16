export const validatePutData = (req, res , next) => {
    if (!req.body.book_name){
        return res.status(400).json({
            message: "กรุณาใส่ชื่อหนังสือ"
        });
    }

    if (!req.body.book_infor){
        return res.status(400).json({
            message: "กรุณาใส่ข้อมูลหนังสือ"
        })
    }

    if (req.body.bookname.length > 150){
        return res.status(400).json({
            message: "ชื่อของหนังสือต้องไม่เกิน 150 ตัวอักษร"
        })
    }

    next();

};
export const validatePostData = (req, res , next) => {
    if (!req.body.bookname){
        return res.status(400).json({
            message: "กรุณาใส่ชื่อหนังสือ"
        });
    }

    if (req.body.bookname.length > 150){
        return res.status(400).json({
            message: "ชื่อของหนังสือต้องไม่เกิน 150 ตัวอักษร"
        })
    }

    next();

};
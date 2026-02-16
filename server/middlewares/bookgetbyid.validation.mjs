export const validateGetByIdData = (req,res,next) => {
    if (!req.boy.bookIdFromClient){
        return res.status(400).json({
            message: "กรุณาใส่ ID ที่จะค้นหา"
        })
    }

    next();
}
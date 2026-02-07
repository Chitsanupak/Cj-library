import { protect } from "../middlewares/protect.js";

const postRouter = Router();

postRouter.use(protect);
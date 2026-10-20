import multer from "multer";

const storage = multer.diskStorage({
    destination:(req, file, cbfxn)=>{
    },
    filename:(req, file, cbfxn)=>{
    }
})



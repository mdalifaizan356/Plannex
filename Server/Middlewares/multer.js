// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cbfxn)=>{
//         // console.log(">>>>>>file>>>>", file);
//         if(file.fieldname === "bagImages"){
//             cbfxn(null, "src/files/products");
//         }
//         if(file.fieldname === "categoryImage"){
//             cbfxn(null, "src/files/categories");
//         }
//         else{
//             cbfxn(null, "src/files/sections");
//         }
//     },
//     filename: (req, file, cbfxn)=>{
//         cbfxn(null, file.originalname);
//     }
// })

// const upload = multer({
//     storage
// });

// export default upload;



import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage
});

export default upload;
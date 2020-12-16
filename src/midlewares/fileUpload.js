const multer =require('multer');

const {v4}=require('uuid');

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
    

}

const fileupload=multer({
    limits:500000,
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads/images')
        },
        filename:(req,file,cb)=>{
            const ext=MIME_TYPE_MAP[file.mimetype];
            cb(null,v4()+'.'+ext)
        }
    }),
    fileFilter:(req,file,cb)=>{
        const isvalid=  !!MIME_TYPE_MAP[file.mimetype];
        let error= isvalid?null:new Error('ivalid mimie type');
        cb(error,isvalid)
    }
});

module.exports=fileupload;
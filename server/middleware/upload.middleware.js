import multer from "multer";
import path from "path";
import ApiError from "../utils/ApiError.js";

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, "uploads/");
    },

    filename(req, file, cb) {

        const uniqueName =
            Date.now() +"-" +Math.round(Math.random() * 1e9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }

});

const fileFilter = (req, file, cb) => {

    const allowed = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new ApiError(
                400,
                "Only jpg, jpeg, png and webp images are allowed."
            ),
            false
        );
    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 2 * 1024 * 1024,
    }

});

export default upload;
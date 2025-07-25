import multer from "multer";

const storage = multer.diskStorage({
  // cb = callback
  destination: function (req, file, cb) {
    // req is from user(json data) and file is by multer
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix); // read docs // file.fieldname name also
  },
});

export const upload = multer({ storage: storage }); // middle ware

//creating middle-ware to capture the images and store
// provide	destination to multer where the	file should be
// could upload photos and	also could upload arrays of photos

// we can either use memory or disk to store the file
// buffer = memory	storage
// path method is for disk	storage

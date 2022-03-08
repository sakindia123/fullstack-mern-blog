import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage'

const storage = new GridFsStorage({
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.f6yte.mongodb.net/mern-blog?retryWrites=true&w=majority`,
    options: { useUnifiedTopology: true, useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimeType) === -1)
            return `${Date.now()}-img-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-img-${file.originalname}`
        }
    }
});

export default multer({ storage });
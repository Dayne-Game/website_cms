const path = require('path');
const Upload = require('../models/Upload');
const { uploadSingleImage } = require('../utils/multerConfig');
const fs = require('fs');

// @desc Get all Image Uploads
// @route GET /uploads/images
// @access Private
const getImages = async (req, res) => {
    const images = await Upload.find({}).exec();

    if(!images) return res.status(404).json({ message: 'No images found' });

    res.status(200).json(images);
}

// @desc Upload Image
// @route POST /uploads/image
// @access Private
const uploadImage = async (req, res) => {
    uploadSingleImage(req, res, async function (err) {
        if(err) return res.status(400).send({ message: err.message })

        const duplicate = await Upload.findOne({ path: req.file.path }).exec();

        if(duplicate) return res.status(400).send({ message: 'Image already exists' })

        console.log(req.body);

        const data = {
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            path: req.file.path,
            type: req.file.fieldname,
            user_id: req.user.id,
            alt: req.body.alt,
            description: req.body.description 
        }

        await Upload.create(data);

        res.status(200).send({ message: 'Image Uploaded Successfully', image: `/${req.file.path}` })
    })
}

// @desc Delete Image
// @route DELETE /uploads/image/:id
// @access Private
const deleteImage = async (req, res) => {
    const image = await Upload.findById(req.params.id).exec();

    if(!image) return res.status(404).send({ message: 'Image not found' });

    const image_path = path.dirname(require.main.filename) + '/' + image.path;

    fs.unlink(image_path, async (err) => {
        if(err) return res.status(400).send({ message: err.message });

        await image.deleteOne();

        res.status(200).send({ message: 'Image deleted successfully' });
    })
}

module.exports = { getImages, uploadImage, deleteImage }
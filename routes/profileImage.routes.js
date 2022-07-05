let express = require("express");
let router = express.Router();
const profileImageController=require('../controller/profileImage.controller');
const imageUploader=require('../helper/imageUpload.helper');
let Authentication=require("../helper/auth.helper");

/* GET uploadProfileImage router listing. */
//imageUploader.upload.single('profile_image') is use to upload single file.
router.post('/uploadProfileImage/:id',Authentication.ensure,imageUploader.upload.single('profile_image'),profileImageController.uploadProfileImage);
module.exports = router;
const { Brand } = require("./../../models/index");
const { capitalize } = require("./../../helper/text");
const cloudinaryConfig = require("./../../utils/cloudinary");
const cloudinary = require("cloudinary");
const fs = require("fs");

exports.getBrands = async (req, res) => {
  try {
    const data = await Brand.findAll();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Brand.findByPk(id);
    if (!data) return res.status(404).send({ err: "Brand not found" });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.postBrand = async (req, res) => {
  cloudinaryConfig();
  if (!req.file) return res.status(400).send({ err: "Image is required" });
  let { name } = req.body;
  name = capitalize(name);
  if (!name.trim()) {
    return res.status(401).send({ err: "Brand name is required" });
  }

  try {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);
    const brandExists = await Brand.findOne({
      name,
    });
    if (brandExists) {
      return res.status(409).send({ err: "Brand already exists" });
    } else {
      const brand = await Brand.create({
        name,
        image: upload.secure_url,
        publicId: upload.public_id,
      });
      const data = await brand.save();
      return res.status(201).json({ data });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.updateBrand = async (req, res) => {
  cloudinaryConfig();
  const { id } = req.params;
  let { name, image } = req.body;

  if (!name.trim()) {
    return res.status(401).send({ err: "Brand name is required" });
  }

  name = capitalize(name);

  if (!req.file && !image)
    return res.status(400).send({ err: "Image is required" });

  let upload;
  try {
    if (req.file) {
      await cloudinary.v2.uploader.destroy(banner.publicId);
      upload = await cloudinary.v2.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);
    }
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).send({ err: "Category not found" });
    } else {
      const updatedBrand = await Brand.update(
        {
          name,
          image: upload ? upload.secure_url : brand.image,
          publicId: upload ? upload.public_id : brand.publicId,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).json({ data: updatedBrand });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.deleteBrandById = async (req, res) => {
  cloudinaryConfig();
  const { id } = req.params;
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).send({ err: "Brand not found" });
    } else {
      await cloudinary.v2.uploader.destroy(brand.publicId);
      await Brand.destroy({
        where: {
          id,
        },
      });
      return res.status(200).send({ data: "Brand deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

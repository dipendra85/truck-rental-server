const { Vehicle, Brand } = require("../models/");
const cloudinary = require("cloudinary");
const cloudinaryConfig = require("./../utils/cloudinary");
const fs = require("fs");

// create a vehicle
const createVehicle = async (req, res) => {
  cloudinaryConfig();
  let { name, numberPlate, pricePerDay, brandId } = req.body;

  if (!name || name.trim().length === 0)
    return res.status(400).send({ err: "Name is required" });
  if (!numberPlate || numberPlate.trim().length === 0)
    return res.status(400).send({ err: "Number plate is required" });
  if (!pricePerDay || pricePerDay.trim().length === 0)
    return res.status(400).send({ err: "Price is required" });
  if (!brandId) return res.status(400).send({ err: "Brand is required" });

  if (!req.files || req.files.length <= 0)
    return res.status(400).send({ err: "Images required" });

  name = name.trim();
  numberPlate = numberPlate.trim();
  pricePerDay = pricePerDay.trim();

  const images = [];
  const imgKeys = Object.keys(req.files);
  imgKeys.forEach((key) => {
    images.push(req.files[key]);
  });

  const publicIds = [];
  const imageArr = [];

  try {
    for (let img of images) {
      const path = img.path;
      const upload = await cloudinary.v2.uploader.upload(path);

      fs.unlinkSync(path);
      publicIds.push(upload.public_id);
      imageArr.push(upload.secure_url);
    }

    const data = await Vehicle.create({
      name,
      numberPlate,
      pricePerDay,
      images: imageArr,
      publicIds,
      brandId,
      userId: req.user.id,
    });

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).send({ err });
  }
};

// Retrieve all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const data = await Vehicle.findAll({
      include: {
        model: Brand,
      },
    });
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Retrieve a single vehicle by ID
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: {
        model: Brand,
      },
    });
    if (vehicle) {
      return res.status(200).json({ data: vehicle });
    } else {
      return res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a vehicle by ID
const updateVehicleById = async (req, res) => {
  cloudinaryConfig();
  let { name, numberPlate, pricePerDay, brandId } = req.body;

  if (!name || name.trim().length === 0)
    return res.status(400).send({ err: "Name is required" });
  if (!numberPlate || numberPlate.trim().length === 0)
    return res.status(400).send({ err: "Number plate is required" });
  if (!pricePerDay || pricePerDay.trim().length === 0)
    return res.status(400).send({ err: "Price is required" });

  name = name.trim();
  numberPlate = numberPlate.trim();
  pricePerDay = pricePerDay.trim();

  let publicIds = [];
  let imageArr = [];

  if (req.files && req.files.length > 0) {
    const images = [];
    const imgKeys = Object.keys(req.files);
    imgKeys.forEach((key) => {
      images.push(req.files[key]);
    });

    try {
      for (let img of images) {
        const path = img.path;
        const upload = await cloudinary.v2.uploader.upload(path);

        fs.unlinkSync(path);
        publicIds.push(upload.public_id);
        imageArr.push(upload.secure_url);
      }

      // Remove previous images from Cloudinary if new images are uploaded
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (vehicle && publicIds.length > 0) {
        await cloudinary.v2.api.delete_resources(vehicle.publicIds);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  const vehicle = await Vehicle.findByPk(req.params.id);
  if (vehicle) {
    publicIds = publicIds.length > 0 ? publicIds : vehicle.publicIds;
    imageArr = imageArr.length > 0 ? imageArr : vehicle.images;

    await vehicle.update({
      name,
      numberPlate,
      pricePerDay,
      brandId,
      images: imageArr,
      publicIds,
    });
    return res.status(200).json({ data: vehicle });
  } else {
    return res.status(404).json({ message: "Vehicle not found" });
  }
};

// Delete a vehicle by ID
const deleteVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (vehicle) {
      await vehicle.destroy();
      return res.status(200).json({ message: "Vehicle deleted" });
    } else {
      return res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
};

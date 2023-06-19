import Model from "../models/newsModel.js";
import fs from "fs";
import { model } from "mongoose";

// callback functions used in media routes
//get all the media
function getAll(req, res, next) {
  Model.find({}).then((response) => {
    response.forEach((element) => {
      element.mediaUrl = `http://localhost:5000/${element.file}`;
    });
    res.status(200).send({ success: true, response });
  });
}

//get media by id
function get(req, res, next) {
  try {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({
        success: true,
        response,
        imagePath: `http://localhost:5000/${response.file}`,
      });
    });
  } catch (err) {
    res.status(404).send({ error: true, err });
  }
}

// creating new media
function post(req, res, next) {
  console.log("Received POST request");
  try {
    console.log("Received file:", req.file);
    console.log("Received body:", req.body);
    let { path } = req.file || {};
    let { mediaTitle, mediaType, mediaUrl, description } = req.body;
    let body = {
      mediaTitle: mediaTitle,
      mediaType: mediaType,
      mediaUrl: path,
      description: description,
      file: path,
    };
    console.log("Final body:", body);
    let doc = new Model(body);
    console.log("Saving document:", doc);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(404).send({ error: true, err });
  }
}

//update media by _id
function put(req, res, next) {
  try {
    console.log(req.body);
    let { path } = req.file || {};
    let { mediaTitle, mediaType, mediaUrl, description } = req.body;
    let body = {
      mediaTitle: mediaTitle,
      mediaType: mediaType,
      mediaUrl: mediaUrl,
      description: description,
      file: path,
    };
    console.log(body);
    let { id } = req.params;
    Model.findOneAndUpdate(
      { _id: id },
      body,
      { new: true },
      (err, response) => {
        if (err) return next(err);
        if (req.file) fs.unlinkSync(response.file);
        res.status(200).send({ success: true, response });
      }
    );
  } catch (err) {
    res.status(404).send({ error: true, err });
  }
}

//delete media by id
function Delete(req, res, next) {
  try {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      if (response.file) {
        fs.unlinkSync(response.file);
      }
      res.status(200).send({ success: true, response });
    });
  } catch (err) {
    res.status(404).send({ error: true, err });
  }
}

const controller = { getAll, get, post, put, Delete };

export default controller;

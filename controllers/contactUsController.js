import express from "express";
import Model from "../models/contactUsModel.js";

// get all the data

function getAll(req, res, next) {
  try {
    Model.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ succes: true, response });
    });
  } catch (err) {
    res.status(400).send({ succes: false, err });
  }
}

// get by id
function GetByID(rep, res, next) {
  let { id } = req.params;
  Model.findById({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ succes: true, response });
  });
}
//   delete
function Delete(req, res, next) {
  let i = req.params.id;
  Model.findByIdAndDelete({ _id: i }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ succes: true, response });
  });
}

// // create
function Add(req, res, next) {
  let body = req.body;
  let doc = new Model(body);
  doc.save((err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

const controller = { getAll, GetByID, Add, Delete };

export default controller;

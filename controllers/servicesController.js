import express from "express";
import serviceModel from "../models/servicesModel.js";

function getAll(req, res, next) {
  serviceModel.find({}, (err, response) => {
    res.status(200).send({ success: true, response });
  });
}
function add(req, res, next) {
  let addService = new serviceModel(req.body);
  addService
    .save()
    .then((response) => res.status(200).send({ success: true, response }))
    .catch((err) => {
      res.status(400).send(err);
    });
}

function Delete(req, res, next) {
  let i = req.params.id;
  serviceModel.findByIdAndRemove({ _id: i }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

function Update(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  serviceModel.updateOne({ _id: id }, { $set: body }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

const service = { getAll, add, Delete, Update };
export default service;

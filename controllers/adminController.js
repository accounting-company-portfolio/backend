import adminModel from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createAdmin = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { FirstName, LastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && FirstName && LastName)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await adminModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    let encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await adminModel.create({
      FirstName: FirstName,
      LastName: LastName,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
    });

    // Create token

    // return new user
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

const login = async (req, res) => {
  // Get user input
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const user = await adminModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    res.cookie("auth-token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // user
    return res.status(200).send(user);
  }
  return res.status(400).send("Invalid Credentials");
};

function getAll(req, res, next) {
  adminModel.find({}, (err, response) => {
    res.status(200).send({ success: true, response });
  });
}

function add(req, res, next) {
  let addAdmin = new adminModel(req.body);
  addAdmin
    .save()
    .then((response) => res.status(200).send({ success: true, response }))
    .catch((err) => {
      res.status(400).send(err);
    });
}

function Delete(req, res, next) {
  let i = req.params.id;
  adminModel.findByIdAndRemove({ _id: i }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

function Update(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  adminModel.updateOne({ _id: id }, { $set: body }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

const admin = { getAll, add, Delete, Update, login, createAdmin };
export default admin;

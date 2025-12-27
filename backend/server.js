import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

const sameschema = {
  fullname: String,
  email: { type: String, unique: true },
  password: String,
};

const adminModel = mongoose.model(
  "admin",
  new mongoose.Schema(sameschema, { timestamps: true })
);

const coachModel = mongoose.model(
  "coach",
  new mongoose.Schema(sameschema, { timestamps: true })
);

const athleteModel = mongoose.model(
  "athlete",
  new mongoose.Schema(sameschema, { timestamps: true })
);

// routes for admin
app.post("/adminregister", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const user = await adminModel.create({ fullname, email, password: hash });
    res.status(201).json({ message: "Admin Registered" });
  } catch (error) {
    res.status(400).json({ message: "Registration Failed" });
  }
});

app.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await adminModel.findOne({ email });

    if (!user) return res.status(400).json({ message: "Email not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login Success", token });
  } catch {
    res.status(401).json({ message: "Login Failed" });
  }
});

app.get("/getadmins", auth, async (req, res) => {
  const users = await adminModel.find();
  res.json(users);
});


// routes for coaches

app.post("/coachregister", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    await coachModel.create({ fullname, email, password: hash });
    res.status(201).json({ message: "Coach Registered" });
  } catch {
    res.status(400).json({ message: "Registration Failed" });
  }
});

app.post("/coachlogin", async (req, res) => {
  const { email, password } = req.body;
  const user = await coachModel.findOne({ email });

  if (!user) return res.status(400).json({ message: "Email not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

app.get("/getcoaches",async(req,res)=>{
try {
    const getcoaches = await coachModel.find();
    res.json({message:"all coaches fetched",getcoaches});
} catch (error) {
    res.json({message:"error while fetching coaches",error})
}
})
// routes for athletes

app.post("/atheleteregister", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    await athleteModel.create({ fullname, email, password: hash });
    res.status(201).json({ message: "Athlete Registered" });
  } catch {
    res.status(400).json({ message: "Registration Failed" });
  }
});

app.post("/atheletelogin", async (req, res) => {
  const { email, password } = req.body;
  const user = await athleteModel.findOne({ email });

  if (!user) return res.status(400).json({ message: "Email not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

app.listen(5000, () => console.log(`Server running on ${process.env.PORT}`));

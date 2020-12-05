require("./src/models/User");
require("./src/models/Artist");
require("./src/models/Album");
require("./src/models/Song");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const requireAuth = require("./src/midlewares/requireAuth");
const artist = require("./src/routes/artistRoutes");
const album = require("./src/routes/albumRoutes");
const song = require("./src/routes/songRoutes");
const user = require("./src/routes/userRoutes");



const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());


app.use(authRoutes);
app.use('/api',artist);
app.use('/api',album);
app.use('/api',song);
app.use('/api',user)


const MongoUri ="mongodb+srv://bongdev:bongcluster99$@bongcluster.xdmjl.mongodb.net/BongDatabase?retryWrites=true&w=majority";
mongoose.connect(MongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.error("error connecting mongoose", err);
});

app.get("/api",  (req, res) => {
  res.send(`You are in Api`);
});

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});

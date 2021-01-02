require("./src/models/User");
require("./src/models/Artist");
require("./src/models/Album");
require("./src/models/Song");
require("./src/models/Podcast");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const requireAuth = require("./src/midlewares/requireAuth");
const artist = require("./src/routes/artistRoutes");
const album = require("./src/routes/albumRoutes");
const song = require("./src/routes/songRoutes");
const user = require("./src/routes/userRoutes");
const podcast = require("./src/routes/podcastRoutes");
const search = require("./src/routes/searchRoutes");
const trending = require("./src/routes/trendingRoutes");
const popular = require("./src/routes/popularRoutes");
const topcharts = require("./src/routes/topchartsRoutes");
const bongplaylist = require("./src/routes/bongplaylistRoutes");
const recommended = require("./src/routes/recommendedRoutes");
const topartists = require("./src/routes/topartistsRoutes");
const topalbums = require("./src/routes/topalbumsRoutes");

var  path = require("path");
var  cookieParser = require("cookie-parser");
var  logger = require("morgan");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

  app.use(logger("dev"));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

let db;
mongoose
  .connect(
    "mongodb+srv://bongdev:bongcluster99$@bongcluster.xdmjl.mongodb.net/BongDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
     useUnifiedTopology: true,
    }
  )
  .then((client) => {
    // console.log(db);
    // console.log(client.connections[0].db);

    db = client.connections[0].db;
    app.set("db", db);
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error", err.message);
  });


  //for sms otp
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  

// const MongoUri =
//   "mongodb+srv://bongdev:bongcluster99$@bongcluster.xdmjl.mongodb.net/BongDatabase?retryWrites=true&w=majority";
// mongoose.connect(MongoUri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on("connected", (db) => {
//   console.log(db);
//   console.log("connected to mongo");
// });

// mongoose.connection.on("error", (err) => {
//   console.error("error connecting mongoose", err);
// });

// console.log(MongoUri);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requseted-With, Content-Type, Accept , Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

  next();
});

app.use(authRoutes);
app.use("/api/artist", artist);
app.use("/api/album", album);
app.use("/api/song", song);
app.use("/api/podcast", podcast);
app.use("/api/users", user);
app.use("/api/search", search);
app.use("/api/trending", trending);
app.use("/api/popular", popular);
app.use("/api/topcharts", topcharts);
app.use("/api/bongplaylist", bongplaylist);
app.use("/api/recommended", recommended);
app.use("/api/topalbums", topalbums);
app.use("/api/topartists", topartists);

app.get("/api", (req, res) => {
  res.send(`You are in Api`);
});

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});

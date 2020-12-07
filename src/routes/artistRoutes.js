const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

const Artist = mongoose.model("Artist");

const router = express.Router();

//router.use(requireAuth);

router.get("/", async (req, res) => {
  const artist = await Artist.find();

  res.send(artist);
});

router.post("/", async (req, res) => {
  const { artistname, artistimage } = req.body;
  console.log(req.body);

  // if (!name || !image) {
  //   return res.status(422).send({ error: "You must provide a name,image" });
  // }

  try {
    const artist = new Artist({ artistname, artistimage });

    artist.save();
    console.log(artist);
    res.status(201).json(artist);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

// router.put("/", async (req, res) => {
//   const { artistname, artistimage } = req.body;
//   console.log(req.body);

//   Artist.findById(_id, (err, event) => {
//     try {
//       event.updateOne(
//         {
//           title,
//           start,
//           end,
//           desc,
//           allDay,
//         },
//         (err, updatedEvent) => {
//           if (err) {
//             console.log("error updating", err);
//           } else {
//             console.log("yoooooo");
//             Calendar.findById(_id, (err, foundUpdatedEvent) => {
//               console.log(foundUpdatedEvent);
//               res.status(201).json({
//                 message: "Updated event",
//                 id: foundUpdatedEvent.id,
//                 title: foundUpdatedEvent.title,
//                 start: foundUpdatedEvent.start,
//                 end: foundUpdatedEvent.end,
//                 desc: foundUpdatedEvent.desc,
//                 allDay: foundUpdatedEvent.allDay,
//               });
//               return foundUpdatedEvent;
//             });
//           }
//         }
//       );
//     } catch (err) {
//       const error = new HttpError("failed updating events", 500);
//       return next(error);
//     }
//   });

// if (!name || !image) {
//   return res.status(422).send({ error: "You must provide a name,image" });
// }

// try {
//   const artist = new Artist({ artistname, artistimage });

//   artist.save();
//   console.log(artist);
//   res.status(201).json(artist);
// } catch (err) {
//   res.status(422).send({ error: err.message });
// }
// });

router.delete("/", (req, res, next) => {
  console.log("dleetinggggg");

  const { id } = req.body;
  console.log(id);

  Artist.findById(id, (err, artist) => {
    console.log(id);
    console.log(artist);
    try {
      artist.remove((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted successfuly");
          res.status(201).json({
            id: id,
          });
        }
      });
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });
});

module.exports = router;

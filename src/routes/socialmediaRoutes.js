const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

const Socialmedia = require("../models/Socialmedia");

const router = express.Router();

//router.use(requireAuth);

router.get("/", async (req, res) => {
  const socialmedia = await Socialmedia.find();

  res.send(socialmedia);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const socialmedia = await Socialmedia.findOne({ _id: id });
  res.send(socialmedia);
});

router.post("/", async (req, res) => {
  const { name, image } = req.body;
  // console.log(genresname, genresimage, songs);
  if (!name) {
    console.log("in if");
    return res.status(422).send({ error: "You must provide a name" });
  }

  try {
    const socielmedia = new Socialmedia({
      name,
      image,
    });
    socielmedia.save();
    res.status(201).json(socielmedia);
  } catch (err) {
    console.log("in errorS");
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const { name, id, image } = req.body;

  Socialmedia.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          name,
          image,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            Tags.findById(id, (err, foundUpdatedEvent) => {
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                name: foundUpdatedEvent.name,
              });
              return foundUpdatedEvent;
            });
          }
        }
      );
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });
});

router.delete("/", (req, res, next) => {
  const { id } = req.body;

  Socialmedia.findById(id, (err, socialmedia) => {
    try {
      socialmedia.remove((err) => {
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

// router.put("/activegenres", async (req, res) => {
//   const { active, id } = req.body;

//   Genres.findById(id, (err, event) => {
//     try {
//       event.updateOne(
//         {
//           active,
//         },
//         (err, updatedEvent) => {
//           if (err) {
//             console.log("error updating", err);
//           } else {
//             console.log("Updated");
//             Genres.findById(id, (err, foundUpdatedEvent) => {
//               res.status(201).json({
//                 message: "Updated event",
//                 id: foundUpdatedEvent._id,
//                 active: foundUpdatedEvent.active,
//               });
//               return foundUpdatedEvent;
//             });
//           }
//         }
//       );
//     } catch (err) {
//       res.status(422).send({ error: err.message });
//     }
//   });
// });

module.exports = router;

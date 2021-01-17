const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

const Category = require("../models/Category");

const router = express.Router();

//router.use(requireAuth);

router.get("/", async (req, res) => {
  const category = await Category.find();

  res.send(category);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOne({ _id: id });
  res.send(category);
});

router.post("/", async (req, res) => {
  const { categoryname, categoryimage, songs } = req.body;
  console.log(categoryname, songs);

  if (!categoryname || !categoryimage) {
    return res.status(422).send({ error: "You must provide a name,image" });
  }

  try {
    const category = new Category({
      categoryname,
      categoryimage,
      songs,
    });
    category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const { categoryname, categoryimage, songs, id } = req.body;

  Category.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          categoryname,
          categoryimage,
          songs,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            Category.findById(id, (err, foundUpdatedEvent) => {
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                categoryname: foundUpdatedEvent.categoryname,
                categoryimage: foundUpdatedEvent.categoryimage,
                songs: foundUpdatedEvent.songs,
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

  Category.findById(id, (err, category) => {
    try {
      category.remove((err) => {
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

router.put("/activecategory", async (req, res) => {
  const { active, id } = req.body;

  Category.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          active,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("Updated");
            Category.findById(id, (err, foundUpdatedEvent) => {
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                active: foundUpdatedEvent.active,
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

module.exports = router;

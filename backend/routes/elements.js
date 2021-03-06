const router = require("express").Router();
const Element = require("../models/element.model");

router.route("/").get((req, res) => {
  Element.find()
    .then(elements => res.json(elements))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const {
    elementnumber,
    elementlabel,
    elementDescription,
    elementFormat,
    elementDuration,
    elementCategory,
    elementSubCategory,
    elementMarket,
    elementCogRating,
    elementPhysRating,
    elementLink,
  } = req.body;

  const newElement = new Element({
    elementnumber,
    elementlabel,
    elementDescription,
    elementFormat,
    elementDuration,
    elementCategory,
    elementSubCategory,
    elementMarket,
    elementCogRating,
    elementPhysRating,
    elementLink,
  });

  newElement
    .save()
    .then(() => res.json("Element added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Element.findById(req.params.id)
    .then(element => res.json(element))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Element.findByIdAndDelete(req.params.id)
    .then(() => res.json("Element deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Element.findById(req.params.id)
    .then(element => {
      element.elementnumber = req.body.elementnumber;
      element.elementlabel = req.body.elementlabel;
      element.elementDescription = req.body.elementDescription;
      element.elementFormat = req.body.elementFormat;
      element.elementDuration = req.body.elementDuration;
      element.elementCategory = req.body.elementCategory;
      element.elementSubCategory = req.body.elementSubCategory;
      element.elementMarket = req.body.elementMarket;
      element.elementCogRating = req.body.elementCogRating;
      element.elementPhysRating = req.body.elementPhysRating;
      element.elementLink = req.body.elementLink;

      element
        .save()
        .then(() => res.json("Element updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;

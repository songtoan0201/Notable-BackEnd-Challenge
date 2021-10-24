let mongoose = require("mongoose");
let Doctor = mongoose.model("Doctor");
let Patient = mongoose.model("Patient");

module.exports = {
  index: function (request, response) {
    Doctor.find()
      .populate("_patients")
      .exec()
      .then((data) => {
        res.render("index");
      })
      .catch((err) => {
        response.json(err);
      });
     
  },

  // create: (request, response) => {
  //     Cake.create(request.body)
  //         .then(data => {
  //             response.json(data);
  //         })
  //         .catch(err => {
  //             response.json(err);
  //         })
  // },

  findOneById: (request, response) => {
    Doctor.findOne({ _id: request.params.id })
      .populate("_patients")
      .exec()
      .then((data) => {
        response.json(data);
      })
      .catch((err) => {
        response.json(err);
      });
  },

  // update: (request, response) => {
  //     Cake.updateOne({ _id: request.params.id }, request.body, { runValidators: true })
  //         .then(data => {
  //             response.json(data);
  //         })
  //         .catch(err => {
  //             response.json(err);
  //         })
  // },

  // delete: (request, response) => {
  //     // find all the children and delete them first
  //     Rating.find({ _cake: request.params.id })
  //         .then(allRatingsWithSingleCake => {
  //             console.log(`allRatingsWithSingleCake ${allRatingsWithSingleCake}`);
  //             if (!allRatingsWithSingleCake) {
  //                 Rating.remove(allRatingsWithSingleCake)
  //                     .then(data => {
  //                         // then we want to finally remove the parent
  //                     })
  //                     .catch(err => {
  //                         console.log("erred in the sencond step")
  //                         response.json(err);
  //                     })
  //             }
  //             Cake.remove({ _id: request.params.id })
  //                 .then(deletedCake => {
  //                     response.json(deletedCake);
  //                 })
  //                 .catch(err => {
  //                     console.log("erred in the last step")
  //                     response.json(err);
  //                 })

  //         })
  //         .catch(err => {
  //             console.log("erred in the first step")
  //             response.json(err);
  //         })
  // },
};

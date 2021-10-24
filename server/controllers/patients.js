let mongoose = require("mongoose"),
  Doctor = mongoose.model("Doctor"),
  Patient = mongoose.model("Patient");

module.exports = {
  index: (req, res) => {
    Rating.find()
      .populate("_doctor")
      .exec()
      .then((allR) => {
        res.json(allR);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  create: function (req, res) {
    // create the newest object
    let newPatient = new Patient(req.body);

    // add an attribute _doctor, the parent to the newest object
    newPatient._doctor = req.params.patientId;

    // below is an acyncrous call to the database
    // thus we need to have a try/catch
    newPatient
      .save()
      .then((savePatient) => {
        Doctor.findOne({ _id: req.params.patientId })
          .then((theDoctor) => {
            theDoctor._patients.push(savePatient);
            // now save that cake
            theDoctor
              .save() // this is a trip to the database
              .then((savedCake) => {
                // output the orginal rating that we just created
                // after all the million joins
                res.json(newPatient);
              })
              .catch((err) => {
                res.json(err);
              });
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  },
  //findAllRatings: (req, res) => {},
  //editRating: (req, res) => {
  // req.body, {runValidtor: true}
  //},
  //deleteRating: (req, res) => {}

  delete: (request, response) => {
    // find all the children and delete them first
    Patient.remove({ _id: request.params.id })
      .populate("_doctor")
      .exec()
      .then((allR) => {
        res.json(allR);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

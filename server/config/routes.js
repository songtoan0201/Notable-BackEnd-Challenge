let doctors = require("../controllers/doctors");
let patients = require("../controllers/patients");

module.exports = function (app) {
  // routes
  app.get("/doctors", doctors.index);
  //app.post('/cakes', cakes.create);

  app.get("/doctors/:id", doctors.findOneById);
  //app.put('/cakes/:id',cakes.update);
  //app.delete('/cakes/:id',cakes.delete);

  // routes concerning ratings
  app.get("/doctors/patients", patients.index); // this will find all the ratings.
  app.post("/doctors/:patientId/patients", patients.create); // this will create the ratings for a specific cake
  app.delete("/doctors/:id/patients", patients.delete); // this will delete the ratings for a specific cake
};

let mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    // value:{
    //     type: Number,
    //     required: [true, "You need to rate the cake in order to leave a comment"]
    // },
    // content:{
    //     type: String,
    // },
    // _cake: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Cake'
    // }
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
    name: { type: String, required: true },
    time: { type: Date, default: Date.now },
    kind: { type: String, default: "New Patient" },
    _doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
  },
  {
    timestamp: true,
  }
);

PatientSchema.static("increment", async function (Name) {
  const patient = await this.findByIdAndUpdate(
    Name,
    { $inc: { seq: 1 } },
    // new: return the new value
    // upsert: create document if it doesn't exist
    { new: true, upsert: true }
  );
  return patient.seq;
});

const Patient = mongoose.model("Patient", PatientSchema);

PatientSchema.pre("save", async function () {
  // Don't increment if this is NOT a newly created document
  if (!this.isNew) return;

  const testvalue = await Patient.increment("entity");
  this.testvalue = testvalue;
});

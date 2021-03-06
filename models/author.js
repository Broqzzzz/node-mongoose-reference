const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/librarydb';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const AuthorSchema = new mongoose.Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

AuthorSchema.virtual('full_name')
  .get(function() {
    return this.family_name + ', ' + this.first_name;
  })
  .set(function(value) {
    var splitName = value.split(', ');

    this.family_name = splitName[0]
    this.first_name = splitName[1]
  });


module.exports = mongoose.model('Author', AuthorSchema);

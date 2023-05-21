const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Yliia:Yliia13@cluster0.7j8gjyb.mongodb.net/contacts_reader?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((er) => {
    console.log(er.message);
    process.exit(1);
  });

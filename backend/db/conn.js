const mongoose = require("mongoose");
// mongodb+srv://admin:<password>@cluster0.k27qkp2.mongodb.net/?retryWrites=true&w=majority
// mongodb://localhost:27017/local.getapet
async function main() {
  await mongoose.connect("mongodb+srv://admin:Sd5e33MPBYCmm12J@cluster0.k27qkp2.mongodb.net/?retryWrites=true&w=majority");
  console.log("banco de dados conectado");
}

main().catch((err) => console.log(err));

module.exports = mongoose;

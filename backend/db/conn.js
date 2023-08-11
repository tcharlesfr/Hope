const mongoose = require("mongoose");
// mongodb+srv://tcharlesfr:<password>@cluster0.i1byjpj.mongodb.net/?retryWrites=true&w=majority
// vYC13Px9Ow5JayhT
async function main() {
  await mongoose.connect("mongodb+srv://admin:admin@cluster0.i1byjpj.mongodb.net/?retryWrites=true&w=majority");
  console.log("banco de dados conectado");
}

main().catch((err) => console.log(err));

module.exports = mongoose;

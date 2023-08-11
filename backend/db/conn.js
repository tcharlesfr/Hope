const mongoose = require("mongoose");
// mongodb+srv://admin:<password>@cluster0.k27qkp2.mongodb.net/?retryWrites=true&w=majority
// mongodb://localhost:27017/local.getapost

//Z4F3FmXiKEJ50NuM
async function main() {
  await mongoose.connect("mongodb+srv://tcharlesfr:Z4F3FmXiKEJ50NuM@cluster0.i1byjpj.mongodb.net/?retryWrites=true&w=majority");
  console.log("banco de dados conectado");
}

main().catch((err) => console.log(err));

module.exports = mongoose;

const multer = require("multer");
const path = require("path");

// destino das imagens
const imageStorage = multer.diskStorage({
  // local onde via ser salvo
  // função com requisição, arquivo e func callback
  destination: function (req, file, cb) {
    // pasta que eu vou salvar
    let folder = "";

    // identificar se a url é de user ou pet
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }
    // patch dinamico
    cb(null, `public/images/${folder}`);
  },
  //como vai ficar o nome do arquivo depois de salvo
  filename: function (req, file, cb) {
    // colocar Date e numero aleatorio para n repetir os nomes e evitando a substituição de imagens
    // concatenando com o formato, resultado: 13416848141681.jpg
    cb(
      null,
      Date.now() +
        String(Math.random() * 1000) +
        path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  // filtrando arquivos para receber apenas png e jpg
  // evitando de receber arquivos indesejados, protegendo o sistema
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas jpg ou png!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };

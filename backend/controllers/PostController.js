const Pet = require("../models/Pet");

//helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId; //verificar se o id é valido

module.exports = class PetController {
  //criar pet
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    const images = req.files;

    // setar como disponivel logo quando criado
    const available = true;

    // upload de imagens

    //validações
    if (!name) {
      res.status(422).json({ message: "o nome é obrigatorio" });
      return;
    }
    if (!age) {
      res.status(422).json({ message: "a idade é obrigatoria" });
      return;
    }
    if (!weight) {
      res.status(422).json({ message: "o peso é obrigatorio" });
      return;
    }
    if (!color) {
      res.status(422).json({ message: "a cor é obrigatoria" });
      return;
    }
    if (images.length === 0) {
      res.status(422).json({ message: "a imagem é obrigatoria" });
      return;
    }

    // pegando os dados do dono
    const token = getToken(req);
    const user = await getUserByToken(token);

    // criando pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    // percorrer as imagens e guardar apenas o nome
    images.map((image) => {
      pet.images.push(image.filename);
    });

    // salvando no banco de dados
    try {
      const newPet = await pet.save();
      res.status(201).json({ message: "pet cadastrado com sucesso", newPet });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({ pets: pets });
  }

  static async getAllUserPets(req, res) {
    // pegando os dados do dono
    const token = getToken(req);
    const user = await getUserByToken(token);

    //filtrar a busca pelo campo id
    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({ pets: pets });
  }

  static async getAllUserAdoptions(req, res) {
    // pegando os dados do dono
    const token = getToken(req);
    const user = await getUserByToken(token);

    //filtrar a busca pelo campo adopter
    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({ pets: pets });
  }

  static async getPetById(req, res) {
    // pegar o id vindo dos paramentros
    const id = req.params.id;

    // checar se o id é valido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID invalio" });
      return;
    }

    // verificar se o pet existe
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    res.status(200).json({ pet: pet });
  }

  static async removePetById(req, res) {
    const id = req.params.id;

    // checar se o id é valido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID invalio" });
      return;
    }

    // verificar se o pet existe
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //verificar se o usuario logado é quem vai excluir o pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em processar a sua solicitação" });
      return;
    }

    await Pet.findByIdAndRemove(id);

    res.status(200).json({ message: "Pet removido com sucesso" });
  }

  static async updatePet(req, res) {
    const id = req.params.id;

    const { name, age, weight, color, available } = req.body;

    const images = req.files;

    //objeto vazio para atualizar o pet
    let updatedData = {};

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //verificar se o usuario logado é quem vai excluir o pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em processar a sua solicitação" });
      return;
    }

    //validações
    if (!name) {
      res.status(422).json({ message: "o nome é obrigatorio" });
      return;
    } else {
      updatedData.name = name;
    }

    if (!age) {
      res.status(422).json({ message: "a idade é obrigatoria" });
      return;
    } else {
      updatedData.age = age;
    }
    if (!weight) {
      res.status(422).json({ message: "o peso é obrigatorio" });
      return;
    } else {
      updatedData.weight = weight;
    }

    if (!color) {
      res.status(422).json({ message: "a cor é obrigatoria" });
      return;
    } else {
      updatedData.color = color;
    }

    if (images.length>0){
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    await Pet.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Pet atualizado com sucesso" });
  }

  static async schedule(req, res) {
    const id = req.params.id;

    //verificar se existe pet
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //verificar se o pet não é do usuario
    const token = getToken(req);
    const user = await getUserByToken(token);

    //pet.user._id.equals() //outra forma
    if (pet.user._id.toString() === user._id.toString()) {
      res
        .status(422)
        .json({ message: "você não pode agendar visita com seu proprio pet" });
      return;
    }

    // verificar se não tem visita marcada
    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res
          .status(422)
          .json({ message: "você já agendou uma visita com este pet" });
        return;
      }
    }

    // adicionar usuario do pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`,
    });
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;

    //verificar se existe pet
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //verificar se o pet não é do usuario
    const token = getToken(req);
    const user = await getUserByToken(token);

    //pet.user._id.equals() //outra forma
    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "você não pode agendar visita com seu proprio pet" });
      return;
    }

    // trocando a disponibilidade do pet
    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: "Adoção concluida com sucesso", //editado já
    });
  }
};

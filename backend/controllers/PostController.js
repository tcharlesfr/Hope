const Post = require("../models/Post");

//helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId; //verificar se o id é valido

module.exports = class PostController {
  //criar post
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

    // criando post
    const post = new Post({
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
      post.images.push(image.filename);
    });

    // salvando no banco de dados
    try {
      const newPost = await post.save();
      res.status(201).json({ message: "post cadastrado com sucesso", newPost });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const posts = await Post.find().sort("-createdAt");

    res.status(200).json({ posts: posts });
  }

  static async getAllUserPosts(req, res) {
    // pegando os dados do dono
    const token = getToken(req);
    const user = await getUserByToken(token);

    //filtrar a busca pelo campo id
    const posts = await Post.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({ posts: posts });
  }

  static async getAllUserAdoptions(req, res) {
    // pegando os dados do dono
    const token = getToken(req);
    const user = await getUserByToken(token);

    //filtrar a busca pelo campo adopter
    const posts = await Post.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({ posts: posts });
  }

  static async getPostById(req, res) {
    // pegar o id vindo dos paramentros
    const id = req.params.id;

    // checar se o id é valido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID invalio" });
      return;
    }

    // verificar se o post existe
    const post = await Post.findOne({ _id: id });

    if (!post) {
      res.status(404).json({ message: "Post não encontrado" });
      return;
    }

    res.status(200).json({ post: post });
  }

  static async removePostById(req, res) {
    const id = req.params.id;

    // checar se o id é valido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID invalio" });
      return;
    }

    // verificar se o post existe
    const post = await Post.findOne({ _id: id });

    if (!post) {
      res.status(404).json({ message: "Post não encontrado" });
      return;
    }

    //verificar se o usuario logado é quem vai excluir o post
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (post.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em processar a sua solicitação" });
      return;
    }

    await Post.findByIdAndRemove(id);

    res.status(200).json({ message: "Post removido com sucesso" });
  }

  static async updatePost(req, res) {
    const id = req.params.id;

    const { name, age, weight, color, available } = req.body;

    const images = req.files;

    //objeto vazio para atualizar o post
    let updatedData = {};

    const post = await Post.findOne({ _id: id });

    if (!post) {
      res.status(404).json({ message: "Post não encontrado" });
      return;
    }

    //verificar se o usuario logado é quem vai excluir o post
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (post.user._id.toString() !== user._id.toString()) {
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

    await Post.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Post atualizado com sucesso" });
  }

  static async schedule(req, res) {
    const id = req.params.id;

    //verificar se existe post
    const post = await Post.findOne({ _id: id });

    if (!post) {
      res.status(404).json({ message: "Post não encontrado" });
      return;
    }

    //verificar se o post não é do usuario
    const token = getToken(req);
    const user = await getUserByToken(token);

    //post.user._id.equals() //outra forma
    if (post.user._id.toString() === user._id.toString()) {
      res
        .status(422)
        .json({ message: "você não pode agendar visita com seu proprio post" });
      return;
    }

    // verificar se não tem visita marcada
    if (post.adopter) {
      if (post.adopter._id.equals(user._id)) {
        res
          .status(422)
          .json({ message: "você já agendou uma visita com este post" });
        return;
      }
    }

    // adicionar usuario do post
    post.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Post.findByIdAndUpdate(id, post);

    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${post.user.name} pelo telefone ${post.user.phone}`,
    });
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;

    //verificar se existe post
    const post = await Post.findOne({ _id: id });

    if (!post) {
      res.status(404).json({ message: "Post não encontrado" });
      return;
    }

    //verificar se o post não é do usuario
    const token = getToken(req);
    const user = await getUserByToken(token);

    //post.user._id.equals() //outra forma
    if (post.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "você não pode agendar visita com seu proprio post" });
      return;
    }

    // trocando a disponibilidade do post
    post.available = false;

    await Postt.findByIdAndUpdate(id, post);

    res.status(200).json({
      message: "Adoção concluida com sucesso", //editado já
    });
  }
};

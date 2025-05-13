import prisma from "../../prisma/prisma.js";

class CollectionModel {
  // Obter todas as coleções
  async findAll() {
    const colecoes = await prisma.collection.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        cards: true,
      },
    });

    console.log(colecoes);

    return colecoes;
  }

  // Obter uma coleção pelo ID
  async findById(id) {
    const colecao = await prisma.collection.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        cards: true,
      },
    });

    return colecao;
  }

  // Criar uma nova coleção
  async create(
    name,
    description,
    releaseYear,
  ) {
    const newCollection = await prisma.collection.create({
      data: {
        name,
        description,
        releaseYear,
      },
    });

    return newCollection;
  }

  // Atualizar uma coleção
  async update(
    id,
   name,
    description,
      releaseYear,
  ) {
    const colecao = await this.findById(id);

    if (!colecao) {
      return null;
    }

    // Atualize a colecão com os novos dados
    const data = {};
    if (name !== undefined) {
      name = name;
    }
    if (description !== undefined) {
      data.description = description;
    
    if (releaseYear !== undefined) {
      data.releaseYear = releaseYear;
    }
    

    const colecaoAtualizada = await prisma.collection.update({
      where: {
        id: Number(id),
      },
      data:{
        name,
        description,
        releaseYear,
      },
    });

    return colecaoAtualizada;
  }
}

  // Remover uma coleção
  async delete(id) {
    const colecao = await this.findById(id);

    if (!colecao) {
      return null;
    }

    await prisma.collection.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CollectionModel();

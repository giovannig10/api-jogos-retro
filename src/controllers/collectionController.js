import collectionModel from "../models/collectionModel.js";
import CollectionModel from "../models/collectionModel.js";

class CollectionController {
  // GET /colecoes
  async getAllCollections(req, res) {
    try {
      const colecoes = await CollectionModel.findAll();
      res.json(colecoes);
    } catch (error) {
      console.error("Erro ao buscar as coleções:", error);
      res.status(500).json({ error: "Erro ao buscar as coleções" });
    }
  }

  // GET /colecoes/:id
  async getCollectionById(req, res) {
    try {
      const { id } = req.params;

      const colecao = await CollectionModel.findById(id);

      if (!colecao) {
        return res.status(404).json({ error: "Colecao não encontrado" });
      }

      res.json(colecao);
    } catch (error) {
      console.error("Erro ao buscar colecao:", error);
      res.status(500).json({ error: "Erro ao buscar colecao" });
    }
  }

  // POST /colecoes
  async createCollection (req, res) {
    try {
      // Validação básica
      const {
       name,
       description,
       releaseYear
      } = req.body;

      // Verifica se todos os campos do personagem foram fornecidos
      if (
        !name ||
        !description ||
        !releaseYear
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar uma nova coleção
      const newCollection = await CollectionModel.create(
        name,
        description,
        releaseYear
      );

      if (!newCollection) {
        return res.status(400).json({ error: "Erro ao criar colecao" });
      }

      res.status(201).json({message:"teste de massage", newCollection});
    } catch (error) {
      console.error("Erro ao criar colecoes:", error);
      res.status(500).json({ error: "Erro ao criar colecao" });
    }
  }

  // PUT /colecoes/:id
  async updateCollection(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        releaseYear,
      } = req.body;

      // Atualizar a coleção
      const updatedCollection = await CollectionModel.update(
        id,
        name,
        description,
        releaseYear
      );

      if (!updatedCollection) {
        return res.status(404).json({ error: "Coleção não encontrado" });
      }

      res.json(updatedCollection);
    } catch (error) {
      console.error("Erro ao atualizar coleção:", error);
      res.status(500).json({ error: "Erro ao atualizar coleção" });
    }
  }

  // DELETE /coleções/:id  '
  async deleteCollection(req, res) {
    try {
      const { id } = req.params;

      // Remover a coleção
      const result = await collectionModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Coleção não encontrada" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover coleção:", error);
      res.status(500).json({ error: "Erro ao remover coleção" });
    }
  }
}

export default new CollectionController();

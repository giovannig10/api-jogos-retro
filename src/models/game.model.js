import prisma from "../../prisma/prisma.js";

class GameModel {
    // Obter todos os jogos
    async findAll() {
        const games = await prisma.game.findMany();
        
        return {
            total: games.length,
            games,
        }
    }

    //Criar um novo jogo
    async create(data) {
        const game = await prisma.game.create({
            data,
        });

        return game;
    }
}

export default new GameModel();
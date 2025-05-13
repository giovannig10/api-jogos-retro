import prisma from "../../prisma/prisma.js";

class RecordModel {
    // Obter todos os records
    async findAll() {
        const records = await prisma.record.findMany();
        
        return {
            total: records.length,
            records,
        }
    }

    //Criar um novo record
    async create(data) {
        const record = await prisma.record.create({
            data,
        });

        return record;
    }
}

export default new RecordModel();
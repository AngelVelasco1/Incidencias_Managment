import { getCollection } from "../db/conx.js";
import { autoIncrement } from "../helpers/autoincrement.js";

export class Incidences {
    id;
    id_user;
    id_place;
    id_status;
    id_priority;
    id_category;
    date; 
    description;
    constructor(){};

    async conx() {
        try {
            const incidence = await getCollection("incidences");
            return incidence;
        } catch(err) {
            console.log({err: err.message});
        };
    }



    async getIncidences() {
        try {
            const db = await this.conx();
            const incidences = await db.find({}).toArray();
            return incidences;
        } catch(err) {
            console.log({err: err.message});
        }
    }

    async addIncidence(data) { 
        try {
            const db = await this.conx();
            const id = await autoIncrement("incidences");
            const newIncidence = {
                id,
                ...data,
                date: new Date(data.date)
            }
            const result = await db.insertOne(newIncidence);
            return result

        } catch(err) {
            console.log({err: err.message});
        }
    }

    async updateIncidence(id, data) {
        try {
            const db = await this.conx();
            const updatedIncidence = {
                ...data,
                date: new Date(data.date)
            }
            const result = await db.updateOne({ "id": parseInt(id) }, { $set: updatedIncidence })
            return result

        } catch(err) {
            console.log({err: err.message});
        }
    }

    async deleteIncidence(id) {
        try {
            const db = await this.conx();
            const result = await db.deleteOne({ "id": parseInt(id) })
            return result
        } catch(err) {
            console.log({err: err.message});
        }
    }
}

import {MongoClient} from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb://localhost:27017/meetups')
        const db = client.db();

        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);

        console.log(result);

        await client.close();

        res.status(201).json({message: 'Meetup Inserted!'});

    }
}

export default handler;
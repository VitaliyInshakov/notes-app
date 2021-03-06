import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './utils/DataBaseUtils.js'
import { serverPort } from '../etc/config.json';

const app = express();

db.setUpConnect();

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

app.get('/notes', (req, res) => {
  db.listNotes().then(data => res.send(data));
});
app.post('/notes', (req, res) => {
  db.createNote(req.body).then(data => res.send(data));
});
app.delete('/notes/:id', (req, res) => {
  db.deleteNote(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, ()=>{
  console.log(`Server is up and running on port ${serverPort}`);
});
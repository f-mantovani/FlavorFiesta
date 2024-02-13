import 'dotenv/config';
import cors from 'cors'
import jsonServer from 'json-server';
import morgan from 'morgan';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT;

server.use(cors())
server.use(middlewares);
server.use(morgan('dev'));
server.use(router);

server.listen(PORT, () => {
	console.log(`JSON server is running on http://localhost:${PORT}`);
});

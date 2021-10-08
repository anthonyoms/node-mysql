import express, {Application} from 'express';
import cors from 'cors';
import routerUsuarios from '../routes/usuario.routes';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private paths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        this.middlewares();

        this.routes();
    }

   

    async dbConnection() {

        try {

          await  db.authenticate();

          console.log('Database Online');
            
        } catch (error) {

            throw new Error( error  );
        }
    }

    middlewares() {
        //CORS 
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() )

         //Directorio publico
         this.app.use( express.static('public') );
    }

    routes() {

        this.app.use(this.paths.usuarios, routerUsuarios )

    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en', this.port);
        });
    }

}

export default Server;
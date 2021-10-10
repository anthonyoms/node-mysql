import { Request, Response } from "express";
import Usuario from '../models/usuario';

export const getUsuarios = async (req: Request, res: Response) => {
    
    const usuarios = await Usuario.findAll(); 
    res.json(usuarios);
};

export const getUsuario = async (req: Request, res: Response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${id}`
        });
    }

  
};

export const postUsuario =  async (req: Request, res: Response) => {

    try {
        const {body} = req;

        const existeUser = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeUser) {
            return res.status(400).json({
                msg: `Ya existe un usuario con este correo ${body.email}`
            });
        };
    
        const usuario = await Usuario.create(body);

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json('Comuniquese con el administrador')
    }

};

export const putUsuario = async (req: Request, res: Response) => {

    try {
        const {body} = req;
        const {id} = req.params;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `El usuario con el id ${id} no existe`
            });
        };
    
         await usuario.update(body);

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json('Comuniquese con el administrador')
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {

    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(404).json({
            msg: `El usuario con el id ${id} no existe`
        });
    };

     await usuario.update({estado: false});

    res.json(usuario);
};


import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { People } from './entities/People'
import fetch from 'cross-fetch';

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(Users)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
    const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find();
    return res.json(users);
}

export const createPeople = async (req: Request, res: Response): Promise<Response> => {
    const baseURL = "https://swapi.dev/api/people";

    const fetchPeopleData = await fetch(baseURL)
        .then(async res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            const responseJson = await res.json();
            return responseJson.results;
        })
        .then(async people => {
            people.map(async (item: any, index: any) => {
                req.body.name = item.name;
                req.body.height = item.height;
                req.body.mass = item.mass;
                req.body.hair_color = item.hair_color;
                req.body.skin_color = item.skin_color;
                req.body.eye_color = item.eye_color;
                req.body.birth_year = item.birth_year;
                req.body.gender = item.gender;
                req.body.homeworld = item.homeworld;
                req.body.films = item.films;
                req.body.species = item.species;
                req.body.vehicles = item.vehicles;
                req.body.starships = item.starships;
                req.body.created = item.created;
                req.body.edited = item.edited;
                req.body.url = item.url;
                const newPeople = getRepository(People).create(req.body);  //Creo por cada iteración el personaje
                const results = await getRepository(People).save(newPeople); //Grabo el nuevo personaje
            });
            
        })
        .catch(err => {
            console.error(err);
        });

    const r = {
        message: "All People created",
        state: true
    }
    return res.json(r);
}
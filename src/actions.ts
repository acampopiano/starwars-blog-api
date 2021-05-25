import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { People } from './entities/People'
import fetch from 'cross-fetch';
import { Planets } from './entities/Planets'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(User)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(User).create(req.body);  //Creo un usuario
    const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
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

export const getPeople = async (req: Request, res: Response): Promise<Response> => {
    const people = await getRepository(People).find();
    return res.json(people);
}

export const getPeopleId = async (req: Request, res: Response): Promise<Response> => {
    const peopleRepo = getRepository(People)
    const people = await peopleRepo.findOne(req.params.id)
    if (!people) throw new Exception("Character does not exist")
    return res.json(people);
}

export const createPlanets = async (req: Request, res: Response): Promise<Response> => {
    const baseURL = "https://swapi.dev/api/planets";

    const fetchPlaneteData = await fetch(baseURL)
        .then(async res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            const responseJson = await res.json();
            return responseJson.results;
        })
        .then(async planet => {
            planet.map(async (item: any, index: any) => {
                req.body.name = item.name;
                req.body.rotation_period = item.rotation_period;
                req.body.orbital_period = item.orbital_period;
                req.body.diameter = item.diameter;
                req.body.climate = item.climate;
                req.body.gravity = item.gravity;
                req.body.terrain = item.terrain;
                req.body.surface_water = item.surface_water;
                req.body.population = item.population;
                req.body.residents = item.residents;
                req.body.films = item.films;
                req.body.created = item.created;
                req.body.edited = item.edited;
                req.body.url = item.url;
                const newPlanets = getRepository(Planets).create(req.body);  //Creo por cada iteración el personaje
                const results = await getRepository(Planets).save(newPlanets); //Grabo el nuevo personaje
            });

        })
        .catch(err => {
            console.error(err);
        });

    const r = {
        message: "All Planets created",
        state: true
    }
    return res.json(r);
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> => {
    const planets = await getRepository(Planets).find();
    return res.json(planets);
}

export const getPlanetId = async (req: Request, res: Response): Promise<Response> => {
    const planetsRepo = getRepository(Planets)
    const planet = await planetsRepo.findOne(req.params.id)
    if (!planet) throw new Exception("Planet does not exist")
    return res.json(planet);
}
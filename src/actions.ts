import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { People } from './entities/People'
import fetch from 'cross-fetch';
import { Planets } from './entities/Planets'
import jwt from 'jsonwebtoken'
import { LocalStorage } from "node-localstorage";
import { UserFavoritePlanets } from './entities/UserFavoritePlanets'
import { UserFavoritePeople } from './entities/UserFavoritePeople'
global.localStorage = new LocalStorage('./scratch');

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!validateEmail(req.body.email)) throw new Exception("Please provide a valid email address")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(User)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    let { first_name, last_name, email, password } = req.body;
    let oneUser = new User();

    oneUser.first_name = first_name;
    oneUser.last_name = last_name;
    oneUser.email = email;
    oneUser.password = password;
    oneUser.hashPassword();

    const newUser = getRepository(User).create(oneUser);  //Creo un usuario
    const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
}

/*export const addFavoritePeople = async (req: Request, res: Response): Promise<Response> => {
    const currentUser = await getRepository(User).findOne();
}*/

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

export const login = async (req: Request, res: Response): Promise<Response> => {
    let { email, password } = req.body;
    if (!email) throw new Exception("Please specify an email on your request body", 400)
    if (!password) throw new Exception("Please specify a password on your request body", 400)
    if (!validateEmail(email)) throw new Exception("Please provide a valid email address", 400)
    
    const userRepo = getRepository(User)
    const user = await userRepo.findOne({ where: { email } })
    if (!user) throw new Exception("Invalid email", 401)
    if (!user.checkIfUnencryptedPasswordIsValid(password)) throw new Exception("Invalid password", 401)
    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: process.env.JWT_TOKEN_EXPIRE_IN});
    res.cookie('currentUser', email);        
    return res.cookie('auth-token', token, {httpOnly: true, path:'/', domain: 'localhost'}).json({ user, token });
}

export const logout = async (req: Request, res: Response) => {
   // req.session.destroy();
    
    res.status(202).clearCookie('auth-token').send('Success logged out')
    
}

const validateEmail = (email: string) => {
    const res = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(email);
}

export const addFavoritePeople = async (req: Request, res: Response): Promise<Response> => {
   const { people_id } = req.params 
    
    let raw:any = req.user
    let user_id:number=0;
    const map = {}
    ;[raw].forEach((item:any,index:any) =>{
       user_id = item.user.id;
    })
    
    const peopleRepo = getRepository(People)
    const userRepo = getRepository(User)
    const userFavoritePeopleRepo = getRepository(UserFavoritePeople);
    const people = await peopleRepo.findOne({ where: { id: people_id } })
    const userSearch = await userRepo.findOne({where:{id: user_id}})
    const userFavoritePeople = await userFavoritePeopleRepo.findOne({
        relations: ['user','people'],
        where: {
            people: people, 
            user: userSearch
        }
    })    
    if (!people) throw new Exception("People id not found")
    if (!req.params) throw new Exception("Please provide a people id")
    if (!userSearch) throw new Exception("User not found")
    
    if(userFavoritePeople) throw new Exception("People/User relation exists!")  
    
    const oneUFP = new UserFavoritePeople();    
    oneUFP.people = people;
    oneUFP.user = userSearch;     

    const newUFP = userFavoritePeopleRepo.create(oneUFP);          
    const results = await userFavoritePeopleRepo.save(newUFP); 
    return res.json(results);    
}

export const delFavoritePeople = async (req: Request, res: Response): Promise<Response> => {
   const { people_id } = req.params 
    
    let raw:any = req.user
    let user_id:number=0;
    const map = {}
    ;[raw].forEach((item:any,index:any) =>{
       user_id = item.user.id;
    })
    
    const peopleRepo = getRepository(People)
    const userRepo = getRepository(User)
    const userFavoritePeopleRepo = getRepository(UserFavoritePeople);
    const people = await peopleRepo.findOne({ where: { id: people_id } })
    const userSearch = await userRepo.findOne({where:{id: user_id}})
    const userFavoritePeople = await userFavoritePeopleRepo.findOne({
        relations: ['user','people'],
        where: {
            people: people, 
            user: userSearch
        }
    })    
    if (!people) throw new Exception("People id not found")
    if (!req.params) throw new Exception("Please provide a people id")
    if (!userSearch) throw new Exception("User not found")
    
    if(!userFavoritePeople) throw new Exception("People/User relation not exists!")  
    
    const oneUFP = new UserFavoritePeople();    
    oneUFP.people = people;
    oneUFP.user = userSearch;     
            
    const results = await userFavoritePeopleRepo.delete(oneUFP); 
    return res.json(results);    
}
export const addFavoritePlanet = async (req: Request, res: Response): Promise<Response> => {
    const { planet_id } = req.params 
    
    let raw:any = req.user
    let user_id:number=0;
    const map = {}
    ;[raw].forEach((item:any,index:any) =>{
       user_id = item.user.id;
    })
    
    const planetRepo = getRepository(Planets)
    const userRepo = getRepository(User)
    const userFavoritePlanetsRepo = getRepository(UserFavoritePlanets);
    const planet = await planetRepo.findOne({ where: { id: planet_id } })
    const userSearch = await userRepo.findOne({where:{id: user_id}})
    const userFavoritePlanets = await userFavoritePlanetsRepo.findOne({
        relations: ['user','planets'],
        where: {
            planets: planet, 
            user: userSearch
        }
    })    
    if (!planet) throw new Exception("Planet id not found")
    if (!req.params) throw new Exception("Please provide a planet id")
    if (!userSearch) throw new Exception("User not found")
    
    if(userFavoritePlanets) throw new Exception("Planet/User relation exists!")  
    
    const oneUFP = new UserFavoritePlanets();    
    oneUFP.planets = planet;
    oneUFP.user = userSearch;     

    const newUFP = userFavoritePlanetsRepo.create(oneUFP);          
    const results = await userFavoritePlanetsRepo.save(newUFP);
    return res.json(results);
}

export const delFavoritePlanet = async (req: Request, res: Response): Promise<Response> => {
    const { planet_id } = req.params 
    
    let raw:any = req.user
    let user_id:number=0;
    const map = {}
    ;[raw].forEach((item:any,index:any) =>{
       user_id = item.user.id;
    })
    
    const planetRepo = getRepository(Planets)
    const userRepo = getRepository(User)
    const userFavoritePlanetsRepo = getRepository(UserFavoritePlanets);
    const planet = await planetRepo.findOne({ where: { id: planet_id } })
    const userSearch = await userRepo.findOne({where:{id: user_id}})
    const userFavoritePlanets = await userFavoritePlanetsRepo.findOne({
        relations: ['user','planets'],
        where: {
            planets: planet, 
            user: userSearch
        }
    })    
    if (!planet) throw new Exception("Planet id not found")
    if (!req.params) throw new Exception("Please provide a planet id")
    if (!userSearch) throw new Exception("User not found")
    
    if(!userFavoritePlanets) throw new Exception("Planet/User relation not exists!")  
    
    const oneUFP = new UserFavoritePlanets();    
    oneUFP.planets = planet;
    oneUFP.user = userSearch;     
     
    const results = await userFavoritePlanetsRepo.delete(oneUFP);
    return res.json(results);
}
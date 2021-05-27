/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */
import { Request, Response } from 'express'
import { Router, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { verify } from 'crypto';

const verifyToken = (req: Request, res: Response, next:NextFunction) =>
{
    const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');
    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    console.log(decoded);
    next()
}

// declare a new router to include all the endpoints
const router = Router();

router.get('/users', verifyToken, safe(actions.getUsers));
router.get('/createPeople', verifyToken, safe(actions.createPeople));
router.get('/people',verifyToken, safe(actions.getPeople));
router.get('/people/:id',verifyToken, safe(actions.getPeopleId));
router.get('/createPlanets', verifyToken,safe(actions.createPlanets));
router.get('/planets', verifyToken, safe(actions.getPlanets));
router.get('/planets/:id',verifyToken, safe(actions.getPlanetId));
router.get('/users/favorites', verifyToken, safe(actions.getUsersFavorites));

router.post('/logout', safe(actions.logout));
router.post('/favorite/people/:people_id',verifyToken,safe(actions.addFavoritePeople));
router.post('/favorite/planet/:planet_id',verifyToken,safe(actions.addFavoritePlanet));

router.delete('/favorite/people/:people_id',verifyToken,safe(actions.delFavoritePeople));
router.delete('/favorite/planet/:planet_id',verifyToken,safe(actions.delFavoritePlanet));

export default router;

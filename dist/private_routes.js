"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    var token = req.header('Authorization');
    if (!token)
        return res.status(400).json('ACCESS DENIED');
    var decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log(decoded);
    next();
};
// declare a new router to include all the endpoints
var router = express_1.Router();
router.get('/users', verifyToken, utils_1.safe(actions.getUsers));
router.get('/createPeople', verifyToken, utils_1.safe(actions.createPeople));
router.get('/people', verifyToken, utils_1.safe(actions.getPeople));
router.get('/people/:id', verifyToken, utils_1.safe(actions.getPeopleId));
router.get('/createPlanets', verifyToken, utils_1.safe(actions.createPlanets));
router.get('/planets', verifyToken, utils_1.safe(actions.getPlanets));
router.get('/planets/:id', verifyToken, utils_1.safe(actions.getPlanetId));
router.post('/favorite/people/<int:people_id>', verifyToken, utils_1.safe(actions.addFavoritePeople));
router.post('/favorite/planet/<int:planet_id>', verifyToken, utils_1.safe(actions.addFavoritePlanet));
exports["default"] = router;

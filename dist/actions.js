"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getPlanetId = exports.getPlanets = exports.createPlanets = exports.getPeopleId = exports.getPeople = exports.createPeople = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var utils_1 = require("./utils");
var People_1 = require("./entities/People");
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var Planets_1 = require("./entities/Planets");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(User_1.User).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var createPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var baseURL, fetchPeopleData, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseURL = "https://swapi.dev/api/people";
                return [4 /*yield*/, cross_fetch_1["default"](baseURL)
                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        var responseJson;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (res.status >= 400) {
                                        throw new Error("Bad response from server");
                                    }
                                    return [4 /*yield*/, res.json()];
                                case 1:
                                    responseJson = _a.sent();
                                    return [2 /*return*/, responseJson.results];
                            }
                        });
                    }); })
                        .then(function (people) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            people.map(function (item, index) { return __awaiter(void 0, void 0, void 0, function () {
                                var newPeople, results;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
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
                                            newPeople = typeorm_1.getRepository(People_1.People).create(req.body);
                                            return [4 /*yield*/, typeorm_1.getRepository(People_1.People).save(newPeople)];
                                        case 1:
                                            results = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); })["catch"](function (err) {
                        console.error(err);
                    })];
            case 1:
                fetchPeopleData = _a.sent();
                r = {
                    message: "All People created",
                    state: true
                };
                return [2 /*return*/, res.json(r)];
        }
    });
}); };
exports.createPeople = createPeople;
var getPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).find()];
            case 1:
                people = _a.sent();
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getPeople = getPeople;
var getPeopleId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var peopleRepo, people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                peopleRepo = typeorm_1.getRepository(People_1.People);
                return [4 /*yield*/, peopleRepo.findOne(req.params.id)];
            case 1:
                people = _a.sent();
                if (!people)
                    throw new utils_1.Exception("Character does not exist");
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getPeopleId = getPeopleId;
var createPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var baseURL, fetchPlaneteData, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseURL = "https://swapi.dev/api/planets";
                return [4 /*yield*/, cross_fetch_1["default"](baseURL)
                        .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        var responseJson;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (res.status >= 400) {
                                        throw new Error("Bad response from server");
                                    }
                                    return [4 /*yield*/, res.json()];
                                case 1:
                                    responseJson = _a.sent();
                                    return [2 /*return*/, responseJson.results];
                            }
                        });
                    }); })
                        .then(function (planet) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            planet.map(function (item, index) { return __awaiter(void 0, void 0, void 0, function () {
                                var newPlanets, results;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
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
                                            newPlanets = typeorm_1.getRepository(Planets_1.Planets).create(req.body);
                                            return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(newPlanets)];
                                        case 1:
                                            results = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); })["catch"](function (err) {
                        console.error(err);
                    })];
            case 1:
                fetchPlaneteData = _a.sent();
                r = {
                    message: "All Planets created",
                    state: true
                };
                return [2 /*return*/, res.json(r)];
        }
    });
}); };
exports.createPlanets = createPlanets;
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var getPlanetId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetsRepo, planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planetsRepo = typeorm_1.getRepository(Planets_1.Planets);
                return [4 /*yield*/, planetsRepo.findOne(req.params.id)];
            case 1:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Planet does not exist");
                return [2 /*return*/, res.json(planet)];
        }
    });
}); };
exports.getPlanetId = getPlanetId;

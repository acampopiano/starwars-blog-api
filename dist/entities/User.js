"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var UserFavoritePlanets_1 = require("./UserFavoritePlanets");
var UserFavoritePeople_1 = require("./UserFavoritePeople");
var UserFavoriteVehicles_1 = require("./UserFavoriteVehicles");
var class_validator_1 = require("class-validator");
var bcrypt = __importStar(require("bcryptjs"));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.hashPassword = function () {
        this.password = bcrypt.hashSync(this.password, 8);
    };
    User.prototype.checkIfUnencryptedPasswordIsValid = function (unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "first_name");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "last_name");
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column(),
        class_validator_1.Length(4, 100),
        __metadata("design:type", String)
    ], User.prototype, "password");
    __decorate([
        typeorm_1.OneToMany(function () { return UserFavoritePlanets_1.UserFavoritePlanets; }, function (userfavoriteplanets) { return userfavoriteplanets.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "userfavoriteplanets");
    __decorate([
        typeorm_1.OneToMany(function () { return UserFavoritePeople_1.UserFavoritePeople; }, function (userfavoritepeople) { return userfavoritepeople.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "userfavoritepeople");
    __decorate([
        typeorm_1.OneToMany(function () { return UserFavoriteVehicles_1.UserFavoriteVehicles; }, function (userfavoritevehicles) { return userfavoritevehicles.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "userfavoritvehicles");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Vehicles = void 0;
var typeorm_1 = require("typeorm");
var PeopleVehicle_1 = require("./PeopleVehicle");
var Vehicles = /** @class */ (function (_super) {
    __extends(Vehicles, _super);
    function Vehicles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Vehicles.prototype, "id");
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Vehicles.prototype, "name");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vehicles.prototype, "model");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vehicles.prototype, "vehicle_class");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vehicles.prototype, "manufacturer");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Vehicles.prototype, "cost_in_credits");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Vehicles.prototype, "length");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Vehicles.prototype, "crew");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Vehicles.prototype, "passengers");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Vehicles.prototype, "max_atmosphering_speed");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Vehicles.prototype, "cargo_capacity");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vehicles.prototype, "consumables");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vehicles.prototype, "imageURL");
    __decorate([
        typeorm_1.OneToMany(function () { return PeopleVehicle_1.PeopleVehicle; }, function (peoplevehicle) { return peoplevehicle.vehicles; }),
        __metadata("design:type", Array)
    ], Vehicles.prototype, "peoplevehicle");
    Vehicles = __decorate([
        typeorm_1.Entity()
    ], Vehicles);
    return Vehicles;
}(typeorm_1.BaseEntity));
exports.Vehicles = Vehicles;

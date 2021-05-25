import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity
} from 'typeorm';

import { People } from "./People"
import { Vehicles } from "./Vehicles"
@Entity()
export class PeopleVehicle extends BaseEntity {              
    
    //Relationship with people(many peoplevehicle to one people)    
    @ManyToOne(() => People, people => people.id,{primary: true})    
    people: People;
    
    //Relationship with vehicle(many peoplevehicle to one vehicle)    
    @ManyToOne(() => Vehicles, vehicle => vehicle.id,{primary: true,})    
    vehicles: Vehicles;
}
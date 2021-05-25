import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity
  } from 'typeorm';
  
  import {PeopleVehicle} from "./PeopleVehicle"
  @Entity()
  export class Vehicles extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({unique: true})
    name: string;
  
    @Column()
    model: string;
  
    @Column()
    vehicle_class: string;
  
    @Column()
    manufacturer: string;
  
    @Column()
    cost_in_credits: number;

    @Column()
    length: number;

    @Column()
    crew: number;

    @Column()
    passengers: number;

    @Column()
    max_atmosphering_speed: number;

    @Column()
    cargo_capacity: number;

    @Column()
    consumables: string;
    
    @Column()
    imageURL: string;
    
    //Relationship with peoplevehicles (one people drive many vehicles)
    @OneToMany(() => PeopleVehicle, peoplevehicle => peoplevehicle.vehicles)
    peoplevehicle: PeopleVehicle[];     
  }
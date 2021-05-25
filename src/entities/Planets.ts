import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
  import {People} from "./People";

  @Entity()
  export class Planets extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({unique: true})
    name: string;
  
    @Column()
    description: string;
  
    @Column()
    diameter: number;
  
    @Column()
    rotation_period: number;
  
    @Column()
    orbital_period: number;

    @Column()
    gravity: string;

    @Column()
    population: number;

    @Column()
    climate: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: number;

    @Column()
    imageURL: string;
    
    //Relationship with peple (one planet to many people)
    @OneToMany(() => People, people => people.planets)
    peoples: People[];    
  }
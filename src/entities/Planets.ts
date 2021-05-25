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
    rotation_period: number;

    @Column()
    orbital_period: number;
    
    @Column()
    diameter: number;            

    @Column()
    climate: string;

    @Column()
    gravity: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: number;

    @Column()
    population: number;

    @Column({type: 'text', array: true, nullable: true })
    residents: string[];

    @Column({type: 'text', array: true, nullable: true })
    films: string[];

    @Column()
    created: Date;

    @Column()
    edited: Date;

    @Column()
    url: string;
    
    //Relationship with peple (one planet to many people)
    @OneToMany(() => People, people => people.planets)
    peoples: People[];    
  }
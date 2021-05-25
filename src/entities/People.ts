import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,
    BaseEntity
  } from 'typeorm';
  
  import {Planets} from "./Planets"
  import {PeopleVehicle} from "./PeopleVehicle"

  @Entity()
  export class People extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    planet_id: number;
    
    @Column({unique: true})
    name: string;
  
    @Column()
    height: number;
  
    @Column()
    mass: number;
  
    @Column()
    hair_color: string;
  
    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    birth_year: number;

    @Column()
    gender: string;

    @Column()
    homeworld: string;

    @Column()
    imageURL: string;

    //Relationship with planets (many people to one planet)
    @ManyToOne(() => Planets, planets => planets.peoples)
    planets: Planets;   
    
    //Relationship with peoplevehicles (one people drive many vehicles)
    @OneToMany(() => PeopleVehicle, peoplevehicle => peoplevehicle.vehicles)
    peoplevehicle: PeopleVehicle[];       
  }
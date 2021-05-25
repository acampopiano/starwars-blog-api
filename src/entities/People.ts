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
    birth_year: string;

    @Column()
    gender: string;

    @Column()
    homeworld: string;
    
    @Column({type: 'text', array: true, nullable: true })
    films: string[];

    @Column({type: 'text', array: true, nullable: true })
    species: string[];

    @Column({type: 'text', array: true, nullable: true })
    vehicles:string[];

    @Column({type: 'text', array: true, nullable: true })
    starships:string[];

    @Column()
    created: Date;

    @Column()
    edited: Date;

    @Column()
    url: string;

    //Relationship with planets (many people to one planet)
    @ManyToOne(() => Planets, planets => planets.peoples)
    planets: Planets;   
    
    //Relationship with peoplevehicles (one people drive many vehicles)
    @OneToMany(() => PeopleVehicle, peoplevehicle => peoplevehicle.vehicles,{cascade: true})
    peoplevehicle: PeopleVehicle[];       
  }
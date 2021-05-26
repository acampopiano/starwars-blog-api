import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity
  } from 'typeorm';
  
  import {UserFavoritePlanets} from "./UserFavoritePlanets";
  import {UserFavoritePeople} from "./UserFavoritePeople"
  import {UserFavoriteVehicles} from "./UserFavoriteVehicles"
  import { Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from 'bcryptjs';
  @Entity()
  export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    first_name: string;
  
    @Column()
    last_name: string;
  
    @Column({unique: true})
    email: string;
  
    @Column()
    @Length(4, 100)
    password: string;
    
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    //Relationship with UserFavoritePlanets (one user like many planets)
    @OneToMany(() => UserFavoritePlanets, userfavoriteplanets => userfavoriteplanets.user)
    userfavoriteplanets: UserFavoritePlanets[];
    
    //Relationship with UserFavoritePeople (one user like many people)
    @OneToMany(() => UserFavoritePeople, userfavoritepeople => userfavoritepeople.user)
    userfavoritepeople: UserFavoritePeople[];

    //Relationship with UserFavoriteVehicles (one user like many vehicles)
    @OneToMany(() => UserFavoriteVehicles, userfavoritevehicles => userfavoritevehicles.user)
    userfavoritvehicles: UserFavoriteVehicles[];
  }
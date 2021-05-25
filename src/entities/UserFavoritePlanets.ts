  
import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity
} from 'typeorm';

import { User } from "./User"
import { Planets } from "./Planets"
@Entity()
export class UserFavoritePlanets extends BaseEntity {    
    //Relationship with planets(many userfavoriteplanets to one planet)
    @ManyToOne(() => Planets, planet => planet.id)
    planets: Planets;
    
    //Relationship with user(many userfavoritepeople to one user)
    @ManyToOne(() => User, user => user.id)
    user: User;
}
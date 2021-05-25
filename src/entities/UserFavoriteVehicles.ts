import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity
} from 'typeorm';

import { User } from "./User"
import { Vehicles } from "./Vehicles"
@Entity()
export class UserFavoriteVehicles extends BaseEntity {
    //Relationship with vehicles(many userfavoriteplanets to one vehicle)
    @ManyToOne(() => Vehicles, vehicle => vehicle.id,{primary: true})
    vehicles: Vehicles;
    
    //Relationship with user(many userfavoritepeople to one user)
    @ManyToOne(() => User, user => user.id,{primary: true})
    user: User;
}
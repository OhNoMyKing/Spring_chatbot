import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";
import { Cart } from "./cart.entity";
import { Rating } from "./rating.entity";


@Entity('user')
export class User{
    @PrimaryGeneratedColumn({name : 'id'})
    id : number;
    @Column({name: 'name', type: 'varchar', length: 255})
    name : string;
    @Column({name: 'password', type: 'varchar', length:255})
    password: string;
    @Column({name : 'email', type: 'varchar',length:255,unique:true})
    email: string;
    @Column({name: 'phone_number',type:'varchar',length:255,nullable: true})
    phoneNumber: string;
    @Column({name: 'address',type: 'varchar',length:255,nullable:true})
    address: string;
    @Column({name:'is_active',type: 'boolean',default: true})
    isActive: boolean;
    @CreateDateColumn({name:'create_date',type:'timestamp'})
    createAt : Date;
    @UpdateDateColumn({name:'update_date',type: 'timestamp'})
    updateAt: Date;
    @DeleteDateColumn({name:'delete_date',type: 'timestamp'})
    deleteAt: Date;
    //relationships
    @ManyToMany(() => Role, (role) => role.user)
    @JoinTable({
        name: 'user_role',
        joinColumn:{
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn:{
            name: 'role_id',
            referencedColumnName: 'id',
        }
    })
    role : Role[];
    //cart
    @OneToMany(()=> Cart, (cart) => cart.user)
    cart : Cart[];
    //ratings
    @OneToMany(()=> Rating, (rating) => rating.user)
    rating : Rating[];
}
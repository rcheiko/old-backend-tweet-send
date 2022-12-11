import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({unique: true})
    user_id: string;

    @Column()
    @Field()
    accessToken: string;

    @Column()
    @Field()
    accessSecret: string;
}
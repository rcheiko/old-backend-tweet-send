import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field(() => String)
    @PrimaryColumn()
    user_id: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true })
    accessToken: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true })
    accessSecret: string;
}
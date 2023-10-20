import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoreEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @CreateDateColumn({ name: 'created_at'})
    createAt: Date;

    @Column({name:'created_by', type: 'bigint'})
    createdBy: number;

    @DeleteDateColumn({name: 'deleted_at', nullable: true})
    deletedAt?: Date;

    @Column({name:'deleted_by', type:'bigint',nullable:true})
    deletedBy?: number;

    @Column({name:'deleted', type:'bigint', default:0})
    deleted?: number;

    @Column({name:'remark', default: null})
    remark?: string;
}

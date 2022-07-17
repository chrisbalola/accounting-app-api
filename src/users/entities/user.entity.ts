import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: "varchar", length: 50 })
  firstName: string;

  @Column({ type: "varchar", length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Exclude() // Using the class-transformer to make sure the password is excluded from results that are returned to the user
  @Column({ type: 'varchar' })
  password: string;

  @Column({ nullable: true, default: null })
  lastSeenAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  // --

  // For the properties excluded using class-transformer
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

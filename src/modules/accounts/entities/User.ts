import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

Entity('users');
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  // eslint-disable-next-line camelcase
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };

import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryKey, CreateDateColumn } from 'typeorm';

@Entity()
class Specification {
  @PrimaryKey()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  public created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Specification };

import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryColumn()
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

export { Category };

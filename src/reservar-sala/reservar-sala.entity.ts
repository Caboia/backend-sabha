// src/reservar-sala/sala.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomName: string;

  @Column({ nullable: true })
  roomImage: string;

  @Column()
  roomLocation: string;

  @Column({ type: 'date' })
  dateOfUse: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column()
  responsiblePerson: string;

  @Column()
  reasonForUse: string;

  @Column()
  additionalInfo: string;

  @Column()
  guests: string;
}

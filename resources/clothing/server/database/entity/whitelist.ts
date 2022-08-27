import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "whitelist" })
export class DBWhitelist {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column("varchar", { name: "DiscordID", length: 128 })
  DiscordID: string;

  @Column("varchar", { name: "Username", length: 128 })
  Username: string;
}

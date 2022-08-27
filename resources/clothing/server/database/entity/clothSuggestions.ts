import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "cloth_suggestion" })
export class DBClothSuggestion {
  @PrimaryGeneratedColumn({ name: "ID" })
  ID: number;

  @Column("int", { name: "ComponentId" })
  ComponentId: number;

  @Column("int", { name: "DrawableId" })
  DrawableId: number;

  @Column("int", { name: "TextureId" })
  TextureId: number;

  @Column("varchar", { name: "PlayerModel", length: 128 })
  PlayerModel: string;

  @Column("varchar", { name: "Name", length: 128 })
  Name: string;

  @Column("varchar", { name: "DlcName", length: 128 })
  DlcName: string;

  @Column("varchar", { name: "DiscordID", length: 128 })
  DiscordID: string;
}

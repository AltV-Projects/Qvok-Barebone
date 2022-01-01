import { emitServer, on, Player } from "alt-client";

const player: Player = Player.local;

on("connectionComplete", () => {
  emitServer("client::event::connectionComplete");
});

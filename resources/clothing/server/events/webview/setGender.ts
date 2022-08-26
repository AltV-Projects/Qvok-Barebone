import { onClient, Player } from "alt-server";
import { log } from "alt-shared";

onClient("client::setGender", (player: Player, gender: number) => {
  player.model = gender == 0 ? "mp_m_freemode_01" : "mp_f_freemode_01";
});

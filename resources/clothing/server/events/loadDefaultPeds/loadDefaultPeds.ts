import { emitClient, onClient, Player } from "alt-server";
import { Camera } from "../../../client/helper";

onClient("client::loadDefaultPeds::Finished", (player: Player) => {
  player.model = "mp_m_freemode_01";
  player.dimension = player.id;
  player.spawn(402.9195, -996.6182, -100.00020599365234, 0);
});

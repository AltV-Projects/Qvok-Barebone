import { emitClient, log, onClient, Player } from "alt-server";
import { AppDataSource } from "../../database";
import { DBClothSuggestion } from "../../database/entity";

const clothingSuggestionRepository =
    AppDataSource.getRepository(DBClothSuggestion);

onClient(
    "client::setComponentName",
    async (
        player: Player,
        componentId: number,
        drawableId: number,
        textureId: number,
        name: string
    ) => {
        let clothingSuggestion = new DBClothSuggestion();
        clothingSuggestion.ComponentId = componentId;
        clothingSuggestion.DlcName = "unknown";
        clothingSuggestion.DrawableId = drawableId;
        clothingSuggestion.Name = name;
        clothingSuggestion.TextureId = textureId;
        clothingSuggestion.PlayerModel = player.model.toString();
        clothingSuggestion.DiscordID = player.discordID || player.name;

        try {
            const result = await clothingSuggestionRepository.save(
                clothingSuggestion
            );
            if (result) emitClient(player, "server::setNameForComponent", !!result);
            emitClient(player, "server:getComponentName", name, [name]);
        } catch (ex) {
            log("Could not save cloth data due the following error", ex);
        }
    }
);

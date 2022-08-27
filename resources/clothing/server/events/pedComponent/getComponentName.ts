import { emitClient, on, onClient, Player } from "alt-server";
import { log } from "alt-shared";
import { AppDataSource } from "../../database";
import { DBCloth, DBClothSuggestion } from "../../database/entity";
import { IVariation } from "../../interfaces";

let clothing: IVariation[] = [];
const clothingRepository = AppDataSource.getRepository(DBCloth);
const clothingSuggestionRepository =
    AppDataSource.getRepository(DBClothSuggestion);

on("db::connected", async () => {
    const tmp = await clothingRepository.find();
    log(`Found ${tmp.length} clothes in our database`);
    tmp.forEach((item) => {
        const tmpCloth: IVariation = {
            DlcName: item.DlcName,
            PedName: item.PlayerModel,
            ComponentId: item.ComponentId,
            DrawableId: item.DrawableId,
            TextureId: item.TextureId,
            Label: item.Name,
        };
        clothing.push(tmpCloth);
    });
    log(`Added ${clothing.length} clothes to quick access`);
});

onClient(
    "client::getComponentName",
    async (
        player: Player,
        componentId: number,
        drawableId: number,
        textureId: number
    ) => {
        const modelName =
            player.model == 1885233650 ? "mp_m_freemode_01" : "mp_f_freemode_01";
        let drawableSuggestions: string[] = [];
        let name: string = "";
        try {
            const componentName = clothing.find(
                (item) =>
                    item.ComponentId == componentId &&
                    item.DrawableId == drawableId &&
                    item.TextureId == textureId &&
                    item.PedName == modelName
            );

            name = componentName ? componentName.Label : "";
            const similarDrawable = await clothingSuggestionRepository.find({
                where: {
                    ComponentId: componentId,
                    DrawableId: drawableId,
                    TextureId: textureId,
                    PlayerModel: player.model.toString(),
                },
            });
            similarDrawable.forEach((item) => drawableSuggestions.push(item.Name));

            emitClient(player, "server:getComponentName", name, drawableSuggestions);
        } catch (ex) {
            log("There was an error getting the requested cloth", ex);
        }
    }
);
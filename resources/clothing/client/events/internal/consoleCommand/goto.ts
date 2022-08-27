import { emitServer, on } from "alt-client";
import { Vector3 } from "alt-shared";

on("consoleCommand", (command: string, ...args: string[]) => {
  emitServer(
    "consoleCommand::goto",
    new Vector3(parseFloat(args[0]), parseFloat(args[1]), parseFloat(args[2]))
  );
});

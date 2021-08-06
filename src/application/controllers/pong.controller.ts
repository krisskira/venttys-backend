import { Controller } from "../../domain";
import { pongUseCase } from "../user-cases/pong";

export const pongController: Controller<void, Promise<string>> = async (_, __): Promise<string> => {
    return await pongUseCase();
};

export default pongController;

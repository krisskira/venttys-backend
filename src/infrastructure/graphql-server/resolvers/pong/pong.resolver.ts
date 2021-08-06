import { pongController } from "../../../../application/controllers";
import { iResolver } from "../../interfaces";

const pingResolver: iResolver<void> = async (_, args, context, __) => {
    return await pongController(args, context)
}

module.exports = {
    Query: {
        ping: pingResolver,
    },
};

import * as path from "path";
export type WhatsAppMessageType = "GET_STATUS" | "REGEN_QR" | "CLOSE_SESSION" | "END";
export const WhatsAppScriptPathHandler = path.join(
  "src/infrastructure/whatsapp-handler/index.js"
);

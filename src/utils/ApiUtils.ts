import { Logger } from "../helpers/Logger";
import { tryStringifyJSON } from "./DataUtils";

const logger = new Logger("API");

export function apiLogger(request: Request) {
  logger.log(`================ ${request.method} ================`);
  logger.log(`Url -> ${request.url}`);
  logger.log(`Headers -> ${tryStringifyJSON(request.headers)}`);
  logger.log(`====================================`);
}

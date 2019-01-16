import { Flags, ClientConfigs, ServerConfigs } from "../types";

export interface ConfigsBundle extends Flags {
  clientConfigs: ClientConfigs,
  serverConfigs: ServerConfigs,
}
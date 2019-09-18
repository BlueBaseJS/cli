import { MainConfigs, RendererConfigs } from './configs';
import { BuilderOptions } from '@bluebase/cli-web';
export interface WebpackHookArguments extends BuilderOptions {
    mainConfigs: MainConfigs;
    rendererConfigs: RendererConfigs;
}

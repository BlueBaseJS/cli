import { Configuration } from 'webpack';
import { WebpackBuilder } from '../../webpack';

export type WebpackBuilderMiddlewareFn = (config: Configuration, builder: WebpackBuilder) => Configuration;
export type WebpackBuilderMiddleware = (options?: any) => WebpackBuilderMiddlewareFn;

export type ESModule<T> = {
	__esModule: boolean;
	default: T;
};

export type MaybeESModule<T> = T | ESModule<T>;

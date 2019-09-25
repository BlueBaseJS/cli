/**
 * Copies a directory from source to destination. If folder already exists,
 * asks for confirmation to overwrite.
 * @param src
 * @param dest
 */
export declare const copyAll: (src: string, dest: string, prompt?: boolean, force?: boolean) => Promise<void>;

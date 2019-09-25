export interface TemplateOptions {
    force?: boolean;
    /** Do we prompt to override files? */
    prompt?: boolean;
    /**
     * List of files to write variables to files.
     * Each item is a relative path from dest.
     */
    writeFiles?: string[];
    /**
     * Variables to write.
     */
    variables?: {
        [key: string]: string;
    };
}
/**
 * Copies files from src to dest. Injects variable in writable files.
 * @param src Path to template src
 * @param dest Path to template dest
 * @param opts Options
 */
export declare const copyTemplateFiles: (src: string, dest: string, opts?: TemplateOptions | undefined) => Promise<void>;

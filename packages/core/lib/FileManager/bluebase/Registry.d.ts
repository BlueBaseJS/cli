export interface RegistryContext {
    Logger: any;
    [key: string]: any;
}
/**
 * A Base Registry
 */
export declare class Registry<RegistryItemType, Parent = RegistryContext> {
    /** Internal data */
    protected data: Map<string, RegistryItemType>;
    /** Parent context */
    protected ctx: Parent;
    constructor(ctx: Parent);
    /**
     * The set() method adds or updates an element with a specified
     * key and value to a Registry object.
     * @param key
     * @param value
     */
    set(key: string, value: RegistryItemType): void;
    /**
     * The get() method returns a specified element from a Registry object.
     * @param key
     */
    get(key: string): RegistryItemType | undefined;
    /**
     * The has() method returns a boolean indicating whether an element
     * with the specified key exists or not.
     * @param key
     */
    has(key: string): boolean;
    /**
     * The delete() method removes the specified element from a Registry object.
     * @param key
     */
    delete(key: string): boolean;
    /**
     * The clear() method removes all elements from a Registry object.
     */
    clear(): void;
    /**
     * The entries() method returns a new Iterator object that
     * contains the [key, value] pairs for each element in the Registry
     * object in insertion order.
     */
    entries(): () => IterableIterator<[string, RegistryItemType]>;
    /**
     * The forEach() method executes a provided function once per
     * each key/value pair in the Registry object, in insertion order.
     * @param callbackfn
     * @param thisArg
     */
    forEach(callbackfn: (value: RegistryItemType, key: string, map: Map<string, RegistryItemType>) => void, thisArg?: any): void;
    /**
     * The keys() method returns a new Iterator object that contains
     * the keys for each element in the Registry object in insertion order.
     */
    keys(): IterableIterator<string>;
    /**
     * The values() method returns a new Iterator object that contains
     * the values for each element in the Registry object in insertion order.
     */
    values(): IterableIterator<RegistryItemType>;
}

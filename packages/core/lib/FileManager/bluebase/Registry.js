"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A Base Registry
 */
class Registry {
    constructor(ctx) {
        /** Internal data */
        this.data = new Map();
        this.ctx = ctx;
    }
    /**
     * The set() method adds or updates an element with a specified
     * key and value to a Registry object.
     * @param key
     * @param value
     */
    set(key, value) {
        this.data.set(key, value);
    }
    /**
     * The get() method returns a specified element from a Registry object.
     * @param key
     */
    get(key) {
        return this.data.get(key);
    }
    /**
     * The has() method returns a boolean indicating whether an element
     * with the specified key exists or not.
     * @param key
     */
    has(key) {
        return this.data.has(key);
    }
    /**
     * The delete() method removes the specified element from a Registry object.
     * @param key
     */
    delete(key) {
        return this.data.delete(key);
    }
    /**
     * The clear() method removes all elements from a Registry object.
     */
    clear() {
        this.data.clear();
    }
    /**
     * The entries() method returns a new Iterator object that
     * contains the [key, value] pairs for each element in the Registry
     * object in insertion order.
     */
    entries() {
        return this.data.entries;
    }
    /**
     * The forEach() method executes a provided function once per
     * each key/value pair in the Registry object, in insertion order.
     * @param callbackfn
     * @param thisArg
     */
    forEach(callbackfn, thisArg) {
        this.data.forEach(callbackfn, thisArg);
    }
    /**
     * The keys() method returns a new Iterator object that contains
     * the keys for each element in the Registry object in insertion order.
     */
    keys() {
        return this.data.keys();
    }
    /**
     * The values() method returns a new Iterator object that contains
     * the values for each element in the Registry object in insertion order.
     */
    values() {
        return this.data.values();
    }
}
exports.Registry = Registry;
//# sourceMappingURL=Registry.js.map
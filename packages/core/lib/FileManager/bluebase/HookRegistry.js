"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Registry_1 = require("./Registry");
const lodash_isnil_1 = __importDefault(require("lodash.isnil"));
class HookRegistry extends Registry_1.Registry {
    /**
     * Add a hook listener. If the hook listener already exists, it will throw and Error.
     * @param hookName Name to the hook to subscribe to
     * @param listenerName Name of the lister or the source of the listener
     * @param listener Listener function
     * @param index Position to insert this hook at
     */
    tap(hookName, listenerName, listener, index) {
        const item = {
            listener,
            name: listenerName,
        };
        const hookItems = this.get(hookName);
        // If there are no items of this hookName yet,
        // Initialize new array
        if (lodash_isnil_1.default(hookItems) || hookItems.length === 0) {
            this.set(hookName, [item]);
            return;
        }
        const found = hookItems.find(lookupItem => lookupItem.name === listenerName);
        if (!lodash_isnil_1.default(found)) {
            throw new Error(`Hook Listener ${listenerName} already exists in ${hookName} hook.`);
        }
        if (lodash_isnil_1.default(index)) {
            this.set(hookName, [...hookItems, item]);
        }
        else {
            this.set(hookName, [...hookItems].splice(index, 0, item));
        }
    }
    /**
     * Remove a hook listener.
     * @param hookName Name to the hook to subscribe to
     * @param listenerName Name of the lister or the source of the listener
     */
    untap(hookName, listenerName) {
        if (!this.has(hookName)) {
            throw Error(`${hookName} hook does not exist.`);
        }
        if (lodash_isnil_1.default(listenerName)) {
            throw Error(`Hook name cannot be ${listenerName}. Please provide valid function name while removing filter.`);
        }
        let list = this.get(hookName) || [];
        const index = list.findIndex(item => !!(item && item.name === listenerName));
        if (index === -1) {
            throw new Error(`${listenerName} listener is not added in ${hookName} hook.`);
        }
        list = list.splice(index, 1);
        this.set(hookName, list);
    }
    /**
     * Run all hook listeners in a waterfall.
     * Each listener function gets 3 arguments:
     * 	- value
     * 	- args
     * 	- context
     *
     * Each listener function is expected to return a value.
     *
     * Example Usage: BR.Hooks.run('hook-name', val, args);
     *
     * TODO: document migration, each hook now gets 3 fixed args
     * TODO: run now return a promise, not value
     * TODO: add, remove method replaced by tap, untap
     * TODO: set and remove work differently
     * TODO: there are no filters or events
     * TODO: test and add example of running parallel hooks
     * @param hookName Name of the hook
     * @param value Initial value to send to the hook
     * @param args Any extra arguments to pass to the hook
     */
    run(hookName, initialValue, args = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get all hook items registered for hookName
            const hookItems = this.data.get(hookName) || [];
            // If there are no hook items registered for this hook
            if (lodash_isnil_1.default(hookItems) || hookItems.length === 0) {
                return initialValue;
            }
            // // If there is only one item
            // if (hookItems.length === 1) {
            // 	return Promise.resolve(hookItems[0].listener(initialValue, { ...args }, this.ctx));
            // }
            // Run waterfall
            const res = yield hookItems.reduce((accumulator, hookItem) => __awaiter(this, void 0, void 0, function* () {
                // Resolve value before sending forward
                const hookValue = yield accumulator;
                // Execute hook function
                const result = yield hookItem.listener(hookValue, Object.assign({}, args), this.ctx);
                // If the hook didn't return any value, return previous accumulator
                if (typeof result === 'undefined' && !lodash_isnil_1.default(this.ctx.Logger)) {
                    // if result of current iteration is undefined, don't pass it on
                    this.ctx.Logger.warn(`Warning: Sync filter [${hookItem.name}] in hook [${hookName}] didn't return a result!`, hookItem);
                    return hookValue;
                }
                return result;
            }), Promise.resolve(initialValue));
            return res;
        });
    }
}
exports.HookRegistry = HookRegistry;
//# sourceMappingURL=HookRegistry.js.map
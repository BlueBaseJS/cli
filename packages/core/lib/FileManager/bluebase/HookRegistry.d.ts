import { Registry, RegistryContext } from './Registry';
export declare type HookFn<Context> = (value: any, args: {
    [key: string]: Context;
}, ctx: any) => any | Promise<any>;
export declare type HookItem<Context> = {
    name: string;
    listener: HookFn<Context>;
};
export declare type HookRegistryItem<Context> = Array<HookItem<Context>>;
export declare class HookRegistry<Parent extends RegistryContext> extends Registry<HookRegistryItem<Parent>, Parent> {
    /**
     * Add a hook listener. If the hook listener already exists, it will throw and Error.
     * @param hookName Name to the hook to subscribe to
     * @param listenerName Name of the lister or the source of the listener
     * @param listener Listener function
     * @param index Position to insert this hook at
     */
    tap(hookName: string, listenerName: string, listener: HookFn<Parent>, index?: number): void;
    /**
     * Remove a hook listener.
     * @param hookName Name to the hook to subscribe to
     * @param listenerName Name of the lister or the source of the listener
     */
    untap(hookName: string, listenerName: string): void;
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
    run(hookName: string, initialValue: any, args?: {
        [key: string]: any;
    }): Promise<any>;
}

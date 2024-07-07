import NodeCache from "node-cache";

class MemCache<T> {
    private cache: NodeCache;

    constructor(ttlSeconds: number) {
        this.cache = new NodeCache(
            { stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false }
        );
    }

    get(key: string, storeFunction: () => Promise<T>): Promise<T> {
        const value = this.cache.get<T>(key);
        if (value) {
            return Promise.resolve(value);
        }

        return storeFunction().then((result) => {
            this.cache.set(key, result);
            return result;
        });
    }

    set(key: string, value: T): void {
        this.cache.set(key, value);
    }

    del(key: string): void {
        this.cache.del(key);
    }
}

export default MemCache;
import Codec from "./Codec";

export class LocalStorage {

    path: string;

    _collections: { [name: string]: LocalStorage } = {};

    constructor(path: string) {
        this.path = path;
    }

    collection(path: string): LocalStorage {
        if (path in this._collections === false) {
            this._collections[path] = new LocalStorage(`${this.path}/${path}`);
        }
        return this._collections[path];
    }

    set(path: string, data: any, options?: { merge?: boolean }) {

        let input = data;

        if (options?.merge) {
            Object.assign(input, localStorage.getItem(path) || {});
        }

        localStorage.setItem(`${this.path}/${path}`, JSON.stringify(data));
    }

    get(path: string, defaultValue?: any) {
        let data = localStorage.getItem(`${this.path}/${path}`);
        if (data) {
            return JSON.parse(data);
        }
        return defaultValue || undefined;
    }

    cast<T>(path: string, defaultValue?: any): T | undefined {
        return this.get(path, defaultValue);
    }

    setEncrypt(path: string, data: any) {
        let bytes = Codec.encode(data);
        localStorage.setItem(`${this.path}/${path}`, Codec.ab2str(new Uint8Array(bytes)));
    }

    getEncrypt<T>(path: string): T | undefined {
        let str = localStorage.getItem(`${this.path}/${path}`);
        if (str) {
            let buff = Codec.str2ab(str);
            return Codec.decode(buff);
        }
        return undefined;
    }

    remove(path: string) {
        localStorage.removeItem(`${this.path}/${path}`);
    }
}

const browserStorage = new LocalStorage('defaultStorage');
export default browserStorage;
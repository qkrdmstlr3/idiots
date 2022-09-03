const keys = {
  PASSWORD: 'password',
} as const;

const store = {
  set<T>(key: string, value: T) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  get<T>(key: string): T | null {
    const item = window.localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch {
      return item as unknown as T;
    }
  },
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
};

export default {
  setPassword: (userToken: string) =>
    store.set<string>(keys.PASSWORD, userToken),
  getPassword: () => store.get<string>(keys.PASSWORD),
} as const;

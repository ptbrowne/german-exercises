import { autorun, set, toJS } from "mobx";
import { parse, stringify } from "superjson";

export function autoSave(_this: any, name: string) {
  const storedJson = localStorage.getItem(name);
  if (storedJson) {
    set(_this, parse(storedJson));
  }
  autorun(() => {
    const value = toJS(_this);
    localStorage.setItem(name, stringify(value));
  });
}

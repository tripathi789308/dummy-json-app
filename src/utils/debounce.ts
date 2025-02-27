let timeoutId: ReturnType<typeof setTimeout>;

export const debounce = (fn: (...args: never[]) => void, ms = 300) => {
  return function (this: unknown, ...args: never[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

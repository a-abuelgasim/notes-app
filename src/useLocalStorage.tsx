import { useEffect, useState } from "react";


// Custom hook for using localStorage
// Can be passed an initial value or a callback that returns the initial value.
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
	const [value, setValue] = useState<T>(() => {
		const jsonValue = localStorage.getItem(key);

		if (jsonValue == null) {
			if (typeof initialValue == 'function') {
				return (initialValue as () => T)();
			} else {
				return initialValue;
			}
		} else {
			return JSON.parse(jsonValue)
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key])

	return [value, setValue] as [T, typeof setValue];
}

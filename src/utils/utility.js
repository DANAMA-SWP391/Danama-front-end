import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler); // Clean up timeout if value or delay changes
    }, [value, delay]);

    return debouncedValue;
}
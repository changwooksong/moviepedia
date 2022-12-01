import { useCallback, useState } from "react";

function useAsynce(asyncFunction) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const wrappedFunction = useCallback(
        async (...args) => {
            setPending(true);
            setError(null);
            try {
                setError(null);
                setPending(true);
                return await asyncFunction(...args);
            } catch (error) {
                setError(error);
                return;
            } finally {
                setPending(false);
            }
        },
        [asyncFunction]
    );
    return [pending, error, wrappedFunction];
}

export default useAsynce;

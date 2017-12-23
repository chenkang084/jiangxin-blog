/**
 * handle function runtime error
 * @param fn
 */
export function handleFuntionError(fn: () => Promise<any>) {
    try {
        return fn();
    } catch (error) {
        return Promise.reject(error.message);
    }
}
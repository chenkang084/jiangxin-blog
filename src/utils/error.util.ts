/**
 * handle function runtime error
 * @param fn
 */
export async function handleFuntionError(fn: () => Promise<any>) {
    try {
        return await fn();
    } catch (error) {
        return Promise.reject(error.message);
    }
}
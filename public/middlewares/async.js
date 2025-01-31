/**
 * A wrapper for asynchronous functions to handle errors.
 *
 * @param fn - The asynchronous function to wrap
 * @returns An Express middleware function
 */
const asyncWrapper = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    }
    catch (e) {
        next(e);
    }
};
export default asyncWrapper;

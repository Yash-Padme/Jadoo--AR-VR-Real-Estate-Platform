// Wraps asynchronous route handlers so rejected promises reach Express error middleware.
const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        // Resolve both synchronous and asynchronous handler results uniformly.
        Promise.resolve(requestHandler(req,res,next))
        // Forward any handler error instead of leaving the promise unhandled.
        .catch((err)=> next(err))
    }
}

export {asyncHandler};
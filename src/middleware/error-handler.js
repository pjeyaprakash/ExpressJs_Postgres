export const errorHandler = (err, _, res) => {
    console.error(err)
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Server Error",
        code: err.code
    })
}
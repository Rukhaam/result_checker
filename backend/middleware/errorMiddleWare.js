class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
  
    if (err.code === 'ER_DUP_ENTRY') {
      const message = "Duplicate field value entered. This record already exists.";
      const statusCode = 400;
      err = new ErrorHandler(message, statusCode);
    }
  

  
    // Format error messages (handling potential validation arrays)
    const errorMessages = err.errors 
      ? Object.values(err.errors).map((e) => e.message).join(" ") 
      : err.message;
  
    return res.status(err.statusCode).json({
      success: false,
      message: errorMessages,
    });
  };
  
  export { ErrorHandler }; 
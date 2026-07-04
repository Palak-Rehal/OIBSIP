export const getHealthStatus = () => {
  return {
    success: true,
    message: "PizzaHub API is healthy 🚀",
    timestamp: new Date().toISOString(),
  };
};
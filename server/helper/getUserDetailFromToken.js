const getUserDetailFromToken = (token) => {
  if (!token) {
    return {
      message: "Session out...",
      logout: true,
    };
  }
};

export const fetchFearGreed = async () => {
    const response = await fetch("https://api.alternative.me/fng/", {
      method: "GET",
      next: {
        revalidate: 3600,
      },
    });
  
    const data = await response.json();
  
  return data.data;
};

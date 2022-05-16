const parseLocation = (location: string) => {
  const [lat, long] = location.split(',');
  return { lat: parseFloat(lat), long: parseFloat(long) };
};

export { parseLocation };

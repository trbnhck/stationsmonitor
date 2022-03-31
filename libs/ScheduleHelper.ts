export function calcUntil(departure: string) {
  const now = new Date();
  let departureDate = new Date(departure);

  if (+departureDate - +now < 0) {
    departureDate = now;
  }

  return new Date(+departureDate - +now).getMinutes();
}

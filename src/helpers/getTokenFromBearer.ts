export default function getTokenFromBearer(bearer: string) {
  return bearer.split(' ').pop();
}

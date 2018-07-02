export default function norm(url) {
  return `/${url.split(/\//).filter(x => x).join('/')}`;
}

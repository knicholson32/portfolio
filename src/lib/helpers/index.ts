import { PUBLIC_ENV } from '$env/static/public';


export const delay = (amt: number) => new Promise(resolve => setTimeout(resolve, amt));
export const getImageTransformer = (url: string, width: number, fit: string, gravity: string) => {
  const srcTransform = `/cdn-cgi/image/width=${width},format=auto,fit=${fit},gravity=${gravity}/${url}`;
  const srcNoTransform = `/${url}`;

  if (PUBLIC_ENV === 'local') return srcNoTransform;
  return srcTransform;
}
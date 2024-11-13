<script lang="ts">

  import { PUBLIC_ENV } from '$env/static/public';
  import { getImageTransformer } from '$lib/helpers';

  interface Props {
    url: string;
    imgClass?: 'hero' | 'focus' | 'small' | 'icon';
    fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
    gravity?: 'auto' | 'left' | 'right' | 'top' | 'bottom' | string;
    lazy?: boolean;
    offScreen?: boolean;
    alt?: string;
    pixelRatios?: number[];
    class?: string;
    style?: string;
  }

  let { 
    url,
    imgClass = 'focus',
    fit = 'scale-down',
    gravity = 'auto',
    lazy = false,
    offScreen = false,
    alt = undefined,
    pixelRatios = [1, 2, 3, 4],
    class: propClass = '',
    style: propStyle = ''
  }: Props = $props();

  let sizeClass = $derived.by(() => {
    switch(imgClass) {
      case 'hero':
        return 1920;
      case 'focus':
        return 1024;
      case 'small':
        return 512;
      default:
        return 256;
    }
  })

  
  const srcsetTransform = $derived(pixelRatios.flatMap((e) => `/cdn-cgi/image/width=${sizeClass * e},format=auto,fit=${fit},gravity=${gravity}/${url.replace(/^\/|\/$/g, '')} ${e}x`).join(', '));

  let srcset = $derived.by(() => PUBLIC_ENV === 'prod' ? srcsetTransform : undefined);
  let src = $derived(getImageTransformer(url.replace(/^\/|\/$/g, ''), sizeClass, fit, gravity));

</script>
<img
  class={propClass}
  style={propStyle}
  loading={lazy ? 'lazy' : 'eager'}
  decoding={offScreen ? 'async' : 'auto'}
  alt={alt !== undefined ? alt : undefined}
  role={alt === undefined ? 'presentation' : undefined}
  {src}
  {srcset}
/>
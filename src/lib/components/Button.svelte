<script lang="ts">

  // /**
  //  * @typedef {Object} Props
  //  * @property {boolean} [primary] Is this the principal call to action on the page?
  //  * @property {string} [backgroundColor] What background color to use
  //  * @property {'small' | 'medium' | 'large'} [size] How large should the button be?
  //  * @property {string} label Button contents
  //  * @property {() => void} [onClick] The onclick event handler
  //  */

  export let backgroundColor: string;
  export let label: string;
  export let onClick: () => void;
  
  export let primary = false;
  export let size: 'small' | 'medium' | 'large' = 'medium';
</script>

<style>
  .storybook-button {
    display: inline-block;
    cursor: pointer;
    border: 0;
    border-radius: 3em;
    font-weight: 700;
    line-height: 1;
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .storybook-button--primary {
    background-color: #1ea7fd;
    color: white;
  }
  .storybook-button--secondary {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
    background-color: transparent;
    color: #333;
  }
  .storybook-button--small {
    padding: 10px 16px;
    font-size: 12px;
  }
  .storybook-button--medium {
    padding: 11px 20px;
    font-size: 14px;
  }
  .storybook-button--large {
    padding: 12px 24px;
    font-size: 16px;
  }
</style>

<button
  type="button"
  class={['storybook-button', `storybook-button--${size}`].join(' ')}
  class:storybook-button--primary={primary}
  class:storybook-button--secondary={!primary}
  style:background-color={backgroundColor}
  onclick={onClick}
>
  {label}
</button>

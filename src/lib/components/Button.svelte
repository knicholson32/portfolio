<script lang="ts">

  interface Props {
    backgroundColor: string;
    label: string;
    onClick: () => void;

    primary?: boolean;
    size?: 'small' | 'medium' | 'large';
  }

  let { 
    backgroundColor,
    label,
    onClick,

    primary = false,
    size = 'medium'
  }: Props = $props();

  export function click () {
    console.log('Clicked!');
    onClick();
  }

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

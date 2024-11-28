<script lang="ts">
</script>

<div class="absolute -z-10 opacity-100 top-0 bottom-60 left-0 right-0 overflow-hidden">
    <div class="absolute left-0 right-0 top-0 bottom-0 bg-neutral-950/50 -z-10"></div>
    <div id="stars" class="z-0"></div>
    <div id="stars2" class="z-0"></div>
    <div id="stars3" class="z-0"></div>
</div>

<style lang="scss">
    @use "sass:math";
    @use "sass:string";

    // n is number of stars required
    @function multiple-box-shadow($n) {
        $value: "#{math.random(3000)}px #{math.random(3000)}px #FFF";
        @for $i from 2 through $n {
            $value: "#{$value} , #{math.random(3000)}px #{math.random(3000)}px #FFF";
        }

        @return string.unquote($value);
    }

    $shadows-small: multiple-box-shadow(700);
    $shadows-medium: multiple-box-shadow(200);
    $shadows-big: multiple-box-shadow(100);

    #stars {
        width: 1px;
        height: 1px;
        background: transparent;
        box-shadow: $shadows-small;
        animation: animStar 150s linear infinite;
        &:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 1px;
            height: 1px;
            background: transparent;
            box-shadow: $shadows-small;
        }
    }

    #stars2 {
        width: 2px;
        height: 2px;
        background: transparent;
        box-shadow: $shadows-medium;
        animation: animStar 300s linear infinite;
        &:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 2px;
            height: 2px;
            background: transparent;
            box-shadow: $shadows-medium;
        }
    }

    #stars3 {
        width: 3px;
        height: 3px;
        background: transparent;
        box-shadow: $shadows-big;
        animation: animStar 450s linear infinte;
        &:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 3px;
            height: 3px;
            background: transparent;
            box-shadow: $shadows-big;
        }
    }

    @keyframes animStar {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(-2000px);
        }
    }
</style>

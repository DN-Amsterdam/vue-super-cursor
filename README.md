# Digital Natives - Custom-Cursor
A flexible library for adding custom cursors to your vue/nuxt apps. Flexible configuration, good browser support and some built in solutions to common problems.

## Installation
```bash
yarn add @digital-natives/custom-cursor
```

## Usage examples

```vue
<template>
    <div>
        <!-- default -->
        <CustomCursor />
        
        <!-- use custom element as cursor -->
        <CustomCursor>
            <svg>....</svg
        </CustomCursor>
       
    </div>
</template>

<script>
import CustomCursor from '@digital-natives/custom-cursor'

export default {
    components: {
        CustomCursor
    }
}
</script>
```

## Props

The component is configurable through props. Th

| Prop                  | Type   | Required   | Description                                                                                                                            | Object variables        | Default value                                                                                                 |
|---------------------------|--------|------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------------------|---------------------------------------------------------------------------------------------------------------|
| `throttleDelay`                | Number | _optional_ | Throttle how often the mutationObserver will fire.                                                                | -                       | `500`                                                                                                         |
| `hoverableElements`             | Array  | _optional_ | Array contains object with a `class` and `elements`                                                                                    | `class`, `elements`     | ```{ class: 'custom-cursor--hovering', elements: 'a, button' }```                                             |
| `trailingCursors`        | Array  | _optional_ | Array contains object with a `class` and `gsap_options`. For Gsap options see the [docs](https://greensock.com/docs/v3/GSAP/gsap.to()) | `class`, `gsap_options` | `[]`                                                                                                          |                                                                                    
| `mutationObserverOptions` | Object | _optional_ | Options see docs [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)                         | -                       | ``` { childList: true, subtree: true, attributes: true, characterData: false, attributeFilter: ['open'] } ``` |


## Hoverable elements
The hoverable-elements prop lets you to add objects with a selector (elements) and a class. This allows you to define elements that will trigger an even when the cursor hovers over them. It also let's you set a class that will be added to the `<body>` when this happens. By default the cursor will trigger the class `.custom-cursor--hovering` on the `<body>` when you hover over `<button>` and `<a>` elements.

### Example hoverable elements
Let's assume you have a card that should have a different cursor. You could add the hoverable like so:
```vue
<CustomCursor :hoverable-elements="[
    {
        class: 'custom-cursor--hovering', // keep the default in tact
        elements: 'a, button'
    },
    {
        class: 'custom-cursor--hover-card',
        elements: '.card' // select your card with a class selector
    }
]" />
```

The class `.custom-cursor--hover-card` will now be added to the body when you hover over one of the cards.

You can then style the cursor however you like

```css
body.custom-cursor--hover-card .custom-cursor {
    background: magenta;
}
```

The cursor should now turn purple when you hover over a card.

### Do not hover
The elements property uses the `queryselector` api. Any valid css selector should work. You can leverage this to change disable hover behaviour as well. For example like so: `elements: 'a:not(.dont-hover-me)'`. This should select all `<a>` elements except the ones with a `.dont-hover-me` class.


## Trailing cursors
The trailing cursors prop allows you to add additional trailing cursors with their own timing function. You can add as many as you like. Each cursor should have a `class` and a `gsap_options` property. The `gsap_options` can be any options available in the `gsap.to()` api https://greensock.com/docs/v3/GSAP/gsap.to()

Add one like so:
```vue
<CustomCursor :trailing-cursors="[
    {
        class: 'custom-cursor--trailing', // the class the cursor will have
        gsap_options: { // Greensock options
            duration: 0.1
        }
    },    
]" />
```

## Base styles

This component contains some boilerplate CSS to provide an accessible base to work from. It is quite simple and should be easy to customize.

```less
body {
  * {
    cursor: none; // Hide the default cursor
  }

  .custom-cursor {
    opacity: 0;
  }

  .custom-cursor-trail {
    opacity: 0;
  }

  @media ( hover: hover ) {
    &:hover .custom-cursor { // show the cursor when the cursor is inside the <body> element. Fade it out when it leaves the window
      opacity: 1;
    }

    &:hover .custom-cursor-trail { // do the same for the cursor trail
      opacity: 1;
    }
  }
}

.custom-cursor {
  position: fixed;
  opacity: 0;
  pointer-events: none;
  height: 25px;
  width: 25px;
  background-color: #000;
  z-index: 2147483647;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.custom-cursor-trail {
  opacity: 0;
}
```

## Questions & contributing
Feel welcome to open issues if you have questions are if you run into bugs.

Or even better submit a pull request :)


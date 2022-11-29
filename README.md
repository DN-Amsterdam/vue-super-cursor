# Digital Natives - Custom-Cursor 
Vue 2 component to easily customize the cursor without doing the heavy lifting (browser support, iframes, etc)

## Installation
```bash
yarn add @digital-natives/custom-cursor
```

## Usage examples


```vue
<template>
    <div>
        //default
        <CustomCursor :options="options" />
        
        //use slot
        <CustomCursor :options="options">
            <svg>....</svg
        </CustomCursor>
       
    </div>
</template>

<script>
import CustomCursor from '@digital-natives/custom-cursor'

export default {
    components: {
        CustomCursor
    },
     data() {
        return {
          options: {
            throttle: 500,
            selectables: [
              {
                class: 'cursor-hover',
                elements: 'a, button'
              },
              {
                class: 'custom-cursor--disabled',
                elements: 'iframe'
              }
            ],
            trailing_cursors: [
              {
                class: 'custom-cursor--trailing',
                gsap_options: {
                  duration: 0.1
                }
              },
            ]
          }
        }
     }
}
</script>
```

## Properties

The component has one prop object named `options`. The table below shows what properties this object can contain.

| Property                  | Type   | Required   | Description                                                                                                                            | Object variables        | Default value                                                                                                 |
|---------------------------|--------|------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------------------|---------------------------------------------------------------------------------------------------------------|
| `throttle`                | Number | _optional_ | The amount of times the code will check if element is new in DOM in ms.                                                                | -                       | `500`                                                                                                         |
| `selectables`             | Array  | _optional_ | Array contains object with a `class` and `elements`                                                                                    | `class`, `elements`     | ```{ class: 'custom-cursor--hovering', elements: 'a, button' }```                                             |
| `trailing_cursors`        | Array  | _optional_ | Array contains object with a `class` and `gsap_options`. For Gsap options see the [docs](https://greensock.com/docs/v3/GSAP/gsap.to()) | `class`, `gsap_options` | `[]`                                                                                                          |                                                                                    
| `mutationObserverOptions` | Object | _optional_ | Options see docs [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)                         | -                       | ``` { childList: true, subtree: true, attributes: true, characterData: false, attributeFilter: ['open'] } ``` |

## CSS Variables


Inspect the less-[source file](./src/custom-cursor.less) to find which variables are being used.

#### Available modifiers

```css
.custom-cursor

.custom-cursor-trail
```

This component contains some boilerplate CSS to provide an accessible base to work from.
The following css is included with the component by default:

```less
body {
  * {
    cursor: none;
  }

  .custom-cursor {
    opacity: 0;
  }

  .custom-cursor-trail {
    opacity: 0;
  }

  @media ( hover: hover ) {
    &:hover .custom-cursor {
      opacity: 1;
    }

    &:hover .custom-cursor-trail {
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
For questions, contact Gerben at gerben@digitalnatives.nl || Koos at koos@digitalnatives.nl

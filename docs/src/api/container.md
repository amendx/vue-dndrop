# Container

Component that contains the draggable elements or components. Each of its children should be wrapped by **Draggable** component

---

## Properties

Properties define the visual behaviour of the library:

| Property                  |           Type            |            Default            | Description                                                                                                                                                                                                   |
| ------------------------- | :-----------------------: | :---------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| :orientation              |          string           |          `vertical`           | Orientation of the container. Can be **horizontal** or **vertical**.                                                                                                                                          |
| :behaviour                |          string           |            `move`             | Property to describe weather the dragging item will be moved or copied to target container. Can be **move** or **copy** or **drop-zone** or **contain**.                                                      |
| :tag                      | string or NodeDescription |             `div`             | _See descriptions below_                                                                                                                                                                                      |
| :group-name               |          string           |          `undefined`          | Draggables can be moved between the containers having the same group names. If not set container will not accept drags from outside. This behaviour can be overriden by shouldAcceptDrop function. See below. |
| :lock-axis                |          string           |          `undefined`          | Locks the movement axis of the dragging. Possible values are **x**, **y** or **undefined**.                                                                                                                   |
| :drag-handle-selector     |          string           |          `undefined`          | Css selector to test for enabling dragging. If not given item can be grabbed from anywhere in its boundaries.                                                                                                 |
| :non-drag-area-selector   |          string           |          `undefined`          | Css selector to prevent dragging. Can be useful when you have form elements or selectable text somewhere inside your draggable item. It has a precedence over **dragHandleSelector**.                         |
| :drag-begin-delay         |          number           | `0` (`200` for touch devices) | Time in milisecond. Delay to start dragging after item is pressed. Moving cursor before the delay more than 5px will cancel dragging.                                                                         |
| :animation-duration       |          number           |             `250`             | Animation duration in milisecond. To be consistent this animation duration will be applied to both drop and reorder animations.                                                                               |
| :auto-scroll-enabled      |          boolean          |            `true`             | First scrollable parent will scroll automatically if dragging item is close to boundaries.                                                                                                                    |
| :drag-class               |          string           |          `undefined`          | Class to be added to the ghost item being dragged. The class will be added after it's added to the DOM so any transition in the class will be applied as intended.                                            |
| :drop-class               |          string           |          `undefined`          | Class to be added to the ghost item just before the drop animation begins.                                                                                                                                    |
| :remove-on-drop-out       |          boolean          |          `undefined`          | When set true onDrop will be called with a removedIndex if you drop element out of any relevant container                                                                                                     |
| :drop-placeholder         |      boolean,object       |          `undefined`          | Options for drop placeholder. **className**, **animationDuration**, **showOnTop**                                                                                                                             |
| :fire-related-events-only |          boolean          |            `false`            | Defines if only events related to the selected containers will be fired                                                                                                                                       |

## `tag`

Tag name or the node definition to render the root element of the Container.
Default value is 'div'.

```ts
:tag="{value: 'table', props: {class: 'my-table'}}"
```

```ts
tag = "table";
```

---

## Possible values

- **string** : The tag name of the root element to be created
- **object**: Node definition
  - **value**: string : tag name
  - **props**: data object to define element properties. see [https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)

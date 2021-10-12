# Draggable

Wrapper component for Container's children. Every child element should be wrapped with **Draggable** component.

---

## Properties

A Draggable element can accept anything you place in as a child element. Feel free to use your creativity.

Properties define the visual behaviour of the library:

| Property          |           Type            | Default | Description                                              |
| ----------------- | :-----------------------: | :-----: | -------------------------------------------------------- |
| :drag-not-allowed |          boolean          | `false` | Property to define if the element can be dragged or not. |
| :tag              | string or NodeDescription |  `div`  | _See descriptions below_                                 |

---

## `tag`

Tag name or the node definition to render the root element of the Draggable.
Default value is 'div'.

```jsx
:tag="{value: 'tr', props: {class: 'my-table-row'}}"
```

```jsx
tag = "tr";
```

---

## Possible values

- **string** : The tag name of the root element to be created
- **object** : Node definition
  - **value**: string : tag name
  - **props**: data object to define element properties. see [https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)

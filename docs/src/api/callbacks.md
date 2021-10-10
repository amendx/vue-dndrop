# Callbacks

Callbacks provide additional logic and checks before and during user interaction.

---

### `get-child-payload()`

The function to be called to get the payload object to be passed **onDrop** function.

```jsx
<Container :get-child-payload="getChildPayload">
```

```ts
getChildPayload (index) {
  return {
    // generate custom payload data here
  }
}
```

#### Parameters

- **index** : `number` : index of the child item

#### Returns

- **payload** : `object`

---

### `should-accept-drop()`

The function to be called by all containers before drag starts to determine the containers to which the drop is possible. Setting this function will override the **group-name** property and only the return value of this function will be taken into account.

```jsx
<Container :should-accept-drop="shouldAcceptDrop">
```

```ts
shouldAcceptDrop (sourceContainerOptions, payload) {
  return true;
}
```

#### Parameters

- **sourceContainerOptions** : `object` : options of the source container. (parent container of the dragged item)
- **payload** : `object` : the payload object retrieved by calling [get-child-payload](#get-child-payload) function.

#### Returns

- **boolean** : **true / false**

---

### `should-animate-drop()`

The function to be called by the target container to which the dragged item will be dropped.
Sometimes dragged item's dimensions are not suitable with the target container and dropping animation can be wierd. So it can be disabled by returning **false**. If not set drop animations are enabled.

```jsx
<Container :should-animate-drop="shouldAnimateDrop">
```

```ts
shouldAnimateDrop (sourceContainerOptions, payload) {
  return false;
}
```

#### Parameters

- **sourceContainerOptions** : `object` : options of the source container. (parent container of the dragged item)
- **payload** : `object` : the payload object retrieved by calling [get-child-payload](#get-child-payload) function.

#### Returns

- **boolean** : **true / false**

---

### `get-ghost-parent()`

The function to be called to get the element that the dragged ghost will be appended. Default parent element is the container itself.
The ghost element is positioned as 'fixed' and appended to given parent element.
But if any anchestor of container has a transform property, ghost element will be positioned relative to that element which breaks the calculations. Thats why if you have any transformed parent element of Containers you should set this property so that it returns any element that has not transformed parent element.

```jsx
<Container :get-ghost-parent="getGhostParent">
```

```ts
getGhostParent() {
  // i.e return document.body;
}
```

#### Returns

- **Element** : **Any DOM element that the ghost will be appended in**

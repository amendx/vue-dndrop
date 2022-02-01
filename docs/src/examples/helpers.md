# Helpers
> Here are some `utilities` for applying drags and modifing data inside the `Container`

If you're still missing some examples, check out the [repository](https://github.com/amendx/vue-dndrop/blob/master/docs/src/.vuepress/utils/helpers.js) for more

## applyDrag
> You can modify the array by applying this simple function or customize your own way
```js
applyDrag(arr, dragResult) {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};
```
## generateItems
>  This function help ups generate items to test `vue-dndrop` examples
```js
export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};
```

## shortcuts
> Those are some helpers functions for generating dumb data
```js
export const lorem = `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.`;

const columnNames = ['Backlog', 'Doing', 'Finished'];

const cardColors = [
  '#34495E',
  '#84B0DC',
  '#49627A',
  '#41B883',
  '#7096BB',
  '#97CAFC',
  '#6CC1C0',
  '#41B883',
  '#41B883',
  '#49627A',
];

const pickColor = () => {
  const rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

export const scene = {
  type: 'container',
  props: {
    orientation: 'horizontal',
  },
  children: generateItems(3, (i) => ({
    id: `column${i}`,
    type: 'container',
    name: columnNames[i],
    props: {
      orientation: 'vertical',
      className: 'card-container',
    },
    children: generateItems(+(Math.random() * 10).toFixed() + 5, (j) => ({
      type: 'draggable',
      id: `${i}${j}`,
      props: {
        className: 'card',
        style: { backgroundColor: pickColor() },
      },
      number: Math.floor(Math.random() * 100),
      data: lorem.slice(0, Math.floor(Math.random() * 150) + 30),
    })),
  })),
};
```
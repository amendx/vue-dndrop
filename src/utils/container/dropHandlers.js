import { addChildAt, removeChildAt } from './children';

export function domDropHandler ({ element, draggables }) {
  return (dropResult, onDrop) => {
    const { removedIndex, addedIndex, element } = dropResult;
    let removedWrapper = null;
    if (removedIndex !== null) {
      removedWrapper = removeChildAt(element, removedIndex);
      draggables.splice(removedIndex, 1);
    }

    if (addedIndex !== null) {
      const wrapper = window.document.createElement('div');
      wrapper.className = 'dndrop-draggable-wrapper';
      wrapper.appendChild(
        removedWrapper && removedWrapper.firstElementChild
          ? removedWrapper.firstElementChild
          : element
      );
      addChildAt(element, wrapper, addedIndex);
      if (addedIndex >= draggables.length) {
        draggables.push(wrapper);
      } else {
        draggables.splice(addedIndex, 0, wrapper);
      }
    }

    if (onDrop) {
      onDrop(dropResult);
    }
  };
}

export function reactDropHandler () {
  const handler = () => {
    return (dropResult, onDrop) => {
      if (onDrop) {
        onDrop(dropResult);
      }
    };
  };

  return {
    handler,
  };
}

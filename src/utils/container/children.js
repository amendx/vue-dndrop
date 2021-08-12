export const removeChildAt = (parent, index) => {
  return parent.removeChild(parent.children[index]);
};

export const addChildAt = (parent, child, index) => {
  if (index >= parent.children.length) {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, parent.children[index]);
  }
};

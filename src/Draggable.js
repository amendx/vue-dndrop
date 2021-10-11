import { getTagProps, validateTagProp } from './utils';

const wrapChild = (createElement, ctx) => {
  const tagProps = getTagProps(ctx, [
    'dndrop-draggable-wrapper',
    ctx.dragNotAllowed ? 'dndrop-not-draggable' : '',
  ]);
  return createElement(
    tagProps.value,
    Object.assign({}, tagProps.props),
    ctx.$slots.default
  );
};

export default {
  name: 'Draggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
    dragNotAllowed: {
      type: Boolean,
      default: false,
    },
  },
  render: function (createElement) {
    return wrapChild(createElement, this);
  },
};

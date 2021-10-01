import { getTagProps, validateTagProp } from './utils';

const wrapChild = (createElement, ctx) => {
  const tagProps = getTagProps(ctx, 'smooth-dnd-draggable-wrapper');
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
      default: 'div'
    }
  },
  render: function (createElement) {
    return wrapChild(createElement, this);
  }
};

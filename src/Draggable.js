import { getTagProps, validateTagProp } from './utils';
import { h } from 'vue';

const wrapChild = (createElement, ctx) => {
  const tagProps = getTagProps(ctx, 'smooth-dnd-draggable-wrapper');
  return createElement(
    tagProps.value,
    Object.assign({}, tagProps.props),
    ctx.$slots.default()
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
  render: function () {
    return wrapChild(h, this);
  }
};

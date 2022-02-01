/* eslint-disable curly */
import wrapper from './utils/container/wrapper.js';
import { reactDropHandler } from './utils/container/dropHandlers';
import { getTagProps, validateTagProp } from './utils';
wrapper.dropHandler = reactDropHandler().handler;
wrapper.wrapChild = false;

const eventEmitterMap = {
  drop: 'onDrop',
  'drag-end': 'onDragEnd',
  'drag-start': 'onDragStart',
  'drag-enter': 'onDragEnter',
  'drag-leave': 'onDragLeave',
  'drop-ready': 'onDropReady',
  'drop-not-allowed': 'dropNotAllowed'
};

function getContainerOptions (props, context) {
  const options = Object.keys(props).reduce((result, key) => {
    const optionName = key;
    const prop = props[optionName];

    if (prop !== undefined) {
      if (typeof prop === 'function') {
        if (eventEmitterMap[optionName]) {
          result[eventEmitterMap[optionName]] = (params) => {
            context.$emit(optionName, params);
          };
        } else {
          result[optionName] = (...params) => {
            return prop(...params);
          };
        }
      } else {
        result[optionName] = prop;
      }
    }

    return result;
  }, {});

  return options;
}

const mapOptions = (context) => {
  const props = Object.assign({}, context.$props, context.$listeners);
  return getContainerOptions(props, context);
};

export default {
  name: 'Container',
  mounted () {
    this.containerElement = this.$refs.container || this.$el;
    this.container = wrapper(this.containerElement, mapOptions(this));
  },
  updated () {
    if (
      this.$refs.container !== this.containerElement &&
      this.$el !== this.containerElement
    ) {
      if (this.container) {
        this.container.dispose();
      }
      this.containerElement = this.$refs.container || this.$el;
      this.container = wrapper(this.containerElement, mapOptions(this));
      return;
    }

    this.container.setOptions(mapOptions(this));
  },
  destroyed () {
    if (this.container) {
      this.container.dispose();
    }
  },
  props: {
    behaviour: String,
    groupName: String,
    orientation: String,
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    dragBeginDelay: Number,
    animationDuration: Number,
    autoScrollEnabled: { type: Boolean, default: true },
    lockAxis: String,
    dragClass: String,
    dropClass: String,
    removeOnDropOut: { type: Boolean, default: false },
    'drag-start': Function,
    'drag-end': Function,
    drop: Function,
    getChildPayload: Function,
    shouldAnimateDrop: Function,
    fireRelatedEventsOnly: { type: Boolean, default: false },
    shouldAcceptDrop: Function,
    'drag-enter': Function,
    'drag-leave': Function,
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
    getGhostParent: Function,
    'drop-ready': Function,
    dropPlaceholder: [Object, Boolean],
    containerClass: {
      type: String,
      default: 'dndrop-draggable-wrapper'
    }
  },
  render: function (createElement) {
    const tagProps = getTagProps(this);
    return createElement(
      tagProps.value,
      Object.assign({}, { ref: 'container' }, tagProps.props),
      this.$slots.default
    );
  },
};

import {
  animationClass,
  containerClass,
  containerInstance,
  dropPlaceholderFlexContainerClass,
  dropPlaceholderInnerClass,
  dropPlaceholderWrapperClass,
  stretcherElementClass,
  stretcherElementInstance,
  translationValue,
  wrapperClass,
  dropPlaceholderDefaultClass,
} from './constants';
import { defaultOptions } from './defaults';
import { domDropHandler } from './dropHandlers';
import layoutManager from './layoutManager';
import Mediator from './mediator';
import {
  addClass,
  getParent,
  getParentRelevantContainerElement,
  hasClass,
  listenScrollParent,
  removeClass,
} from './utils';

function setAnimation (
  element,
  add,
  animationDuration = defaultOptions.animationDuration
) {
  if (add) {
    addClass(element, animationClass);
    element.style.transitionDuration = animationDuration + 'ms';
  } else {
    removeClass(element, animationClass);
    element.style.removeProperty('transition-duration');
  }
}

function isDragRelevant ({ element, getOptions }) {
  return function (sourceContainer, payload) {
    const options = getOptions();

    const sourceOptions = sourceContainer.getOptions();
    if (options.behaviour === 'copy') return false;

    const parentWrapper = getParent(element, '.' + wrapperClass);
    if (parentWrapper === sourceContainer.element) {
      return false;
    }

    if (sourceContainer.element === element) return true;
    if (
      sourceOptions.groupName &&
      sourceOptions.groupName === options.groupName
    ) {
      return true;
    }

    if (options.shouldAcceptDrop) {
      return options.shouldAcceptDrop(sourceContainer.getOptions(), payload);
    }

    return false;
  };
}

function wrapChild (child) {
  if (vueDndrop.wrapChild) {
    const div = window.document.createElement('div');
    div.className = `${wrapperClass}`;
    child.parentElement.insertBefore(div, child);
    div.appendChild(child);
    return div;
  }

  return child;
}

function wrapChildren (element) {
  const draggables = [];
  Array.prototype.forEach.call(element.children, (child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      let wrapper = child;
      if (!hasClass(child, wrapperClass)) {
        wrapper = wrapChild(child);
      }
      wrapper[translationValue] = 0;
      draggables.push(wrapper);
    } else {
      element.removeChild(child);
    }
  });
  return draggables;
}

function unwrapChildren (element) {
  if (vueDndrop.wrapChild) {
    Array.prototype.forEach.call(element.children, (child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (hasClass(child, wrapperClass)) {
          element.insertBefore(child.firstElementChild, child);
          element.removeChild(child);
        }
      }
    });
  }
}

function findDraggebleAtPos ({ layout }) {
  const find = (
    draggables,
    pos,
    startIndex,
    endIndex,
    withRespectToMiddlePoints = false
  ) => {
    if (endIndex < startIndex) {
      return startIndex;
    }
    // binary serach draggable
    if (startIndex === endIndex) {
      const { begin, end } = layout.getBeginEnd(draggables[startIndex]);
      // mouse pos is inside draggable
      // now decide which index to return
      // if (pos > begin && pos <= end) {
      if (withRespectToMiddlePoints) {
        return pos < (end + begin) / 2 ? startIndex : startIndex + 1;
      } else {
        return startIndex;
      }
      // } else {
      //   return null;
      // }
    } else {
      const middleIndex = Math.floor((endIndex + startIndex) / 2);
      const { begin, end } = layout.getBeginEnd(draggables[middleIndex]);
      if (pos < begin) {
        return find(
          draggables,
          pos,
          startIndex,
          middleIndex - 1,
          withRespectToMiddlePoints
        );
      } else if (pos > end) {
        return find(
          draggables,
          pos,
          middleIndex + 1,
          endIndex,
          withRespectToMiddlePoints
        );
      } else {
        if (withRespectToMiddlePoints) {
          return pos < (end + begin) / 2 ? middleIndex : middleIndex + 1;
        } else {
          return middleIndex;
        }
      }
    }
  };

  return (draggables, pos, withRespectToMiddlePoints = false) => {
    return find(
      draggables,
      pos,
      0,
      draggables.length - 1,
      withRespectToMiddlePoints
    );
  };
}

function resetDraggables ({ element, draggables, layout }) {
  return function () {
    draggables.forEach((p) => {
      setAnimation(p, false);
      layout.setTranslation(p, 0);
      layout.setVisibility(p, true);
    });

    if (element[stretcherElementInstance]) {
      element[stretcherElementInstance].parentNode.removeChild(
        element[stretcherElementInstance]
      );
      element[stretcherElementInstance] = null;
    }
  };
}

function setTargetContainer (draggableInfo, element, set = true) {
  if (element && set) {
    draggableInfo.targetElement = element;
  } else {
    if (draggableInfo.targetElement === element) {
      draggableInfo.targetElement = null;
    }
  }
}

function handleDrop ({ element, draggables, layout, getOptions }) {
  const draggablesReset = resetDraggables({
    element,
    draggables,
    layout,
    getOptions,
  });
  const dropHandler = (vueDndrop.dropHandler || domDropHandler)({
    element,
    draggables,
    layout,
    getOptions,
  });
  return function (
    draggableInfo,
    { addedIndex, removedIndex },
    forDispose = false
  ) {
    draggablesReset();
    // if drop zone is valid => complete drag, else emit dropNotAllowed and everything will be reverted by draggablesReset()
    if (draggableInfo && !draggableInfo.cancelDrop) {
      if (
        draggableInfo.targetElement ||
        getOptions().removeOnDropOut ||
        forDispose
      ) {
        const indexNotNull = (index) => index !== null;

        const actualAddIndex =
          indexNotNull(addedIndex)
            ? indexNotNull(removedIndex) && removedIndex < addedIndex
              ? addedIndex - 1
              : addedIndex
            : null;

        const { payload, element } = draggableInfo;

        const dropHandlerParams = {
          removedIndex,
          addedIndex: actualAddIndex,
          payload,
          element: element.firstElementChild || element,
        };
        const shouldHandleDrop =
          !draggableInfo.container.getOptions().fireRelatedEventsOnly ||
          indexNotNull(removedIndex) ||
          indexNotNull(actualAddIndex);
        if (shouldHandleDrop) {
          dropHandler(dropHandlerParams, getOptions().onDrop);
        }
      } else if (getOptions().dropNotAllowed) {
        const { payload, container } = draggableInfo;
        return getOptions().dropNotAllowed({ payload, container });
      }
    }
  };
}

function getContainerProps (element, getOptions) {
  const draggables = wrapChildren(element);
  const options = getOptions();
  // set flex classes before layout is inited for scroll listener
  addClass(element, `${containerClass} ${options.orientation}`);
  const layout = layoutManager(
    element,
    options.orientation,
    options.animationDuration
  );
  return {
    element,
    draggables,
    getOptions,
    layout,
  };
}

function getRemovedItem ({ element, getOptions }) {
  let prevRemovedIndex = null;
  return ({ draggableInfo }) => {
    let removedIndex = prevRemovedIndex;
    if (
      prevRemovedIndex == null &&
      draggableInfo.container.element === element &&
      getOptions().behaviour !== 'copy'
    ) {
      removedIndex = prevRemovedIndex = draggableInfo.elementIndex;
    }

    return { removedIndex };
  };
}

function setRemovedItemVisibilty ({ draggables, layout }) {
  return ({ dragResult }) => {
    if (dragResult.removedIndex !== null) {
      layout.setVisibility(draggables[dragResult.removedIndex], false);
    }
  };
}

function getPosition ({ element, layout }) {
  return ({ draggableInfo }) => {
    const hitElement = document.elementFromPoint(
      draggableInfo.position.x,
      draggableInfo.position.y
    );

    // TODO: if center is out of bounds use mouse position for hittest
    // if (!hitElement) {
    //   hitElement = document.elementFromPoint(draggableInfo.mousePosition.x, draggableInfo.mousePosition.y);
    // }

    if (hitElement) {
      const container = getParentRelevantContainerElement(
        hitElement,
        draggableInfo.relevantContainers
      );
      if (container && container.element === element) {
        return {
          pos: layout.getPosition(draggableInfo.position),
        };
      }
    }

    return {
      pos: null,
    };
  };
}

function getElementSize ({ layout }) {
  let elementSize = null;
  return ({ draggableInfo, dragResult }) => {
    if (dragResult.pos === null) {
      return (elementSize = null);
    } else {
      elementSize = elementSize || layout.getSize(draggableInfo.size);
    }
    return { elementSize };
  };
}

function handleTargetContainer ({ element }) {
  return ({ draggableInfo, dragResult }) => {
    setTargetContainer(draggableInfo, element, !!dragResult.pos);
  };
}

function getDragInsertionIndex ({ draggables, layout }) {
  const findDraggable = findDraggebleAtPos({ layout });
  return ({ dragResult: { shadowBeginEnd, pos } }) => {
    if (!shadowBeginEnd) {
      const index = findDraggable(draggables, pos, true);
      return index !== null ? index : draggables.length;
    } else {
      if (
        shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment <= pos &&
        shadowBeginEnd.end >= pos
      ) {
        // position inside ghost
        return null;
      }
    }

    if (pos < shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment) {
      return findDraggable(draggables, pos);
    } else if (pos > shadowBeginEnd.end) {
      return findDraggable(draggables, pos) + 1;
    } else {
      return draggables.length;
    }
  };
}

function getDragInsertionIndexForDropZone () {
  return ({ dragResult: { pos } }) => {
    return pos !== null ? { addedIndex: 0 } : { addedIndex: null };
  };
}

function getShadowBeginEndForDropZone ({ layout }) {
  let prevAddedIndex = null;
  return ({ dragResult: { addedIndex } }) => {
    if (addedIndex !== prevAddedIndex) {
      prevAddedIndex = addedIndex;
      const { begin } = layout.getBeginEndOfContainer();
      return {
        shadowBeginEnd: {
          rect: layout.getTopLeftOfElementBegin(begin),
        },
      };
    }

    return null;
  };
}

function drawDropPlaceholder ({ layout, element, getOptions }) {
  let prevAddedIndex = null;
  return ({
    dragResult: {
      elementSize,
      shadowBeginEnd,
      addedIndex,
      dropPlaceholderContainer,
    },
  }) => {
    const options = getOptions();
    if (options.dropPlaceholder) {
      const { animationDuration, className, showOnTop } =
        typeof options.dropPlaceholder === 'boolean'
          ? {}
          : options.dropPlaceholder;
      if (addedIndex !== null) {
        if (!dropPlaceholderContainer) {
          const innerElement = document.createElement('div');
          const flex = document.createElement('div');
          flex.className = dropPlaceholderFlexContainerClass;
          innerElement.className = `${dropPlaceholderInnerClass} ${
            className || dropPlaceholderDefaultClass
          }`;
          dropPlaceholderContainer = document.createElement('div');
          dropPlaceholderContainer.className = `${dropPlaceholderWrapperClass}`;
          dropPlaceholderContainer.style.position = 'absolute';

          if (animationDuration !== undefined) {
            dropPlaceholderContainer.style.transition = `all ${animationDuration}ms ease`;
          }

          dropPlaceholderContainer.appendChild(flex);
          flex.appendChild(innerElement);
          layout.setSize(dropPlaceholderContainer.style, elementSize + 'px');

          dropPlaceholderContainer.style.pointerEvents = 'none';

          if (showOnTop) {
            element.appendChild(dropPlaceholderContainer);
          } else {
            element.insertBefore(
              dropPlaceholderContainer,
              element.firstElementChild
            );
          }
        }

        if (prevAddedIndex !== addedIndex && shadowBeginEnd.dropArea) {
          layout.setBegin(
            dropPlaceholderContainer.style,
            shadowBeginEnd.dropArea.begin -
              layout.getBeginEndOfContainer().begin +
              'px'
          );
        }
        prevAddedIndex = addedIndex;

        return {
          dropPlaceholderContainer,
        };
      } else {
        if (dropPlaceholderContainer && prevAddedIndex !== null) {
          element.removeChild(dropPlaceholderContainer);
        }
        prevAddedIndex = null;

        return {
          dropPlaceholderContainer: undefined,
        };
      }
    }

    return null;
  };
}

function invalidateShadowBeginEndIfNeeded (params) {
  const shadowBoundsGetter = getShadowBeginEnd(params);
  return ({ draggableInfo, dragResult }) => {
    if (draggableInfo.invalidateShadow) {
      return shadowBoundsGetter({ draggableInfo, dragResult });
    }
    return null;
  };
}

function getNextAddedIndex (params) {
  const getIndexForPos = getDragInsertionIndex(params);
  return ({ dragResult }) => {
    let index = null;
    if (dragResult.pos !== null) {
      index = getIndexForPos({ dragResult });
      if (index === null) {
        index = dragResult.addedIndex;
      }
    }
    return {
      addedIndex: index,
    };
  };
}

function resetShadowAdjustment () {
  let lastAddedIndex = null;
  return ({ dragResult: { addedIndex, shadowBeginEnd } }) => {
    if (
      addedIndex !== lastAddedIndex &&
      lastAddedIndex !== null &&
      shadowBeginEnd
    ) {
      shadowBeginEnd.beginAdjustment = 0;
    }
    lastAddedIndex = addedIndex;
  };
}

function handleInsertionSizeChange ({
  element,
  draggables,
  layout,
  getOptions,
}) {
  let strectherElement = null;
  return function ({ dragResult: { addedIndex, removedIndex, elementSize } }) {
    if (removedIndex === null) {
      if (addedIndex !== null) {
        if (!strectherElement) {
          const containerBeginEnd = layout.getBeginEndOfContainer();
          containerBeginEnd.end =
            containerBeginEnd.begin + layout.getSize(element);
          const hasScrollBar =
            layout.getScrollSize(element) > layout.getSize(element);
          const containerEnd = hasScrollBar
            ? containerBeginEnd.begin +
              layout.getScrollSize(element) -
              layout.getScrollValue(element)
            : containerBeginEnd.end;
          const lastDraggableEnd =
            draggables.length > 0
              ? layout.getBeginEnd(draggables[draggables.length - 1]).end -
                draggables[draggables.length - 1][translationValue]
              : containerBeginEnd.begin;
          if (lastDraggableEnd + elementSize > containerEnd) {
            strectherElement = window.document.createElement('div');
            strectherElement.className =
              stretcherElementClass + ' ' + getOptions().orientation;
            const stretcherSize =
              draggables.length > 0
                ? elementSize + lastDraggableEnd - containerEnd
                : elementSize;
            layout.setSize(strectherElement.style, `${stretcherSize}px`);
            element.appendChild(strectherElement);
            element[stretcherElementInstance] = strectherElement;
            return {
              containerBoxChanged: true,
            };
          }
        }
      } else {
        if (strectherElement) {
          layout.setTranslation(strectherElement, 0);
          const toRemove = strectherElement;
          strectherElement = null;
          element.removeChild(toRemove);
          element[stretcherElementInstance] = null;
          return {
            containerBoxChanged: true,
          };
        }
      }
    }

    return undefined;
  };
}

function calculateTranslations ({ draggables, layout }) {
  let prevAddedIndex = null;
  let prevRemovedIndex = null;
  return function ({ dragResult: { addedIndex, removedIndex, elementSize } }) {
    if (addedIndex !== prevAddedIndex || removedIndex !== prevRemovedIndex) {
      for (let index = 0; index < draggables.length; index++) {
        if (index !== removedIndex) {
          const draggable = draggables[index];
          let translate = 0;
          if (removedIndex !== null && removedIndex < index) {
            translate -= elementSize;
          }
          if (addedIndex !== null && addedIndex <= index) {
            translate += elementSize;
          }
          layout.setTranslation(draggable, translate);
        }
      }

      prevAddedIndex = addedIndex;
      prevRemovedIndex = removedIndex;

      return { addedIndex, removedIndex };
    }

    return undefined;
  };
}

function getShadowBeginEnd ({ draggables, layout }) {
  let prevAddedIndex = null;
  return ({ draggableInfo, dragResult }) => {
    const { addedIndex, removedIndex, elementSize, pos, shadowBeginEnd } =
      dragResult;
    if (pos !== null) {
      if (
        addedIndex !== null &&
        (draggableInfo.invalidateShadow || addedIndex !== prevAddedIndex)
      ) {
        // if (prevAddedIndex) prevAddedIndex = addedIndex;
        let beforeIndex = addedIndex - 1;
        let begin = Number.MIN_SAFE_INTEGER;
        let dropAreaBegin = 0;
        let dropAreaEnd = 0;
        let afterBounds = null;
        let beforeBounds = null;
        if (beforeIndex === removedIndex) {
          beforeIndex--;
        }
        if (beforeIndex > -1) {
          const beforeSize = layout.getSize(draggables[beforeIndex]);
          beforeBounds = layout.getBeginEnd(draggables[beforeIndex]);
          if (elementSize < beforeSize) {
            const threshold = (beforeSize - elementSize) / 2;
            begin = beforeBounds.end - threshold;
          } else {
            begin = beforeBounds.end;
          }
          dropAreaBegin = beforeBounds.end;
        } else {
          beforeBounds = { end: layout.getBeginEndOfContainer().begin };
          dropAreaBegin = layout.getBeginEndOfContainer().begin;
        }

        let end = Number.MAX_SAFE_INTEGER;
        let afterIndex = addedIndex;
        if (afterIndex === removedIndex) {
          afterIndex++;
        }
        if (afterIndex < draggables.length) {
          const afterSize = layout.getSize(draggables[afterIndex]);
          afterBounds = layout.getBeginEnd(draggables[afterIndex]);

          if (elementSize < afterSize) {
            const threshold = (afterSize - elementSize) / 2;
            end = afterBounds.begin + threshold;
          } else {
            end = afterBounds.begin;
          }
          dropAreaEnd = afterBounds.begin;
        } else {
          afterBounds = { begin: layout.getContainerRectangles().rect.end };
          dropAreaEnd =
            layout.getContainerRectangles().rect.end -
            layout.getContainerRectangles().rect.begin;
        }

        const shadowRectTopLeft =
          beforeBounds && afterBounds
            ? layout.getTopLeftOfElementBegin(beforeBounds.end)
            : null;

        prevAddedIndex = addedIndex;
        return {
          shadowBeginEnd: {
            dropArea: {
              begin: dropAreaBegin,
              end: dropAreaEnd,
            },
            begin,
            end,
            rect: shadowRectTopLeft,
            beginAdjustment: shadowBeginEnd
              ? shadowBeginEnd.beginAdjustment
              : 0,
          },
        };
      } else {
        return null;
      }
    } else {
      prevAddedIndex = null;
      return {
        shadowBeginEnd: null,
      };
    }
  };
}

function handleFirstInsertShadowAdjustment () {
  let lastAddedIndex = null;
  return ({ dragResult: { pos, addedIndex, shadowBeginEnd } }) => {
    if (pos !== null) {
      if (addedIndex != null && lastAddedIndex === null) {
        if (pos < shadowBeginEnd.begin) {
          const beginAdjustment = pos - shadowBeginEnd.begin - 5;
          shadowBeginEnd.beginAdjustment = beginAdjustment;
        }
        lastAddedIndex = addedIndex;
      }
    } else {
      lastAddedIndex = null;
    }
  };
}

function fireDragEnterLeaveEvents ({ getOptions }) {
  let wasDragIn = false;
  const options = getOptions();
  return ({ dragResult: { pos } }) => {
    const isDragIn = !!pos;
    if (isDragIn !== wasDragIn) {
      wasDragIn = isDragIn;
      if (isDragIn) {
        options.onDragEnter && options.onDragEnter();
      } else {
        options.onDragLeave && options.onDragLeave();
      }
    }

    return undefined;
  };
}

function fireOnDropReady ({ getOptions }) {
  let lastAddedIndex = null;
  const options = getOptions();
  return ({
    dragResult: { addedIndex, removedIndex },
    draggableInfo: { payload, element },
  }) => {
    if (
      options.onDropReady &&
      addedIndex !== null &&
      lastAddedIndex !== addedIndex
    ) {
      lastAddedIndex = addedIndex;
      let adjustedAddedIndex = addedIndex;

      if (removedIndex !== null && addedIndex > removedIndex) {
        adjustedAddedIndex--;
      }

      options.onDropReady({
        addedIndex: adjustedAddedIndex,
        removedIndex,
        payload,
        element: element ? (element.firstElementChild || element) : undefined,
      });
    }
  };
}

function getDragHandler (params) {
  if (params.getOptions().behaviour === 'drop-zone') {
    // sorting is disabled in container, addedIndex will always be 0 if dropped in
    return compose(params)(
      getRemovedItem,
      setRemovedItemVisibilty,
      getPosition,
      getElementSize,
      handleTargetContainer,
      getDragInsertionIndexForDropZone,
      getShadowBeginEndForDropZone,
      fireDragEnterLeaveEvents,
      fireOnDropReady
    );
  } else {
    return compose(params)(
      getRemovedItem,
      setRemovedItemVisibilty,
      getPosition,
      getElementSize,
      handleTargetContainer,
      invalidateShadowBeginEndIfNeeded,
      getNextAddedIndex,
      resetShadowAdjustment,
      handleInsertionSizeChange,
      calculateTranslations,
      getShadowBeginEnd,
      drawDropPlaceholder,
      handleFirstInsertShadowAdjustment,
      fireDragEnterLeaveEvents,
      fireOnDropReady
    );
  }
}

function getDefaultDragResult () {
  return {
    addedIndex: null,
    removedIndex: null,
    elementSize: null,
    pos: null,
    shadowBeginEnd: null,
  };
}

function compose (params) {
  return (...functions) => {
    const hydratedFunctions = functions.map((p) => p(params));
    let result = null;
    return (draggableInfo) => {
      result = hydratedFunctions.reduce((dragResult, fn) => {
        return Object.assign(dragResult, fn({ draggableInfo, dragResult }));
      }, result || getDefaultDragResult());
      return result;
    };
  };
}

// Container definition begin
function Container (element) {
  return function (options) {
    let containerOptions = Object.assign({}, defaultOptions, options);
    let dragResult = null;
    let lastDraggableInfo = null;
    const props = getContainerProps(element, getOptions);
    let dragHandler = getDragHandler(props);
    const dropHandler = handleDrop(props);
    const scrollListener = listenScrollParent(element, onScroll);

    function processLastDraggableInfo () {
      if (lastDraggableInfo !== null) {
        lastDraggableInfo.invalidateShadow = true;
        dragResult = dragHandler(lastDraggableInfo);
        lastDraggableInfo.invalidateShadow = false;
      }
    }

    function setDraggables (draggables, element) {
      const newDraggables = wrapChildren(element);
      for (let i = 0; i < newDraggables.length; i++) {
        draggables[i] = newDraggables[i];
      }

      for (let i = 0; i < draggables.length - newDraggables.length; i++) {
        draggables.pop();
      }
    }

    function prepareDrag (container, relevantContainers) {
      const element = container.element;
      const draggables = props.draggables;
      setDraggables(draggables, element);
      container.layout.invalidateRects();
      draggables.forEach((p) =>
        setAnimation(p, true, getOptions().animationDuration)
      );
      scrollListener.start();
    }

    function onScroll () {
      props.layout.invalidateRects();
      processLastDraggableInfo();
    }

    function dispose (container) {
      scrollListener.dispose();
      container.layout.removeResizeListener();
      unwrapChildren(container.element);
    }

    function setOptions (options, merge = true) {
      if (merge === false) {
        containerOptions = Object.assign({}, defaultOptions, options);
      } else {
        containerOptions = Object.assign(
          {},
          defaultOptions,
          containerOptions,
          options
        );
      }
    }

    function getOptions () {
      return containerOptions;
    }

    const container = {
      element,
      draggables: props.draggables,
      isDragRelevant: isDragRelevant(props),
      layout: props.layout,
      dispose,
      prepareDrag,
      handleDrag (draggableInfo) {
        lastDraggableInfo = draggableInfo;
        dragResult = dragHandler(draggableInfo);
        return dragResult;
      },
      handleDrop (draggableInfo) {
        scrollListener.stop();
        if (dragResult && dragResult.dropPlaceholderContainer) {
          element.removeChild(dragResult.dropPlaceholderContainer);
        }
        lastDraggableInfo = null;
        dragHandler = getDragHandler(props);
        dropHandler(draggableInfo, dragResult);
        dragResult = null;
      },
      fireRemoveElement () {
        // will be called when container is disposed while dragging so ignore addedIndex
        dropHandler(
          lastDraggableInfo,
          Object.assign({}, dragResult, { addedIndex: null }),
          true
        );
        dragResult = null;
      },
      getDragResult () {
        return dragResult;
      },
      getTranslateCalculator (dragresult) {
        return calculateTranslations(props)(dragresult);
      },
      onTranslated: () => {
        processLastDraggableInfo();
      },
      setDraggables: () => {
        setDraggables(props.draggables, element);
      },
      getScrollMaxSpeed () {
        return vueDndrop.maxScrollSpeed;
      },
      shouldUseTransformForGhost () {
        return vueDndrop.useTransformForGhost === true;
      },
      getOptions,
      setOptions,
    };

    return container;
  };
}

// exported part of container
const vueDndrop = function (element, options) {
  const containerIniter = Container(element);
  const container = containerIniter(options);
  element[containerInstance] = container;
  Mediator.register(container);
  return {
    dispose () {
      Mediator.unregister(container);
      container.dispose(container);
    },
    setOptions (options, merge) {
      container.setOptions(options, merge);
    },
  };
};

// wrap all draggables by default
// in react,vue,angular this value will be set to false
vueDndrop.wrapChild = true;
vueDndrop.cancelDrag = function () {
  Mediator.cancelDrag();
};

vueDndrop.isDragging = function () {
  return Mediator.isDragging();
};

export default vueDndrop;

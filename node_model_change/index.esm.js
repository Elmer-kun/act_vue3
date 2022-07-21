import { useContext, useEffect, useRef, useMemo, useState, useCallback } from '../preact/hooks';
import { isFunction, isArray, get, assign, set, sortBy, find, isNumber, debounce } from 'min-dash';
import classnames from 'classnames';
import '../preact/compat';
import { jsx, jsxs } from '../preact/jsx-runtime';
import { query } from 'min-dom';
import { createContext, createElement } from '../preact';
import {useService} from "bpmn-js-properties-panel";

var ArrowIcon = function ArrowIcon(props) {
  return jsx("svg", { ...props,
    children: jsx("path", {
      fillRule: "evenodd",
      d: "m11.657 8-4.95 4.95a1 1 0 0 1-1.414-1.414L8.828 8 5.293 4.464A1 1 0 1 1 6.707 3.05L11.657 8z"
    })
  });
};

ArrowIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16"
};

var CreateIcon = function CreateIcon(props) {
  return jsx("svg", { ...props,
    children: jsx("path", {
      fillRule: "evenodd",
      d: "M9 13V9h4a1 1 0 0 0 0-2H9V3a1 1 0 1 0-2 0v4H3a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0z"
    })
  });
};

CreateIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16"
};

var DeleteIcon = function DeleteIcon(props) {
  return jsx("svg", { ...props,
    children: jsx("path", {
      fillRule: "evenodd",
      d: "M12 6v7c0 1.1-.4 1.55-1.5 1.55h-5C4.4 14.55 4 14.1 4 13V6h8zm-1.5 1.5h-5v4.3c0 .66.5 1.2 1.111 1.2H9.39c.611 0 1.111-.54 1.111-1.2V7.5zM13 3h-2l-1-1H6L5 3H3v1.5h10V3z"
    })
  });
};

DeleteIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16"
};

var ExternalLinkIcon = function ExternalLinkIcon(props) {
  return jsx("svg", { ...props,
    children: jsx("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12.637 12.637v-4.72h1.362v4.721c0 .36-.137.676-.411.95-.275.275-.591.412-.95.412H3.362c-.38 0-.703-.132-.967-.396A1.315 1.315 0 0 1 2 12.638V3.362c0-.38.132-.703.396-.967S2.982 2 3.363 2h4.553v1.363H3.363v9.274h9.274zM14 2H9.28l-.001 1.362h2.408L5.065 9.984l.95.95 6.622-6.622v2.409H14V2z",
      fill: "#818798"
    })
  });
};

ExternalLinkIcon.defaultProps = {
  width: "16",
  height: "16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

var FeelRequiredIcon = function FeelRequiredIcon(props) {
  return jsxs("svg", { ...props,
    children: [jsx("path", {
      d: "M5.8 7.06V5.95h4.307v1.11H5.8zm0 3.071v-1.11h4.307v1.11H5.8z",
      fill: "#505562"
    }), jsx("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M8 3.268A4.732 4.732 0 1 0 12.732 8H14a6 6 0 1 1-6-6v1.268z",
      fill: "#505562"
    }), jsx("path", {
      d: "m11.28 6.072-.832-.56 1.016-1.224L10 3.848l.312-.912 1.392.584L11.632 2h1.032l-.072 1.52 1.392-.584.312.912-1.464.44 1.008 1.224-.832.552-.864-1.296-.864 1.304z",
      fill: "#505562"
    })]
  });
};

FeelRequiredIcon.defaultProps = {
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

var FeelOptionalIcon = function FeelOptionalIcon(props) {
  return jsxs("svg", { ...props,
    children: [jsx("path", {
      d: "M5.845 7.04V5.93h4.307v1.11H5.845zm0 3.07V9h4.307v1.11H5.845z",
      fill: "#505562"
    }), jsx("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M3.286 8a4.714 4.714 0 1 0 9.428 0 4.714 4.714 0 0 0-9.428 0zM8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z",
      fill: "#505562"
    })]
  });
};

FeelOptionalIcon.defaultProps = {
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

function Header(props) {
  const {
    element,
    headerProvider
  } = props;
  const {
    getElementIcon,
    getDocumentationRef,
    getElementLabel,
    getTypeLabel
  } = headerProvider;
  const label = getElementLabel(element);
  const type = getTypeLabel(element);
  const translate = useService('translate');
  const documentationRef = getDocumentationRef && getDocumentationRef(element);
  const ElementIcon = getElementIcon(element);
  return jsxs("div", {
    class: "bio-properties-panel-header",
    children: [jsx("div", {
      class: "bio-properties-panel-header-icon",
      children: ElementIcon && jsx(ElementIcon, {
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      })
    }), jsxs("div", {
      class: "bio-properties-panel-header-labels",
      children: [jsx("div", {
        title: translate(type),
        class: "bio-properties-panel-header-type",
        children: translate(type)
      }), label ? jsx("div", {
        title: translate(label),
        class: "bio-properties-panel-header-label",
        children: translate(label)
      }) : null]
    }), jsx("div", {
      class: "bio-properties-panel-header-actions",
      children: documentationRef ? jsx("a", {
        rel: "noopener",
        class: "bio-properties-panel-header-link",
        href: documentationRef,
        title: "Open documentation",
        target: "_blank",
        children: jsx(ExternalLinkIcon, {})
      }) : null
    })]
  });
}

const DescriptionContext = createContext({
  description: {},
  getDescriptionForId: () => {}
});

/**
 * @typedef {Function} <propertiesPanel.showEntry> callback
 *
 * @example
 *
 * useEvent('propertiesPanel.showEntry', ({ focus = false, ...rest }) => {
 *   // ...
 * });
 *
 * @param {Object} context
 * @param {boolean} [context.focus]
 *
 * @returns void
 */
const EventContext = createContext({
  eventBus: null
});

const LayoutContext = createContext({
  layout: {},
  setLayout: () => {},
  getLayoutForKey: () => {},
  setLayoutForKey: () => {}
});

/**
 * Accesses the global DescriptionContext and returns a description for a given id and element.
 *
 * @example
 * ```jsx
 * function TextField(props) {
 *   const description = useDescriptionContext('input1', element);
 * }
 * ```
 *
 * @param {string} id
 * @param {object} element
 *
 * @returns {string}
 */

function useDescriptionContext(id, element) {
  const {
    getDescriptionForId
  } = useContext(DescriptionContext);
  return getDescriptionForId(id, element);
}

const DEFAULT_PRIORITY = 1000;
/**
 * Subscribe to an event.
 *
 * @param {string} event
 * @param {Function} callback
 * @param {number} [priority]
 *
 * @returns {import('preact').Ref}
 */

function useEvent(event, callback, priority = DEFAULT_PRIORITY) {
  const {
    eventBus
  } = useContext(EventContext);
  useEffect(() => {
    if (!eventBus) {
      return;
    }

    eventBus.on(event, priority, callback);
    return () => eventBus.off(event, callback);
  }, [callback, event, eventBus, priority]);
}

const HIGH_PRIORITY = 10000;
/**
 * Buffer events and re-fire during passive effect phase.
 *
 * @param {string[]} bufferedEvents
 * @param {Object} [eventBus]
 */

function useEventBuffer(bufferedEvents, eventBus) {
  const buffer = useRef([]),
        buffering = useRef(true);

  const createCallback = event => data => {
    if (buffering.current === true) {
      buffer.current.unshift([event, data]);
    }
  }; // (1) buffer events


  useEffect(() => {
    if (!eventBus) {
      return;
    }

    const listeners = bufferedEvents.map(event => {
      return [event, createCallback(event)];
    });
    listeners.forEach(([event, callback]) => {
      eventBus.on(event, HIGH_PRIORITY, callback);
    });
    return () => {
      listeners.forEach(([event, callback]) => {
        eventBus.off(event, callback);
      });
    };
  }, [bufferedEvents, eventBus]); // (2) re-fire events

  useEffect(() => {
    if (!eventBus) {
      return;
    }

    buffering.current = false;

    while (buffer.current.length) {
      const [event, data] = buffer.current.pop();
      eventBus.fire(event, data);
    }

    buffering.current = true;
  });
}

const KEY_LENGTH = 6;
/**
 * Create a persistent key factory for plain objects without id.
 *
 * @example
 * ```jsx
 * function List({ objects }) {
 *   const getKey = useKeyFactory();
 *   return (<ol>{
 *     objects.map(obj => {
 *       const key = getKey(obj);
 *       return <li key={key}>obj.name</li>
 *     })
 *   }</ol>);
 * }
 * ```
 *
 * @param {any[]} dependencies
 * @returns {(element: object) => string}
 */

function useKeyFactory(dependencies = []) {
  const map = useMemo(() => new Map(), dependencies);

  const getKey = el => {
    let key = map.get(el);

    if (!key) {
      key = Math.random().toString().slice(-KEY_LENGTH);
      map.set(el, key);
    }

    return key;
  };

  return getKey;
}

/**
 * Creates a state that persists in the global LayoutContext.
 *
 * @example
 * ```jsx
 * function Group(props) {
 *   const [ open, setOpen ] = useLayoutState([ 'groups', 'foo', 'open' ], false);
 * }
 * ```
 *
 * @param {(string|number)[]} path
 * @param {any} [defaultValue]
 *
 * @returns {[ any, Function ]}
 */

function useLayoutState(path, defaultValue) {
  const {
    getLayoutForKey,
    setLayoutForKey
  } = useContext(LayoutContext);
  const layoutForKey = getLayoutForKey(path, defaultValue);
  const [value, set] = useState(layoutForKey);

  const setState = newValue => {
    // (1) set component state
    set(newValue); // (2) set context

    setLayoutForKey(path, newValue);
  };

  return [value, setState];
}

/**
 * @pinussilvestrus: we need to introduce our own hook to persist the previous
 * state on updates.
 *
 * cf. https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/**
 * Subscribe to `propertiesPanel.showEntry`.
 *
 * @param {Function} show
 *
 * @returns {import('preact').Ref}
 */

function useShowEntryEvent(show) {
  const {
    onShow
  } = useContext(LayoutContext);
  const ref = useRef();
  const [focus, setFocus] = useState(false);
  const onShowEntry = useCallback(event => {
    if (show(event)) {
      if (isFunction(onShow)) {
        onShow();
      }

      if (event.focus && !focus) {
        setFocus(true);
      }
    }
  }, [show]);
  useEffect(() => {
    if (focus && ref.current) {
      if (isFunction(ref.current.focus)) {
        ref.current.focus();
      }

      if (isFunction(ref.current.select)) {
        ref.current.select();
      }

      setFocus(false);
    }
  }, [focus]);
  useEvent('propertiesPanel.showEntry', onShowEntry);
  return ref;
}

/**
 * Subscribe to `propertiesPanel.showError`. On `propertiesPanel.showError` set
 * temporary error. Fire `propertiesPanel.showEntry` for temporary error to be
 * visible. Unset error on `propertiesPanel.updated`.
 *
 * @param {Function} show
 *
 * @returns {import('preact').Ref}
 */

function useShowErrorEvent(show) {
  const {
    eventBus
  } = useContext(EventContext);
  const [temporaryError, setTemporaryError] = useState(null);
  const onPropertiesPanelUpdated = useCallback(() => setTemporaryError(null), []);
  useEvent('propertiesPanel.updated', onPropertiesPanelUpdated);
  const onShowError = useCallback(event => {
    setTemporaryError(null);

    if (show(event)) {
      if (eventBus) {
        eventBus.fire('propertiesPanel.showEntry', event);
      }

      setTemporaryError(event.message);
    }
  }, [show]);
  useEvent('propertiesPanel.showError', onShowError);
  return temporaryError;
}

/**
 * @callback setSticky
 * @param {boolean} value
 */

/**
 * Use IntersectionObserver to identify when DOM element is in sticky mode.
 * If sticky is observered setSticky(true) will be called.
 * If sticky mode is left, setSticky(false) will be called.
 *
 *
 * @param {Object} ref
 * @param {string} scrollContainerSelector
 * @param {setSticky} setSticky
 */

function useStickyIntersectionObserver(ref, scrollContainerSelector, setSticky) {
  useEffect(() => {
    // return early if IntersectionObserver is not available
    if (!IntersectionObserver) {
      return;
    }

    let observer;

    if (ref.current) {
      const scrollContainer = query(scrollContainerSelector);
      observer = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio < 1) {
          setSticky(true);
        } else if (entries[0].intersectionRatio === 1) {
          setSticky(false);
        }
      }, {
        root: scrollContainer,
        rootMargin: '0px 0px 999999% 0px',
        // Use bottom margin to avoid stickyness when scrolling out to bottom
        threshold: [1]
      });
      observer.observe(ref.current);
    } // Unobserve if unmounted


    return () => {
      if (ref.current && observer) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
}

function Group(props) {
  const {
    element,
    entries = [],
    id,
    label,
    shouldOpen = false
  } = props;
  const groupRef = useRef(null);
  const translate = useService('translate');
  const [open, setOpen] = useLayoutState(['groups', id, 'open'], shouldOpen);
  const onShow = useCallback(() => setOpen(true), [setOpen]);

  const toggleOpen = () => setOpen(!open);

  const [edited, setEdited] = useState(false);
  const [sticky, setSticky] = useState(false); // set edited state depending on all entries

  useEffect(() => {
    const hasOneEditedEntry = entries.find(entry => {
      const {
        id,
        isEdited
      } = entry;
      const entryNode = query(`[data-entry-id="${id}"]`);

      if (!isFunction(isEdited) || !entryNode) {
        return false;
      }

      const inputNode = query('.bio-properties-panel-input', entryNode);
      return isEdited(inputNode);
    });
    setEdited(hasOneEditedEntry);
  }, [entries]); // set css class when group is sticky to top

  useStickyIntersectionObserver(groupRef, 'div.bio-properties-panel-scroll-container', setSticky);
  const propertiesPanelContext = { ...useContext(LayoutContext),
    onShow
  };
  return jsxs("div", {
    class: "bio-properties-panel-group",
    "data-group-id": 'group-' + id,
    ref: groupRef,
    children: [jsxs("div", {
      class: classnames('bio-properties-panel-group-header', edited ? '' : 'empty', open ? 'open' : '', sticky && open ? 'sticky' : ''),
      onClick: toggleOpen,
      children: [jsx("div", {
        title: translate(label),
        class: "bio-properties-panel-group-header-title",
        children: translate(label)
      }), jsxs("div", {
        class: "bio-properties-panel-group-header-buttons",
        children: [edited && jsx(DataMarker, {}), jsx("button", {
          title: "Toggle section",
          class: "bio-properties-panel-group-header-button bio-properties-panel-arrow",
          children: jsx(ArrowIcon, {
            class: open ? 'bio-properties-panel-arrow-down' : 'bio-properties-panel-arrow-right'
          })
        })]
      })]
    }), jsx("div", {
      class: classnames('bio-properties-panel-group-entries', open ? 'open' : ''),
      children: jsx(LayoutContext.Provider, {
        value: propertiesPanelContext,
        children: entries.map(entry => {
          const {
            component: Component,
            id
          } = entry;
          return createElement(Component, { ...entry,
            element: element,
            key: id
          });
        })
      })
    })]
  });
}

function DataMarker() {
  return jsx("div", {
    title: "Section contains data",
    class: "bio-properties-panel-dot"
  });
}

/**
 * @typedef { {
 *  text: (element: object) => string,
 *  icon?: (element: Object) => import('preact').Component
 * } } PlaceholderDefinition
 *
 * @param { PlaceholderDefinition } props
 */
function Placeholder(props) {
  const {
    text,
    icon: Icon
  } = props;
  return jsx("div", {
    class: "bio-properties-panel open",
    children: jsxs("section", {
      class: "bio-properties-panel-placeholder",
      children: [Icon && jsx(Icon, {
        class: "bio-properties-panel-placeholder-icon"
      }), jsx("p", {
        class: "bio-properties-panel-placeholder-text",
        children: text
      })]
    })
  });
}

const DEFAULT_LAYOUT = {
  open: true
};
const DEFAULT_DESCRIPTION = {};
const bufferedEvents = ['propertiesPanel.showEntry', 'propertiesPanel.showError'];
/**
 * @typedef { {
 *    component: import('preact').Component,
 *    id: String,
 *    isEdited?: Function
 * } } EntryDefinition
 *
 * @typedef { {
 *    autoFocusEntry: String,
 *    autoOpen?: Boolean,
 *    entries: Array<EntryDefinition>,
 *    id: String,
 *    label: String,
 *    remove: (event: MouseEvent) => void
 * } } ListItemDefinition
 *
 * @typedef { {
 *    add: (event: MouseEvent) => void,
 *    component: import('preact').Component,
 *    element: Object,
 *    id: String,
 *    items: Array<ListItemDefinition>,
 *    label: String,
 *    shouldSort?: Boolean,
 *    shouldOpen?: Boolean
 * } } ListGroupDefinition
 *
 * @typedef { {
 *    component?: import('preact').Component,
 *    entries: Array<EntryDefinition>,
 *    id: String,
 *    label: String,
 *    shouldOpen?: Boolean
 * } } GroupDefinition
 *
 *  @typedef { {
 *    [id: String]: GetDescriptionFunction
 * } } DescriptionConfig
 *
 * @callback { {
 * @param {string} id
 * @param {Object} element
 * @returns {string}
 * } } GetDescriptionFunction
 *
 * @typedef { {
 *  getEmpty: (element: object) => import('./components/Placeholder').PlaceholderDefinition,
 *  getMultiple: (element: Object) => import('./components/Placeholder').PlaceholderDefinition
 * } } PlaceholderProvider
 *
 */

/**
 * A basic properties panel component. Describes *how* content will be rendered, accepts
 * data from implementor to describe *what* will be rendered.
 *
 * @param {Object} props
 * @param {Object|Array} props.element
 * @param {import('./components/Header').HeaderProvider} props.headerProvider
 * @param {PlaceholderProvider} [props.placeholderProvider]
 * @param {Array<GroupDefinition|ListGroupDefinition>} props.groups
 * @param {Object} [props.layoutConfig]
 * @param {Function} [props.layoutChanged]
 * @param {DescriptionConfig} [props.descriptionConfig]
 * @param {Function} [props.descriptionLoaded]
 * @param {Object} [props.eventBus]
 */

function PropertiesPanel(props) {
  const {
    element,
    headerProvider,
    placeholderProvider,
    groups,
    layoutConfig = {},
    layoutChanged,
    descriptionConfig = {},
    descriptionLoaded,
    eventBus
  } = props; // set-up layout context

  const [layout, setLayout] = useState(createLayout(layoutConfig));
  useEffect(() => {
    if (typeof layoutChanged === 'function') {
      layoutChanged(layout);
    }
  }, [layout, layoutChanged]);

  const getLayoutForKey = (key, defaultValue) => {
    return get(layout, key, defaultValue);
  };

  const setLayoutForKey = (key, config) => {
    const newLayout = assign({}, layout);
    set(newLayout, key, config);
    setLayout(newLayout);
  };

  const layoutContext = {
    layout,
    setLayout,
    getLayoutForKey,
    setLayoutForKey
  }; // set-up description context

  const description = createDescriptionContext(descriptionConfig);

  if (typeof descriptionLoaded === 'function') {
    descriptionLoaded(description);
  }

  const getDescriptionForId = (id, element) => {
    return description[id] && description[id](element);
  };

  const descriptionContext = {
    description,
    getDescriptionForId
  };
  useEventBuffer(bufferedEvents, eventBus);
  const eventContext = {
    eventBus
  };
  const propertiesPanelContext = {
    element
  }; // empty state

  if (placeholderProvider && !element) {
    return jsx(Placeholder, { ...placeholderProvider.getEmpty()
    });
  } // multiple state


  if (placeholderProvider && isArray(element)) {
    return jsx(Placeholder, { ...placeholderProvider.getMultiple()
    });
  }

  return jsx(LayoutContext.Provider, {
    value: propertiesPanelContext,
    children: jsx(DescriptionContext.Provider, {
      value: descriptionContext,
      children: jsx(LayoutContext.Provider, {
        value: layoutContext,
        children: jsx(EventContext.Provider, {
          value: eventContext,
          children: jsxs("div", {
            class: classnames('bio-properties-panel', layout.open ? 'open' : ''),
            children: [jsx(Header, {
              element: element,
              headerProvider: headerProvider
            }), jsx("div", {
              class: "bio-properties-panel-scroll-container",
              children: groups.map(group => {
                const {
                  component: Component = Group,
                  id
                } = group;
                return createElement(Component, { ...group,
                  key: id,
                  element: element
                });
              })
            })]
          })
        })
      })
    })
  });
} // helpers //////////////////

function createLayout(overrides) {
  return { ...DEFAULT_LAYOUT,
    ...overrides
  };
}

function createDescriptionContext(overrides) {
  return { ...DEFAULT_DESCRIPTION,
    ...overrides
  };
}

function DropdownButton(props) {
  const {
    class: className,
    children,
    menuItems = []
  } = props;
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  function onDropdownToggle(event) {
    if (menuRef.current && menuRef.current.contains(event.target)) {
      return;
    }

    event.stopPropagation();
    setOpen(open => !open);
  }

  function onActionClick(event, action) {
    event.stopPropagation();
    close();
    action();
  }

  useGlobalClick([dropdownRef.current], () => close());
  return jsxs("div", {
    class: classnames('bio-properties-panel-dropdown-button', {
      open
    }, className),
    onClick: onDropdownToggle,
    ref: dropdownRef,
    children: [children, jsx("div", {
      class: "bio-properties-panel-dropdown-button__menu",
      ref: menuRef,
      children: menuItems.map((item, index) => jsx(MenuItem, {
        onClick: onActionClick,
        item: item
      }, index))
    })]
  });
}

function MenuItem({
  item,
  onClick
}) {
  if (item.separator) {
    return jsx("div", {
      class: "bio-properties-panel-dropdown-button__menu-item bio-properties-panel-dropdown-button__menu-item--separator"
    });
  }

  if (item.action) {
    return jsx("button", {
      class: "bio-properties-panel-dropdown-button__menu-item bio-properties-panel-dropdown-button__menu-item--actionable",
      onClick: event => onClick(event, item.action),
      children: item.entry
    });
  }

  return jsx("div", {
    class: "bio-properties-panel-dropdown-button__menu-item",
    children: item.entry
  });
}
/**
 *
 * @param {Array<null | Element>} ignoredElements
 * @param {Function} callback
 */


function useGlobalClick(ignoredElements, callback) {
  useEffect(() => {
    /**
     * @param {MouseEvent} event
     */
    function listener(event) {
      if (ignoredElements.some(element => element && element.contains(event.target))) {
        return;
      }

      callback();
    }

    document.addEventListener('click', listener, {
      capture: true
    });
    return () => document.removeEventListener('click', listener, {
      capture: true
    });
  }, [...ignoredElements, callback]);
}

function HeaderButton(props) {
  const {
    children = null,
    class: classname,
    onClick = () => {},
    ...otherProps
  } = props;
  return jsx("button", { ...otherProps,
    onClick: onClick,
    class: classnames('bio-properties-panel-group-header-button', classname),
    children: children
  });
}

function CollapsibleEntry(props) {
  const {
    element,
    entries = [],
    id,
    label,
    open: shouldOpen,
    remove
  } = props;
  const [open, setOpen] = useState(shouldOpen);

  const toggleOpen = () => setOpen(!open);

  const {
    onShow
  } = useContext(LayoutContext);
  const propertiesPanelContext = { ...useContext(LayoutContext),
    onShow: useCallback(() => {
      setOpen(true);

      if (isFunction(onShow)) {
        onShow();
      }
    }, [onShow, setOpen])
  }; // todo(pinussilvestrus): translate once we have a translate mechanism for the core

  const placeholderLabel = '<empty>';
  return jsxs("div", {
    "data-entry-id": id,
    class: classnames('bio-properties-panel-collapsible-entry', open ? 'open' : ''),
    children: [jsxs("div", {
      class: "bio-properties-panel-collapsible-entry-header",
      onClick: toggleOpen,
      children: [jsx("div", {
        title: label || placeholderLabel,
        class: classnames('bio-properties-panel-collapsible-entry-header-title', !label && 'empty'),
        children: label || placeholderLabel
      }), jsx("button", {
        title: "Toggle list item",
        class: "bio-properties-panel-arrow  bio-properties-panel-collapsible-entry-arrow",
        children: jsx(ArrowIcon, {
          class: open ? 'bio-properties-panel-arrow-down' : 'bio-properties-panel-arrow-right'
        })
      }), remove ? jsx("button", {
        title: "Delete item",
        class: "bio-properties-panel-remove-entry",
        onClick: remove,
        children: jsx(DeleteIcon, {})
      }) : null]
    }), jsx("div", {
      class: classnames('bio-properties-panel-collapsible-entry-entries', open ? 'open' : ''),
      children: jsx(LayoutContext.Provider, {
        value: propertiesPanelContext,
        children: entries.map(entry => {
          const {
            component: Component,
            id
          } = entry;
          return createElement(Component, { ...entry,
            element: element,
            key: id
          });
        })
      })
    })]
  });
}

function ListItem(props) {
  const {
    autoFocusEntry,
    autoOpen
  } = props; // focus specified entry on auto open

  useEffect(() => {
    if (autoOpen && autoFocusEntry) {
      const entry = query(`[data-entry-id="${autoFocusEntry}"]`);
      const focusableInput = query('.bio-properties-panel-input', entry);

      if (focusableInput) {
        if (isFunction(focusableInput.select)) {
          focusableInput.select();
        } else if (isFunction(focusableInput.focus)) {
          focusableInput.focus();
        }
      }
    }
  }, [autoOpen, autoFocusEntry]);
  return jsx("div", {
    class: "bio-properties-panel-list-item",
    children: jsx(CollapsibleEntry, { ...props,
      open: autoOpen
    })
  });
}

const noop$3 = () => {};
/**
 * @param {import('../PropertiesPanel').ListGroupDefinition} props
 */


function ListGroup(props) {
  const {
    add,
    element,
    id,
    items,
    label,
    shouldOpen = true,
    shouldSort = true
  } = props;
  const groupRef = useRef(null);
  const [open, setOpen] = useLayoutState(['groups', id, 'open'], false);
  const [sticky, setSticky] = useState(false);
  const onShow = useCallback(() => setOpen(true), [setOpen]);
  const [ordering, setOrdering] = useState([]);
  const [newItemAdded, setNewItemAdded] = useState(false);
  const prevItems = usePrevious(items);
  const prevElement = usePrevious(element);
  const elementChanged = element !== prevElement;
  const shouldHandleEffects = !elementChanged && (shouldSort || shouldOpen); // reset initial ordering when element changes (before first render)

  if (elementChanged) {
    setOrdering(createOrdering(shouldSort ? sortItems(items) : items));
  } // keep ordering in sync to items - and open changes
  // (0) set initial ordering from given items


  useEffect(() => {
    if (!prevItems || !shouldSort) {
      setOrdering(createOrdering(items));
    }
  }, [items, element]); // (1) items were added

  useEffect(() => {
    if (shouldHandleEffects && prevItems && items.length > prevItems.length) {
      let add = [];
      items.forEach(item => {
        if (!ordering.includes(item.id)) {
          add.push(item.id);
        }
      });
      let newOrdering = ordering; // open if not open and configured

      if (!open && shouldOpen) {
        toggleOpen(); // if I opened and I should sort, then sort items

        if (shouldSort) {
          newOrdering = createOrdering(sortItems(items));
        }
      } // add new items on top or bottom depending on sorting behavior


      newOrdering = newOrdering.filter(item => !add.includes(item));

      if (shouldSort) {
        newOrdering.unshift(...add);
      } else {
        newOrdering.push(...add);
      }

      setOrdering(newOrdering);
      setNewItemAdded(true);
    } else {
      setNewItemAdded(false);
    }
  }, [items, open, shouldHandleEffects]); // (2) sort items on open if shouldSort is set

  useEffect(() => {
    if (shouldSort && open && !newItemAdded) {
      setOrdering(createOrdering(sortItems(items)));
    }
  }, [open, shouldSort]); // (3) items were deleted

  useEffect(() => {
    if (shouldHandleEffects && prevItems && items.length < prevItems.length) {
      let keep = [];
      ordering.forEach(o => {
        if (getItem(items, o)) {
          keep.push(o);
        }
      });
      setOrdering(keep);
    }
  }, [items, shouldHandleEffects]); // set css class when group is sticky to top

  useStickyIntersectionObserver(groupRef, 'div.bio-properties-panel-scroll-container', setSticky);

  const toggleOpen = () => setOpen(!open);

  const hasItems = !!items.length;
  const propertiesPanelContext = { ...useContext(LayoutContext),
    onShow
  };
  return jsxs("div", {
    class: "bio-properties-panel-group",
    "data-group-id": 'group-' + id,
    ref: groupRef,
    children: [jsxs("div", {
      class: classnames('bio-properties-panel-group-header', hasItems ? '' : 'empty', hasItems && open ? 'open' : '', sticky && open ? 'sticky' : ''),
      onClick: hasItems ? toggleOpen : noop$3,
      children: [jsx("div", {
        title: label,
        class: "bio-properties-panel-group-header-title",
        children: label
      }), jsxs("div", {
        class: "bio-properties-panel-group-header-buttons",
        children: [add ? jsxs("button", {
          title: "Create new list item",
          class: "bio-properties-panel-group-header-button bio-properties-panel-add-entry",
          onClick: add,
          children: [jsx(CreateIcon, {}), !hasItems ? jsx("span", {
            class: "bio-properties-panel-add-entry-label",
            children: "Create"
          }) : null]
        }) : null, hasItems ? jsx("div", {
          title: `List contains ${items.length} item${items.length != 1 ? 's' : ''}`,
          class: "bio-properties-panel-list-badge",
          children: items.length
        }) : null, hasItems ? jsx("button", {
          title: "Toggle section",
          class: "bio-properties-panel-group-header-button bio-properties-panel-arrow",
          children: jsx(ArrowIcon, {
            class: open ? 'bio-properties-panel-arrow-down' : 'bio-properties-panel-arrow-right'
          })
        }) : null]
      })]
    }), jsx("div", {
      class: classnames('bio-properties-panel-list', open && hasItems ? 'open' : ''),
      children: jsx(LayoutContext.Provider, {
        value: propertiesPanelContext,
        children: ordering.map((o, index) => {
          const item = getItem(items, o);

          if (!item) {
            return;
          }

          const {
            id
          } = item; // if item was added, open first or last item based on ordering

          const autoOpen = newItemAdded && (shouldSort ? index === 0 : index === ordering.length - 1);
          return createElement(ListItem, { ...item,
            autoOpen: autoOpen,
            element: element,
            index: index,
            key: id
          });
        })
      })
    })]
  });
} // helpers ////////////////////

/**
 * Sorts given items alphanumeric by label
 */

function sortItems(items) {
  return sortBy(items, i => i.label.toLowerCase());
}

function getItem(items, id) {
  return find(items, i => i.id === id);
}

function createOrdering(items) {
  return items.map(i => i.id);
}

function Description(props) {
  const {
    element,
    forId,
    value
  } = props;
  const contextDescription = useDescriptionContext(forId, element);
  const description = value || contextDescription;

  if (description) {
    return jsx("div", {
      class: "bio-properties-panel-description",
      children: description
    });
  }
}

const noop$2 = () => {};

function Checkbox(props) {
  const {
    id,
    label,
    onChange,
    disabled,
    value = false,
    show = noop$2
  } = props;

  const handleChange = ({
    target
  }) => {
    onChange(target.checked);
  };

  const ref = useShowEntryEvent(show);
  return jsxs("div", {
    class: "bio-properties-panel-checkbox",
    children: [jsx("input", {
      ref: ref,
      id: prefixId$6(id),
      name: id,
      type: "checkbox",
      class: "bio-properties-panel-input",
      onChange: handleChange,
      checked: value,
      disabled: disabled
    }), jsx("label", {
      for: prefixId$6(id),
      class: "bio-properties-panel-label",
      children: label
    })]
  });
}
/**
 * @param {Object} props
 * @param {Object} props.element
 * @param {String} props.id
 * @param {String} props.description
 * @param {String} props.label
 * @param {Function} props.getValue
 * @param {Function} props.setValue
 * @param {boolean} [props.disabled]
 */


function CheckboxEntry(props) {
  const {
    element,
    id,
    description,
    label,
    getValue,
    setValue,
    disabled,
    show = noop$2
  } = props;
  const value = getValue(element);
  const error = useShowErrorEvent(show);
  return jsxs("div", {
    class: "bio-properties-panel-entry bio-properties-panel-checkbox-entry",
    "data-entry-id": id,
    children: [jsx(Checkbox, {
      disabled: disabled,
      id: id,
      label: label,
      onChange: setValue,
      show: show,
      value: value
    }), error && jsx("div", {
      class: "bio-properties-panel-error",
      children: error
    }), jsx(Description, {
      forId: id,
      element: element,
      value: description
    })]
  });
}
function isEdited$6(node) {
  return node && !!node.checked;
} // helpers /////////////////

function prefixId$6(id) {
  return `bio-properties-panel-${id}`;
}

function List(props) {
  const {
    id,
    element,
    items = [],
    component,
    label = '<empty>',
    open: shouldOpen,
    onAdd,
    onRemove,
    autoFocusEntry,
    compareFn
  } = props;
  const [open, setOpen] = useState(!!shouldOpen);
  const hasItems = !!items.length;

  const toggleOpen = () => hasItems && setOpen(!open);

  const opening = !usePrevious(open) && open;
  const elementChanged = usePrevious(element) !== element;
  const shouldReset = opening || elementChanged;
  const sortedItems = useSortedItems(items, compareFn, shouldReset);
  const newItems = useNewItems(items, elementChanged);
  useEffect(() => {
    if (open && !hasItems) {
      setOpen(false);
    }
  }, [open, hasItems]);
  /**
   * @param {MouseEvent} event
   */

  function addItem(event) {
    event.stopPropagation();
    onAdd();

    if (!open) {
      setOpen(true);
    }
  }

  return jsxs("div", {
    "data-entry-id": id,
    class: classnames('bio-properties-panel-entry', 'bio-properties-panel-list-entry', hasItems ? '' : 'empty', open ? 'open' : ''),
    children: [jsxs("div", {
      class: "bio-properties-panel-list-entry-header",
      onClick: toggleOpen,
      children: [jsx("div", {
        title: label,
        class: classnames('bio-properties-panel-list-entry-header-title', open && 'open'),
        children: label
      }), jsxs("div", {
        class: "bio-properties-panel-list-entry-header-buttons",
        children: [jsxs("button", {
          title: "Create new list item",
          onClick: addItem,
          class: "bio-properties-panel-add-entry",
          children: [jsx(CreateIcon, {}), !hasItems ? jsx("span", {
            class: "bio-properties-panel-add-entry-label",
            children: "Create"
          }) : null]
        }), hasItems && jsx("div", {
          title: `List contains ${items.length} item${items.length != 1 ? 's' : ''}`,
          class: "bio-properties-panel-list-badge",
          children: items.length
        }), hasItems && jsx("button", {
          title: "Toggle list item",
          class: "bio-properties-panel-arrow",
          children: jsx(ArrowIcon, {
            class: open ? 'bio-properties-panel-arrow-down' : 'bio-properties-panel-arrow-right'
          })
        })]
      })]
    }), hasItems && jsx(ItemsList, {
      autoFocusEntry: autoFocusEntry,
      component: component,
      element: element,
      id: id,
      items: sortedItems,
      newItems: newItems,
      onRemove: onRemove,
      open: open
    })]
  });
}

function ItemsList(props) {
  const {
    autoFocusEntry,
    component: Component,
    element,
    id,
    items,
    newItems,
    onRemove,
    open
  } = props;
  const getKey = useKeyFactory();
  const newItem = newItems[0];
  useEffect(() => {
    if (newItem && autoFocusEntry) {
      // (0) select the parent entry (containing all list items)
      const entry = query(`[data-entry-id="${id}"]`); // (1) select the first input or a custom element to be focussed

      const selector = typeof autoFocusEntry === 'boolean' ? '.bio-properties-panel-input' : autoFocusEntry;
      const focusableInput = query(selector, entry); // (2) set focus

      if (focusableInput) {
        if (isFunction(focusableInput.select)) {
          focusableInput.select();
        } else if (isFunction(focusableInput.focus)) {
          focusableInput.focus();
        }
      }
    }
  }, [newItem, autoFocusEntry, id]);
  return jsx("ol", {
    class: classnames('bio-properties-panel-list-entry-items', open ? 'open' : ''),
    children: items.map((item, index) => {
      const key = getKey(item);
      return jsxs("li", {
        class: "bio-properties-panel-list-entry-item",
        children: [jsx(Component, {
          element: element,
          id: id,
          index: index,
          item: item,
          open: item === newItem
        }), onRemove && jsx("button", {
          type: "button",
          title: "Delete item",
          class: "bio-properties-panel-remove-entry bio-properties-panel-remove-list-entry",
          onClick: () => onRemove && onRemove(item),
          children: jsx(DeleteIcon, {})
        })]
      }, key);
    })
  });
}
/**
 * Place new items in the beginning of the list and sort the rest with provided function.
 *
 * @template Item
 * @param {Item[]} currentItems
 * @param {(a: Item, b: Item) => 0 | 1 | -1} [compareFn] function used to sort items
 * @param {boolean} [shouldReset=false] set to `true` to reset state of the hook
 * @returns {Item[]}
 */


function useSortedItems(currentItems, compareFn, shouldReset = false) {
  const itemsRef = useRef(currentItems.slice()); // (1) Reset and optionally sort.

  if (shouldReset) {
    itemsRef.current = currentItems.slice();

    if (compareFn) {
      itemsRef.current.sort(compareFn);
    }
  } else {
    const items = itemsRef.current; // (2) Add new item to the list.

    for (const item of currentItems) {
      if (!items.includes(item)) {
        // Unshift or push depending on whether we have a compareFn
        compareFn ? items.unshift(item) : items.push(item);
      }
    } // (3) Filter out removed items.


    itemsRef.current = items.filter(item => currentItems.includes(item));
  }

  return itemsRef.current;
}

function useNewItems(items = [], shouldReset) {
  const previousItems = usePrevious(items.slice()) || [];

  if (shouldReset) {
    return [];
  }

  return previousItems ? items.filter(item => !previousItems.includes(item)) : [];
}

function NumberField(props) {
  const {
    debounce,
    disabled,
    id,
    label,
    max,
    min,
    onInput,
    step,
    value = ''
  } = props;
  const handleInput = useMemo(() => {
    return debounce(event => {
      const {
        validity,
        value
      } = event.target;

      if (validity.valid) {
        onInput(value ? parseFloat(value) : undefined);
      }
    });
  }, [onInput, debounce]);
  return jsxs("div", {
    class: "bio-properties-panel-numberfield",
    children: [jsx("label", {
      for: prefixId$5(id),
      class: "bio-properties-panel-label",
      children: label
    }), jsx("input", {
      id: prefixId$5(id),
      type: "number",
      name: id,
      spellCheck: "false",
      autoComplete: "off",
      disabled: disabled,
      class: "bio-properties-panel-input",
      max: max,
      min: min,
      onInput: handleInput,
      step: step,
      value: value
    })]
  });
}
/**
 * @param {Object} props
 * @param {Boolean} props.debounce
 * @param {String} props.description
 * @param {Boolean} props.disabled
 * @param {Object} props.element
 * @param {Function} props.getValue
 * @param {String} props.id
 * @param {String} props.label
 * @param {String} props.max
 * @param {String} props.min
 * @param {Function} props.setValue
 * @param {String} props.step
 */


function NumberFieldEntry(props) {
  const {
    debounce,
    description,
    disabled,
    element,
    getValue,
    id,
    label,
    max,
    min,
    setValue,
    step
  } = props;
  const value = getValue(element);
  return jsxs("div", {
    class: "bio-properties-panel-entry",
    "data-entry-id": id,
    children: [jsx(NumberField, {
      debounce: debounce,
      disabled: disabled,
      id: id,
      label: label,
      onInput: setValue,
      max: max,
      min: min,
      step: step,
      value: value
    }), jsx(Description, {
      forId: id,
      element: element,
      value: description
    })]
  });
}
function isEdited$5(node) {
  return node && !!node.value;
} // helpers /////////////////

function prefixId$5(id) {
  return `bio-properties-panel-${id}`;
}

const noop$1 = () => {};
/**
 * @typedef { { value: string, label: string, disabled: boolean } } Option
 */

/**
 * Provides basic select input.
 *
 * @param {object} props
 * @param {string} props.id
 * @param {string[]} props.path
 * @param {string} props.label
 * @param {Function} props.onChange
 * @param {Array<Option>} [props.options]
 * @param {string} props.value
 * @param {boolean} [props.disabled]
 */


function Select(props) {
  const {
    id,
    label,
    onChange,
    options = [],
    value,
    disabled,
    show = noop$1
  } = props;
  const ref = useShowEntryEvent(show);

  const handleChange = ({
    target
  }) => {
    onChange(target.value);
  };

  return jsxs("div", {
    class: "bio-properties-panel-select",
    children: [jsx("label", {
      for: prefixId$4(id),
      class: "bio-properties-panel-label",
      children: label
    }), jsx("select", {
      ref: ref,
      id: prefixId$4(id),
      name: id,
      class: "bio-properties-panel-input",
      onInput: handleChange,
      value: value,
      disabled: disabled,
      children: options.map((option, idx) => {
        return jsx("option", {
          value: option.value,
          disabled: option.disabled,
          children: option.label
        }, idx);
      })
    })]
  });
}
/**
 * @param {object} props
 * @param {object} props.element
 * @param {string} props.id
 * @param {string} [props.description]
 * @param {string} props.label
 * @param {Function} props.getValue
 * @param {Function} props.setValue
 * @param {Function} props.getOptions
 * @param {boolean} [props.disabled]
 */


function SelectEntry(props) {
  const {
    element,
    id,
    description,
    label,
    getValue,
    setValue,
    getOptions,
    disabled,
    show = noop$1
  } = props;
  const value = getValue(element);
  const options = getOptions(element);
  const error = useShowErrorEvent(show);
  return jsxs("div", {
    class: classnames('bio-properties-panel-entry', error ? 'has-error' : ''),
    "data-entry-id": id,
    children: [jsx(Select, {
      id: id,
      label: label,
      value: value,
      onChange: setValue,
      options: options,
      disabled: disabled,
      show: show
    }), error && jsx("div", {
      class: "bio-properties-panel-error",
      children: error
    }), jsx(Description, {
      forId: id,
      element: element,
      value: description
    })]
  });
}
function isEdited$4(node) {
  return node && !!node.value;
} // helpers /////////////////

function prefixId$4(id) {
  return `bio-properties-panel-${id}`;
}

function Simple(props) {
  const {
    debounce,
    disabled,
    element,
    getValue,
    id,
    onBlur,
    onFocus,
    setValue
  } = props;
  const handleInput = useMemo(() => {
    return debounce(({
      target
    }) => setValue(target.value.length ? target.value : undefined));
  }, [setValue, debounce]);
  const value = getValue(element);
  return jsx("div", {
    class: "bio-properties-panel-simple",
    children: jsx("input", {
      id: prefixId$3(id),
      type: "text",
      name: id,
      spellCheck: "false",
      autoComplete: "off",
      disabled: disabled,
      class: "bio-properties-panel-input",
      onInput: handleInput,
      "aria-label": value || '<empty>',
      onFocus: onFocus,
      onBlur: onBlur,
      value: value || ''
    })
  });
}
function isEdited$3(node) {
  return node && !!node.value;
} // helpers /////////////////

function prefixId$3(id) {
  return `bio-properties-panel-${id}`;
}

function FeelIcon(props) {
  const {
    label,
    feel = false
  } = props;
  const feelRequiredLabel = ' must be a FEEL expression';
  const feelOptionalLabel = ' can optionally be a FEEL expression';
  return jsx("i", {
    class: "bio-properties-panel-feel-icon",
    title: label + (feel === 'required' ? feelRequiredLabel : feelOptionalLabel),
    children: feel === 'required' ? jsx(FeelRequiredIcon, {}) : jsx(FeelOptionalIcon, {})
  });
}

function TextArea(props) {
  const {
    id,
    label,
    rows = 2,
    debounce,
    feel,
    onInput,
    value = '',
    disabled,
    monospace
  } = props;
  const handleInput = useMemo(() => {
    return debounce(({
      target
    }) => onInput(target.value.length ? target.value : undefined));
  }, [onInput, debounce]);
  return jsxs("div", {
    class: "bio-properties-panel-textarea",
    children: [jsxs("label", {
      for: prefixId$2(id),
      class: "bio-properties-panel-label",
      children: [label, feel && jsx(FeelIcon, {
        feel: feel,
        label: label
      })]
    }), jsx("textarea", {
      id: prefixId$2(id),
      name: id,
      spellCheck: "false",
      class: classnames('bio-properties-panel-input', monospace ? 'bio-properties-panel-input-monospace' : ''),
      onInput: handleInput,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      rows: rows,
      value: value,
      disabled: disabled
    })]
  });
}
/**
 * @param {object} props
 * @param {object} props.element
 * @param {string} props.id
 * @param {string} props.description
 * @param {boolean} props.debounce
 * @param {string} props.label
 * @param {Function} props.getValue
 * @param {Function} props.setValue
 * @param {number} props.rows
 * @param {boolean} props.monospace
 * @param {boolean} [props.disabled]
 */


function TextAreaEntry(props) {
  const {
    element,
    id,
    description,
    debounce,
    feel,
    label,
    getValue,
    setValue,
    rows,
    monospace,
    disabled
  } = props;
  const value = getValue(element);
  return jsxs("div", {
    class: "bio-properties-panel-entry",
    "data-entry-id": id,
    children: [jsx(TextArea, {
      id: id,
      label: label,
      value: value,
      onInput: setValue,
      rows: rows,
      debounce: debounce,
      monospace: monospace,
      feel: feel,
      disabled: disabled
    }), jsx(Description, {
      forId: id,
      element: element,
      value: description
    })]
  });
}
function isEdited$2(node) {
  return node && !!node.value;
} // helpers /////////////////

function prefixId$2(id) {
  return `bio-properties-panel-${id}`;
}

const noop = () => {};

function Textfield(props) {
  const {
    debounce,
    disabled = false,
    id,
    label,
    onInput,
    feel = false,
    value = '',
    show = noop
  } = props;
  const ref = useShowEntryEvent(show);
  const handleInput = useMemo(() => {
    return debounce(({
      target
    }) => onInput(target.value.length ? target.value : undefined));
  }, [onInput, debounce]);
  return jsxs("div", {
    class: "bio-properties-panel-textfield",
    children: [jsxs("label", {
      for: prefixId$1(id),
      class: "bio-properties-panel-label",
      children: [label, feel && jsx(FeelIcon, {
        feel: feel,
        label: label
      })]
    }), jsx("input", {
      ref: ref,
      id: prefixId$1(id),
      type: "text",
      name: id,
      spellCheck: "false",
      autoComplete: "off",
      disabled: disabled,
      class: "bio-properties-panel-input",
      onInput: handleInput,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      value: value || ''
    })]
  });
}
/**
 * @param {Object} props
 * @param {Object} props.element
 * @param {String} props.id
 * @param {String} props.description
 * @param {Boolean} props.debounce
 * @param {Boolean} props.disabled
 * @param {String} props.label
 * @param {Function} props.getValue
 * @param {Function} props.setValue
 * @param {Function} props.validate
 */


function TextfieldEntry(props) {
  const {
    element,
    id,
    description,
    debounce,
    disabled,
    feel,
    label,
    getValue,
    setValue,
    validate,
    show = noop
  } = props;
  const [cachedInvalidValue, setCachedInvalidValue] = useState(null);
  const [validationError, setValidationError] = useState(null);
  let value = getValue(element);
  const previousValue = usePrevious(value);
  useEffect(() => {
    if (isFunction(validate)) {
      const newValidationError = validate(value) || null;
      setValidationError(newValidationError);
    }
  }, [value]);

  const onInput = newValue => {
    let newValidationError = null;

    if (isFunction(validate)) {
      newValidationError = validate(newValue) || null;
    }

    if (newValidationError) {
      setCachedInvalidValue(newValue);
    } else {
      setValue(newValue);
    }

    setValidationError(newValidationError);
  };

  if (previousValue === value && validationError) {
    value = cachedInvalidValue;
  }

  const temporaryError = useShowErrorEvent(show);
  const error = temporaryError || validationError;
  return jsxs("div", {
    class: classnames('bio-properties-panel-entry', error ? 'has-error' : ''),
    "data-entry-id": id,
    children: [jsx(Textfield, {
      debounce: debounce,
      disabled: disabled,
      feel: feel,
      id: id,
      label: label,
      onInput: onInput,
      show: show,
      value: value
    }), error && jsx("div", {
      class: "bio-properties-panel-error",
      children: error
    }), jsx(Description, {
      forId: id,
      element: element,
      value: description
    })]
  });
}
function isEdited$1(node) {
  return node && !!node.value;
} // helpers /////////////////

function prefixId$1(id) {
  return `bio-properties-panel-${id}`;
}

function ToggleSwitch(props) {
  const {
    id,
    label,
    onInput,
    value,
    switcherLabel
  } = props;

  const handleInput = async () => {
    onInput(!value);
  };

  return jsxs("div", {
    class: "bio-properties-panel-toggle-switch",
    children: [jsx("label", {
      class: "bio-properties-panel-label",
      for: prefixId(id),
      children: label
    }), jsxs("div", {
      class: "bio-properties-panel-field-wrapper",
      children: [jsxs("label", {
        class: "bio-properties-panel-toggle-switch__switcher",
        children: [jsx("input", {
          id: prefixId(id),
          class: "bio-properties-panel-input",
          type: "checkbox",
          name: id,
          onInput: handleInput,
          checked: value
        }), jsx("span", {
          class: "bio-properties-panel-toggle-switch__slider"
        })]
      }), jsx("p", {
        class: "bio-properties-panel-toggle-switch__label",
        children: switcherLabel
      })]
    })]
  });
}
/**
 * @param {Object} props
 * @param {Object} props.element
 * @param {String} props.id
 * @param {String} props.description
 * @param {String} props.label
 * @param {String} props.switcherLabel
 * @param {Function} props.getValue
 * @param {Function} props.setValue
 */


function ToggleSwitchEntry(props) {
  const {
    element,
    id,
    description,
    label,
    switcherLabel,
    getValue,
    setValue
  } = props;
  const value = getValue(element);
  return jsxs("div", {
    class: "bio-properties-panel-entry bio-properties-panel-toggle-switch-entry",
    "data-entry-id": id,
    children: [jsx(ToggleSwitch, {
      id: id,
      label: label,
      value: value,
      onInput: setValue,
      switcherLabel: switcherLabel
    }), jsx(Description, {
      forId: id,
      element: element,
      value: description
    })]
  });
}
function isEdited(node) {
  return node && !!node.checked;
} // helpers /////////////////

function prefixId(id) {
  return `bio-properties-panel-${id}`;
}

const DEFAULT_DEBOUNCE_TIME = 300;
function debounceInput(debounceDelay) {
  return function _debounceInput(fn) {
    if (debounceDelay !== false) {
      var debounceTime = isNumber(debounceDelay) ? debounceDelay : DEFAULT_DEBOUNCE_TIME;
      return debounce(fn, debounceTime);
    } else {
      return fn;
    }
  };
}
debounceInput.$inject = ['config.debounceInput'];

var index = {
  debounceInput: ['factory', debounceInput]
};

export { ArrowIcon, CheckboxEntry, CollapsibleEntry, CreateIcon, index as DebounceInputModule, DeleteIcon, DescriptionContext, Description as DescriptionEntry, DropdownButton, EventContext, ExternalLinkIcon, FeelOptionalIcon, FeelRequiredIcon, Group, Header, HeaderButton, LayoutContext, List as ListEntry, ListGroup, ListItem, NumberFieldEntry, Placeholder, PropertiesPanel, LayoutContext as PropertiesPanelContext, SelectEntry, Simple as SimpleEntry, TextAreaEntry, TextfieldEntry as TextFieldEntry, ToggleSwitchEntry, isEdited$6 as isCheckboxEntryEdited, isEdited$5 as isNumberFieldEntryEdited, isEdited$4 as isSelectEntryEdited, isEdited$3 as isSimpleEntryEdited, isEdited$2 as isTextAreaEntryEdited, isEdited$1 as isTextFieldEntryEdited, isEdited as isToggleSwitchEntryEdited, useDescriptionContext, useEvent, useEventBuffer, useKeyFactory, useLayoutState, usePrevious, useShowEntryEvent, useShowErrorEvent, useStickyIntersectionObserver };
//# sourceMappingURL=index.esm.js.map

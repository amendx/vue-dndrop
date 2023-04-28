(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{489:function(a,t,e){"use strict";e.r(t);var s=e(53),n=Object(s.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"lifecycle"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#lifecycle"}},[a._v("#")]),a._v(" Lifecycle")]),a._v(" "),e("p",[a._v("The lifecycle of a drag is both described, and can be controlled, by a series of "),e("a",{attrs:{href:"#callbacks"}},[a._v("callbacks")]),a._v(" and "),e("a",{attrs:{href:"#events"}},[a._v("events")]),a._v(", which are illustrated below for a example "),e("strong",[a._v("containing 3 containers")]),a._v(":")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("Mouse     Calls  Callback / Event       Parameters              Notes\ndown   o                                                        Initial click\nmove   o                                                        Initial drag\n       |\n       |         get-child-payload()    index                   Function should return payload\n       |\n       |   3 x   should-accept-drop()   srcOptions, payload     Fired for all containers\n       |\n       |   3 x   drag-start             dragResult              Fired for all containers\n       |\n       |         drag-enter\n       v\nmove   o                                                        Drag over containers\n       |\n       |   n x   drag-leave                                     Fired as draggable leaves container\n       |   n x   drag-enter                                     Fired as draggable enters container\n       v\nup     o                                                        Finish drag\n                 should-animate-drop()  srcOptions, payload     Fires once for dropped container\n           3 x   drag-end               dragResult              Fired for all containers\n           n x   drop                   dropResult              Fired only for droppable containers\n")])])]),e("blockquote",[e("p",[a._v("Note that "),e("code",[a._v("should-accept-drop")]),a._v(" is fired before every "),e("code",[a._v("drag-start")]),a._v(", and before every "),e("code",[a._v("drag-end")]),a._v(", but has been omitted here for clarity.")])]),a._v(" "),e("hr"),a._v(" "),e("p",[a._v("The "),e("code",[a._v("dragResult")]),a._v(" parameter has the format:")]),a._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[a._v("dragResult"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    payload"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    isSource"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    willAcceptDrop"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),e("hr"),a._v(" "),e("p",[a._v("The "),e("code",[a._v("dropResult")]),a._v(" parameter has the format:")]),a._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[a._v("dropResult"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    addedIndex"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    removedIndex"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    payload"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    element"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),e("blockquote",[e("p",[a._v("Note that additional parameters can be passed to callbacks and event handlers by writing an interim handler "),e("em",[a._v("inline")]),a._v(" in the markup:")])]),a._v(" "),e("hr"),a._v(" "),e("p",[a._v("The "),e("code",[a._v("getShouldAcceptDrop")]),a._v(" parameter has the format:")]),a._v(" "),e("div",{staticClass:"language-jsx extra-class"},[e("pre",{pre:!0,attrs:{class:"language-jsx"}},[e("code",[e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("div v"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("for")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"(items, index) in groups"')]),a._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Container")])]),a._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("group-name")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("column"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v(":should-accept-drop")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("(src, payload) => getShouldAcceptDrop(index, src, payload)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),e("span",{pre:!0,attrs:{class:"token plain-text"}},[a._v("\n    ...\n  ")]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Container")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n")])])]),e("blockquote",[e("p",[a._v("This can provide handler functions context-sensitive data, such as the loop index or current item.")])])])}),[],!1,null,null,null);t.default=n.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{340:function(n,t,e){"use strict";e.d(t,"a",(function(){return r})),e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return a})),e.d(t,"d",(function(){return s}));var o=e(35),r=(e(341),e(344),e(188),function(n,t){var e=t.removedIndex,r=t.addedIndex,i=t.payload;if(null===e&&null===r)return n;var a=Object(o.a)(n),u=i;return null!==e&&(u=a.splice(e,1)[0]),null!==r&&a.splice(r,0,u),a}),i=function(n,t){for(var e=[],o=0;o<n;o++)e.push(t(o));return e},a="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",u=["Backlog","Doing","Finished"],c=["#34495E","#84B0DC","#49627A","#41B883","#7096BB","#97CAFC","#6CC1C0","#41B883","#41B883","#49627A"],s={type:"container",props:{orientation:"horizontal"},children:i(3,(function(n){return{id:"column".concat(n),type:"container",name:u[n],props:{orientation:"vertical",className:"card-container"},children:i(+(10*Math.random()).toFixed()+5,(function(t){return{type:"draggable",id:"".concat(n).concat(t),props:{className:"card",style:{backgroundColor:(e=Math.floor(10*Math.random()),c[e])}},number:Math.floor(100*Math.random()),data:a.slice(0,Math.floor(150*Math.random())+30)};var e}))}}))}},341:function(n,t,e){"use strict";var o=e(2),r=e(1),i=e(82),a=e(54),u=e(22),c=e(14),s=e(111),l=e(36),d=e(55)("splice"),f=r.TypeError,m=Math.max,p=Math.min;o({target:"Array",proto:!0,forced:!d},{splice:function(n,t){var e,o,r,d,h,v,g=c(this),b=u(g),_=i(n,b),y=arguments.length;if(0===y?e=o=0:1===y?(e=0,o=b-_):(e=y-2,o=p(m(a(t),0),b-_)),b+e-o>9007199254740991)throw f("Maximum allowed length exceeded");for(r=s(g,o),d=0;d<o;d++)(h=_+d)in g&&l(r,d,g[h]);if(r.length=o,e<o){for(d=_;d<b-o;d++)v=d+e,(h=d+o)in g?g[v]=g[h]:delete g[v];for(d=b;d>b-o+e;d--)delete g[d-1]}else if(e>o)for(d=b-o;d>_;d--)v=d+e-1,(h=d+o-1)in g?g[v]=g[h]:delete g[v];for(d=0;d<e;d++)g[d+_]=arguments[d+2];return g.length=b-o+e,r}})},342:function(n,t,e){var o=e(3);n.exports=o(1..valueOf)},344:function(n,t,e){"use strict";var o=e(2),r=e(1),i=e(3),a=e(54),u=e(342),c=e(345),s=e(4),l=r.RangeError,d=r.String,f=Math.floor,m=i(c),p=i("".slice),h=i(1..toFixed),v=function(n,t,e){return 0===t?e:t%2==1?v(n,t-1,e*n):v(n*n,t/2,e)},g=function(n,t,e){for(var o=-1,r=e;++o<6;)r+=t*n[o],n[o]=r%1e7,r=f(r/1e7)},b=function(n,t){for(var e=6,o=0;--e>=0;)o+=n[e],n[e]=f(o/t),o=o%t*1e7},_=function(n){for(var t=6,e="";--t>=0;)if(""!==e||0===t||0!==n[t]){var o=d(n[t]);e=""===e?o:e+m("0",7-o.length)+o}return e};o({target:"Number",proto:!0,forced:s((function(){return"0.000"!==h(8e-5,3)||"1"!==h(.9,0)||"1.25"!==h(1.255,2)||"1000000000000000128"!==h(0xde0b6b3a7640080,0)}))||!s((function(){h({})}))},{toFixed:function(n){var t,e,o,r,i=u(this),c=a(n),s=[0,0,0,0,0,0],f="",h="0";if(c<0||c>20)throw l("Incorrect fraction digits");if(i!=i)return"NaN";if(i<=-1e21||i>=1e21)return d(i);if(i<0&&(f="-",i=-i),i>1e-21)if(e=(t=function(n){for(var t=0,e=n;e>=4096;)t+=12,e/=4096;for(;e>=2;)t+=1,e/=2;return t}(i*v(2,69,1))-69)<0?i*v(2,-t,1):i/v(2,t,1),e*=4503599627370496,(t=52-t)>0){for(g(s,0,e),o=c;o>=7;)g(s,1e7,0),o-=7;for(g(s,v(10,o,1),0),o=t-1;o>=23;)b(s,1<<23),o-=23;b(s,1<<o),g(s,1,1),b(s,2),h=_(s)}else g(s,0,e),g(s,1<<-t,0),h=_(s)+m("0",c);return h=c>0?f+((r=h.length)<=c?"0."+m("0",c-r)+h:p(h,0,r-c)+"."+p(h,r-c)):f+h}})},345:function(n,t,e){"use strict";var o=e(1),r=e(54),i=e(21),a=e(30),u=o.RangeError;n.exports=function(n){var t=i(a(this)),e="",o=r(n);if(o<0||o==1/0)throw u("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(t+=t))1&o&&(e+=t);return e}},347:function(n,t){n.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},349:function(n,t,e){var o=e(3),r=e(30),i=e(21),a=e(347),u=o("".replace),c="["+a+"]",s=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),d=function(n){return function(t){var e=i(r(t));return 1&n&&(e=u(e,s,"")),2&n&&(e=u(e,l,"")),e}};n.exports={start:d(1),end:d(2),trim:d(3)}},350:function(n,t,e){"use strict";var o=e(2),r=e(39).find,i=e(114),a=!0;"find"in[]&&Array(1).find((function(){a=!1})),o({target:"Array",proto:!0,forced:a},{find:function(n){return r(this,n,arguments.length>1?arguments[1]:void 0)}}),i("find")},351:function(n,t,e){},367:function(n,t,e){"use strict";var o=e(9),r=e(1),i=e(3),a=e(115),u=e(17),c=e(11),s=e(348),l=e(38),d=e(88),f=e(195),m=e(4),p=e(56).f,h=e(33).f,v=e(13).f,g=e(342),b=e(349).trim,_=r.Number,y=_.prototype,C=r.TypeError,x=i("".slice),I=i("".charCodeAt),k=function(n){var t=f(n,"number");return"bigint"==typeof t?t:w(t)},w=function(n){var t,e,o,r,i,a,u,c,s=f(n,"number");if(d(s))throw C("Cannot convert a Symbol value to a number");if("string"==typeof s&&s.length>2)if(s=b(s),43===(t=I(s,0))||45===t){if(88===(e=I(s,2))||120===e)return NaN}else if(48===t){switch(I(s,1)){case 66:case 98:o=2,r=49;break;case 79:case 111:o=8,r=55;break;default:return+s}for(a=(i=x(s,2)).length,u=0;u<a;u++)if((c=I(i,u))<48||c>r)return NaN;return parseInt(i,o)}return+s};if(a("Number",!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var N,S=function(n){var t=arguments.length<1?0:_(k(n)),e=this;return l(y,e)&&m((function(){g(e)}))?s(Object(t),e,S):t},M=o?p(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),A=0;M.length>A;A++)c(_,N=M[A])&&!c(S,N)&&v(S,N,h(_,N));S.prototype=y,y.constructor=S,u(r,"Number",S)}},368:function(n,t,e){"use strict";var o=e(2),r=e(39).every;o({target:"Array",proto:!0,forced:!e(41)("every")},{every:function(n){return r(this,n,arguments.length>1?arguments[1]:void 0)}})},369:function(n,t,e){"use strict";e(351)},382:function(n,t,e){"use strict";e.r(t);var o=e(35),r=(e(367),e(188),e(341),e(368),e(8),e(350),e(343)),i={name:"Kanban",components:{Container:r.a,Draggable:r.b},props:{loading:{type:Boolean,default:!1},columns:{type:Array,default:function(){return[]}},colWidth:{type:[Number,String],default:function(){return""}},colMinWidth:{type:[Number,String],default:function(){return""}},colMaxWidth:{type:[Number,String],default:function(){return""}},dropText:{type:String,default:function(){return"Drop here"}},dropIcon:{type:String,default:function(){return"copy"}},noBorder:{type:Boolean,default:!1},innerColCount:{type:Boolean,default:!1},colBgColor:{type:String,default:function(){return""}},countText:{type:String,default:function(){return"itens"}},columnCount:{type:[Array],default:function(){return[]}}},data:function(){return{sourceContainerIndex:null,kanbanColumns:[],dropPlaceholderOptions:{className:"drop-preview",animationDuration:"150",showOnTop:!0}}},computed:{colSkeleton:function(){var n=(window.innerWidth-300)/(this.colMinWidth||180);return Math.ceil(n)},columnStyle:function(){return"width: ".concat(this.colWidth,"px;\n          min-width: ").concat(this.colMinWidth,"px;\n          max-width: ").concat(this.colMaxWidth,"px;\n          ")},contentStyle:function(){return"background-color: ".concat(this.colBgColor)},hasExternalCount:function(){return this.columnCount&&!!this.columnCount.length}},mounted:function(){this.kanbanColumns=Object(o.a)(this.columns)},methods:{dropAction:function(n,t,e){var r=t.removedIndex,i=t.addedIndex,a=t.payload,u=e.status;if(null===r&&null===i)return n;var c=Object(o.a)(n),s=a;return null!==r&&(s=c.splice(r,1)[0]),null!==i&&(c.splice(i,0,s),a.status.length>1?this.$emit("item-dropped",{item:a,column:u}):a.status!==u&&this.$emit("status-change",{item:a,newStatus:u})),c},validation:function(n,t,e){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){return!0},r=e===this.sourceContainerIndex;return r||o(n,t,e)},onDrop:function(n,t,e){this.kanbanColumns[n].columnItems=this.dropAction(this.kanbanColumns[n].columnItems,t,e)},getDraggedItem:function(n,t,e){return this.sourceContainerIndex=t,this.kanbanColumns[t].columnItems[n]},dropNotAllowed:function(n){var t=n.payload;n.container;console.log("drop not allowed",t)},countValue:function(n,t){var e;if(!this.hasExternalCount)return n.columnItems.length;var o=function(n){return n||0==n};if(this.columnCount.length===this.columns.length&&this.columnCount.every((function(n){return function(n){return!isNaN(Number(n))}(n)})))return o(this.columnCount[t])?this.columnCount[t]:n.columnItems.length;var r=null===(e=this.columnCount.find((function(t){return t.id===n.id})))||void 0===e?void 0:e.value;return o(r)?r:n.columnItems.length}}},a=(e(369),e(53)),u=Object(a.a)(i,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"kanban"},[n.loading?e("div",{staticClass:"kanban__skeleton-container"},[n._t("skeleton"),n._v(" "),n.$slots.skeleton?n._e():e("div",{staticClass:"kanban__skeleton"},n._l(n.colSkeleton,(function(t,o){return e("div",{key:t,staticClass:"kanban__skeleton-column",style:"min-width: "+(n.colMinWidth||180)+"px; max-width: "+(n.colMaxWidth||330)+"px",attrs:{"animation-data":o}},[n._t("skeletonCard")],2)})),0)],2):n._l(n.kanbanColumns,(function(t,o){return e("div",{key:o,staticClass:"kanban__column",style:n.columnStyle},[e("div",{staticClass:"kanban__header"},[e("div",{staticClass:"kanban__description"},[n.$slots["icon-"+t.id]?e("span",{staticClass:"kanban__icon"},[n._t("icon-"+t.id)],2):n._e(),n._v(" "),e("h3",{staticClass:"kanban__title"},[n._v(n._s(t.name))])]),n._v(" "),n.innerColCount?n._e():e("p",{staticClass:"kanban__quantity"},[n._v("\n          "+n._s(n.countValue(t,o))+"\n          "+n._s(n.countText)+"\n        ")])]),n._v(" "),e("div",{staticClass:"kanban__content",style:n.contentStyle},[n.innerColCount?e("p",{class:["kanban__quantity","kanban__quantity--inner-count"]},[n._v("\n          "+n._s(n.countValue(t,o))+" "+n._s(n.countText)+"\n        ")]):n._e(),n._v(" "),e("Container",{attrs:{"group-name":"kanban","get-child-payload":function(t){return n.getDraggedItem(t,o)},"should-accept-drop":function(e,r){return n.validation(e,r,o,t.validation)},"drop-placeholder":n.dropPlaceholderOptions},on:{drop:function(e){return n.onDrop(o,e,t)},"drag-start":function(t){n.sourceContainerIndex=o,n.$emit("drag")},"drop-not-allowed":n.dropNotAllowed,"drag-enter":function(e){return n.$emit("selected-column",t)}}},[n._l(t.columnItems,(function(t,o){return e("Draggable",{key:o},[n._t("card",null,{item:t})],2)})),n._v(" "),e("div",{staticClass:"kanban__move-icon"},[e("span",[n._v(n._s(n.dropText))])])],2)],1)])}))],2)}),[],!1,null,"0f765f7f",null);t.default=u.exports},399:function(n,t,e){},447:function(n,t,e){var o=e(2),r=e(1),i=e(40),a=e(6),u=e(58),c=e(59),s=/MSIE .\./.test(u),l=r.Function,d=function(n){return function(t,e){var o=arguments.length>2,r=o?c(arguments,2):void 0;return n(o?function(){i(a(t)?t:l(t),this,r)}:t,e)}};o({global:!0,bind:!0,forced:s},{setTimeout:d(r.setTimeout),setInterval:d(r.setInterval)})},448:function(n,t,e){"use strict";var o=e(2),r=e(39).findIndex,i=e(114),a=!0;"findIndex"in[]&&Array(1).findIndex((function(){a=!1})),o({target:"Array",proto:!0,forced:a},{findIndex:function(n){return r(this,n,arguments.length>1?arguments[1]:void 0)}}),i("findIndex")},449:function(n,t,e){"use strict";e(399)},479:function(n,t,e){"use strict";e.r(t);e(350),e(8),e(60),e(447),e(203),e(83),e(193),e(201),e(118),e(448),e(341),e(37),e(189);var o=e(340),r={name:"CardsKanban",components:{Kanban:e(382).default},computed:{notMobile:function(){return window.innerWidth>=1025}},data:function(){var n=this;return{item:{},columns:[{name:"Backlog",id:0,status:["open"],columnItems:[],validation:function(t,e,o,r){return n.columnValidation(t,e,o,[""])}},{name:"Executing",id:1,status:["executing","review","paralised"],columnItems:[],validation:function(t,e,o,r){return n.columnValidation(t,e,o,["open","paralised"])}},{name:"Finished",id:2,status:["finished","closed"],columnItems:[],validation:function(t,e,o,r){return n.columnValidation(t,e,o,["executing","review"])}}],showDropdown:{},opcoesDropdownMenu:[{type:"customAction"},{type:"separator",color:"yellow"},{type:"customAction"}],scene:o.d,upperDropPlaceholderOptions:{className:"cards-drop-preview",animationDuration:"150",showOnTop:!0},dropPlaceholderOptions:{className:"drop-preview",animationDuration:"150",showOnTop:!0}}},mounted:function(){this.cardsKanban(0,3,"open",["executing","paralised"]),this.cardsKanban(1,2,"executing",["paralised","review"]),this.cardsKanban(2,0,"finished",["closed","finished"])},methods:{iconType:function(n){switch(n){case"finished":return"🚀";case"executing":return"🔥";default:return"🤠"}},cardsKanban:function(n,t,e,r){for(var i=this.columns.find((function(t){return t.id===n})),a=Math.floor(99*Math.random()),u=0;u<=t;u++)i.columnItems.push({id:a+u+1,task:o.c.slice(0,Math.floor(20*Math.random())+10),date:"11/2".concat(u,"/2020"),status:r,currentStatus:e,icon:this.iconType(e),dropdownId:u,corStatus:{nome:e,corTexto:"#2".concat(u,"1ba8"),cor:"#2".concat(u,"3ced")}})},selectStatus:function(n){this.showDropdown={id:n.id}},columnChange:function(n){var t=this,e=n.item,o=n.column;setTimeout((function(){t.columns.reduce((function(n,r){if(r.columnItems.map((function(n){return n.id})).includes(e.id)){var i=r.columnItems.find((function(n){return n.id===e.id}));if(Array.isArray(o)&&o.length)return console.log(o),i.icon=t.iconType(o[0]),i.currentStatus=o[0];i.currentStatus=o,i.icon=t.iconType(o);var a=r.columnItems.findIndex((function(n){return n.id===i.id})),u=t.columns.findIndex((function(n){return n.status.includes(i.currentStatus)}));return r.columnItems.splice(a,1),t.columns[u].columnItems.push(i),i}return t.columns}),0)}))},columnValidation:function(n,t,e,o){return o.includes(t.currentStatus)},onColumnDrop:function(n){var t=Object.assign({},this.scene);t.children=Object(o.a)(t.children,n),this.scene=t},onCardDrop:function(n,t){if(null!==t.removedIndex||null!==t.addedIndex){var e=Object.assign({},this.scene),r=e.children.filter((function(t){return t.id===n}))[0],i=e.children.indexOf(r),a=Object.assign({},r);a.children=Object(o.a)(a.children,t),e.children.splice(i,1,a),this.scene=e}},getCardPayload:function(n){var t=this;return function(e){return t.scene.children.filter((function(t){return t.id===n}))[0].children[e]}},dragStart:function(){console.log("drag started")},log:function(){var n;(n=console).log.apply(n,arguments)}}},i=(e(449),e(53)),a=Object(i.a)(r,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"kanban-cards"},[e("Kanban",{attrs:{columns:n.columns,"col-min-width":"100","col-max-width":"300","count-text":"items here","drop-text":"Change to this status"},on:{"update:columns":function(t){n.columns=t},"item-dropped":n.columnChange},scopedSlots:n._u([{key:"card",fn:function(t){var o=t.item;return[e("div",{class:["item",""+o.currentStatus]},[e("div",{staticClass:"kanban-card"},[e("span",{staticClass:"card"},[e("div",{staticClass:"kanban-action"},[e("label",[e("strong",[n._v("#"+n._s(o.id))])]),n._v(" "),e("button",{class:["kanban-button",""+o.currentStatus]},[n._v("\n                "+n._s(o.icon)+"\n              ")])]),n._v(" "),e("label",{staticClass:"label"},[n._v(" "+n._s(o.task))]),n._v(" "),e("small",[n._v(" "+n._s(o.date)+" ")])])])])]}}])})],1)}),[],!1,null,"4beb223e",null);t.default=a.exports}}]);
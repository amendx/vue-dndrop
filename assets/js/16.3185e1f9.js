(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{340:function(t,r,n){"use strict";n.d(r,"a",(function(){return o})),n.d(r,"b",(function(){return i})),n.d(r,"c",(function(){return a})),n.d(r,"d",(function(){return s}));var e=n(35),o=(n(341),n(344),n(188),function(t,r){var n=r.removedIndex,o=r.addedIndex,i=r.payload;if(null===n&&null===o)return t;var a=Object(e.a)(t),c=i;return null!==n&&(c=a.splice(n,1)[0]),null!==o&&a.splice(o,0,c),a}),i=function(t,r){for(var n=[],e=0;e<t;e++)n.push(r(e));return n},a="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",c=["Backlog","Doing","Finished"],u=["#34495E","#84B0DC","#49627A","#41B883","#7096BB","#97CAFC","#6CC1C0","#41B883","#41B883","#49627A"],s={type:"container",props:{orientation:"horizontal"},children:i(3,(function(t){return{id:"column".concat(t),type:"container",name:c[t],props:{orientation:"vertical",className:"card-container"},children:i(+(10*Math.random()).toFixed()+5,(function(r){return{type:"draggable",id:"".concat(t).concat(r),props:{className:"card",style:{backgroundColor:(n=Math.floor(10*Math.random()),u[n])}},number:Math.floor(100*Math.random()),data:a.slice(0,Math.floor(150*Math.random())+30)};var n}))}}))}},341:function(t,r,n){"use strict";var e=n(2),o=n(1),i=n(82),a=n(54),c=n(22),u=n(14),s=n(111),d=n(36),l=n(55)("splice"),f=o.TypeError,h=Math.max,p=Math.min;e({target:"Array",proto:!0,forced:!l},{splice:function(t,r){var n,e,o,l,m,v,g=u(this),b=c(g),_=i(t,b),y=arguments.length;if(0===y?n=e=0:1===y?(n=0,e=b-_):(n=y-2,e=p(h(a(r),0),b-_)),b+n-e>9007199254740991)throw f("Maximum allowed length exceeded");for(o=s(g,e),l=0;l<e;l++)(m=_+l)in g&&d(o,l,g[m]);if(o.length=e,n<e){for(l=_;l<b-e;l++)v=l+n,(m=l+e)in g?g[v]=g[m]:delete g[v];for(l=b;l>b-e+n;l--)delete g[l-1]}else if(n>e)for(l=b-e;l>_;l--)v=l+n-1,(m=l+e-1)in g?g[v]=g[m]:delete g[v];for(l=0;l<n;l++)g[l+_]=arguments[l+2];return g.length=b-e+n,o}})},342:function(t,r,n){var e=n(3);t.exports=e(1..valueOf)},344:function(t,r,n){"use strict";var e=n(2),o=n(1),i=n(3),a=n(54),c=n(342),u=n(345),s=n(4),d=o.RangeError,l=o.String,f=Math.floor,h=i(u),p=i("".slice),m=i(1..toFixed),v=function(t,r,n){return 0===r?n:r%2==1?v(t,r-1,n*t):v(t*t,r/2,n)},g=function(t,r,n){for(var e=-1,o=n;++e<6;)o+=r*t[e],t[e]=o%1e7,o=f(o/1e7)},b=function(t,r){for(var n=6,e=0;--n>=0;)e+=t[n],t[n]=f(e/r),e=e%r*1e7},_=function(t){for(var r=6,n="";--r>=0;)if(""!==n||0===r||0!==t[r]){var e=l(t[r]);n=""===n?e:n+h("0",7-e.length)+e}return n};e({target:"Number",proto:!0,forced:s((function(){return"0.000"!==m(8e-5,3)||"1"!==m(.9,0)||"1.25"!==m(1.255,2)||"1000000000000000128"!==m(0xde0b6b3a7640080,0)}))||!s((function(){m({})}))},{toFixed:function(t){var r,n,e,o,i=c(this),u=a(t),s=[0,0,0,0,0,0],f="",m="0";if(u<0||u>20)throw d("Incorrect fraction digits");if(i!=i)return"NaN";if(i<=-1e21||i>=1e21)return l(i);if(i<0&&(f="-",i=-i),i>1e-21)if(n=(r=function(t){for(var r=0,n=t;n>=4096;)r+=12,n/=4096;for(;n>=2;)r+=1,n/=2;return r}(i*v(2,69,1))-69)<0?i*v(2,-r,1):i/v(2,r,1),n*=4503599627370496,(r=52-r)>0){for(g(s,0,n),e=u;e>=7;)g(s,1e7,0),e-=7;for(g(s,v(10,e,1),0),e=r-1;e>=23;)b(s,1<<23),e-=23;b(s,1<<e),g(s,1,1),b(s,2),m=_(s)}else g(s,0,n),g(s,1<<-r,0),m=_(s)+h("0",u);return m=u>0?f+((o=m.length)<=u?"0."+h("0",u-o)+m:p(m,0,o-u)+"."+p(m,o-u)):f+m}})},345:function(t,r,n){"use strict";var e=n(1),o=n(54),i=n(21),a=n(30),c=e.RangeError;t.exports=function(t){var r=i(a(this)),n="",e=o(t);if(e<0||e==1/0)throw c("Wrong number of repetitions");for(;e>0;(e>>>=1)&&(r+=r))1&e&&(n+=r);return n}},361:function(t,r,n){},380:function(t,r,n){"use strict";n(361)},423:function(t,r,n){"use strict";n.r(r);var e=n(343),o=n(340),i={name:"Table",components:{Container:e.a,Draggable:e.b},data:function(){return{items:Object(o.b)(10,(function(t){return{id:t,data:"Draggable "+t}}))}},methods:{getGhostParent:function(){return document.querySelector("tbody")},onDrop:function(t){this.items=Object(o.a)(this.items,t)},onDropReady:function(t){console.log("drop ready",t)}}},a=(n(380),n(53)),c=Object(a.a)(i,(function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("div",{staticClass:"wide-page"},[n("table",{staticStyle:{"border-spacing":"0"}},[t._m(0),t._v(" "),n("Container",{attrs:{tag:"tbody","lock-axis":"y"},on:{drop:t.onDrop,"drop-ready":t.onDropReady}},t._l(t.items,(function(r){return n("Draggable",{key:r.id,staticStyle:{height:"30px"},attrs:{tag:"tr"}},[n("td",[t._v("Row "+t._s(r.data)+" Column 1")]),t._v(" "),n("td",[t._v("Row "+t._s(r.data)+" Column 2")]),t._v(" "),n("td",[t._v("Row "+t._s(r.data)+" Column 3")])])})),1)],1)])}),[function(){var t=this.$createElement,r=this._self._c||t;return r("thead",[r("tr",[r("th",[this._v("Lorem")]),this._v(" "),r("th",[this._v("Ipsum")]),this._v(" "),r("th",[this._v("Sit")])])])}],!1,null,"6611bfb1",null);r.default=c.exports}}]);
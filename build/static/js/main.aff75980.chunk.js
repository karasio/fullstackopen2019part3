(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),l=t.n(r),u=t(2),c=t(3),i=t.n(c),s="/api/persons",m=function(){return i.a.get(s).then((function(e){return e.data}))},f=function(e){return i.a.post(s,e).then((function(e){return e.data}))},d=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},g=function(e){var n=e.filterValue,t=e.handleFilter;return o.a.createElement("form",null,o.a.createElement("div",null,"filter shown with ",o.a.createElement("input",{value:n,onChange:t})))},b=function(e){var n=e.addPerson,t=e.newName,a=e.handlePersonChange,r=e.newNumber,l=e.handleNumberChange;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:t,onChange:a}),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:r,onChange:l}))),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},p=function(e){var n=e.filterValue,t=e.person,a=e.deletePerson,r=t.filter((function(e){return e.name.toLowerCase().includes(n)}));return o.a.createElement("div",null,o.a.createElement("ul",null,r.map((function(e){return o.a.createElement("li",{key:e.name},e.name," ",e.number,o.a.createElement("button",{onClick:function(){return a(e.id)}},"delete"))}))))},v=function(e){var n=e.message;return"error"===n.sort?(console.log("errorissa"),o.a.createElement("div",{className:"error"},n.msg)):null===n.msg?(console.log("ei virheit\xe4"),null):(console.log("notifikaatio"),o.a.createElement("div",{className:"notification"},n.msg))},E=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],l=Object(a.useState)(""),c=Object(u.a)(l,2),i=c[0],s=c[1],E=Object(a.useState)(""),w=Object(u.a)(E,2),j=w[0],N=w[1],O=Object(a.useState)(""),C=Object(u.a)(O,2),k=C[0],P=C[1],S=Object(a.useState)({msg:null,sort:null}),T=Object(u.a)(S,2),y=T[0],V=T[1];Object(a.useEffect)((function(){m().then((function(e){r(e)}))}),[]);return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(v,{message:y}),o.a.createElement(g,{filterValue:k,handleFilter:function(e){P(e.target.value)}}),o.a.createElement("h3",null,"Add a new"),o.a.createElement(b,{addPerson:function(e){e.preventDefault();var n,a={name:{newName:i}.newName.toLowerCase().split(/ /).map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" "),number:j},o=!1;if(t.forEach((function(e){e.name===a.name&&(o=!0,n=e,console.log("rivi58",n,"onlist",o))})),o){var l=window.confirm("".concat(i," is already added to phonebook, replace old number with a new one?"));console.log("changeNumber",l),l&&d(n.id,a).then((function(){V({msg:"Updated phone number of ".concat(a.name," to ").concat(a.number),sort:"info"}),setTimeout((function(){V({msg:null,sort:null})}),5e3),m().then((function(e){r(e)}))})).catch((function(e){V({msg:"Information of ".concat(a.name," has been removed already"),sort:"error"}),setTimeout((function(){V({msg:null,sort:null})}),5e3)}))}else f(a).then((function(e){r(t.concat(e)),s(""),N(""),V({msg:"Added ".concat(e.name),sort:"info"}),setTimeout((function(){V({msg:null,sort:null})}),5e3)})).catch((function(e){console.log("VIKA OLI T\xc4S\xc4",e.response.data),V({msg:e.response.data,sort:"error"}),setTimeout((function(){V({msg:null,sort:null})}))}))},newName:i,handlePersonChange:function(e){s(e.target.value)},handleNumberChange:function(e){N(e.target.value)},newNumber:j}),o.a.createElement("h3",null,"Numbers"),o.a.createElement(p,{filterValue:k,person:t,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&h(e).then((function(){V({msg:"Removed ".concat(n.name),sort:"info"}),setTimeout((function(){V({msg:null,sort:null})}),5e3),m().then((function(e){r(e)}))}))}}))};t(36);l.a.render(o.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.aff75980.chunk.js.map
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("svelte/store");const e=(t,e)=>{if(!Array.isArray(t))return null;for(const r of t)if("function"==typeof r)try{const t=r(e);if(null!=t)return t}catch(t){console.error("validator error",r,t)}return null};class r{constructor(t){this.validators=t}setValidators(t){Array.isArray(t)&&t.length&&(this.validators=t)}}class s extends r{constructor(r,s=[]){super(s),this.initial=r,this.value=t.writable(this.initial),this.touched=t.writable(!1),this.state=t.derived([this.value,this.touched],([t,r])=>{const s=e(this.validators,t);return{$error:s,$valid:null==s,$touched:r,$dirty:this.initial!==t}})}setTouched(t){this.touched.set(t)}getControl(){return null}reset(t){this.touched.set(!1),null!=t&&(this.initial=t),this.value.set(this.initial)}}const o=/^([^.[]+)\.?(.*)$/;const l=/^\[(\d+)\]\.?(.*)$/;const i=({onlyTouched:t=!1}={})=>(e,r)=>{if(!(r instanceof s))throw new Error("must be used with a Control class");return{destroy:r.state.subscribe(r=>{const s=r,o=!(t&&!s.$touched||!s.$error);e.hidden=!o,o&&(e.innerHTML=s.$error)})}},n=i(),a=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,u=/^[\d.]+$/,c=/^[\d]+$/;exports.Control=s,exports.ControlArray=class extends r{constructor(r,s=[]){super(s),this._controls=r,this.controlStore=t.writable(this._controls),this.valueDerived=t.derived(this.controlStore,(e,r)=>t.derived(e.map(t=>t.value),t=>t).subscribe(r)),this.childStateDerived=t.derived(this.controlStore,(e,r)=>t.derived(e.map(t=>t.state),t=>t).subscribe(r)),this.value={subscribe:this.valueDerived.subscribe,set:t=>this.setValue(t),update:e=>this.setValue(e(t.get(this.valueDerived)))},this.state=t.derived([this.valueDerived,this.childStateDerived],([t,r])=>{const s=[];let o=!0;for(let t=0,e=r.length;t<e;t++){const e=r[t];s[t]=e,o=o&&e.$valid,s.$touched=s.$touched||e.$touched,s.$dirty=s.$dirty||e.$dirty}return s.$error=e(this.validators,t),s.$valid=null==s.$error&&o,s})}setValue(e){t.get(this.controlStore).forEach((t,r)=>t.value.set(e[r]))}setTouched(e){t.get(this.controlStore).forEach(t=>t.setTouched(e))}get size(){return t.get(this.controlStore).length}get controls(){return t.get(this.controlStore)}pushControl(t){this.controlStore.update(e=>(e.push(t),e))}addControlAt(t,e){this.controlStore.update(r=>(r.splice(t,0,e),r))}removeControlAt(t){this.controlStore.update(e=>(e.splice(t,1),e))}slice(t,e){this.controlStore.update(r=>r.slice(t,e))}getControl(e){const[r,s,o]=e.match(l)||[],i=t.get(this.controlStore),n=null!=s&&i[+s]||null;return n?o?n.getControl(o):n:null}reset(e){t.get(this.controlStore).forEach((t,r)=>t.reset(e&&e[r]))}setValidators(t){Array.isArray(t)&&t.length&&(this.validators=t)}},exports.ControlBase=r,exports.ControlGroup=class extends r{constructor(r,s=[]){super(s),this.controls=r,this.valueReadable=(e=>{const r=Object.keys(e),s=r.map(t=>e[t]).map(t=>t.value);return t.derived(s,t=>t.reduce((t,e,s)=>(t[r[s]]=e,t),{}))})(this.controls),this.childStateReadable=(e=>{const r=Object.keys(e),s=r.map(t=>e[t]).map(t=>t.state);return t.derived(s,t=>t.reduce((t,e,s)=>(t[r[s]]=e,t),{}))})(this.controls),this.value={subscribe:this.valueReadable.subscribe,set:t=>this.setValue(t),update:e=>this.setValue(e(t.get(this.valueReadable)))},this.state=t.derived([this.valueReadable,this.childStateReadable],([t,r])=>{const s={};let o=!0,l=!1,i=!1;for(const t of Object.keys(this.controls)){const e=s[t]=r[t];o=o&&e.$valid,l=l||e.$touched,i=i||e.$dirty}const n=e(this.validators,t),a=null==n&&o;return Object.assign({$error:n,$valid:a,$touched:l,$dirty:i},s)})}setValue(t){Object.keys(this.controls).forEach(e=>{this.controls[e].value.set(t[e])})}setTouched(t){Object.keys(this.controls).forEach(e=>{this.controls[e].setTouched(t)})}getControl(t){const[e,r,s]=t.match(o)||[],l=r&&this.controls[r]||null;return l?s?l.getControl(s):l:null}reset(t){Object.keys(this.controls).forEach(e=>{this.controls[e].reset(t[e])})}},exports.controlClasses=(t,e)=>{if(!(e instanceof s))throw new Error("must be used with a Control class");const r=t.classList,o=e.state.subscribe(t=>{t.$error?(r.add("invalid"),r.remove("valid")):(r.add("valid"),r.remove("invalid")),t.$dirty?(r.add("dirty"),r.remove("pristine")):(r.add("pristine"),r.remove("dirty")),t.$touched?r.add("touched"):r.remove("touched")}),l=["blur","focusout"],i=()=>l.forEach(e=>t.removeEventListener(e,n)),n=()=>{e.setTouched(!0),i()};return l.forEach(e=>t.addEventListener(e,n)),{destroy(){i(),o()}}},exports.controlError=n,exports.controlErrorFactory=i,exports.decimal=t=>e=>null==e||!isNaN(e)&&u.test(`${e}`)?null:t,exports.email=t=>e=>null==e||a.test(e)?null:t,exports.integer=t=>e=>null==e||!isNaN(e)&&c.test(`${e}`)?null:t,exports.max=(t,e)=>r=>null==r||!isNaN(r)&&(null==e||r<=e)?null:t,exports.maxLength=(t,e)=>r=>null!=r&&(null==e||`${r}`.length<=e)?null:t,exports.min=(t,e)=>r=>null==r||!isNaN(r)&&(null==e||r>=e)?null:t,exports.minLength=(t,e)=>r=>null!=r&&(null==e||`${r}`.length>=e)?null:t,exports.number=t=>e=>null==e||!isNaN(e)?null:t,exports.pattern=(t,e)=>r=>null==r||null==e||e.test(r)?null:t,exports.required=(t,e=!0)=>r=>{let s=null!=r?`${r}`:"";return e&&(s=s.trim()),""!==s?null:t};
//# sourceMappingURL=index.js.map

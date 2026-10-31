(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Ia="bannerline.mute",hc="bannerline.coach";function vu(n){return n==="1"}function Mu(n){return n==="1"}function yu(n){return n?"1":"0"}const Ua=[523.25,587.33,659.25,523.25,783.99,659.25,587.33,392];function Su(){let n=!1;try{n=Mu(localStorage.getItem(Ia))}catch{n=!1}let e=null,t=null,i=null,r=0,s=!1,o=0;function a(){if(e)return;const f=window.AudioContext||window.webkitAudioContext;f&&(e=new f,t=e.createGain(),t.gain.value=n?0:1,t.connect(e.destination))}function l(f,p,g,_,m){if(!e||!t)return;const d=e.createOscillator(),M=e.createGain();d.type=_,d.frequency.setValueAtTime(f,p),M.gain.setValueAtTime(1e-4,p),M.gain.exponentialRampToValueAtTime(Math.max(2e-4,m),p+.02),M.gain.exponentialRampToValueAtTime(1e-4,p+g),d.connect(M),M.connect(t),d.start(p),d.stop(p+g+.02)}function c(){i&&(clearInterval(i),i=null)}function u(){if(!e||n||i)return;const f=()=>{if(!e||n)return;const p=e.currentTime+.02,g=Ua[r%Ua.length];l(g,p,.34,"triangle",.035),l(g/2,p,.4,"sine",.02),r+=1};f(),i=setInterval(f,520)}function h(){try{localStorage.setItem(Ia,yu(n))}catch{}}return{get muted(){return n},unlock(){a(),e&&(e.state==="suspended"&&e.resume(),s=!0,n||u())},toggle(){return a(),n=!n,h(),e&&t&&(t.gain.setTargetAtTime(n?0:1,e.currentTime,.03),e.state==="suspended"&&e.resume()),n?c():s&&u(),n},sfx(f){if(n||(a(),!e||e.state!=="running"))return;const p=e.currentTime+.01;if(f==="send")l(440,p,.08,"triangle",.05),l(660,p+.07,.12,"triangle",.05);else if(f==="nope")l(180,p,.12,"sine",.04);else if(f==="clash"){const g=performance.now();if(g-o<120)return;o=g,l(210,p,.06,"square",.03),l(160,p+.04,.07,"triangle",.03)}else f==="capture"?(l(523,p,.1,"triangle",.05),l(659,p+.09,.1,"triangle",.05),l(784,p+.18,.16,"triangle",.05)):f==="spawn"?l(880,p,.05,"sine",.02):f==="win"?(l(523,p,.12,"triangle",.06),l(659,p+.12,.12,"triangle",.06),l(784,p+.24,.22,"triangle",.07)):f==="lose"&&(l(392,p,.16,"sine",.05),l(311,p+.14,.18,"sine",.05),l(247,p+.3,.28,"triangle",.05))}}}const Eu="crossing",bu="對岸",Tu="一條大路，兩邊兵營",wu="balanced",Au={"player-hq":{x:0,z:6.55},"player-bar":{x:1.72,z:3.05},"player-road":{x:0,z:3.05},mid:{x:0,z:0},"enemy-road":{x:0,z:-3.05},"enemy-bar":{x:-1.72,z:-3.05},"enemy-hq":{x:0,z:-6.55}},Ru={"player-hq":["player-road"],"player-bar":["player-road"],"player-road":["player-hq","player-bar","mid"],mid:["player-road","enemy-road"],"enemy-road":["mid","enemy-bar","enemy-hq"],"enemy-bar":["enemy-road"],"enemy-hq":["enemy-road"]},Cu=[{buildingId:"player-hq",x:0,z:5.75,rx:3.15,rz:1.95},{buildingId:"player-bar",x:.12,z:2.25,rx:3.25,rz:1.6},{buildingId:"enemy-bar",x:-.12,z:-2.25,rx:3.25,rz:1.6},{buildingId:"enemy-hq",x:0,z:-5.75,rx:3.15,rz:1.95}],Pu=["player-hq","player-road","mid","enemy-road","enemy-hq"],Du=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:12,cap:28,regen:.1},{id:"player-bar",kind:"barracks",owner:"player",node:"player-bar",count:30,cap:54,regen:2.25},{id:"enemy-bar",kind:"barracks",owner:"enemy",node:"enemy-bar",count:18,cap:48,regen:1.7},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:44,cap:52,regen:0}],Hi={id:Eu,name:bu,blurb:Tu,personality:wu,nodes:Au,graph:Ru,zones:Cu,road:Pu,buildings:Du},Li=Hi.nodes,hs=Hi.graph,Lu=Hi.zones;Hi.road;const fc={haste:{id:"haste",label:"加速",cost:8,step:4,max:2},bulwark:{id:"bulwark",label:"加固",cost:8,step:4,max:2}};function Iu(n,e){const t=n&&n.upgrades,i=t&&t[e];return i>0?i:0}function Uu(n,e){const t=fc[n];return t?t.cost+Math.max(0,e)*t.step:1/0}function ts(n,e){const t=fc[e];if(!t||!n)return{ok:!1,reason:"bad",cost:0,label:""};const i=Iu(n,e);if(i>=t.max)return{ok:!1,reason:"max",cost:0,label:t.label,rank:i};const r=Uu(e,i);return n.count-r<1?{ok:!1,reason:"troops",cost:r,label:t.label,rank:i}:{ok:!0,cost:r,label:t.label,rank:i}}function Nu(n){return!n||n.owner!=="player"||n.kind!=="hq"&&n.kind!=="barracks"?!1:ts(n,"haste").ok||ts(n,"bulwark").ok}function Fu(n,e){const t=ts(n,e);if(!t.ok)return t;n.upgrades||(n.upgrades={haste:0,bulwark:0}),n.count-=t.cost,n.bank=0;const i=t.rank+1;if(n.upgrades[e]=i,e==="haste"){const r=n.baseRegen>0?n.baseRegen:.6;n.regen=r*1.55**i}else e==="bulwark"&&(n.cap+=10);return{ok:!0,cost:t.cost,rank:i,label:t.label}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jo="170",Ou=0,Na=1,Bu=2,dc=1,pc=2,_n=3,Nn=0,At=1,Bt=2,In=0,Ci=1,Fa=2,Oa=3,Ba=4,zu=5,Kn=100,ku=101,Gu=102,Hu=103,Vu=104,Wu=200,Xu=201,qu=202,Yu=203,eo=204,to=205,Ku=206,$u=207,Zu=208,ju=209,Ju=210,Qu=211,eh=212,th=213,nh=214,no=0,io=1,ro=2,Ii=3,so=4,oo=5,ao=6,lo=7,mc=0,ih=1,rh=2,Un=0,sh=1,oh=2,ah=3,gc=4,lh=5,ch=6,uh=7,_c=300,Ui=301,Ni=302,co=303,uo=304,fs=306,ho=1e3,Zn=1001,fo=1002,zt=1003,hh=1004,Er=1005,sn=1006,Ms=1007,jn=1008,yn=1009,xc=1010,vc=1011,dr=1012,Qo=1013,ei=1014,on=1015,Mr=1016,ea=1017,ta=1018,Fi=1020,Mc=35902,yc=1021,Sc=1022,en=1023,Ec=1024,bc=1025,Pi=1026,Oi=1027,na=1028,ia=1029,Tc=1030,ra=1031,sa=1033,$r=33776,Zr=33777,jr=33778,Jr=33779,po=35840,mo=35841,go=35842,_o=35843,xo=36196,vo=37492,Mo=37496,yo=37808,So=37809,Eo=37810,bo=37811,To=37812,wo=37813,Ao=37814,Ro=37815,Co=37816,Po=37817,Do=37818,Lo=37819,Io=37820,Uo=37821,Qr=36492,No=36494,Fo=36495,wc=36283,Oo=36284,Bo=36285,zo=36286,fh=3200,dh=3201,Ac=0,ph=1,Ln="",Ot="srgb",Vi="srgb-linear",ds="linear",tt="srgb",ai=7680,za=519,mh=512,gh=513,_h=514,Rc=515,xh=516,vh=517,Mh=518,yh=519,ka=35044,Ga="300 es",vn=2e3,ns=2001;class Wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ha=1234567;const cr=Math.PI/180,pr=180/Math.PI;function Xi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(yt[n&255]+yt[n>>8&255]+yt[n>>16&255]+yt[n>>24&255]+"-"+yt[e&255]+yt[e>>8&255]+"-"+yt[e>>16&15|64]+yt[e>>24&255]+"-"+yt[t&63|128]+yt[t>>8&255]+"-"+yt[t>>16&255]+yt[t>>24&255]+yt[i&255]+yt[i>>8&255]+yt[i>>16&255]+yt[i>>24&255]).toLowerCase()}function wt(n,e,t){return Math.max(e,Math.min(t,n))}function oa(n,e){return(n%e+e)%e}function Sh(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Eh(n,e,t){return n!==e?(t-n)/(e-n):0}function ur(n,e,t){return(1-t)*n+t*e}function bh(n,e,t,i){return ur(n,e,1-Math.exp(-t*i))}function Th(n,e=1){return e-Math.abs(oa(n,e*2)-e)}function wh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ah(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Rh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Ch(n,e){return n+Math.random()*(e-n)}function Ph(n){return n*(.5-Math.random())}function Dh(n){n!==void 0&&(Ha=n);let e=Ha+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Lh(n){return n*cr}function Ih(n){return n*pr}function Uh(n){return(n&n-1)===0&&n!==0}function Nh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Fh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Oh(n,e,t,i,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),h=s((e-i)/2),f=o((e-i)/2),p=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function bi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Bh={DEG2RAD:cr,RAD2DEG:pr,generateUUID:Xi,clamp:wt,euclideanModulo:oa,mapLinear:Sh,inverseLerp:Eh,lerp:ur,damp:bh,pingpong:Th,smoothstep:wh,smootherstep:Ah,randInt:Rh,randFloat:Ch,randFloatSpread:Ph,seededRandom:Dh,degToRad:Lh,radToDeg:Ih,isPowerOfTwo:Uh,ceilPowerOfTwo:Nh,floorPowerOfTwo:Fh,setQuaternionFromProperEuler:Oh,normalize:bt,denormalize:bi};class We{constructor(e=0,t=0){We.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,i,r,s,o,a,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],g=i[8],_=r[0],m=r[3],d=r[6],M=r[1],E=r[4],x=r[7],C=r[2],w=r[5],T=r[8];return s[0]=o*_+a*M+l*C,s[3]=o*m+a*E+l*w,s[6]=o*d+a*x+l*T,s[1]=c*_+u*M+h*C,s[4]=c*m+u*E+h*w,s[7]=c*d+u*x+h*T,s[2]=f*_+p*M+g*C,s[5]=f*m+p*E+g*w,s[8]=f*d+p*x+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,p=c*s-o*l,g=t*h+i*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ys.makeScale(e,t)),this}rotate(e){return this.premultiply(ys.makeRotation(-e)),this}translate(e,t){return this.premultiply(ys.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ys=new Ge;function Cc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function is(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function zh(){const n=is("canvas");return n.style.display="block",n}const Va={};function ar(n){n in Va||(Va[n]=!0,console.warn(n))}function kh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function Gh(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Hh(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $e={enabled:!0,workingColorSpace:Vi,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===tt&&(n.r=Mn(n.r),n.g=Mn(n.g),n.b=Mn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===tt&&(n.r=Di(n.r),n.g=Di(n.g),n.b=Di(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ln?ds:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Mn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Di(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Wa=[.64,.33,.3,.6,.15,.06],Xa=[.2126,.7152,.0722],qa=[.3127,.329],Ya=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ka=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$e.define({[Vi]:{primaries:Wa,whitePoint:qa,transfer:ds,toXYZ:Ya,fromXYZ:Ka,luminanceCoefficients:Xa,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:Wa,whitePoint:qa,transfer:tt,toXYZ:Ya,fromXYZ:Ka,luminanceCoefficients:Xa,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}});let li;class Vh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{li===void 0&&(li=is("canvas")),li.width=e.width,li.height=e.height;const i=li.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=is("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Mn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Mn(t[i]/255)*255):t[i]=Mn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wh=0;class Pc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Xi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ss(r[o].image)):s.push(Ss(r[o]))}else s=Ss(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ss(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Vh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xh=0;class Rt extends Wi{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,i=Zn,r=Zn,s=sn,o=jn,a=en,l=yn,c=Rt.DEFAULT_ANISOTROPY,u=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=Xi(),this.name="",this.source=new Pc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_c)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ho:e.x=e.x-Math.floor(e.x);break;case Zn:e.x=e.x<0?0:1;break;case fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ho:e.y=e.y-Math.floor(e.y);break;case Zn:e.y=e.y<0?0:1;break;case fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=_c;Rt.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,i=0,r=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,x=(p+1)/2,C=(d+1)/2,w=(u+f)/4,T=(h+_)/4,R=(g+m)/4;return E>x&&E>C?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=w/i,s=T/i):x>C?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=w/r,s=R/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=T/s,r=R/s),this.set(i,r,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-_)/M,this.z=(f-u)/M,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qh extends Wi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Rt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Pc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ti extends qh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Dc extends Rt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=zt,this.minFilter=zt,this.wrapR=Zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yh extends Rt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=zt,this.minFilter=zt,this.wrapR=Zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==f||c!==p||u!==g){let m=1-a;const d=l*f+c*p+u*g+h*_,M=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const C=Math.sqrt(E),w=Math.atan2(C,d*M);m=Math.sin(m*w)/C,a=Math.sin(a*w)/C}const x=a*M;if(l=l*m+f*x,c=c*m+p*x,u=u*m+g*x,h=h*m+_*x,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*p-c*f,e[t+1]=l*g+u*f+c*h-a*p,e[t+2]=c*g+u*p+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),f=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($a.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($a.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Es.copy(this).projectOnVector(e),this.sub(Es)}reflect(e){return this.sub(Es.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Es=new N,$a=new qi;class si{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint($t.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint($t.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=$t.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,$t):$t.fromBufferAttribute(s,o),$t.applyMatrix4(e.matrixWorld),this.expandByPoint($t);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),br.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),br.copy(i.boundingBox)),br.applyMatrix4(e.matrixWorld),this.union(br)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$t),$t.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qi),Tr.subVectors(this.max,Qi),ci.subVectors(e.a,Qi),ui.subVectors(e.b,Qi),hi.subVectors(e.c,Qi),bn.subVectors(ui,ci),Tn.subVectors(hi,ui),zn.subVectors(ci,hi);let t=[0,-bn.z,bn.y,0,-Tn.z,Tn.y,0,-zn.z,zn.y,bn.z,0,-bn.x,Tn.z,0,-Tn.x,zn.z,0,-zn.x,-bn.y,bn.x,0,-Tn.y,Tn.x,0,-zn.y,zn.x,0];return!bs(t,ci,ui,hi,Tr)||(t=[1,0,0,0,1,0,0,0,1],!bs(t,ci,ui,hi,Tr))?!1:(wr.crossVectors(bn,Tn),t=[wr.x,wr.y,wr.z],bs(t,ci,ui,hi,Tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$t).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($t).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hn=[new N,new N,new N,new N,new N,new N,new N,new N],$t=new N,br=new si,ci=new N,ui=new N,hi=new N,bn=new N,Tn=new N,zn=new N,Qi=new N,Tr=new N,wr=new N,kn=new N;function bs(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){kn.fromArray(n,s);const a=r.x*Math.abs(kn.x)+r.y*Math.abs(kn.y)+r.z*Math.abs(kn.z),l=e.dot(kn),c=t.dot(kn),u=i.dot(kn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Kh=new si,er=new N,Ts=new N;class Yi{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Kh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);const t=er.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(er,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ts.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(Ts)),this.expandByPoint(er.copy(e.center).sub(Ts))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new N,ws=new N,Ar=new N,wn=new N,As=new N,Rr=new N,Rs=new N;class aa{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ws.copy(e).add(t).multiplyScalar(.5),Ar.copy(t).sub(e).normalize(),wn.copy(this.origin).sub(ws);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ar),a=wn.dot(this.direction),l=-wn.dot(Ar),c=wn.lengthSq(),u=Math.abs(1-o*o);let h,f,p,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ws).addScaledVector(Ar,f),p}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const i=fn.dot(this.direction),r=fn.dot(fn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,i,r,s){As.subVectors(t,e),Rr.subVectors(i,e),Rs.crossVectors(As,Rr);let o=this.direction.dot(Rs),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wn.subVectors(this.origin,e);const l=a*this.direction.dot(Rr.crossVectors(wn,Rr));if(l<0)return null;const c=a*this.direction.dot(As.cross(wn));if(c<0||l+c>o)return null;const u=-a*wn.dot(Rs);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nt{constructor(e,t,i,r,s,o,a,l,c,u,h,f,p,g,_,m){nt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,h,f,p,g,_,m)}set(e,t,i,r,s,o,a,l,c,u,h,f,p,g,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/fi.setFromMatrixColumn(e,0).length(),s=1/fi.setFromMatrixColumn(e,1).length(),o=1/fi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,p=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,p=l*h,g=c*u,_=c*h;t[0]=f+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,p=l*h,g=c*u,_=c*h;t[0]=f-_*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,p=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=g*c-p,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*h,t[8]=g*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=o*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($h,e,Zh)}lookAt(e,t,i){const r=this.elements;return Nt.subVectors(e,t),Nt.lengthSq()===0&&(Nt.z=1),Nt.normalize(),An.crossVectors(i,Nt),An.lengthSq()===0&&(Math.abs(i.z)===1?Nt.x+=1e-4:Nt.z+=1e-4,Nt.normalize(),An.crossVectors(i,Nt)),An.normalize(),Cr.crossVectors(Nt,An),r[0]=An.x,r[4]=Cr.x,r[8]=Nt.x,r[1]=An.y,r[5]=Cr.y,r[9]=Nt.y,r[2]=An.z,r[6]=Cr.z,r[10]=Nt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],M=i[3],E=i[7],x=i[11],C=i[15],w=r[0],T=r[4],R=r[8],y=r[12],v=r[1],P=r[5],O=r[9],F=r[13],W=r[2],Y=r[6],X=r[10],J=r[14],H=r[3],ce=r[7],he=r[11],xe=r[15];return s[0]=o*w+a*v+l*W+c*H,s[4]=o*T+a*P+l*Y+c*ce,s[8]=o*R+a*O+l*X+c*he,s[12]=o*y+a*F+l*J+c*xe,s[1]=u*w+h*v+f*W+p*H,s[5]=u*T+h*P+f*Y+p*ce,s[9]=u*R+h*O+f*X+p*he,s[13]=u*y+h*F+f*J+p*xe,s[2]=g*w+_*v+m*W+d*H,s[6]=g*T+_*P+m*Y+d*ce,s[10]=g*R+_*O+m*X+d*he,s[14]=g*y+_*F+m*J+d*xe,s[3]=M*w+E*v+x*W+C*H,s[7]=M*T+E*P+x*Y+C*ce,s[11]=M*R+E*O+x*X+C*he,s[15]=M*y+E*F+x*J+C*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15];return g*(+s*l*h-r*c*h-s*a*f+i*c*f+r*a*p-i*l*p)+_*(+t*l*p-t*c*f+s*o*f-r*o*p+r*c*u-s*l*u)+m*(+t*c*h-t*a*p-s*o*h+i*o*p+s*a*u-i*c*u)+d*(-r*a*u-t*l*h+t*a*f+r*o*h-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],M=h*m*c-_*f*c+_*l*p-a*m*p-h*l*d+a*f*d,E=g*f*c-u*m*c-g*l*p+o*m*p+u*l*d-o*f*d,x=u*_*c-g*h*c+g*a*p-o*_*p-u*a*d+o*h*d,C=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,w=t*M+i*E+r*x+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return e[0]=M*T,e[1]=(_*f*s-h*m*s-_*r*p+i*m*p+h*r*d-i*f*d)*T,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*d+i*l*d)*T,e[3]=(h*l*s-a*f*s-h*r*c+i*f*c+a*r*p-i*l*p)*T,e[4]=E*T,e[5]=(u*m*s-g*f*s+g*r*p-t*m*p-u*r*d+t*f*d)*T,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*d-t*l*d)*T,e[7]=(o*f*s-u*l*s+u*r*c-t*f*c-o*r*p+t*l*p)*T,e[8]=x*T,e[9]=(g*h*s-u*_*s-g*i*p+t*_*p+u*i*d-t*h*d)*T,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*d+t*a*d)*T,e[11]=(u*a*s-o*h*s-u*i*c+t*h*c+o*i*p-t*a*p)*T,e[12]=C*T,e[13]=(u*_*r-g*h*r+g*i*f-t*_*f-u*i*m+t*h*m)*T,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*m-t*a*m)*T,e[15]=(o*h*r-u*a*r+u*i*l-t*h*l-o*i*f+t*a*f)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,p=s*u,g=s*h,_=o*u,m=o*h,d=a*h,M=l*c,E=l*u,x=l*h,C=i.x,w=i.y,T=i.z;return r[0]=(1-(_+d))*C,r[1]=(p+x)*C,r[2]=(g-E)*C,r[3]=0,r[4]=(p-x)*w,r[5]=(1-(f+d))*w,r[6]=(m+M)*w,r[7]=0,r[8]=(g+E)*T,r[9]=(m-M)*T,r[10]=(1-(f+_))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=fi.set(r[0],r[1],r[2]).length();const o=fi.set(r[4],r[5],r[6]).length(),a=fi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Zt.copy(this);const c=1/s,u=1/o,h=1/a;return Zt.elements[0]*=c,Zt.elements[1]*=c,Zt.elements[2]*=c,Zt.elements[4]*=u,Zt.elements[5]*=u,Zt.elements[6]*=u,Zt.elements[8]*=h,Zt.elements[9]*=h,Zt.elements[10]*=h,t.setFromRotationMatrix(Zt),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=vn){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r);let p,g;if(a===vn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===ns)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=vn){const l=this.elements,c=1/(t-e),u=1/(i-r),h=1/(o-s),f=(t+e)*c,p=(i+r)*u;let g,_;if(a===vn)g=(o+s)*h,_=-2*h;else if(a===ns)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const fi=new N,Zt=new nt,$h=new N(0,0,0),Zh=new N(1,1,1),An=new N,Cr=new N,Nt=new N,Za=new nt,ja=new qi;class tn{constructor(e=0,t=0,i=0,r=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(wt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Za.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Za,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ja.setFromEuler(this),this.setFromQuaternion(ja,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class la{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jh=0;const Ja=new N,di=new qi,dn=new nt,Pr=new N,tr=new N,Jh=new N,Qh=new qi,Qa=new N(1,0,0),el=new N(0,1,0),tl=new N(0,0,1),nl={type:"added"},ef={type:"removed"},pi={type:"childadded",child:null},Cs={type:"childremoved",child:null};class mt extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new N,t=new tn,i=new qi,r=new N(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new nt},normalMatrix:{value:new Ge}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new la,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return di.setFromAxisAngle(e,t),this.quaternion.multiply(di),this}rotateOnWorldAxis(e,t){return di.setFromAxisAngle(e,t),this.quaternion.premultiply(di),this}rotateX(e){return this.rotateOnAxis(Qa,e)}rotateY(e){return this.rotateOnAxis(el,e)}rotateZ(e){return this.rotateOnAxis(tl,e)}translateOnAxis(e,t){return Ja.copy(e).applyQuaternion(this.quaternion),this.position.add(Ja.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qa,e)}translateY(e){return this.translateOnAxis(el,e)}translateZ(e){return this.translateOnAxis(tl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Pr.copy(e):Pr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(tr,Pr,this.up):dn.lookAt(Pr,tr,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),di.setFromRotationMatrix(dn),this.quaternion.premultiply(di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nl),pi.child=e,this.dispatchEvent(pi),pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ef),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nl),pi.child=e,this.dispatchEvent(pi),pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,e,Jh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,Qh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}mt.DEFAULT_UP=new N(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jt=new N,pn=new N,Ps=new N,mn=new N,mi=new N,gi=new N,il=new N,Ds=new N,Ls=new N,Is=new N,Us=new ft,Ns=new ft,Fs=new ft;class Qt{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),jt.subVectors(e,t),r.cross(jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){jt.subVectors(r,t),pn.subVectors(i,t),Ps.subVectors(e,t);const o=jt.dot(jt),a=jt.dot(pn),l=jt.dot(Ps),c=pn.dot(pn),u=pn.dot(Ps),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,mn.x),l.addScaledVector(o,mn.y),l.addScaledVector(a,mn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Us.setScalar(0),Ns.setScalar(0),Fs.setScalar(0),Us.fromBufferAttribute(e,t),Ns.fromBufferAttribute(e,i),Fs.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Us,s.x),o.addScaledVector(Ns,s.y),o.addScaledVector(Fs,s.z),o}static isFrontFacing(e,t,i,r){return jt.subVectors(i,t),pn.subVectors(e,t),jt.cross(pn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),jt.cross(pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Qt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;mi.subVectors(r,i),gi.subVectors(s,i),Ds.subVectors(e,i);const l=mi.dot(Ds),c=gi.dot(Ds);if(l<=0&&c<=0)return t.copy(i);Ls.subVectors(e,r);const u=mi.dot(Ls),h=gi.dot(Ls);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(mi,o);Is.subVectors(e,s);const p=mi.dot(Is),g=gi.dot(Is);if(g>=0&&p<=g)return t.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(gi,a);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return il.subVectors(s,r),a=(h-u)/(h-u+(p-g)),t.copy(r).addScaledVector(il,a);const d=1/(m+_+f);return o=_*d,a=f*d,t.copy(i).addScaledVector(mi,o).addScaledVector(gi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Lc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},Dr={h:0,s:0,l:0};function Os(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Pe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=$e.workingColorSpace){if(e=oa(e,1),t=wt(t,0,1),i=wt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Os(o,s,e+1/3),this.g=Os(o,s,e),this.b=Os(o,s,e-1/3)}return $e.toWorkingColorSpace(this,r),this}setStyle(e,t=Ot){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const i=Lc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mn(e.r),this.g=Mn(e.g),this.b=Mn(e.b),this}copyLinearToSRGB(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return $e.fromWorkingColorSpace(St.copy(this),e),Math.round(wt(St.r*255,0,255))*65536+Math.round(wt(St.g*255,0,255))*256+Math.round(wt(St.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(St.copy(this),t);const i=St.r,r=St.g,s=St.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(St.copy(this),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=Ot){$e.fromWorkingColorSpace(St.copy(this),e);const t=St.r,i=St.g,r=St.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(Dr);const i=ur(Rn.h,Dr.h,t),r=ur(Rn.s,Dr.s,t),s=ur(Rn.l,Dr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const St=new Pe;Pe.NAMES=Lc;let tf=0;class Ki extends Wi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=Xi(),this.name="",this.blending=Ci,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=eo,this.blendDst=to,this.blendEquation=Kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Ii,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ai,this.stencilZFail=ai,this.stencilZPass=ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ci&&(i.blending=this.blending),this.side!==Nn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==eo&&(i.blendSrc=this.blendSrc),this.blendDst!==to&&(i.blendDst=this.blendDst),this.blendEquation!==Kn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ii&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==za&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ai&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ai&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ai&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Dt extends Ki{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new N,Lr=new We;class dt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ka,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Lr.fromBufferAttribute(this,t),Lr.applyMatrix3(e),this.setXY(t,Lr.x,Lr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=bi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ka&&(e.usage=this.usage),e}}class Ic extends dt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Uc extends dt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class lt extends dt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let nf=0;const Gt=new nt,Bs=new mt,_i=new N,Ft=new si,nr=new si,xt=new N;class vt extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=Xi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cc(e)?Uc:Ic)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,i){return Gt.makeTranslation(e,t,i),this.applyMatrix4(Gt),this}scale(e,t,i){return Gt.makeScale(e,t,i),this.applyMatrix4(Gt),this}lookAt(e){return Bs.lookAt(e),Bs.updateMatrix(),this.applyMatrix4(Bs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new lt(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Ft.setFromBufferAttribute(s),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,Ft.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,Ft.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(Ft.min),this.boundingBox.expandByPoint(Ft.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(Ft.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];nr.setFromBufferAttribute(a),this.morphTargetsRelative?(xt.addVectors(Ft.min,nr.min),Ft.expandByPoint(xt),xt.addVectors(Ft.max,nr.max),Ft.expandByPoint(xt)):(Ft.expandByPoint(nr.min),Ft.expandByPoint(nr.max))}Ft.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)xt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(xt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)xt.fromBufferAttribute(a,c),l&&(_i.fromBufferAttribute(e,c),xt.add(_i)),r=Math.max(r,i.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new N,l[R]=new N;const c=new N,u=new N,h=new N,f=new We,p=new We,g=new We,_=new N,m=new N;function d(R,y,v){c.fromBufferAttribute(i,R),u.fromBufferAttribute(i,y),h.fromBufferAttribute(i,v),f.fromBufferAttribute(s,R),p.fromBufferAttribute(s,y),g.fromBufferAttribute(s,v),u.sub(c),h.sub(c),p.sub(f),g.sub(f);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(P),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(P),a[R].add(_),a[y].add(_),a[v].add(_),l[R].add(m),l[y].add(m),l[v].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let R=0,y=M.length;R<y;++R){const v=M[R],P=v.start,O=v.count;for(let F=P,W=P+O;F<W;F+=3)d(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const E=new N,x=new N,C=new N,w=new N;function T(R){C.fromBufferAttribute(r,R),w.copy(C);const y=a[R];E.copy(y),E.sub(C.multiplyScalar(C.dot(y))).normalize(),x.crossVectors(w,y);const P=x.dot(l[R])<0?-1:1;o.setXYZW(R,E.x,E.y,E.z,P)}for(let R=0,y=M.length;R<y;++R){const v=M[R],P=v.start,O=v.count;for(let F=P,W=P+O;F<W;F+=3)T(e.getX(F+0)),T(e.getX(F+1)),T(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new dt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,u=new N,h=new N;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let d=0;d<u;d++)f[g++]=c[p++]}return new dt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rl=new nt,Gn=new aa,Ir=new Yi,sl=new N,Ur=new N,Nr=new N,Fr=new N,zs=new N,Or=new N,ol=new N,Br=new N;class Ze extends mt{constructor(e=new vt,t=new Dt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Or.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(zs.fromBufferAttribute(h,e),o?Or.addScaledVector(zs,u):Or.addScaledVector(zs.sub(t),u))}t.add(Or)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ir.copy(i.boundingSphere),Ir.applyMatrix4(s),Gn.copy(e.ray).recast(e.near),!(Ir.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(Ir,sl)===null||Gn.origin.distanceToSquared(sl)>(e.far-e.near)**2))&&(rl.copy(s).invert(),Gn.copy(e.ray).applyMatrix4(rl),!(i.boundingBox!==null&&Gn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,C=E;x<C;x+=3){const w=a.getX(x),T=a.getX(x+1),R=a.getX(x+2);r=zr(this,d,e,i,c,u,h,w,T,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const M=a.getX(m),E=a.getX(m+1),x=a.getX(m+2);r=zr(this,o,e,i,c,u,h,M,E,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,C=E;x<C;x+=3){const w=x,T=x+1,R=x+2;r=zr(this,d,e,i,c,u,h,w,T,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const M=m,E=m+1,x=m+2;r=zr(this,o,e,i,c,u,h,M,E,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function rf(n,e,t,i,r,s,o,a){let l;if(e.side===At?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Nn,a),l===null)return null;Br.copy(a),Br.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Br);return c<t.near||c>t.far?null:{distance:c,point:Br.clone(),object:n}}function zr(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,Ur),n.getVertexPosition(l,Nr),n.getVertexPosition(c,Fr);const u=rf(n,e,t,i,Ur,Nr,Fr,ol);if(u){const h=new N;Qt.getBarycoord(ol,Ur,Nr,Fr,h),r&&(u.uv=Qt.getInterpolatedAttribute(r,a,l,c,h,new We)),s&&(u.uv1=Qt.getInterpolatedAttribute(s,a,l,c,h,new We)),o&&(u.normal=Qt.getInterpolatedAttribute(o,a,l,c,h,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new N,materialIndex:0};Qt.getNormal(Ur,Nr,Fr,f.normal),u.face=f,u.barycoord=h}return u}class oe extends vt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(u,3)),this.setAttribute("uv",new lt(h,2));function g(_,m,d,M,E,x,C,w,T,R,y){const v=x/T,P=C/R,O=x/2,F=C/2,W=w/2,Y=T+1,X=R+1;let J=0,H=0;const ce=new N;for(let he=0;he<X;he++){const xe=he*P-F;for(let Ie=0;Ie<Y;Ie++){const qe=Ie*v-O;ce[_]=qe*M,ce[m]=xe*E,ce[d]=W,c.push(ce.x,ce.y,ce.z),ce[_]=0,ce[m]=0,ce[d]=w>0?1:-1,u.push(ce.x,ce.y,ce.z),h.push(Ie/T),h.push(1-he/R),J+=1}}for(let he=0;he<R;he++)for(let xe=0;xe<T;xe++){const Ie=f+xe+Y*he,qe=f+xe+Y*(he+1),q=f+(xe+1)+Y*(he+1),ie=f+(xe+1)+Y*he;l.push(Ie,qe,ie),l.push(qe,q,ie),H+=6}a.addGroup(p,H,y),p+=H,f+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oe(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Bi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Tt(n){const e={};for(let t=0;t<n.length;t++){const i=Bi(n[t]);for(const r in i)e[r]=i[r]}return e}function sf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Nc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const of={clone:Bi,merge:Tt};var af=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fn extends Ki{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=af,this.fragmentShader=lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bi(e.uniforms),this.uniformsGroups=sf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Fc extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=vn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cn=new N,al=new We,ll=new We;class Vt extends Fc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=pr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(cr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pr*2*Math.atan(Math.tan(cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z),Cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z)}getViewSize(e,t){return this.getViewBounds(e,al,ll),t.subVectors(ll,al)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(cr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const xi=-90,vi=1;class cf extends mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Vt(xi,vi,e,t);r.layers=this.layers,this.add(r);const s=new Vt(xi,vi,e,t);s.layers=this.layers,this.add(s);const o=new Vt(xi,vi,e,t);o.layers=this.layers,this.add(o);const a=new Vt(xi,vi,e,t);a.layers=this.layers,this.add(a);const l=new Vt(xi,vi,e,t);l.layers=this.layers,this.add(l);const c=new Vt(xi,vi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===vn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ns)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Oc extends Rt{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Ui,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class uf extends ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Oc(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:sn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new oe(5,5,5),s=new Fn({name:"CubemapFromEquirect",uniforms:Bi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:At,blending:In});s.uniforms.tEquirect.value=t;const o=new Ze(r,s),a=t.minFilter;return t.minFilter===jn&&(t.minFilter=sn),new cf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const ks=new N,hf=new N,ff=new Ge;class Dn{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ks.subVectors(i,t).cross(hf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ks),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ff.getNormalMatrix(e),r=this.coplanarPoint(ks).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new Yi,kr=new N;class ca{constructor(e=new Dn,t=new Dn,i=new Dn,r=new Dn,s=new Dn,o=new Dn){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=vn){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],p=r[8],g=r[9],_=r[10],m=r[11],d=r[12],M=r[13],E=r[14],x=r[15];if(i[0].setComponents(l-s,f-c,m-p,x-d).normalize(),i[1].setComponents(l+s,f+c,m+p,x+d).normalize(),i[2].setComponents(l+o,f+u,m+g,x+M).normalize(),i[3].setComponents(l-o,f-u,m-g,x-M).normalize(),i[4].setComponents(l-a,f-h,m-_,x-E).normalize(),t===vn)i[5].setComponents(l+a,f+h,m+_,x+E).normalize();else if(t===ns)i[5].setComponents(a,h,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){return Hn.center.set(0,0,0),Hn.radius=.7071067811865476,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(kr.x=r.normal.x>0?e.max.x:e.min.x,kr.y=r.normal.y>0?e.max.y:e.min.y,kr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Bc(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function df(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class zi extends vt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=e/a,f=t/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const M=d*f-o;for(let E=0;E<c;E++){const x=E*h-s;g.push(x,-M,0),_.push(0,0,1),m.push(E/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let M=0;M<a;M++){const E=M+c*d,x=M+c*(d+1),C=M+1+c*(d+1),w=M+1+c*d;p.push(E,x,w),p.push(x,C,w)}this.setIndex(p),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zi(e.width,e.height,e.widthSegments,e.heightSegments)}}var pf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,gf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_f=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ef=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Af=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Rf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ff=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Of=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Bf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Yf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Kf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ed=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,td=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,nd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,id=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,od=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ad=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ld=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ud=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,fd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,dd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,md=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_d=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Md=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ed=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Td=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ad=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Pd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Od=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$d=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Zd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ep=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,tp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,np=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ip=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,op=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ap=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,fp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Mp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,yp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Sp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ap=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Rp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Up=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Np=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Op=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:pf,alphahash_pars_fragment:mf,alphamap_fragment:gf,alphamap_pars_fragment:_f,alphatest_fragment:xf,alphatest_pars_fragment:vf,aomap_fragment:Mf,aomap_pars_fragment:yf,batching_pars_vertex:Sf,batching_vertex:Ef,begin_vertex:bf,beginnormal_vertex:Tf,bsdfs:wf,iridescence_fragment:Af,bumpmap_pars_fragment:Rf,clipping_planes_fragment:Cf,clipping_planes_pars_fragment:Pf,clipping_planes_pars_vertex:Df,clipping_planes_vertex:Lf,color_fragment:If,color_pars_fragment:Uf,color_pars_vertex:Nf,color_vertex:Ff,common:Of,cube_uv_reflection_fragment:Bf,defaultnormal_vertex:zf,displacementmap_pars_vertex:kf,displacementmap_vertex:Gf,emissivemap_fragment:Hf,emissivemap_pars_fragment:Vf,colorspace_fragment:Wf,colorspace_pars_fragment:Xf,envmap_fragment:qf,envmap_common_pars_fragment:Yf,envmap_pars_fragment:Kf,envmap_pars_vertex:$f,envmap_physical_pars_fragment:od,envmap_vertex:Zf,fog_vertex:jf,fog_pars_vertex:Jf,fog_fragment:Qf,fog_pars_fragment:ed,gradientmap_pars_fragment:td,lightmap_pars_fragment:nd,lights_lambert_fragment:id,lights_lambert_pars_fragment:rd,lights_pars_begin:sd,lights_toon_fragment:ad,lights_toon_pars_fragment:ld,lights_phong_fragment:cd,lights_phong_pars_fragment:ud,lights_physical_fragment:hd,lights_physical_pars_fragment:fd,lights_fragment_begin:dd,lights_fragment_maps:pd,lights_fragment_end:md,logdepthbuf_fragment:gd,logdepthbuf_pars_fragment:_d,logdepthbuf_pars_vertex:xd,logdepthbuf_vertex:vd,map_fragment:Md,map_pars_fragment:yd,map_particle_fragment:Sd,map_particle_pars_fragment:Ed,metalnessmap_fragment:bd,metalnessmap_pars_fragment:Td,morphinstance_vertex:wd,morphcolor_vertex:Ad,morphnormal_vertex:Rd,morphtarget_pars_vertex:Cd,morphtarget_vertex:Pd,normal_fragment_begin:Dd,normal_fragment_maps:Ld,normal_pars_fragment:Id,normal_pars_vertex:Ud,normal_vertex:Nd,normalmap_pars_fragment:Fd,clearcoat_normal_fragment_begin:Od,clearcoat_normal_fragment_maps:Bd,clearcoat_pars_fragment:zd,iridescence_pars_fragment:kd,opaque_fragment:Gd,packing:Hd,premultiplied_alpha_fragment:Vd,project_vertex:Wd,dithering_fragment:Xd,dithering_pars_fragment:qd,roughnessmap_fragment:Yd,roughnessmap_pars_fragment:Kd,shadowmap_pars_fragment:$d,shadowmap_pars_vertex:Zd,shadowmap_vertex:jd,shadowmask_pars_fragment:Jd,skinbase_vertex:Qd,skinning_pars_vertex:ep,skinning_vertex:tp,skinnormal_vertex:np,specularmap_fragment:ip,specularmap_pars_fragment:rp,tonemapping_fragment:sp,tonemapping_pars_fragment:op,transmission_fragment:ap,transmission_pars_fragment:lp,uv_pars_fragment:cp,uv_pars_vertex:up,uv_vertex:hp,worldpos_vertex:fp,background_vert:dp,background_frag:pp,backgroundCube_vert:mp,backgroundCube_frag:gp,cube_vert:_p,cube_frag:xp,depth_vert:vp,depth_frag:Mp,distanceRGBA_vert:yp,distanceRGBA_frag:Sp,equirect_vert:Ep,equirect_frag:bp,linedashed_vert:Tp,linedashed_frag:wp,meshbasic_vert:Ap,meshbasic_frag:Rp,meshlambert_vert:Cp,meshlambert_frag:Pp,meshmatcap_vert:Dp,meshmatcap_frag:Lp,meshnormal_vert:Ip,meshnormal_frag:Up,meshphong_vert:Np,meshphong_frag:Fp,meshphysical_vert:Op,meshphysical_frag:Bp,meshtoon_vert:zp,meshtoon_frag:kp,points_vert:Gp,points_frag:Hp,shadow_vert:Vp,shadow_frag:Wp,sprite_vert:Xp,sprite_frag:qp},le={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},rn={basic:{uniforms:Tt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Tt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Tt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Tt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Tt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Tt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Tt([le.points,le.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Tt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Tt([le.common,le.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Tt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Tt([le.sprite,le.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Tt([le.common,le.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Tt([le.lights,le.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};rn.physical={uniforms:Tt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Gr={r:0,b:0,g:0},Vn=new tn,Yp=new nt;function Kp(n,e,t,i,r,s,o){const a=new Pe(0);let l=s===!0?0:1,c,u,h=null,f=0,p=null;function g(M){let E=M.isScene===!0?M.background:null;return E&&E.isTexture&&(E=(M.backgroundBlurriness>0?t:e).get(E)),E}function _(M){let E=!1;const x=g(M);x===null?d(a,l):x&&x.isColor&&(d(x,1),E=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,E){const x=g(E);x&&(x.isCubeTexture||x.mapping===fs)?(u===void 0&&(u=new Ze(new oe(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:Bi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:At,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Vn.copy(E.backgroundRotation),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Yp.makeRotationFromEuler(Vn)),u.material.toneMapped=$e.getTransfer(x.colorSpace)!==tt,(h!==x||f!==x.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=x,f=x.version,p=n.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ze(new zi(2,2),new Fn({name:"BackgroundMaterial",uniforms:Bi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=$e.getTransfer(x.colorSpace)!==tt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,p=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function d(M,E){M.getRGB(Gr,Nc(n)),i.buffers.color.setClear(Gr.r,Gr.g,Gr.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),l=E,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,d(a,l)},render:_,addToRenderList:m}}function $p(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(v,P,O,F,W){let Y=!1;const X=h(F,O,P);s!==X&&(s=X,c(s.object)),Y=p(v,F,O,W),Y&&g(v,F,O,W),W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,x(v,P,O,F),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function u(v){return n.deleteVertexArray(v)}function h(v,P,O){const F=O.wireframe===!0;let W=i[v.id];W===void 0&&(W={},i[v.id]=W);let Y=W[P.id];Y===void 0&&(Y={},W[P.id]=Y);let X=Y[F];return X===void 0&&(X=f(l()),Y[F]=X),X}function f(v){const P=[],O=[],F=[];for(let W=0;W<t;W++)P[W]=0,O[W]=0,F[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:F,object:v,attributes:{},index:null}}function p(v,P,O,F){const W=s.attributes,Y=P.attributes;let X=0;const J=O.getAttributes();for(const H in J)if(J[H].location>=0){const he=W[H];let xe=Y[H];if(xe===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(xe=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(xe=v.instanceColor)),he===void 0||he.attribute!==xe||xe&&he.data!==xe.data)return!0;X++}return s.attributesNum!==X||s.index!==F}function g(v,P,O,F){const W={},Y=P.attributes;let X=0;const J=O.getAttributes();for(const H in J)if(J[H].location>=0){let he=Y[H];he===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(he=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(he=v.instanceColor));const xe={};xe.attribute=he,he&&he.data&&(xe.data=he.data),W[H]=xe,X++}s.attributes=W,s.attributesNum=X,s.index=F}function _(){const v=s.newAttributes;for(let P=0,O=v.length;P<O;P++)v[P]=0}function m(v){d(v,0)}function d(v,P){const O=s.newAttributes,F=s.enabledAttributes,W=s.attributeDivisors;O[v]=1,F[v]===0&&(n.enableVertexAttribArray(v),F[v]=1),W[v]!==P&&(n.vertexAttribDivisor(v,P),W[v]=P)}function M(){const v=s.newAttributes,P=s.enabledAttributes;for(let O=0,F=P.length;O<F;O++)P[O]!==v[O]&&(n.disableVertexAttribArray(O),P[O]=0)}function E(v,P,O,F,W,Y,X){X===!0?n.vertexAttribIPointer(v,P,O,W,Y):n.vertexAttribPointer(v,P,O,F,W,Y)}function x(v,P,O,F){_();const W=F.attributes,Y=O.getAttributes(),X=P.defaultAttributeValues;for(const J in Y){const H=Y[J];if(H.location>=0){let ce=W[J];if(ce===void 0&&(J==="instanceMatrix"&&v.instanceMatrix&&(ce=v.instanceMatrix),J==="instanceColor"&&v.instanceColor&&(ce=v.instanceColor)),ce!==void 0){const he=ce.normalized,xe=ce.itemSize,Ie=e.get(ce);if(Ie===void 0)continue;const qe=Ie.buffer,q=Ie.type,ie=Ie.bytesPerElement,$=q===n.INT||q===n.UNSIGNED_INT||ce.gpuType===Qo;if(ce.isInterleavedBufferAttribute){const G=ce.data,ee=G.stride,ue=ce.offset;if(G.isInstancedInterleavedBuffer){for(let te=0;te<H.locationSize;te++)d(H.location+te,G.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let te=0;te<H.locationSize;te++)m(H.location+te);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let te=0;te<H.locationSize;te++)E(H.location+te,xe/H.locationSize,q,he,ee*ie,(ue+xe/H.locationSize*te)*ie,$)}else{if(ce.isInstancedBufferAttribute){for(let G=0;G<H.locationSize;G++)d(H.location+G,ce.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let G=0;G<H.locationSize;G++)m(H.location+G);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let G=0;G<H.locationSize;G++)E(H.location+G,xe/H.locationSize,q,he,xe*ie,xe/H.locationSize*G*ie,$)}}else if(X!==void 0){const he=X[J];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(H.location,he);break;case 3:n.vertexAttrib3fv(H.location,he);break;case 4:n.vertexAttrib4fv(H.location,he);break;default:n.vertexAttrib1fv(H.location,he)}}}}M()}function C(){R();for(const v in i){const P=i[v];for(const O in P){const F=P[O];for(const W in F)u(F[W].object),delete F[W];delete P[O]}delete i[v]}}function w(v){if(i[v.id]===void 0)return;const P=i[v.id];for(const O in P){const F=P[O];for(const W in F)u(F[W].object),delete F[W];delete P[O]}delete i[v.id]}function T(v){for(const P in i){const O=i[P];if(O[v.id]===void 0)continue;const F=O[v.id];for(const W in F)u(F[W].object),delete F[W];delete O[v.id]}}function R(){y(),o=!0,s!==r&&(s=r,c(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function Zp(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];t.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function jp(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==en&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const R=T===Mr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==yn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==on&&!R)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:C,maxSamples:w}}function Jp(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Dn,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:i,E=M*4;let x=d.clippingState||null;l.value=x,x=u(g,f,E,p);for(let C=0;C!==E;++C)x[C]=t[C];d.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<d)&&(m=new Float32Array(d));for(let E=0,x=p;E!==_;++E,x+=4)o.copy(h[E]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Qp(n){let e=new WeakMap;function t(o,a){return a===co?o.mapping=Ui:a===uo&&(o.mapping=Ni),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===co||a===uo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new uf(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class zc extends Fc{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const wi=4,cl=[.125,.215,.35,.446,.526,.582],$n=20,Gs=new zc,ul=new Pe;let Hs=null,Vs=0,Ws=0,Xs=!1;const qn=(1+Math.sqrt(5))/2,Mi=1/qn,hl=[new N(-qn,Mi,0),new N(qn,Mi,0),new N(-Mi,0,qn),new N(Mi,0,qn),new N(0,qn,-Mi),new N(0,qn,Mi),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class fl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Hs=this._renderer.getRenderTarget(),Vs=this._renderer.getActiveCubeFace(),Ws=this._renderer.getActiveMipmapLevel(),Xs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Hs,Vs,Ws),this._renderer.xr.enabled=Xs,e.scissorTest=!1,Hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===Ni?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hs=this._renderer.getRenderTarget(),Vs=this._renderer.getActiveCubeFace(),Ws=this._renderer.getActiveMipmapLevel(),Xs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:Mr,format:en,colorSpace:Vi,depthBuffer:!1},r=dl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=em(s)),this._blurMaterial=tm(s,e,t)}return r}_compileMaterial(e){const t=new Ze(this._lodPlanes[0],e);this._renderer.compile(t,Gs)}_sceneToCubeUV(e,t,i,r){const a=new Vt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(ul),u.toneMapping=Un,u.autoClear=!1;const p=new Dt({name:"PMREM.Background",side:At,depthWrite:!1,depthTest:!1}),g=new Ze(new oe,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(ul),_=!0);for(let d=0;d<6;d++){const M=d%3;M===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):M===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const E=this._cubeSize;Hr(r,M*E,d>2?E:0,E,E),u.setRenderTarget(r),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ui||e.mapping===Ni;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ze(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Hr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Gs)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=hl[(r-s-1)%hl.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ze(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*$n-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):$n;m>$n&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$n}`);const d=[];let M=0;for(let T=0;T<$n;++T){const R=T/_,y=Math.exp(-R*R/2);d.push(y),T===0?M+=y:T<m&&(M+=2*y)}for(let T=0;T<d.length;T++)d[T]=d[T]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-i;const x=this._sizeLods[r],C=3*x*(r>E-wi?r-E+wi:0),w=4*(this._cubeSize-x);Hr(t,C,w,3*x,2*x),l.setRenderTarget(t),l.render(h,Gs)}}function em(n){const e=[],t=[],i=[];let r=n;const s=n-wi+1+cl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-wi?l=cl[o-n+wi-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,d=1,M=new Float32Array(_*g*p),E=new Float32Array(m*g*p),x=new Float32Array(d*g*p);for(let w=0;w<p;w++){const T=w%3*2/3-1,R=w>2?0:-1,y=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];M.set(y,_*g*w),E.set(f,m*g*w);const v=[w,w,w,w,w,w];x.set(v,d*g*w)}const C=new vt;C.setAttribute("position",new dt(M,_)),C.setAttribute("uv",new dt(E,m)),C.setAttribute("faceIndex",new dt(x,d)),e.push(C),r>wi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function dl(n,e,t){const i=new ti(n,e,t);return i.texture.mapping=fs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function tm(n,e,t){const i=new Float32Array($n),r=new N(0,1,0);return new Fn({name:"SphericalGaussianBlur",defines:{n:$n,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function pl(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function ml(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function ua(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function nm(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===co||l===uo,u=l===Ui||l===Ni;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new fl(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new fl(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function im(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&ar("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function rm(n,e,t,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)e.remove(_[m])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const M=p.array;_=p.version;for(let E=0,x=M.length;E<x;E+=3){const C=M[E+0],w=M[E+1],T=M[E+2];f.push(C,w,w,T,T,C)}}else if(g!==void 0){const M=g.array;_=g.version;for(let E=0,x=M.length/3-1;E<x;E+=3){const C=E+0,w=E+1,T=E+2;f.push(C,w,w,T,T,C)}}else return;const m=new(Cc(f)?Uc:Ic)(f,1);m.version=_;const d=s.get(h);d&&e.remove(d),s.set(h,m)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function sm(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,s,f*o),t.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,f*o,g),t.update(p,i,g))}function u(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,i,1)}function h(f,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,_,0,g);let d=0;for(let M=0;M<g;M++)d+=p[M]*_[M];t.update(d,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function om(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function am(n,e,t){const i=new WeakMap,r=new ft;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let v=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",v)};var p=v;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,w=1;C>e.maxTextureSize&&(w=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const T=new Float32Array(C*w*4*h),R=new Dc(T,C,w,h);R.type=on,R.needsUpdate=!0;const y=x*4;for(let P=0;P<h;P++){const O=d[P],F=M[P],W=E[P],Y=C*w*4*P;for(let X=0;X<O.count;X++){const J=X*y;g===!0&&(r.fromBufferAttribute(O,X),T[Y+J+0]=r.x,T[Y+J+1]=r.y,T[Y+J+2]=r.z,T[Y+J+3]=0),_===!0&&(r.fromBufferAttribute(F,X),T[Y+J+4]=r.x,T[Y+J+5]=r.y,T[Y+J+6]=r.z,T[Y+J+7]=0),m===!0&&(r.fromBufferAttribute(W,X),T[Y+J+8]=r.x,T[Y+J+9]=r.y,T[Y+J+10]=r.z,T[Y+J+11]=W.itemSize===4?r.w:1)}}f={count:h,texture:R,size:new We(C,w)},i.set(a,f),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function lm(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class kc extends Rt{constructor(e,t,i,r,s,o,a,l,c,u=Pi){if(u!==Pi&&u!==Oi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Pi&&(i=ei),i===void 0&&u===Oi&&(i=Fi),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:zt,this.minFilter=l!==void 0?l:zt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Gc=new Rt,gl=new kc(1,1),Hc=new Dc,Vc=new Yh,Wc=new Oc,_l=[],xl=[],vl=new Float32Array(16),Ml=new Float32Array(9),yl=new Float32Array(4);function $i(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=_l[r];if(s===void 0&&(s=new Float32Array(r),_l[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function gt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function _t(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ps(n,e){let t=xl[e];t===void 0&&(t=new Int32Array(e),xl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function cm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2fv(this.addr,e),_t(t,e)}}function hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;n.uniform3fv(this.addr,e),_t(t,e)}}function fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4fv(this.addr,e),_t(t,e)}}function dm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(gt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,i))return;yl.set(i),n.uniformMatrix2fv(this.addr,!1,yl),_t(t,i)}}function pm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(gt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,i))return;Ml.set(i),n.uniformMatrix3fv(this.addr,!1,Ml),_t(t,i)}}function mm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(gt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,i))return;vl.set(i),n.uniformMatrix4fv(this.addr,!1,vl),_t(t,i)}}function gm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function _m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2iv(this.addr,e),_t(t,e)}}function xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;n.uniform3iv(this.addr,e),_t(t,e)}}function vm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4iv(this.addr,e),_t(t,e)}}function Mm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function ym(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2uiv(this.addr,e),_t(t,e)}}function Sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;n.uniform3uiv(this.addr,e),_t(t,e)}}function Em(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4uiv(this.addr,e),_t(t,e)}}function bm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(gl.compareFunction=Rc,s=gl):s=Gc,t.setTexture2D(e||s,r)}function Tm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Vc,r)}function wm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Wc,r)}function Am(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Hc,r)}function Rm(n){switch(n){case 5126:return cm;case 35664:return um;case 35665:return hm;case 35666:return fm;case 35674:return dm;case 35675:return pm;case 35676:return mm;case 5124:case 35670:return gm;case 35667:case 35671:return _m;case 35668:case 35672:return xm;case 35669:case 35673:return vm;case 5125:return Mm;case 36294:return ym;case 36295:return Sm;case 36296:return Em;case 35678:case 36198:case 36298:case 36306:case 35682:return bm;case 35679:case 36299:case 36307:return Tm;case 35680:case 36300:case 36308:case 36293:return wm;case 36289:case 36303:case 36311:case 36292:return Am}}function Cm(n,e){n.uniform1fv(this.addr,e)}function Pm(n,e){const t=$i(e,this.size,2);n.uniform2fv(this.addr,t)}function Dm(n,e){const t=$i(e,this.size,3);n.uniform3fv(this.addr,t)}function Lm(n,e){const t=$i(e,this.size,4);n.uniform4fv(this.addr,t)}function Im(n,e){const t=$i(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Um(n,e){const t=$i(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Nm(n,e){const t=$i(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Fm(n,e){n.uniform1iv(this.addr,e)}function Om(n,e){n.uniform2iv(this.addr,e)}function Bm(n,e){n.uniform3iv(this.addr,e)}function zm(n,e){n.uniform4iv(this.addr,e)}function km(n,e){n.uniform1uiv(this.addr,e)}function Gm(n,e){n.uniform2uiv(this.addr,e)}function Hm(n,e){n.uniform3uiv(this.addr,e)}function Vm(n,e){n.uniform4uiv(this.addr,e)}function Wm(n,e,t){const i=this.cache,r=e.length,s=ps(t,r);gt(i,s)||(n.uniform1iv(this.addr,s),_t(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Gc,s[o])}function Xm(n,e,t){const i=this.cache,r=e.length,s=ps(t,r);gt(i,s)||(n.uniform1iv(this.addr,s),_t(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Vc,s[o])}function qm(n,e,t){const i=this.cache,r=e.length,s=ps(t,r);gt(i,s)||(n.uniform1iv(this.addr,s),_t(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Wc,s[o])}function Ym(n,e,t){const i=this.cache,r=e.length,s=ps(t,r);gt(i,s)||(n.uniform1iv(this.addr,s),_t(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Hc,s[o])}function Km(n){switch(n){case 5126:return Cm;case 35664:return Pm;case 35665:return Dm;case 35666:return Lm;case 35674:return Im;case 35675:return Um;case 35676:return Nm;case 5124:case 35670:return Fm;case 35667:case 35671:return Om;case 35668:case 35672:return Bm;case 35669:case 35673:return zm;case 5125:return km;case 36294:return Gm;case 36295:return Hm;case 36296:return Vm;case 35678:case 36198:case 36298:case 36306:case 35682:return Wm;case 35679:case 36299:case 36307:return Xm;case 35680:case 36300:case 36308:case 36293:return qm;case 36289:case 36303:case 36311:case 36292:return Ym}}class $m{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Rm(t.type)}}class Zm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Km(t.type)}}class jm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const qs=/(\w+)(\])?(\[|\.)?/g;function Sl(n,e){n.seq.push(e),n.map[e.id]=e}function Jm(n,e,t){const i=n.name,r=i.length;for(qs.lastIndex=0;;){const s=qs.exec(i),o=qs.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Sl(t,c===void 0?new $m(a,n,e):new Zm(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new jm(a),Sl(t,h)),t=h}}}class es{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Jm(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function El(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Qm=37297;let e0=0;function t0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const bl=new Ge;function n0(n){$e._getMatrix(bl,$e.workingColorSpace,n);const e=`mat3( ${bl.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case ds:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Tl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+t0(n.getShaderSource(e),o)}else return r}function i0(n,e){const t=n0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function r0(n,e){let t;switch(e){case sh:t="Linear";break;case oh:t="Reinhard";break;case ah:t="Cineon";break;case gc:t="ACESFilmic";break;case ch:t="AgX";break;case uh:t="Neutral";break;case lh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Vr=new N;function s0(){$e.getLuminanceCoefficients(Vr);const n=Vr.x.toFixed(4),e=Vr.y.toFixed(4),t=Vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function o0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function a0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function l0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function lr(n){return n!==""}function wl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Al(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const c0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ko(n){return n.replace(c0,h0)}const u0=new Map;function h0(n,e){let t=Ve[e];if(t===void 0){const i=u0.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ko(t)}const f0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(n){return n.replace(f0,d0)}function d0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Cl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function p0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===dc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===pc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===_n&&(e="SHADOWMAP_TYPE_VSM"),e}function m0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ui:case Ni:e="ENVMAP_TYPE_CUBE";break;case fs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function g0(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ni:e="ENVMAP_MODE_REFRACTION";break}return e}function _0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case mc:e="ENVMAP_BLENDING_MULTIPLY";break;case ih:e="ENVMAP_BLENDING_MIX";break;case rh:e="ENVMAP_BLENDING_ADD";break}return e}function x0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function v0(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=p0(t),c=m0(t),u=g0(t),h=_0(t),f=x0(t),p=o0(t),g=a0(s),_=r.createProgram();let m,d,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),d.length>0&&(d+=`
`)):(m=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),d=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Un?r0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,i0("linearToOutputTexel",t.outputColorSpace),s0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lr).join(`
`)),o=ko(o),o=wl(o,t),o=Al(o,t),a=ko(a),a=wl(a,t),a=Al(a,t),o=Rl(o),a=Rl(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Ga?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ga?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=M+m+o,x=M+d+a,C=El(r,r.VERTEX_SHADER,E),w=El(r,r.FRAGMENT_SHADER,x);r.attachShader(_,C),r.attachShader(_,w),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function T(P){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(C).trim(),W=r.getShaderInfoLog(w).trim();let Y=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,C,w);else{const J=Tl(r,C,"vertex"),H=Tl(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+J+`
`+H)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(F===""||W==="")&&(X=!1);X&&(P.diagnostics={runnable:Y,programLog:O,vertexShader:{log:F,prefix:m},fragmentShader:{log:W,prefix:d}})}r.deleteShader(C),r.deleteShader(w),R=new es(r,_),y=l0(r,_)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let y;this.getAttributes=function(){return y===void 0&&T(this),y};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(_,Qm)),v},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=e0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=w,this}let M0=0;class y0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new S0(e),t.set(e,i)),i}}class S0{constructor(e){this.id=M0++,this.code=e,this.usedTimes=0}}function E0(n,e,t,i,r,s,o){const a=new la,l=new y0,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,v,P,O,F){const W=O.fog,Y=F.geometry,X=y.isMeshStandardMaterial?O.environment:null,J=(y.isMeshStandardMaterial?t:e).get(y.envMap||X),H=J&&J.mapping===fs?J.image.height:null,ce=g[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const he=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,xe=he!==void 0?he.length:0;let Ie=0;Y.morphAttributes.position!==void 0&&(Ie=1),Y.morphAttributes.normal!==void 0&&(Ie=2),Y.morphAttributes.color!==void 0&&(Ie=3);let qe,q,ie,$;if(ce){const et=rn[ce];qe=et.vertexShader,q=et.fragmentShader}else qe=y.vertexShader,q=y.fragmentShader,l.update(y),ie=l.getVertexShaderID(y),$=l.getFragmentShaderID(y);const G=n.getRenderTarget(),ee=n.state.buffers.depth.getReversed(),ue=F.isInstancedMesh===!0,te=F.isBatchedMesh===!0,se=!!y.map,ae=!!y.matcap,Ue=!!J,D=!!y.aoMap,ct=!!y.lightMap,Oe=!!y.bumpMap,Be=!!y.normalMap,Te=!!y.displacementMap,Xe=!!y.emissiveMap,Ce=!!y.metalnessMap,A=!!y.roughnessMap,S=y.anisotropy>0,B=y.clearcoat>0,Z=y.dispersion>0,Q=y.iridescence>0,K=y.sheen>0,we=y.transmission>0,de=S&&!!y.anisotropyMap,ve=B&&!!y.clearcoatMap,Ke=B&&!!y.clearcoatNormalMap,ne=B&&!!y.clearcoatRoughnessMap,Me=Q&&!!y.iridescenceMap,Le=Q&&!!y.iridescenceThicknessMap,Ne=K&&!!y.sheenColorMap,ye=K&&!!y.sheenRoughnessMap,Ye=!!y.specularMap,He=!!y.specularColorMap,it=!!y.specularIntensityMap,L=we&&!!y.transmissionMap,fe=we&&!!y.thicknessMap,V=!!y.gradientMap,j=!!y.alphaMap,ge=y.alphaTest>0,pe=!!y.alphaHash,ze=!!y.extensions;let ht=Un;y.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(ht=n.toneMapping);const Mt={shaderID:ce,shaderType:y.type,shaderName:y.name,vertexShader:qe,fragmentShader:q,defines:y.defines,customVertexShaderID:ie,customFragmentShaderID:$,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:te,batchingColor:te&&F._colorsTexture!==null,instancing:ue,instancingColor:ue&&F.instanceColor!==null,instancingMorph:ue&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:G===null?n.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Vi,alphaToCoverage:!!y.alphaToCoverage,map:se,matcap:ae,envMap:Ue,envMapMode:Ue&&J.mapping,envMapCubeUVHeight:H,aoMap:D,lightMap:ct,bumpMap:Oe,normalMap:Be,displacementMap:f&&Te,emissiveMap:Xe,normalMapObjectSpace:Be&&y.normalMapType===ph,normalMapTangentSpace:Be&&y.normalMapType===Ac,metalnessMap:Ce,roughnessMap:A,anisotropy:S,anisotropyMap:de,clearcoat:B,clearcoatMap:ve,clearcoatNormalMap:Ke,clearcoatRoughnessMap:ne,dispersion:Z,iridescence:Q,iridescenceMap:Me,iridescenceThicknessMap:Le,sheen:K,sheenColorMap:Ne,sheenRoughnessMap:ye,specularMap:Ye,specularColorMap:He,specularIntensityMap:it,transmission:we,transmissionMap:L,thicknessMap:fe,gradientMap:V,opaque:y.transparent===!1&&y.blending===Ci&&y.alphaToCoverage===!1,alphaMap:j,alphaTest:ge,alphaHash:pe,combine:y.combine,mapUv:se&&_(y.map.channel),aoMapUv:D&&_(y.aoMap.channel),lightMapUv:ct&&_(y.lightMap.channel),bumpMapUv:Oe&&_(y.bumpMap.channel),normalMapUv:Be&&_(y.normalMap.channel),displacementMapUv:Te&&_(y.displacementMap.channel),emissiveMapUv:Xe&&_(y.emissiveMap.channel),metalnessMapUv:Ce&&_(y.metalnessMap.channel),roughnessMapUv:A&&_(y.roughnessMap.channel),anisotropyMapUv:de&&_(y.anisotropyMap.channel),clearcoatMapUv:ve&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Ke&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Le&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:ye&&_(y.sheenRoughnessMap.channel),specularMapUv:Ye&&_(y.specularMap.channel),specularColorMapUv:He&&_(y.specularColorMap.channel),specularIntensityMapUv:it&&_(y.specularIntensityMap.channel),transmissionMapUv:L&&_(y.transmissionMap.channel),thicknessMapUv:fe&&_(y.thicknessMap.channel),alphaMapUv:j&&_(y.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Be||S),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Y.attributes.uv&&(se||j),fog:!!W,useFog:y.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ee,skinning:F.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Ie,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:ht,decodeVideoTexture:se&&y.map.isVideoTexture===!0&&$e.getTransfer(y.map.colorSpace)===tt,decodeVideoTextureEmissive:Xe&&y.emissiveMap.isVideoTexture===!0&&$e.getTransfer(y.emissiveMap.colorSpace)===tt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Bt,flipSided:y.side===At,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ze&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&y.extensions.multiDraw===!0||te)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Mt.vertexUv1s=c.has(1),Mt.vertexUv2s=c.has(2),Mt.vertexUv3s=c.has(3),c.clear(),Mt}function d(y){const v=[];if(y.shaderID?v.push(y.shaderID):(v.push(y.customVertexShaderID),v.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)v.push(P),v.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(M(v,y),E(v,y),v.push(n.outputColorSpace)),v.push(y.customProgramCacheKey),v.join()}function M(y,v){y.push(v.precision),y.push(v.outputColorSpace),y.push(v.envMapMode),y.push(v.envMapCubeUVHeight),y.push(v.mapUv),y.push(v.alphaMapUv),y.push(v.lightMapUv),y.push(v.aoMapUv),y.push(v.bumpMapUv),y.push(v.normalMapUv),y.push(v.displacementMapUv),y.push(v.emissiveMapUv),y.push(v.metalnessMapUv),y.push(v.roughnessMapUv),y.push(v.anisotropyMapUv),y.push(v.clearcoatMapUv),y.push(v.clearcoatNormalMapUv),y.push(v.clearcoatRoughnessMapUv),y.push(v.iridescenceMapUv),y.push(v.iridescenceThicknessMapUv),y.push(v.sheenColorMapUv),y.push(v.sheenRoughnessMapUv),y.push(v.specularMapUv),y.push(v.specularColorMapUv),y.push(v.specularIntensityMapUv),y.push(v.transmissionMapUv),y.push(v.thicknessMapUv),y.push(v.combine),y.push(v.fogExp2),y.push(v.sizeAttenuation),y.push(v.morphTargetsCount),y.push(v.morphAttributeCount),y.push(v.numDirLights),y.push(v.numPointLights),y.push(v.numSpotLights),y.push(v.numSpotLightMaps),y.push(v.numHemiLights),y.push(v.numRectAreaLights),y.push(v.numDirLightShadows),y.push(v.numPointLightShadows),y.push(v.numSpotLightShadows),y.push(v.numSpotLightShadowsWithMaps),y.push(v.numLightProbes),y.push(v.shadowMapType),y.push(v.toneMapping),y.push(v.numClippingPlanes),y.push(v.numClipIntersection),y.push(v.depthPacking)}function E(y,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const v=g[y.type];let P;if(v){const O=rn[v];P=of.clone(O.uniforms)}else P=y.uniforms;return P}function C(y,v){let P;for(let O=0,F=u.length;O<F;O++){const W=u[O];if(W.cacheKey===v){P=W,++P.usedTimes;break}}return P===void 0&&(P=new v0(n,v,y,s),u.push(P)),P}function w(y){if(--y.usedTimes===0){const v=u.indexOf(y);u[v]=u[u.length-1],u.pop(),y.destroy()}}function T(y){l.remove(y)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:C,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:R}}function b0(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function T0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Pl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Dl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h,f,p,g,_,m){let d=n[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},n[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=m),e++,d}function a(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function c(h,f){t.length>1&&t.sort(h||T0),i.length>1&&i.sort(f||Pl),r.length>1&&r.sort(f||Pl)}function u(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function w0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Dl,n.set(i,[o])):r>=s.length?(o=new Dl,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function A0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Pe};break;case"SpotLight":t={position:new N,direction:new N,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function R0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let C0=0;function P0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function D0(n){const e=new A0,t=R0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const r=new N,s=new nt,o=new nt;function a(c){let u=0,h=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,M=0,E=0,x=0,C=0,w=0,T=0;c.sort(P0);for(let y=0,v=c.length;y<v;y++){const P=c[y],O=P.color,F=P.intensity,W=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*F,h+=O.g*F,f+=O.b*F;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],F);T++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const J=P.shadow,H=t.get(P);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=Y,i.directionalShadowMatrix[p]=P.shadow.matrix,M++}i.directional[p]=X,p++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(O).multiplyScalar(F),X.distance=W,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[_]=X;const J=P.shadow;if(P.map&&(i.spotLightMap[C]=P.map,C++,J.updateMatrices(P),P.castShadow&&w++),i.spotLightMatrix[_]=J.matrix,P.castShadow){const H=t.get(P);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=Y,x++}_++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(O).multiplyScalar(F),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=X,m++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const J=P.shadow,H=t.get(P);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,H.shadowCameraNear=J.camera.near,H.shadowCameraFar=J.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=Y,i.pointShadowMatrix[g]=P.shadow.matrix,E++}i.point[g]=X,g++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(F),X.groundColor.copy(P.groundColor).multiplyScalar(F),i.hemi[d]=X,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=le.LTC_FLOAT_1,i.rectAreaLTC2=le.LTC_FLOAT_2):(i.rectAreaLTC1=le.LTC_HALF_1,i.rectAreaLTC2=le.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const R=i.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==d||R.numDirectionalShadows!==M||R.numPointShadows!==E||R.numSpotShadows!==x||R.numSpotMaps!==C||R.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=x+C-w,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=T,R.directionalLength=p,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=d,R.numDirectionalShadows=M,R.numPointShadows=E,R.numSpotShadows=x,R.numSpotMaps=C,R.numLightProbes=T,i.version=C0++)}function l(c,u){let h=0,f=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let d=0,M=c.length;d<M;d++){const E=c[d];if(E.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),h++}else if(E.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(E.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),f++}else if(E.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Ll(n){const e=new D0(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function L0(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Ll(n),e.set(r,[a])):s>=o.length?(a=new Ll(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class I0 extends Ki{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=fh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class U0 extends Ki{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const N0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,F0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function O0(n,e,t){let i=new ca;const r=new We,s=new We,o=new ft,a=new I0({depthPacking:dh}),l=new U0,c={},u=t.maxTextureSize,h={[Nn]:At,[At]:Nn,[Bt]:Bt},f=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:N0,fragmentShader:F0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new vt;g.setAttribute("position",new dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ze(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dc;let d=this.type;this.render=function(w,T,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const y=n.getRenderTarget(),v=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),O=n.state;O.setBlending(In),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const F=d!==_n&&this.type===_n,W=d===_n&&this.type!==_n;for(let Y=0,X=w.length;Y<X;Y++){const J=w[Y],H=J.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ce=H.getFrameExtents();if(r.multiply(ce),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ce.x),r.x=s.x*ce.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ce.y),r.y=s.y*ce.y,H.mapSize.y=s.y)),H.map===null||F===!0||W===!0){const xe=this.type!==_n?{minFilter:zt,magFilter:zt}:{};H.map!==null&&H.map.dispose(),H.map=new ti(r.x,r.y,xe),H.map.texture.name=J.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const he=H.getViewportCount();for(let xe=0;xe<he;xe++){const Ie=H.getViewport(xe);o.set(s.x*Ie.x,s.y*Ie.y,s.x*Ie.z,s.y*Ie.w),O.viewport(o),H.updateMatrices(J,xe),i=H.getFrustum(),x(T,R,H.camera,J,this.type)}H.isPointLightShadow!==!0&&this.type===_n&&M(H,R),H.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(y,v,P)};function M(w,T){const R=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ti(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(T,null,R,f,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(T,null,R,p,_,null)}function E(w,T,R,y){let v=null;const P=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)v=P;else if(v=R.isPointLight===!0?l:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const O=v.uuid,F=T.uuid;let W=c[O];W===void 0&&(W={},c[O]=W);let Y=W[F];Y===void 0&&(Y=v.clone(),W[F]=Y,T.addEventListener("dispose",C)),v=Y}if(v.visible=T.visible,v.wireframe=T.wireframe,y===_n?v.side=T.shadowSide!==null?T.shadowSide:T.side:v.side=T.shadowSide!==null?T.shadowSide:h[T.side],v.alphaMap=T.alphaMap,v.alphaTest=T.alphaTest,v.map=T.map,v.clipShadows=T.clipShadows,v.clippingPlanes=T.clippingPlanes,v.clipIntersection=T.clipIntersection,v.displacementMap=T.displacementMap,v.displacementScale=T.displacementScale,v.displacementBias=T.displacementBias,v.wireframeLinewidth=T.wireframeLinewidth,v.linewidth=T.linewidth,R.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const O=n.properties.get(v);O.light=R}return v}function x(w,T,R,y,v){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&v===_n)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);const F=e.update(w),W=w.material;if(Array.isArray(W)){const Y=F.groups;for(let X=0,J=Y.length;X<J;X++){const H=Y[X],ce=W[H.materialIndex];if(ce&&ce.visible){const he=E(w,ce,y,v);w.onBeforeShadow(n,w,T,R,F,he,H),n.renderBufferDirect(R,null,F,he,w,H),w.onAfterShadow(n,w,T,R,F,he,H)}}}else if(W.visible){const Y=E(w,W,y,v);w.onBeforeShadow(n,w,T,R,F,Y,null),n.renderBufferDirect(R,null,F,Y,w,null),w.onAfterShadow(n,w,T,R,F,Y,null)}}const O=w.children;for(let F=0,W=O.length;F<W;F++)x(O[F],T,R,y,v)}function C(w){w.target.removeEventListener("dispose",C);for(const R in c){const y=c[R],v=w.target.uuid;v in y&&(y[v].dispose(),delete y[v])}}}const B0={[no]:io,[ro]:ao,[so]:lo,[Ii]:oo,[io]:no,[ao]:ro,[lo]:so,[oo]:Ii};function z0(n,e){function t(){let L=!1;const fe=new ft;let V=null;const j=new ft(0,0,0,0);return{setMask:function(ge){V!==ge&&!L&&(n.colorMask(ge,ge,ge,ge),V=ge)},setLocked:function(ge){L=ge},setClear:function(ge,pe,ze,ht,Mt){Mt===!0&&(ge*=ht,pe*=ht,ze*=ht),fe.set(ge,pe,ze,ht),j.equals(fe)===!1&&(n.clearColor(ge,pe,ze,ht),j.copy(fe))},reset:function(){L=!1,V=null,j.set(-1,0,0,0)}}}function i(){let L=!1,fe=!1,V=null,j=null,ge=null;return{setReversed:function(pe){if(fe!==pe){const ze=e.get("EXT_clip_control");fe?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT);const ht=ge;ge=null,this.setClear(ht)}fe=pe},getReversed:function(){return fe},setTest:function(pe){pe?G(n.DEPTH_TEST):ee(n.DEPTH_TEST)},setMask:function(pe){V!==pe&&!L&&(n.depthMask(pe),V=pe)},setFunc:function(pe){if(fe&&(pe=B0[pe]),j!==pe){switch(pe){case no:n.depthFunc(n.NEVER);break;case io:n.depthFunc(n.ALWAYS);break;case ro:n.depthFunc(n.LESS);break;case Ii:n.depthFunc(n.LEQUAL);break;case so:n.depthFunc(n.EQUAL);break;case oo:n.depthFunc(n.GEQUAL);break;case ao:n.depthFunc(n.GREATER);break;case lo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}j=pe}},setLocked:function(pe){L=pe},setClear:function(pe){ge!==pe&&(fe&&(pe=1-pe),n.clearDepth(pe),ge=pe)},reset:function(){L=!1,V=null,j=null,ge=null,fe=!1}}}function r(){let L=!1,fe=null,V=null,j=null,ge=null,pe=null,ze=null,ht=null,Mt=null;return{setTest:function(et){L||(et?G(n.STENCIL_TEST):ee(n.STENCIL_TEST))},setMask:function(et){fe!==et&&!L&&(n.stencilMask(et),fe=et)},setFunc:function(et,Yt,cn){(V!==et||j!==Yt||ge!==cn)&&(n.stencilFunc(et,Yt,cn),V=et,j=Yt,ge=cn)},setOp:function(et,Yt,cn){(pe!==et||ze!==Yt||ht!==cn)&&(n.stencilOp(et,Yt,cn),pe=et,ze=Yt,ht=cn)},setLocked:function(et){L=et},setClear:function(et){Mt!==et&&(n.clearStencil(et),Mt=et)},reset:function(){L=!1,fe=null,V=null,j=null,ge=null,pe=null,ze=null,ht=null,Mt=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,M=null,E=null,x=null,C=null,w=null,T=new Pe(0,0,0),R=0,y=!1,v=null,P=null,O=null,F=null,W=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,J=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=J>=1):H.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=J>=2);let ce=null,he={};const xe=n.getParameter(n.SCISSOR_BOX),Ie=n.getParameter(n.VIEWPORT),qe=new ft().fromArray(xe),q=new ft().fromArray(Ie);function ie(L,fe,V,j){const ge=new Uint8Array(4),pe=n.createTexture();n.bindTexture(L,pe),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ze=0;ze<V;ze++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(fe,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(fe+ze,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return pe}const $={};$[n.TEXTURE_2D]=ie(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=ie(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=ie(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=ie(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),G(n.DEPTH_TEST),o.setFunc(Ii),Oe(!1),Be(Na),G(n.CULL_FACE),D(In);function G(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function ee(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function ue(L,fe){return h[L]!==fe?(n.bindFramebuffer(L,fe),h[L]=fe,L===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=fe),L===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=fe),!0):!1}function te(L,fe){let V=p,j=!1;if(L){V=f.get(fe),V===void 0&&(V=[],f.set(fe,V));const ge=L.textures;if(V.length!==ge.length||V[0]!==n.COLOR_ATTACHMENT0){for(let pe=0,ze=ge.length;pe<ze;pe++)V[pe]=n.COLOR_ATTACHMENT0+pe;V.length=ge.length,j=!0}}else V[0]!==n.BACK&&(V[0]=n.BACK,j=!0);j&&n.drawBuffers(V)}function se(L){return g!==L?(n.useProgram(L),g=L,!0):!1}const ae={[Kn]:n.FUNC_ADD,[ku]:n.FUNC_SUBTRACT,[Gu]:n.FUNC_REVERSE_SUBTRACT};ae[Hu]=n.MIN,ae[Vu]=n.MAX;const Ue={[Wu]:n.ZERO,[Xu]:n.ONE,[qu]:n.SRC_COLOR,[eo]:n.SRC_ALPHA,[Ju]:n.SRC_ALPHA_SATURATE,[Zu]:n.DST_COLOR,[Ku]:n.DST_ALPHA,[Yu]:n.ONE_MINUS_SRC_COLOR,[to]:n.ONE_MINUS_SRC_ALPHA,[ju]:n.ONE_MINUS_DST_COLOR,[$u]:n.ONE_MINUS_DST_ALPHA,[Qu]:n.CONSTANT_COLOR,[eh]:n.ONE_MINUS_CONSTANT_COLOR,[th]:n.CONSTANT_ALPHA,[nh]:n.ONE_MINUS_CONSTANT_ALPHA};function D(L,fe,V,j,ge,pe,ze,ht,Mt,et){if(L===In){_===!0&&(ee(n.BLEND),_=!1);return}if(_===!1&&(G(n.BLEND),_=!0),L!==zu){if(L!==m||et!==y){if((d!==Kn||x!==Kn)&&(n.blendEquation(n.FUNC_ADD),d=Kn,x=Kn),et)switch(L){case Ci:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fa:n.blendFunc(n.ONE,n.ONE);break;case Oa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ba:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ci:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fa:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Oa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ba:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}M=null,E=null,C=null,w=null,T.set(0,0,0),R=0,m=L,y=et}return}ge=ge||fe,pe=pe||V,ze=ze||j,(fe!==d||ge!==x)&&(n.blendEquationSeparate(ae[fe],ae[ge]),d=fe,x=ge),(V!==M||j!==E||pe!==C||ze!==w)&&(n.blendFuncSeparate(Ue[V],Ue[j],Ue[pe],Ue[ze]),M=V,E=j,C=pe,w=ze),(ht.equals(T)===!1||Mt!==R)&&(n.blendColor(ht.r,ht.g,ht.b,Mt),T.copy(ht),R=Mt),m=L,y=!1}function ct(L,fe){L.side===Bt?ee(n.CULL_FACE):G(n.CULL_FACE);let V=L.side===At;fe&&(V=!V),Oe(V),L.blending===Ci&&L.transparent===!1?D(In):D(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const j=L.stencilWrite;a.setTest(j),j&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Xe(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?G(n.SAMPLE_ALPHA_TO_COVERAGE):ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(L){v!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),v=L)}function Be(L){L!==Ou?(G(n.CULL_FACE),L!==P&&(L===Na?n.cullFace(n.BACK):L===Bu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ee(n.CULL_FACE),P=L}function Te(L){L!==O&&(X&&n.lineWidth(L),O=L)}function Xe(L,fe,V){L?(G(n.POLYGON_OFFSET_FILL),(F!==fe||W!==V)&&(n.polygonOffset(fe,V),F=fe,W=V)):ee(n.POLYGON_OFFSET_FILL)}function Ce(L){L?G(n.SCISSOR_TEST):ee(n.SCISSOR_TEST)}function A(L){L===void 0&&(L=n.TEXTURE0+Y-1),ce!==L&&(n.activeTexture(L),ce=L)}function S(L,fe,V){V===void 0&&(ce===null?V=n.TEXTURE0+Y-1:V=ce);let j=he[V];j===void 0&&(j={type:void 0,texture:void 0},he[V]=j),(j.type!==L||j.texture!==fe)&&(ce!==V&&(n.activeTexture(V),ce=V),n.bindTexture(L,fe||$[L]),j.type=L,j.texture=fe)}function B(){const L=he[ce];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Z(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function we(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ke(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ne(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Me(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Le(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ne(L){qe.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),qe.copy(L))}function ye(L){q.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),q.copy(L))}function Ye(L,fe){let V=c.get(fe);V===void 0&&(V=new WeakMap,c.set(fe,V));let j=V.get(L);j===void 0&&(j=n.getUniformBlockIndex(fe,L.name),V.set(L,j))}function He(L,fe){const j=c.get(fe).get(L);l.get(fe)!==j&&(n.uniformBlockBinding(fe,j,L.__bindingPointIndex),l.set(fe,j))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ce=null,he={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,M=null,E=null,x=null,C=null,w=null,T=new Pe(0,0,0),R=0,y=!1,v=null,P=null,O=null,F=null,W=null,qe.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:G,disable:ee,bindFramebuffer:ue,drawBuffers:te,useProgram:se,setBlending:D,setMaterial:ct,setFlipSided:Oe,setCullFace:Be,setLineWidth:Te,setPolygonOffset:Xe,setScissorTest:Ce,activeTexture:A,bindTexture:S,unbindTexture:B,compressedTexImage2D:Z,compressedTexImage3D:Q,texImage2D:Me,texImage3D:Le,updateUBOMapping:Ye,uniformBlockBinding:He,texStorage2D:Ke,texStorage3D:ne,texSubImage2D:K,texSubImage3D:we,compressedTexSubImage2D:de,compressedTexSubImage3D:ve,scissor:Ne,viewport:ye,reset:it}}function Il(n,e,t,i){const r=k0(i);switch(t){case yc:return n*e;case Ec:return n*e;case bc:return n*e*2;case na:return n*e/r.components*r.byteLength;case ia:return n*e/r.components*r.byteLength;case Tc:return n*e*2/r.components*r.byteLength;case ra:return n*e*2/r.components*r.byteLength;case Sc:return n*e*3/r.components*r.byteLength;case en:return n*e*4/r.components*r.byteLength;case sa:return n*e*4/r.components*r.byteLength;case $r:case Zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case jr:case Jr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case mo:case _o:return Math.max(n,16)*Math.max(e,8)/4;case po:case go:return Math.max(n,8)*Math.max(e,8)/2;case xo:case vo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case So:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Eo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case bo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case To:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case wo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Co:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Po:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Do:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Lo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Io:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Uo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Qr:case No:case Fo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case wc:case Oo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Bo:case zo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function k0(n){switch(n){case yn:case xc:return{byteLength:1,components:1};case dr:case vc:case Mr:return{byteLength:2,components:1};case ea:case ta:return{byteLength:2,components:4};case ei:case Qo:case on:return{byteLength:4,components:1};case Mc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function G0(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new We,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return p?new OffscreenCanvas(A,S):is("canvas")}function _(A,S,B){let Z=1;const Q=Ce(A);if((Q.width>B||Q.height>B)&&(Z=B/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const K=Math.floor(Z*Q.width),we=Math.floor(Z*Q.height);h===void 0&&(h=g(K,we));const de=S?g(K,we):h;return de.width=K,de.height=we,de.getContext("2d").drawImage(A,0,0,K,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+K+"x"+we+")."),de}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function m(A){return A.generateMipmaps}function d(A){n.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(A,S,B,Z,Q=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=S;if(S===n.RED&&(B===n.FLOAT&&(K=n.R32F),B===n.HALF_FLOAT&&(K=n.R16F),B===n.UNSIGNED_BYTE&&(K=n.R8)),S===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(K=n.R8UI),B===n.UNSIGNED_SHORT&&(K=n.R16UI),B===n.UNSIGNED_INT&&(K=n.R32UI),B===n.BYTE&&(K=n.R8I),B===n.SHORT&&(K=n.R16I),B===n.INT&&(K=n.R32I)),S===n.RG&&(B===n.FLOAT&&(K=n.RG32F),B===n.HALF_FLOAT&&(K=n.RG16F),B===n.UNSIGNED_BYTE&&(K=n.RG8)),S===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(K=n.RG8UI),B===n.UNSIGNED_SHORT&&(K=n.RG16UI),B===n.UNSIGNED_INT&&(K=n.RG32UI),B===n.BYTE&&(K=n.RG8I),B===n.SHORT&&(K=n.RG16I),B===n.INT&&(K=n.RG32I)),S===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(K=n.RGB8UI),B===n.UNSIGNED_SHORT&&(K=n.RGB16UI),B===n.UNSIGNED_INT&&(K=n.RGB32UI),B===n.BYTE&&(K=n.RGB8I),B===n.SHORT&&(K=n.RGB16I),B===n.INT&&(K=n.RGB32I)),S===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),B===n.UNSIGNED_INT&&(K=n.RGBA32UI),B===n.BYTE&&(K=n.RGBA8I),B===n.SHORT&&(K=n.RGBA16I),B===n.INT&&(K=n.RGBA32I)),S===n.RGB&&B===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),S===n.RGBA){const we=Q?ds:$e.getTransfer(Z);B===n.FLOAT&&(K=n.RGBA32F),B===n.HALF_FLOAT&&(K=n.RGBA16F),B===n.UNSIGNED_BYTE&&(K=we===tt?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function x(A,S){let B;return A?S===null||S===ei||S===Fi?B=n.DEPTH24_STENCIL8:S===on?B=n.DEPTH32F_STENCIL8:S===dr&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ei||S===Fi?B=n.DEPTH_COMPONENT24:S===on?B=n.DEPTH_COMPONENT32F:S===dr&&(B=n.DEPTH_COMPONENT16),B}function C(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==zt&&A.minFilter!==sn?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function w(A){const S=A.target;S.removeEventListener("dispose",w),R(S),S.isVideoTexture&&u.delete(S)}function T(A){const S=A.target;S.removeEventListener("dispose",T),v(S)}function R(A){const S=i.get(A);if(S.__webglInit===void 0)return;const B=A.source,Z=f.get(B);if(Z){const Q=Z[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&y(A),Object.keys(Z).length===0&&f.delete(B)}i.remove(A)}function y(A){const S=i.get(A);n.deleteTexture(S.__webglTexture);const B=A.source,Z=f.get(B);delete Z[S.__cacheKey],o.memory.textures--}function v(A){const S=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let Q=0;Q<S.__webglFramebuffer[Z].length;Q++)n.deleteFramebuffer(S.__webglFramebuffer[Z][Q]);else n.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)n.deleteFramebuffer(S.__webglFramebuffer[Z]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const B=A.textures;for(let Z=0,Q=B.length;Z<Q;Z++){const K=i.get(B[Z]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),o.memory.textures--),i.remove(B[Z])}i.remove(A)}let P=0;function O(){P=0}function F(){const A=P;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),P+=1,A}function W(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function Y(A,S){const B=i.get(A);if(A.isVideoTexture&&Te(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const Z=A.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(B,A,S);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+S)}function X(A,S){const B=i.get(A);if(A.version>0&&B.__version!==A.version){q(B,A,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+S)}function J(A,S){const B=i.get(A);if(A.version>0&&B.__version!==A.version){q(B,A,S);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+S)}function H(A,S){const B=i.get(A);if(A.version>0&&B.__version!==A.version){ie(B,A,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+S)}const ce={[ho]:n.REPEAT,[Zn]:n.CLAMP_TO_EDGE,[fo]:n.MIRRORED_REPEAT},he={[zt]:n.NEAREST,[hh]:n.NEAREST_MIPMAP_NEAREST,[Er]:n.NEAREST_MIPMAP_LINEAR,[sn]:n.LINEAR,[Ms]:n.LINEAR_MIPMAP_NEAREST,[jn]:n.LINEAR_MIPMAP_LINEAR},xe={[mh]:n.NEVER,[yh]:n.ALWAYS,[gh]:n.LESS,[Rc]:n.LEQUAL,[_h]:n.EQUAL,[Mh]:n.GEQUAL,[xh]:n.GREATER,[vh]:n.NOTEQUAL};function Ie(A,S){if(S.type===on&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===sn||S.magFilter===Ms||S.magFilter===Er||S.magFilter===jn||S.minFilter===sn||S.minFilter===Ms||S.minFilter===Er||S.minFilter===jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,ce[S.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ce[S.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ce[S.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,he[S.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,he[S.minFilter]),S.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,xe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===zt||S.minFilter!==Er&&S.minFilter!==jn||S.type===on&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function qe(A,S){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",w));const Z=S.source;let Q=f.get(Z);Q===void 0&&(Q={},f.set(Z,Q));const K=W(S);if(K!==A.__cacheKey){Q[K]===void 0&&(Q[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[K].usedTimes++;const we=Q[A.__cacheKey];we!==void 0&&(Q[A.__cacheKey].usedTimes--,we.usedTimes===0&&y(S)),A.__cacheKey=K,A.__webglTexture=Q[K].texture}return B}function q(A,S,B){let Z=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=n.TEXTURE_3D);const Q=qe(A,S),K=S.source;t.bindTexture(Z,A.__webglTexture,n.TEXTURE0+B);const we=i.get(K);if(K.version!==we.__version||Q===!0){t.activeTexture(n.TEXTURE0+B);const de=$e.getPrimaries($e.workingColorSpace),ve=S.colorSpace===Ln?null:$e.getPrimaries(S.colorSpace),Ke=S.colorSpace===Ln||de===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let ne=_(S.image,!1,r.maxTextureSize);ne=Xe(S,ne);const Me=s.convert(S.format,S.colorSpace),Le=s.convert(S.type);let Ne=E(S.internalFormat,Me,Le,S.colorSpace,S.isVideoTexture);Ie(Z,S);let ye;const Ye=S.mipmaps,He=S.isVideoTexture!==!0,it=we.__version===void 0||Q===!0,L=K.dataReady,fe=C(S,ne);if(S.isDepthTexture)Ne=x(S.format===Oi,S.type),it&&(He?t.texStorage2D(n.TEXTURE_2D,1,Ne,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Ne,ne.width,ne.height,0,Me,Le,null));else if(S.isDataTexture)if(Ye.length>0){He&&it&&t.texStorage2D(n.TEXTURE_2D,fe,Ne,Ye[0].width,Ye[0].height);for(let V=0,j=Ye.length;V<j;V++)ye=Ye[V],He?L&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,ye.width,ye.height,Me,Le,ye.data):t.texImage2D(n.TEXTURE_2D,V,Ne,ye.width,ye.height,0,Me,Le,ye.data);S.generateMipmaps=!1}else He?(it&&t.texStorage2D(n.TEXTURE_2D,fe,Ne,ne.width,ne.height),L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne.width,ne.height,Me,Le,ne.data)):t.texImage2D(n.TEXTURE_2D,0,Ne,ne.width,ne.height,0,Me,Le,ne.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){He&&it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,Ne,Ye[0].width,Ye[0].height,ne.depth);for(let V=0,j=Ye.length;V<j;V++)if(ye=Ye[V],S.format!==en)if(Me!==null)if(He){if(L)if(S.layerUpdates.size>0){const ge=Il(ye.width,ye.height,S.format,S.type);for(const pe of S.layerUpdates){const ze=ye.data.subarray(pe*ge/ye.data.BYTES_PER_ELEMENT,(pe+1)*ge/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,pe,ye.width,ye.height,1,Me,ze)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,ye.width,ye.height,ne.depth,Me,ye.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,V,Ne,ye.width,ye.height,ne.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,ye.width,ye.height,ne.depth,Me,Le,ye.data):t.texImage3D(n.TEXTURE_2D_ARRAY,V,Ne,ye.width,ye.height,ne.depth,0,Me,Le,ye.data)}else{He&&it&&t.texStorage2D(n.TEXTURE_2D,fe,Ne,Ye[0].width,Ye[0].height);for(let V=0,j=Ye.length;V<j;V++)ye=Ye[V],S.format!==en?Me!==null?He?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,V,0,0,ye.width,ye.height,Me,ye.data):t.compressedTexImage2D(n.TEXTURE_2D,V,Ne,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?L&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,ye.width,ye.height,Me,Le,ye.data):t.texImage2D(n.TEXTURE_2D,V,Ne,ye.width,ye.height,0,Me,Le,ye.data)}else if(S.isDataArrayTexture)if(He){if(it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,Ne,ne.width,ne.height,ne.depth),L)if(S.layerUpdates.size>0){const V=Il(ne.width,ne.height,S.format,S.type);for(const j of S.layerUpdates){const ge=ne.data.subarray(j*V/ne.data.BYTES_PER_ELEMENT,(j+1)*V/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,ne.width,ne.height,1,Me,Le,ge)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,Me,Le,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ne,ne.width,ne.height,ne.depth,0,Me,Le,ne.data);else if(S.isData3DTexture)He?(it&&t.texStorage3D(n.TEXTURE_3D,fe,Ne,ne.width,ne.height,ne.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,Me,Le,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Ne,ne.width,ne.height,ne.depth,0,Me,Le,ne.data);else if(S.isFramebufferTexture){if(it)if(He)t.texStorage2D(n.TEXTURE_2D,fe,Ne,ne.width,ne.height);else{let V=ne.width,j=ne.height;for(let ge=0;ge<fe;ge++)t.texImage2D(n.TEXTURE_2D,ge,Ne,V,j,0,Me,Le,null),V>>=1,j>>=1}}else if(Ye.length>0){if(He&&it){const V=Ce(Ye[0]);t.texStorage2D(n.TEXTURE_2D,fe,Ne,V.width,V.height)}for(let V=0,j=Ye.length;V<j;V++)ye=Ye[V],He?L&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,Me,Le,ye):t.texImage2D(n.TEXTURE_2D,V,Ne,Me,Le,ye);S.generateMipmaps=!1}else if(He){if(it){const V=Ce(ne);t.texStorage2D(n.TEXTURE_2D,fe,Ne,V.width,V.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Me,Le,ne)}else t.texImage2D(n.TEXTURE_2D,0,Ne,Me,Le,ne);m(S)&&d(Z),we.__version=K.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function ie(A,S,B){if(S.image.length!==6)return;const Z=qe(A,S),Q=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+B);const K=i.get(Q);if(Q.version!==K.__version||Z===!0){t.activeTexture(n.TEXTURE0+B);const we=$e.getPrimaries($e.workingColorSpace),de=S.colorSpace===Ln?null:$e.getPrimaries(S.colorSpace),ve=S.colorSpace===Ln||we===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Ke=S.isCompressedTexture||S.image[0].isCompressedTexture,ne=S.image[0]&&S.image[0].isDataTexture,Me=[];for(let j=0;j<6;j++)!Ke&&!ne?Me[j]=_(S.image[j],!0,r.maxCubemapSize):Me[j]=ne?S.image[j].image:S.image[j],Me[j]=Xe(S,Me[j]);const Le=Me[0],Ne=s.convert(S.format,S.colorSpace),ye=s.convert(S.type),Ye=E(S.internalFormat,Ne,ye,S.colorSpace),He=S.isVideoTexture!==!0,it=K.__version===void 0||Z===!0,L=Q.dataReady;let fe=C(S,Le);Ie(n.TEXTURE_CUBE_MAP,S);let V;if(Ke){He&&it&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Ye,Le.width,Le.height);for(let j=0;j<6;j++){V=Me[j].mipmaps;for(let ge=0;ge<V.length;ge++){const pe=V[ge];S.format!==en?Ne!==null?He?L&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ge,0,0,pe.width,pe.height,Ne,pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ge,Ye,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ge,0,0,pe.width,pe.height,Ne,ye,pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ge,Ye,pe.width,pe.height,0,Ne,ye,pe.data)}}}else{if(V=S.mipmaps,He&&it){V.length>0&&fe++;const j=Ce(Me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Ye,j.width,j.height)}for(let j=0;j<6;j++)if(ne){He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Me[j].width,Me[j].height,Ne,ye,Me[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ye,Me[j].width,Me[j].height,0,Ne,ye,Me[j].data);for(let ge=0;ge<V.length;ge++){const ze=V[ge].image[j].image;He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ge+1,0,0,ze.width,ze.height,Ne,ye,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ge+1,Ye,ze.width,ze.height,0,Ne,ye,ze.data)}}else{He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ne,ye,Me[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ye,Ne,ye,Me[j]);for(let ge=0;ge<V.length;ge++){const pe=V[ge];He?L&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ge+1,0,0,Ne,ye,pe.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ge+1,Ye,Ne,ye,pe.image[j])}}}m(S)&&d(n.TEXTURE_CUBE_MAP),K.__version=Q.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function $(A,S,B,Z,Q,K){const we=s.convert(B.format,B.colorSpace),de=s.convert(B.type),ve=E(B.internalFormat,we,de,B.colorSpace),Ke=i.get(S),ne=i.get(B);if(ne.__renderTarget=S,!Ke.__hasExternalTextures){const Me=Math.max(1,S.width>>K),Le=Math.max(1,S.height>>K);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,K,ve,Me,Le,S.depth,0,we,de,null):t.texImage2D(Q,K,ve,Me,Le,0,we,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Be(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Q,ne.__webglTexture,0,Oe(S)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,Q,ne.__webglTexture,K),t.bindFramebuffer(n.FRAMEBUFFER,null)}function G(A,S,B){if(n.bindRenderbuffer(n.RENDERBUFFER,A),S.depthBuffer){const Z=S.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,K=x(S.stencilBuffer,Q),we=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=Oe(S);Be(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,K,S.width,S.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,de,K,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,K,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,we,n.RENDERBUFFER,A)}else{const Z=S.textures;for(let Q=0;Q<Z.length;Q++){const K=Z[Q],we=s.convert(K.format,K.colorSpace),de=s.convert(K.type),ve=E(K.internalFormat,we,de,K.colorSpace),Ke=Oe(S);B&&Be(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ke,ve,S.width,S.height):Be(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ke,ve,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,ve,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ee(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(S.depthTexture);Z.__renderTarget=S,(!Z.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y(S.depthTexture,0);const Q=Z.__webglTexture,K=Oe(S);if(S.depthTexture.format===Pi)Be(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(S.depthTexture.format===Oi)Be(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function ue(A){const S=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const Z=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=Z}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ee(S.__webglFramebuffer,A)}else if(B){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=n.createRenderbuffer(),G(S.__webglDepthbuffer[Z],A,!1);else{const Q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,K)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),G(S.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,Q)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function te(A,S,B){const Z=i.get(A);S!==void 0&&$(Z.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&ue(A)}function se(A){const S=A.texture,B=i.get(A),Z=i.get(S);A.addEventListener("dispose",T);const Q=A.textures,K=A.isWebGLCubeRenderTarget===!0,we=Q.length>1;if(we||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=S.version,o.memory.textures++),K){B.__webglFramebuffer=[];for(let de=0;de<6;de++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[de]=[];for(let ve=0;ve<S.mipmaps.length;ve++)B.__webglFramebuffer[de][ve]=n.createFramebuffer()}else B.__webglFramebuffer[de]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let de=0;de<S.mipmaps.length;de++)B.__webglFramebuffer[de]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(we)for(let de=0,ve=Q.length;de<ve;de++){const Ke=i.get(Q[de]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&Be(A)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let de=0;de<Q.length;de++){const ve=Q[de];B.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[de]);const Ke=s.convert(ve.format,ve.colorSpace),ne=s.convert(ve.type),Me=E(ve.internalFormat,Ke,ne,ve.colorSpace,A.isXRRenderTarget===!0),Le=Oe(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,Me,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,B.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),G(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,S);for(let de=0;de<6;de++)if(S.mipmaps&&S.mipmaps.length>0)for(let ve=0;ve<S.mipmaps.length;ve++)$(B.__webglFramebuffer[de][ve],A,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,ve);else $(B.__webglFramebuffer[de],A,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(S)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let de=0,ve=Q.length;de<ve;de++){const Ke=Q[de],ne=i.get(Ke);t.bindTexture(n.TEXTURE_2D,ne.__webglTexture),Ie(n.TEXTURE_2D,Ke),$(B.__webglFramebuffer,A,Ke,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,0),m(Ke)&&d(n.TEXTURE_2D)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(de=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,Z.__webglTexture),Ie(de,S),S.mipmaps&&S.mipmaps.length>0)for(let ve=0;ve<S.mipmaps.length;ve++)$(B.__webglFramebuffer[ve],A,S,n.COLOR_ATTACHMENT0,de,ve);else $(B.__webglFramebuffer,A,S,n.COLOR_ATTACHMENT0,de,0);m(S)&&d(de),t.unbindTexture()}A.depthBuffer&&ue(A)}function ae(A){const S=A.textures;for(let B=0,Z=S.length;B<Z;B++){const Q=S[B];if(m(Q)){const K=M(A),we=i.get(Q).__webglTexture;t.bindTexture(K,we),d(K),t.unbindTexture()}}}const Ue=[],D=[];function ct(A){if(A.samples>0){if(Be(A)===!1){const S=A.textures,B=A.width,Z=A.height;let Q=n.COLOR_BUFFER_BIT;const K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,we=i.get(A),de=S.length>1;if(de)for(let ve=0;ve<S.length;ve++)t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let ve=0;ve<S.length;ve++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),de){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,we.__webglColorRenderbuffer[ve]);const Ke=i.get(S[ve]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ke,0)}n.blitFramebuffer(0,0,B,Z,0,0,B,Z,Q,n.NEAREST),l===!0&&(Ue.length=0,D.length=0,Ue.push(n.COLOR_ATTACHMENT0+ve),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ue.push(K),D.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let ve=0;ve<S.length;ve++){t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,we.__webglColorRenderbuffer[ve]);const Ke=i.get(S[ve]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,Ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function Oe(A){return Math.min(r.maxSamples,A.samples)}function Be(A){const S=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Te(A){const S=o.render.frame;u.get(A)!==S&&(u.set(A,S),A.update())}function Xe(A,S){const B=A.colorSpace,Z=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Vi&&B!==Ln&&($e.getTransfer(B)===tt?(Z!==en||Q!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function Ce(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=X,this.setTexture3D=J,this.setTextureCube=H,this.rebindTextures=te,this.setupRenderTarget=se,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=ct,this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=$,this.useMultisampledRTT=Be}function H0(n,e){function t(i,r=Ln){let s;const o=$e.getTransfer(r);if(i===yn)return n.UNSIGNED_BYTE;if(i===ea)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ta)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===xc)return n.BYTE;if(i===vc)return n.SHORT;if(i===dr)return n.UNSIGNED_SHORT;if(i===Qo)return n.INT;if(i===ei)return n.UNSIGNED_INT;if(i===on)return n.FLOAT;if(i===Mr)return n.HALF_FLOAT;if(i===yc)return n.ALPHA;if(i===Sc)return n.RGB;if(i===en)return n.RGBA;if(i===Ec)return n.LUMINANCE;if(i===bc)return n.LUMINANCE_ALPHA;if(i===Pi)return n.DEPTH_COMPONENT;if(i===Oi)return n.DEPTH_STENCIL;if(i===na)return n.RED;if(i===ia)return n.RED_INTEGER;if(i===Tc)return n.RG;if(i===ra)return n.RG_INTEGER;if(i===sa)return n.RGBA_INTEGER;if(i===$r||i===Zr||i===jr||i===Jr)if(o===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===$r)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===$r)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Jr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===po||i===mo||i===go||i===_o)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===po)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===mo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===go)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===_o)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xo||i===vo||i===Mo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===xo||i===vo)return o===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Mo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===yo||i===So||i===Eo||i===bo||i===To||i===wo||i===Ao||i===Ro||i===Co||i===Po||i===Do||i===Lo||i===Io||i===Uo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===yo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===So)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Eo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===bo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===To)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===wo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ao)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ro)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Co)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Po)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Do)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Lo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Io)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Uo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Qr||i===No||i===Fo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Qr)return o===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===No)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Fo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wc||i===Oo||i===Bo||i===zo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Qr)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Oo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Bo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===zo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class V0 extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class an extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const W0={type:"move"};class Ys{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new an,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new an,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new an,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(W0)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new an;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const X0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,q0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Y0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new Rt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Fn({vertexShader:X0,fragmentShader:q0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new zi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class K0 extends Wi{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null;const _=new Y0,m=t.getContextAttributes();let d=null,M=null;const E=[],x=[],C=new We;let w=null;const T=new Vt;T.viewport=new ft;const R=new Vt;R.viewport=new ft;const y=[T,R],v=new V0;let P=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ie=E[q];return ie===void 0&&(ie=new Ys,E[q]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(q){let ie=E[q];return ie===void 0&&(ie=new Ys,E[q]=ie),ie.getGripSpace()},this.getHand=function(q){let ie=E[q];return ie===void 0&&(ie=new Ys,E[q]=ie),ie.getHandSpace()};function F(q){const ie=x.indexOf(q.inputSource);if(ie===-1)return;const $=E[ie];$!==void 0&&($.update(q.inputSource,q.frame,c||o),$.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",Y);for(let q=0;q<E.length;q++){const ie=x[q];ie!==null&&(x[q]=null,E[q].disconnect(ie))}P=null,O=null,_.reset(),e.setRenderTarget(d),p=null,f=null,h=null,r=null,M=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",W),r.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){const ie={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new ti(p.framebufferWidth,p.framebufferHeight,{format:en,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ie=null,$=null,G=null;m.depth&&(G=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=m.stencil?Oi:Pi,$=m.stencil?Fi:ei);const ee={colorFormat:t.RGBA8,depthFormat:G,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(ee),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new ti(f.textureWidth,f.textureHeight,{format:en,type:yn,depthTexture:new kc(f.textureWidth,f.textureHeight,$,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),qe.setContext(r),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(q){for(let ie=0;ie<q.removed.length;ie++){const $=q.removed[ie],G=x.indexOf($);G>=0&&(x[G]=null,E[G].disconnect($))}for(let ie=0;ie<q.added.length;ie++){const $=q.added[ie];let G=x.indexOf($);if(G===-1){for(let ue=0;ue<E.length;ue++)if(ue>=x.length){x.push($),G=ue;break}else if(x[ue]===null){x[ue]=$,G=ue;break}if(G===-1)break}const ee=E[G];ee&&ee.connect($)}}const X=new N,J=new N;function H(q,ie,$){X.setFromMatrixPosition(ie.matrixWorld),J.setFromMatrixPosition($.matrixWorld);const G=X.distanceTo(J),ee=ie.projectionMatrix.elements,ue=$.projectionMatrix.elements,te=ee[14]/(ee[10]-1),se=ee[14]/(ee[10]+1),ae=(ee[9]+1)/ee[5],Ue=(ee[9]-1)/ee[5],D=(ee[8]-1)/ee[0],ct=(ue[8]+1)/ue[0],Oe=te*D,Be=te*ct,Te=G/(-D+ct),Xe=Te*-D;if(ie.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Xe),q.translateZ(Te),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ee[10]===-1)q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Ce=te+Te,A=se+Te,S=Oe-Xe,B=Be+(G-Xe),Z=ae*se/A*Ce,Q=Ue*se/A*Ce;q.projectionMatrix.makePerspective(S,B,Z,Q,Ce,A),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ce(q,ie){ie===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ie.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let ie=q.near,$=q.far;_.texture!==null&&(_.depthNear>0&&(ie=_.depthNear),_.depthFar>0&&($=_.depthFar)),v.near=R.near=T.near=ie,v.far=R.far=T.far=$,(P!==v.near||O!==v.far)&&(r.updateRenderState({depthNear:v.near,depthFar:v.far}),P=v.near,O=v.far),T.layers.mask=q.layers.mask|2,R.layers.mask=q.layers.mask|4,v.layers.mask=T.layers.mask|R.layers.mask;const G=q.parent,ee=v.cameras;ce(v,G);for(let ue=0;ue<ee.length;ue++)ce(ee[ue],G);ee.length===2?H(v,T,R):v.projectionMatrix.copy(T.projectionMatrix),he(q,v,G)};function he(q,ie,$){$===null?q.matrix.copy(ie.matrixWorld):(q.matrix.copy($.matrixWorld),q.matrix.invert(),q.matrix.multiply(ie.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=pr*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let xe=null;function Ie(q,ie){if(u=ie.getViewerPose(c||o),g=ie,u!==null){const $=u.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let G=!1;$.length!==v.cameras.length&&(v.cameras.length=0,G=!0);for(let ue=0;ue<$.length;ue++){const te=$[ue];let se=null;if(p!==null)se=p.getViewport(te);else{const Ue=h.getViewSubImage(f,te);se=Ue.viewport,ue===0&&(e.setRenderTargetTextures(M,Ue.colorTexture,f.ignoreDepthValues?void 0:Ue.depthStencilTexture),e.setRenderTarget(M))}let ae=y[ue];ae===void 0&&(ae=new Vt,ae.layers.enable(ue),ae.viewport=new ft,y[ue]=ae),ae.matrix.fromArray(te.transform.matrix),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.projectionMatrix.fromArray(te.projectionMatrix),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert(),ae.viewport.set(se.x,se.y,se.width,se.height),ue===0&&(v.matrix.copy(ae.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),G===!0&&v.cameras.push(ae)}const ee=r.enabledFeatures;if(ee&&ee.includes("depth-sensing")){const ue=h.getDepthInformation($[0]);ue&&ue.isValid&&ue.texture&&_.init(e,ue,r.renderState)}}for(let $=0;$<E.length;$++){const G=x[$],ee=E[$];G!==null&&ee!==void 0&&ee.update(G,ie,c||o)}xe&&xe(q,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const qe=new Bc;qe.setAnimationLoop(Ie),this.setAnimationLoop=function(q){xe=q},this.dispose=function(){}}}const Wn=new tn,$0=new nt;function Z0(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Nc(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,M,E,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,M,E):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===At&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===At&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const M=e.get(d),E=M.envMap,x=M.envMapRotation;E&&(m.envMap.value=E,Wn.copy(x),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),m.envMapRotation.value.setFromMatrix4($0.makeRotationFromEuler(Wn)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,M,E){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*M,m.scale.value=E*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,M){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===At&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const M=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function j0(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){const x=E.program;i.uniformBlockBinding(M,x)}function c(M,E){let x=r[M.id];x===void 0&&(g(M),x=u(M),r[M.id]=x,M.addEventListener("dispose",m));const C=E.program;i.updateUBOMapping(M,C);const w=e.render.frame;s[M.id]!==w&&(f(M),s[M.id]=w)}function u(M){const E=h();M.__bindingPointIndex=E;const x=n.createBuffer(),C=M.__size,w=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,C,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,x),x}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const E=r[M.id],x=M.uniforms,C=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let w=0,T=x.length;w<T;w++){const R=Array.isArray(x[w])?x[w]:[x[w]];for(let y=0,v=R.length;y<v;y++){const P=R[y];if(p(P,w,y,C)===!0){const O=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let W=0;for(let Y=0;Y<F.length;Y++){const X=F[Y],J=_(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,O+W,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,W),W+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(M,E,x,C){const w=M.value,T=E+"_"+x;if(C[T]===void 0)return typeof w=="number"||typeof w=="boolean"?C[T]=w:C[T]=w.clone(),!0;{const R=C[T];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return C[T]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function g(M){const E=M.uniforms;let x=0;const C=16;for(let T=0,R=E.length;T<R;T++){const y=Array.isArray(E[T])?E[T]:[E[T]];for(let v=0,P=y.length;v<P;v++){const O=y[v],F=Array.isArray(O.value)?O.value:[O.value];for(let W=0,Y=F.length;W<Y;W++){const X=F[W],J=_(X),H=x%C,ce=H%J.boundary,he=H+ce;x+=ce,he!==0&&C-he<J.storage&&(x+=C-he),O.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=J.storage}}}const w=x%C;return w>0&&(x+=C-w),M.__size=x,M.__cache={},this}function _(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function m(M){const E=M.target;E.removeEventListener("dispose",m);const x=o.indexOf(E.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function d(){for(const M in r)n.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class J0{constructor(e={}){const{canvas:t=zh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const M=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this.toneMapping=Un,this.toneMappingExposure=1;const x=this;let C=!1,w=0,T=0,R=null,y=-1,v=null;const P=new ft,O=new ft;let F=null;const W=new Pe(0);let Y=0,X=t.width,J=t.height,H=1,ce=null,he=null;const xe=new ft(0,0,X,J),Ie=new ft(0,0,X,J);let qe=!1;const q=new ca;let ie=!1,$=!1;const G=new nt,ee=new nt,ue=new N,te=new ft,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ae=!1;function Ue(){return R===null?H:1}let D=i;function ct(b,I){return t.getContext(b,I)}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jo}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",ge,!1),t.addEventListener("webglcontextcreationerror",pe,!1),D===null){const I="webgl2";if(D=ct(I,b),D===null)throw ct(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Oe,Be,Te,Xe,Ce,A,S,B,Z,Q,K,we,de,ve,Ke,ne,Me,Le,Ne,ye,Ye,He,it,L;function fe(){Oe=new im(D),Oe.init(),He=new H0(D,Oe),Be=new jp(D,Oe,e,He),Te=new z0(D,Oe),Be.reverseDepthBuffer&&f&&Te.buffers.depth.setReversed(!0),Xe=new om(D),Ce=new b0,A=new G0(D,Oe,Te,Ce,Be,He,Xe),S=new Qp(x),B=new nm(x),Z=new df(D),it=new $p(D,Z),Q=new rm(D,Z,Xe,it),K=new lm(D,Q,Z,Xe),Ne=new am(D,Be,A),ne=new Jp(Ce),we=new E0(x,S,B,Oe,Be,it,ne),de=new Z0(x,Ce),ve=new w0,Ke=new L0(Oe),Le=new Kp(x,S,B,Te,K,p,l),Me=new O0(x,K,Be),L=new j0(D,Xe,Be,Te),ye=new Zp(D,Oe,Xe),Ye=new sm(D,Oe,Xe),Xe.programs=we.programs,x.capabilities=Be,x.extensions=Oe,x.properties=Ce,x.renderLists=ve,x.shadowMap=Me,x.state=Te,x.info=Xe}fe();const V=new K0(x,D);this.xr=V,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=Oe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Oe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(b){b!==void 0&&(H=b,this.setSize(X,J,!1))},this.getSize=function(b){return b.set(X,J)},this.setSize=function(b,I,z=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=b,J=I,t.width=Math.floor(b*H),t.height=Math.floor(I*H),z===!0&&(t.style.width=b+"px",t.style.height=I+"px"),this.setViewport(0,0,b,I)},this.getDrawingBufferSize=function(b){return b.set(X*H,J*H).floor()},this.setDrawingBufferSize=function(b,I,z){X=b,J=I,H=z,t.width=Math.floor(b*z),t.height=Math.floor(I*z),this.setViewport(0,0,b,I)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(xe)},this.setViewport=function(b,I,z,k){b.isVector4?xe.set(b.x,b.y,b.z,b.w):xe.set(b,I,z,k),Te.viewport(P.copy(xe).multiplyScalar(H).round())},this.getScissor=function(b){return b.copy(Ie)},this.setScissor=function(b,I,z,k){b.isVector4?Ie.set(b.x,b.y,b.z,b.w):Ie.set(b,I,z,k),Te.scissor(O.copy(Ie).multiplyScalar(H).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(b){Te.setScissorTest(qe=b)},this.setOpaqueSort=function(b){ce=b},this.setTransparentSort=function(b){he=b},this.getClearColor=function(b){return b.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor.apply(Le,arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha.apply(Le,arguments)},this.clear=function(b=!0,I=!0,z=!0){let k=0;if(b){let U=!1;if(R!==null){const re=R.texture.format;U=re===sa||re===ra||re===ia}if(U){const re=R.texture.type,me=re===yn||re===ei||re===dr||re===Fi||re===ea||re===ta,Se=Le.getClearColor(),Ee=Le.getClearAlpha(),Fe=Se.r,ke=Se.g,be=Se.b;me?(g[0]=Fe,g[1]=ke,g[2]=be,g[3]=Ee,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Fe,_[1]=ke,_[2]=be,_[3]=Ee,D.clearBufferiv(D.COLOR,0,_))}else k|=D.COLOR_BUFFER_BIT}I&&(k|=D.DEPTH_BUFFER_BIT),z&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",ge,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),ve.dispose(),Ke.dispose(),Ce.dispose(),S.dispose(),B.dispose(),K.dispose(),it.dispose(),L.dispose(),we.dispose(),V.dispose(),V.removeEventListener("sessionstart",Ta),V.removeEventListener("sessionend",wa),Bn.stop()};function j(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ge(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const b=Xe.autoReset,I=Me.enabled,z=Me.autoUpdate,k=Me.needsUpdate,U=Me.type;fe(),Xe.autoReset=b,Me.enabled=I,Me.autoUpdate=z,Me.needsUpdate=k,Me.type=U}function pe(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ze(b){const I=b.target;I.removeEventListener("dispose",ze),ht(I)}function ht(b){Mt(b),Ce.remove(b)}function Mt(b){const I=Ce.get(b).programs;I!==void 0&&(I.forEach(function(z){we.releaseProgram(z)}),b.isShaderMaterial&&we.releaseShaderCache(b))}this.renderBufferDirect=function(b,I,z,k,U,re){I===null&&(I=se);const me=U.isMesh&&U.matrixWorld.determinant()<0,Se=gu(b,I,z,k,U);Te.setMaterial(k,me);let Ee=z.index,Fe=1;if(k.wireframe===!0){if(Ee=Q.getWireframeAttribute(z),Ee===void 0)return;Fe=2}const ke=z.drawRange,be=z.attributes.position;let je=ke.start*Fe,rt=(ke.start+ke.count)*Fe;re!==null&&(je=Math.max(je,re.start*Fe),rt=Math.min(rt,(re.start+re.count)*Fe)),Ee!==null?(je=Math.max(je,0),rt=Math.min(rt,Ee.count)):be!=null&&(je=Math.max(je,0),rt=Math.min(rt,be.count));const ot=rt-je;if(ot<0||ot===1/0)return;it.setup(U,k,Se,z,Ee);let Pt,Je=ye;if(Ee!==null&&(Pt=Z.get(Ee),Je=Ye,Je.setIndex(Pt)),U.isMesh)k.wireframe===!0?(Te.setLineWidth(k.wireframeLinewidth*Ue()),Je.setMode(D.LINES)):Je.setMode(D.TRIANGLES);else if(U.isLine){let Ae=k.linewidth;Ae===void 0&&(Ae=1),Te.setLineWidth(Ae*Ue()),U.isLineSegments?Je.setMode(D.LINES):U.isLineLoop?Je.setMode(D.LINE_LOOP):Je.setMode(D.LINE_STRIP)}else U.isPoints?Je.setMode(D.POINTS):U.isSprite&&Je.setMode(D.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Je.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Oe.get("WEBGL_multi_draw"))Je.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ae=U._multiDrawStarts,un=U._multiDrawCounts,Qe=U._multiDrawCount,Kt=Ee?Z.get(Ee).bytesPerElement:1,oi=Ce.get(k).currentProgram.getUniforms();for(let Ut=0;Ut<Qe;Ut++)oi.setValue(D,"_gl_DrawID",Ut),Je.render(Ae[Ut]/Kt,un[Ut])}else if(U.isInstancedMesh)Je.renderInstances(je,ot,U.count);else if(z.isInstancedBufferGeometry){const Ae=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,un=Math.min(z.instanceCount,Ae);Je.renderInstances(je,ot,un)}else Je.render(je,ot)};function et(b,I,z){b.transparent===!0&&b.side===Bt&&b.forceSinglePass===!1?(b.side=At,b.needsUpdate=!0,Sr(b,I,z),b.side=Nn,b.needsUpdate=!0,Sr(b,I,z),b.side=Bt):Sr(b,I,z)}this.compile=function(b,I,z=null){z===null&&(z=b),d=Ke.get(z),d.init(I),E.push(d),z.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),b!==z&&b.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),d.setupLights();const k=new Set;return b.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const re=U.material;if(re)if(Array.isArray(re))for(let me=0;me<re.length;me++){const Se=re[me];et(Se,z,U),k.add(Se)}else et(re,z,U),k.add(re)}),E.pop(),d=null,k},this.compileAsync=function(b,I,z=null){const k=this.compile(b,I,z);return new Promise(U=>{function re(){if(k.forEach(function(me){Ce.get(me).currentProgram.isReady()&&k.delete(me)}),k.size===0){U(b);return}setTimeout(re,10)}Oe.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let Yt=null;function cn(b){Yt&&Yt(b)}function Ta(){Bn.stop()}function wa(){Bn.start()}const Bn=new Bc;Bn.setAnimationLoop(cn),typeof self<"u"&&Bn.setContext(self),this.setAnimationLoop=function(b){Yt=b,V.setAnimationLoop(b),b===null?Bn.stop():Bn.start()},V.addEventListener("sessionstart",Ta),V.addEventListener("sessionend",wa),this.render=function(b,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(I),I=V.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,I,R),d=Ke.get(b,E.length),d.init(I),E.push(d),ee.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(ee),$=this.localClippingEnabled,ie=ne.init(this.clippingPlanes,$),m=ve.get(b,M.length),m.init(),M.push(m),V.enabled===!0&&V.isPresenting===!0){const re=x.xr.getDepthSensingMesh();re!==null&&vs(re,I,-1/0,x.sortObjects)}vs(b,I,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ce,he),ae=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,ae&&Le.addToRenderList(m,b),this.info.render.frame++,ie===!0&&ne.beginShadows();const z=d.state.shadowsArray;Me.render(z,b,I),ie===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=m.opaque,U=m.transmissive;if(d.setupLights(),I.isArrayCamera){const re=I.cameras;if(U.length>0)for(let me=0,Se=re.length;me<Se;me++){const Ee=re[me];Ra(k,U,b,Ee)}ae&&Le.render(b);for(let me=0,Se=re.length;me<Se;me++){const Ee=re[me];Aa(m,b,Ee,Ee.viewport)}}else U.length>0&&Ra(k,U,b,I),ae&&Le.render(b),Aa(m,b,I);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(x,b,I),it.resetDefaultState(),y=-1,v=null,E.pop(),E.length>0?(d=E[E.length-1],ie===!0&&ne.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function vs(b,I,z,k){if(b.visible===!1)return;if(b.layers.test(I.layers)){if(b.isGroup)z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(I);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||q.intersectsSprite(b)){k&&te.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ee);const me=K.update(b),Se=b.material;Se.visible&&m.push(b,me,Se,z,te.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||q.intersectsObject(b))){const me=K.update(b),Se=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),te.copy(b.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),te.copy(me.boundingSphere.center)),te.applyMatrix4(b.matrixWorld).applyMatrix4(ee)),Array.isArray(Se)){const Ee=me.groups;for(let Fe=0,ke=Ee.length;Fe<ke;Fe++){const be=Ee[Fe],je=Se[be.materialIndex];je&&je.visible&&m.push(b,me,je,z,te.z,be)}}else Se.visible&&m.push(b,me,Se,z,te.z,null)}}const re=b.children;for(let me=0,Se=re.length;me<Se;me++)vs(re[me],I,z,k)}function Aa(b,I,z,k){const U=b.opaque,re=b.transmissive,me=b.transparent;d.setupLightsView(z),ie===!0&&ne.setGlobalState(x.clippingPlanes,z),k&&Te.viewport(P.copy(k)),U.length>0&&yr(U,I,z),re.length>0&&yr(re,I,z),me.length>0&&yr(me,I,z),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function Ra(b,I,z,k){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[k.id]===void 0&&(d.state.transmissionRenderTarget[k.id]=new ti(1,1,{generateMipmaps:!0,type:Oe.has("EXT_color_buffer_half_float")||Oe.has("EXT_color_buffer_float")?Mr:yn,minFilter:jn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const re=d.state.transmissionRenderTarget[k.id],me=k.viewport||P;re.setSize(me.z,me.w);const Se=x.getRenderTarget();x.setRenderTarget(re),x.getClearColor(W),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),ae&&Le.render(z);const Ee=x.toneMapping;x.toneMapping=Un;const Fe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),d.setupLightsView(k),ie===!0&&ne.setGlobalState(x.clippingPlanes,k),yr(b,z,k),A.updateMultisampleRenderTarget(re),A.updateRenderTargetMipmap(re),Oe.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let be=0,je=I.length;be<je;be++){const rt=I[be],ot=rt.object,Pt=rt.geometry,Je=rt.material,Ae=rt.group;if(Je.side===Bt&&ot.layers.test(k.layers)){const un=Je.side;Je.side=At,Je.needsUpdate=!0,Ca(ot,z,k,Pt,Je,Ae),Je.side=un,Je.needsUpdate=!0,ke=!0}}ke===!0&&(A.updateMultisampleRenderTarget(re),A.updateRenderTargetMipmap(re))}x.setRenderTarget(Se),x.setClearColor(W,Y),Fe!==void 0&&(k.viewport=Fe),x.toneMapping=Ee}function yr(b,I,z){const k=I.isScene===!0?I.overrideMaterial:null;for(let U=0,re=b.length;U<re;U++){const me=b[U],Se=me.object,Ee=me.geometry,Fe=k===null?me.material:k,ke=me.group;Se.layers.test(z.layers)&&Ca(Se,I,z,Ee,Fe,ke)}}function Ca(b,I,z,k,U,re){b.onBeforeRender(x,I,z,k,U,re),b.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),U.onBeforeRender(x,I,z,k,b,re),U.transparent===!0&&U.side===Bt&&U.forceSinglePass===!1?(U.side=At,U.needsUpdate=!0,x.renderBufferDirect(z,I,k,U,b,re),U.side=Nn,U.needsUpdate=!0,x.renderBufferDirect(z,I,k,U,b,re),U.side=Bt):x.renderBufferDirect(z,I,k,U,b,re),b.onAfterRender(x,I,z,k,U,re)}function Sr(b,I,z){I.isScene!==!0&&(I=se);const k=Ce.get(b),U=d.state.lights,re=d.state.shadowsArray,me=U.state.version,Se=we.getParameters(b,U.state,re,I,z),Ee=we.getProgramCacheKey(Se);let Fe=k.programs;k.environment=b.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(b.isMeshStandardMaterial?B:S).get(b.envMap||k.environment),k.envMapRotation=k.environment!==null&&b.envMap===null?I.environmentRotation:b.envMapRotation,Fe===void 0&&(b.addEventListener("dispose",ze),Fe=new Map,k.programs=Fe);let ke=Fe.get(Ee);if(ke!==void 0){if(k.currentProgram===ke&&k.lightsStateVersion===me)return Da(b,Se),ke}else Se.uniforms=we.getUniforms(b),b.onBeforeCompile(Se,x),ke=we.acquireProgram(Se,Ee),Fe.set(Ee,ke),k.uniforms=Se.uniforms;const be=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(be.clippingPlanes=ne.uniform),Da(b,Se),k.needsLights=xu(b),k.lightsStateVersion=me,k.needsLights&&(be.ambientLightColor.value=U.state.ambient,be.lightProbe.value=U.state.probe,be.directionalLights.value=U.state.directional,be.directionalLightShadows.value=U.state.directionalShadow,be.spotLights.value=U.state.spot,be.spotLightShadows.value=U.state.spotShadow,be.rectAreaLights.value=U.state.rectArea,be.ltc_1.value=U.state.rectAreaLTC1,be.ltc_2.value=U.state.rectAreaLTC2,be.pointLights.value=U.state.point,be.pointLightShadows.value=U.state.pointShadow,be.hemisphereLights.value=U.state.hemi,be.directionalShadowMap.value=U.state.directionalShadowMap,be.directionalShadowMatrix.value=U.state.directionalShadowMatrix,be.spotShadowMap.value=U.state.spotShadowMap,be.spotLightMatrix.value=U.state.spotLightMatrix,be.spotLightMap.value=U.state.spotLightMap,be.pointShadowMap.value=U.state.pointShadowMap,be.pointShadowMatrix.value=U.state.pointShadowMatrix),k.currentProgram=ke,k.uniformsList=null,ke}function Pa(b){if(b.uniformsList===null){const I=b.currentProgram.getUniforms();b.uniformsList=es.seqWithValue(I.seq,b.uniforms)}return b.uniformsList}function Da(b,I){const z=Ce.get(b);z.outputColorSpace=I.outputColorSpace,z.batching=I.batching,z.batchingColor=I.batchingColor,z.instancing=I.instancing,z.instancingColor=I.instancingColor,z.instancingMorph=I.instancingMorph,z.skinning=I.skinning,z.morphTargets=I.morphTargets,z.morphNormals=I.morphNormals,z.morphColors=I.morphColors,z.morphTargetsCount=I.morphTargetsCount,z.numClippingPlanes=I.numClippingPlanes,z.numIntersection=I.numClipIntersection,z.vertexAlphas=I.vertexAlphas,z.vertexTangents=I.vertexTangents,z.toneMapping=I.toneMapping}function gu(b,I,z,k,U){I.isScene!==!0&&(I=se),A.resetTextureUnits();const re=I.fog,me=k.isMeshStandardMaterial?I.environment:null,Se=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Vi,Ee=(k.isMeshStandardMaterial?B:S).get(k.envMap||me),Fe=k.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,ke=!!z.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),be=!!z.morphAttributes.position,je=!!z.morphAttributes.normal,rt=!!z.morphAttributes.color;let ot=Un;k.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ot=x.toneMapping);const Pt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Je=Pt!==void 0?Pt.length:0,Ae=Ce.get(k),un=d.state.lights;if(ie===!0&&($===!0||b!==v)){const kt=b===v&&k.id===y;ne.setState(k,b,kt)}let Qe=!1;k.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==un.state.version||Ae.outputColorSpace!==Se||U.isBatchedMesh&&Ae.batching===!1||!U.isBatchedMesh&&Ae.batching===!0||U.isBatchedMesh&&Ae.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ae.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ae.instancing===!1||!U.isInstancedMesh&&Ae.instancing===!0||U.isSkinnedMesh&&Ae.skinning===!1||!U.isSkinnedMesh&&Ae.skinning===!0||U.isInstancedMesh&&Ae.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ae.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ae.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ae.instancingMorph===!1&&U.morphTexture!==null||Ae.envMap!==Ee||k.fog===!0&&Ae.fog!==re||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==ne.numPlanes||Ae.numIntersection!==ne.numIntersection)||Ae.vertexAlphas!==Fe||Ae.vertexTangents!==ke||Ae.morphTargets!==be||Ae.morphNormals!==je||Ae.morphColors!==rt||Ae.toneMapping!==ot||Ae.morphTargetsCount!==Je)&&(Qe=!0):(Qe=!0,Ae.__version=k.version);let Kt=Ae.currentProgram;Qe===!0&&(Kt=Sr(k,I,U));let oi=!1,Ut=!1,ji=!1;const at=Kt.getUniforms(),nn=Ae.uniforms;if(Te.useProgram(Kt.program)&&(oi=!0,Ut=!0,ji=!0),k.id!==y&&(y=k.id,Ut=!0),oi||v!==b){Te.buffers.depth.getReversed()?(G.copy(b.projectionMatrix),Gh(G),Hh(G),at.setValue(D,"projectionMatrix",G)):at.setValue(D,"projectionMatrix",b.projectionMatrix),at.setValue(D,"viewMatrix",b.matrixWorldInverse);const Sn=at.map.cameraPosition;Sn!==void 0&&Sn.setValue(D,ue.setFromMatrixPosition(b.matrixWorld)),Be.logarithmicDepthBuffer&&at.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&at.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),v!==b&&(v=b,Ut=!0,ji=!0)}if(U.isSkinnedMesh){at.setOptional(D,U,"bindMatrix"),at.setOptional(D,U,"bindMatrixInverse");const kt=U.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),at.setValue(D,"boneTexture",kt.boneTexture,A))}U.isBatchedMesh&&(at.setOptional(D,U,"batchingTexture"),at.setValue(D,"batchingTexture",U._matricesTexture,A),at.setOptional(D,U,"batchingIdTexture"),at.setValue(D,"batchingIdTexture",U._indirectTexture,A),at.setOptional(D,U,"batchingColorTexture"),U._colorsTexture!==null&&at.setValue(D,"batchingColorTexture",U._colorsTexture,A));const Ji=z.morphAttributes;if((Ji.position!==void 0||Ji.normal!==void 0||Ji.color!==void 0)&&Ne.update(U,z,Kt),(Ut||Ae.receiveShadow!==U.receiveShadow)&&(Ae.receiveShadow=U.receiveShadow,at.setValue(D,"receiveShadow",U.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(nn.envMap.value=Ee,nn.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&I.environment!==null&&(nn.envMapIntensity.value=I.environmentIntensity),Ut&&(at.setValue(D,"toneMappingExposure",x.toneMappingExposure),Ae.needsLights&&_u(nn,ji),re&&k.fog===!0&&de.refreshFogUniforms(nn,re),de.refreshMaterialUniforms(nn,k,H,J,d.state.transmissionRenderTarget[b.id]),es.upload(D,Pa(Ae),nn,A)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(es.upload(D,Pa(Ae),nn,A),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&at.setValue(D,"center",U.center),at.setValue(D,"modelViewMatrix",U.modelViewMatrix),at.setValue(D,"normalMatrix",U.normalMatrix),at.setValue(D,"modelMatrix",U.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const kt=k.uniformsGroups;for(let Sn=0,En=kt.length;Sn<En;Sn++){const La=kt[Sn];L.update(La,Kt),L.bind(La,Kt)}}return Kt}function _u(b,I){b.ambientLightColor.needsUpdate=I,b.lightProbe.needsUpdate=I,b.directionalLights.needsUpdate=I,b.directionalLightShadows.needsUpdate=I,b.pointLights.needsUpdate=I,b.pointLightShadows.needsUpdate=I,b.spotLights.needsUpdate=I,b.spotLightShadows.needsUpdate=I,b.rectAreaLights.needsUpdate=I,b.hemisphereLights.needsUpdate=I}function xu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,I,z){Ce.get(b.texture).__webglTexture=I,Ce.get(b.depthTexture).__webglTexture=z;const k=Ce.get(b);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=z===void 0,k.__autoAllocateDepthBuffer||Oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,I){const z=Ce.get(b);z.__webglFramebuffer=I,z.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(b,I=0,z=0){R=b,w=I,T=z;let k=!0,U=null,re=!1,me=!1;if(b){const Ee=Ce.get(b);if(Ee.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(D.FRAMEBUFFER,null),k=!1;else if(Ee.__webglFramebuffer===void 0)A.setupRenderTarget(b);else if(Ee.__hasExternalTextures)A.rebindTextures(b,Ce.get(b.texture).__webglTexture,Ce.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const be=b.depthTexture;if(Ee.__boundDepthTexture!==be){if(be!==null&&Ce.has(be)&&(b.width!==be.image.width||b.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(b)}}const Fe=b.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(me=!0);const ke=Ce.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ke[I])?U=ke[I][z]:U=ke[I],re=!0):b.samples>0&&A.useMultisampledRTT(b)===!1?U=Ce.get(b).__webglMultisampledFramebuffer:Array.isArray(ke)?U=ke[z]:U=ke,P.copy(b.viewport),O.copy(b.scissor),F=b.scissorTest}else P.copy(xe).multiplyScalar(H).floor(),O.copy(Ie).multiplyScalar(H).floor(),F=qe;if(Te.bindFramebuffer(D.FRAMEBUFFER,U)&&k&&Te.drawBuffers(b,U),Te.viewport(P),Te.scissor(O),Te.setScissorTest(F),re){const Ee=Ce.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+I,Ee.__webglTexture,z)}else if(me){const Ee=Ce.get(b.texture),Fe=I||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.__webglTexture,z||0,Fe)}y=-1},this.readRenderTargetPixels=function(b,I,z,k,U,re,me){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se){Te.bindFramebuffer(D.FRAMEBUFFER,Se);try{const Ee=b.texture,Fe=Ee.format,ke=Ee.type;if(!Be.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Be.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=b.width-k&&z>=0&&z<=b.height-U&&D.readPixels(I,z,k,U,He.convert(Fe),He.convert(ke),re)}finally{const Ee=R!==null?Ce.get(R).__webglFramebuffer:null;Te.bindFramebuffer(D.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(b,I,z,k,U,re,me){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se){const Ee=b.texture,Fe=Ee.format,ke=Ee.type;if(!Be.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Be.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=b.width-k&&z>=0&&z<=b.height-U){Te.bindFramebuffer(D.FRAMEBUFFER,Se);const be=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,be),D.bufferData(D.PIXEL_PACK_BUFFER,re.byteLength,D.STREAM_READ),D.readPixels(I,z,k,U,He.convert(Fe),He.convert(ke),0);const je=R!==null?Ce.get(R).__webglFramebuffer:null;Te.bindFramebuffer(D.FRAMEBUFFER,je);const rt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await kh(D,rt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,be),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,re),D.deleteBuffer(be),D.deleteSync(rt),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,I=null,z=0){b.isTexture!==!0&&(ar("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,b=arguments[1]);const k=Math.pow(2,-z),U=Math.floor(b.image.width*k),re=Math.floor(b.image.height*k),me=I!==null?I.x:0,Se=I!==null?I.y:0;A.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,z,0,0,me,Se,U,re),Te.unbindTexture()},this.copyTextureToTexture=function(b,I,z=null,k=null,U=0){b.isTexture!==!0&&(ar("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,b=arguments[1],I=arguments[2],U=arguments[3]||0,z=null);let re,me,Se,Ee,Fe,ke,be,je,rt;const ot=b.isCompressedTexture?b.mipmaps[U]:b.image;z!==null?(re=z.max.x-z.min.x,me=z.max.y-z.min.y,Se=z.isBox3?z.max.z-z.min.z:1,Ee=z.min.x,Fe=z.min.y,ke=z.isBox3?z.min.z:0):(re=ot.width,me=ot.height,Se=ot.depth||1,Ee=0,Fe=0,ke=0),k!==null?(be=k.x,je=k.y,rt=k.z):(be=0,je=0,rt=0);const Pt=He.convert(I.format),Je=He.convert(I.type);let Ae;I.isData3DTexture?(A.setTexture3D(I,0),Ae=D.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(A.setTexture2DArray(I,0),Ae=D.TEXTURE_2D_ARRAY):(A.setTexture2D(I,0),Ae=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,I.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,I.unpackAlignment);const un=D.getParameter(D.UNPACK_ROW_LENGTH),Qe=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Kt=D.getParameter(D.UNPACK_SKIP_PIXELS),oi=D.getParameter(D.UNPACK_SKIP_ROWS),Ut=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ot.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ot.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ee),D.pixelStorei(D.UNPACK_SKIP_ROWS,Fe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ke);const ji=b.isDataArrayTexture||b.isData3DTexture,at=I.isDataArrayTexture||I.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const nn=Ce.get(b),Ji=Ce.get(I),kt=Ce.get(nn.__renderTarget),Sn=Ce.get(Ji.__renderTarget);Te.bindFramebuffer(D.READ_FRAMEBUFFER,kt.__webglFramebuffer),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,Sn.__webglFramebuffer);for(let En=0;En<Se;En++)ji&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(b).__webglTexture,U,ke+En),b.isDepthTexture?(at&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(I).__webglTexture,U,rt+En),D.blitFramebuffer(Ee,Fe,re,me,be,je,re,me,D.DEPTH_BUFFER_BIT,D.NEAREST)):at?D.copyTexSubImage3D(Ae,U,be,je,rt+En,Ee,Fe,re,me):D.copyTexSubImage2D(Ae,U,be,je,rt+En,Ee,Fe,re,me);Te.bindFramebuffer(D.READ_FRAMEBUFFER,null),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else at?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(Ae,U,be,je,rt,re,me,Se,Pt,Je,ot.data):I.isCompressedArrayTexture?D.compressedTexSubImage3D(Ae,U,be,je,rt,re,me,Se,Pt,ot.data):D.texSubImage3D(Ae,U,be,je,rt,re,me,Se,Pt,Je,ot):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,U,be,je,re,me,Pt,Je,ot.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,U,be,je,ot.width,ot.height,Pt,ot.data):D.texSubImage2D(D.TEXTURE_2D,U,be,je,re,me,Pt,Je,ot);D.pixelStorei(D.UNPACK_ROW_LENGTH,un),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Qe),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Kt),D.pixelStorei(D.UNPACK_SKIP_ROWS,oi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ut),U===0&&I.generateMipmaps&&D.generateMipmap(Ae),Te.unbindTexture()},this.copyTextureToTexture3D=function(b,I,z=null,k=null,U=0){return b.isTexture!==!0&&(ar("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,k=arguments[1]||null,b=arguments[2],I=arguments[3],U=arguments[4]||0),ar('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,I,z,k,U)},this.initRenderTarget=function(b){Ce.get(b).__webglFramebuffer===void 0&&A.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?A.setTextureCube(b,0):b.isData3DTexture?A.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?A.setTexture2DArray(b,0):A.setTexture2D(b,0),Te.unbindTexture()},this.resetState=function(){w=0,T=0,R=null,Te.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class ha{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Pe(e),this.near=t,this.far=i}clone(){return new ha(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Q0 extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class eg extends Rt{constructor(e=null,t=1,i=1,r,s,o,a,l,c=zt,u=zt,h,f){super(null,o,a,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ul extends dt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const yi=new nt,Nl=new nt,Wr=[],Fl=new si,tg=new nt,ir=new Ze,rr=new Yi;class Ol extends Ze{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ul(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,tg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new si),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,yi),Fl.copy(e.boundingBox).applyMatrix4(yi),this.boundingBox.union(Fl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,yi),rr.copy(e.boundingSphere).applyMatrix4(yi),this.boundingSphere.union(rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(ir.geometry=this.geometry,ir.material=this.material,ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rr.copy(this.boundingSphere),rr.applyMatrix4(i),e.ray.intersectsSphere(rr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,yi),Nl.multiplyMatrices(i,yi),ir.matrixWorld=Nl,ir.raycast(e,Wr);for(let o=0,a=Wr.length;o<a;o++){const l=Wr[o];l.instanceId=s,l.object=this,t.push(l)}Wr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ul(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new eg(new Float32Array(r*this.count),r,this.count,na,on));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Xc extends Ki{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bl=new nt,Go=new aa,Xr=new Yi,qr=new N;class ng extends mt{constructor(e=new vt,t=new Xc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xr.copy(i.boundingSphere),Xr.applyMatrix4(r),Xr.radius+=s,e.ray.intersectsSphere(Xr)===!1)return;Bl.copy(r).invert(),Go.copy(e.ray).applyMatrix4(Bl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,_=p;g<_;g++){const m=c.getX(g);qr.fromBufferAttribute(h,m),zl(qr,m,l,r,e,t,this)}}else{const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=f,_=p;g<_;g++)qr.fromBufferAttribute(h,g),zl(qr,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function zl(n,e,t,i,r,s,o){const a=Go.distanceSqToPoint(n);if(a<t){const l=new N;Go.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class ms extends vt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new N,u=new We;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const p=i+h/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new lt(o,3)),this.setAttribute("normal",new lt(a,3)),this.setAttribute("uv",new lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ms(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Xt extends vt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],p=[];let g=0;const _=[],m=i/2;let d=0;M(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new lt(h,3)),this.setAttribute("normal",new lt(f,3)),this.setAttribute("uv",new lt(p,2));function M(){const x=new N,C=new N;let w=0;const T=(t-e)/i;for(let R=0;R<=s;R++){const y=[],v=R/s,P=v*(t-e)+e;for(let O=0;O<=r;O++){const F=O/r,W=F*l+a,Y=Math.sin(W),X=Math.cos(W);C.x=P*Y,C.y=-v*i+m,C.z=P*X,h.push(C.x,C.y,C.z),x.set(Y,T,X).normalize(),f.push(x.x,x.y,x.z),p.push(F,1-v),y.push(g++)}_.push(y)}for(let R=0;R<r;R++)for(let y=0;y<s;y++){const v=_[y][R],P=_[y+1][R],O=_[y+1][R+1],F=_[y][R+1];(e>0||y!==0)&&(u.push(v,P,F),w+=3),(t>0||y!==s-1)&&(u.push(P,O,F),w+=3)}c.addGroup(d,w,0),d+=w}function E(x){const C=g,w=new We,T=new N;let R=0;const y=x===!0?e:t,v=x===!0?1:-1;for(let O=1;O<=r;O++)h.push(0,m*v,0),f.push(0,v,0),p.push(.5,.5),g++;const P=g;for(let O=0;O<=r;O++){const W=O/r*l+a,Y=Math.cos(W),X=Math.sin(W);T.x=y*X,T.y=m*v,T.z=y*Y,h.push(T.x,T.y,T.z),f.push(0,v,0),w.x=Y*.5+.5,w.y=X*.5*v+.5,p.push(w.x,w.y),g++}for(let O=0;O<r;O++){const F=C+O,W=P+O;x===!0?u.push(W,W+1,F):u.push(W+1,W,F),R+=3}c.addGroup(d,R,x===!0?1:2),d+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mr extends Xt{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new mr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fa extends vt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new lt(s,3)),this.setAttribute("normal",new lt(s.slice(),3)),this.setAttribute("uv",new lt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const E=new N,x=new N,C=new N;for(let w=0;w<t.length;w+=3)p(t[w+0],E),p(t[w+1],x),p(t[w+2],C),l(E,x,C,M)}function l(M,E,x,C){const w=C+1,T=[];for(let R=0;R<=w;R++){T[R]=[];const y=M.clone().lerp(x,R/w),v=E.clone().lerp(x,R/w),P=w-R;for(let O=0;O<=P;O++)O===0&&R===w?T[R][O]=y:T[R][O]=y.clone().lerp(v,O/P)}for(let R=0;R<w;R++)for(let y=0;y<2*(w-R)-1;y++){const v=Math.floor(y/2);y%2===0?(f(T[R][v+1]),f(T[R+1][v]),f(T[R][v])):(f(T[R][v+1]),f(T[R+1][v+1]),f(T[R+1][v]))}}function c(M){const E=new N;for(let x=0;x<s.length;x+=3)E.x=s[x+0],E.y=s[x+1],E.z=s[x+2],E.normalize().multiplyScalar(M),s[x+0]=E.x,s[x+1]=E.y,s[x+2]=E.z}function u(){const M=new N;for(let E=0;E<s.length;E+=3){M.x=s[E+0],M.y=s[E+1],M.z=s[E+2];const x=m(M)/2/Math.PI+.5,C=d(M)/Math.PI+.5;o.push(x,1-C)}g(),h()}function h(){for(let M=0;M<o.length;M+=6){const E=o[M+0],x=o[M+2],C=o[M+4],w=Math.max(E,x,C),T=Math.min(E,x,C);w>.9&&T<.1&&(E<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),C<.2&&(o[M+4]+=1))}}function f(M){s.push(M.x,M.y,M.z)}function p(M,E){const x=M*3;E.x=e[x+0],E.y=e[x+1],E.z=e[x+2]}function g(){const M=new N,E=new N,x=new N,C=new N,w=new We,T=new We,R=new We;for(let y=0,v=0;y<s.length;y+=9,v+=6){M.set(s[y+0],s[y+1],s[y+2]),E.set(s[y+3],s[y+4],s[y+5]),x.set(s[y+6],s[y+7],s[y+8]),w.set(o[v+0],o[v+1]),T.set(o[v+2],o[v+3]),R.set(o[v+4],o[v+5]),C.copy(M).add(E).add(x).divideScalar(3);const P=m(C);_(w,v+0,M,P),_(T,v+2,E,P),_(R,v+4,x,P)}}function _(M,E,x,C){C<0&&M.x===1&&(o[E]=M.x-1),x.x===0&&x.z===0&&(o[E]=C/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function d(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fa(e.vertices,e.indices,e.radius,e.details)}}class da extends fa{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new da(e.radius,e.detail)}}class pa extends vt{constructor(e=.5,t=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],c=[],u=[];let h=e;const f=(t-e)/r,p=new N,g=new We;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const d=s+m/i*o;p.x=h*Math.cos(d),p.y=h*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}h+=f}for(let _=0;_<r;_++){const m=_*(i+1);for(let d=0;d<i;d++){const M=d+m,E=M,x=M+i+1,C=M+i+2,w=M+1;a.push(E,x,w),a.push(x,C,w)}}this.setIndex(a),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class gs extends vt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new N,f=new N,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const M=[],E=d/i;let x=0;d===0&&o===0?x=.5/t:d===i&&l===Math.PI&&(x=-.5/t);for(let C=0;C<=t;C++){const w=C/t;h.x=-e*Math.cos(r+w*s)*Math.sin(o+E*a),h.y=e*Math.cos(o+E*a),h.z=e*Math.sin(r+w*s)*Math.sin(o+E*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(w+x,1-E),M.push(c++)}u.push(M)}for(let d=0;d<i;d++)for(let M=0;M<t;M++){const E=u[d][M+1],x=u[d][M],C=u[d+1][M],w=u[d+1][M+1];(d!==0||o>0)&&p.push(E,x,w),(d!==i-1||l<Math.PI)&&p.push(x,C,w)}this.setIndex(p),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ni extends vt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new N,h=new N,f=new N;for(let p=0;p<=i;p++)for(let g=0;g<=r;g++){const _=g/r*s,m=p/i*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,d=(r+1)*(p-1)+g,M=(r+1)*p+g;o.push(_,m,M),o.push(m,d,M)}this.setIndex(o),this.setAttribute("position",new lt(a,3)),this.setAttribute("normal",new lt(l,3)),this.setAttribute("uv",new lt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ni(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class qc extends Ki{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ac,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ma extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ig extends ma{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ks=new nt,kl=new N,Gl=new N;class rg{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ca,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;kl.setFromMatrixPosition(e.matrixWorld),t.position.copy(kl),Gl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Gl),t.updateMatrixWorld(),Ks.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ks),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ks)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class sg extends rg{constructor(){super(new zc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class og extends ma{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new sg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ag extends ma{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Hl=new nt;class lg{constructor(e,t,i=0,r=1/0){this.ray=new aa(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new la,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hl),this}intersectObject(e,t=!0,i=[]){return Ho(e,this,i,t),i.sort(Vl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ho(e[r],this,i,t);return i.sort(Vl),i}}function Vl(n,e){return n.distance-e.distance}function Ho(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)Ho(s[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jo);function cg(n,e,t){return{x:(n-t.left)/t.width*2-1,y:-((e-t.top)/t.height)*2+1}}const ug=1.42,Yc=44,ga=32,sr=92,Vo={hq:2.85,barracks:1.55},Kc=1.05;function $c(n,e,t){return t!=="siege"?n:n+(e==="player"?.85:-.85)}const hg={hq:2.05,barracks:.78},fg={hq:2.55,barracks:1.2},Si=new N,xn={x:0,y:0};function rs(n,e,t,i,r,s,o){return Si.set(n,e,t),Si.project(i),Si.z<-1||Si.z>1?!1:(o.x=(Si.x*.5+.5)*r,o.y=(-Si.y*.5+.5)*s,!0)}function dg(n,e){return e<=Yc&&e<n}const Ht=[];function pg(n){let e=Ht[n];return e||(e={px:0,py:0,squad:0,ok:0},Ht[n]=e),e}function Zc(n,e,t,i,r,s){const o=e|0;for(let c=0;c<o;c++){const u=n[c],h=pg(c);h.squad=u.squad?1:0,h.ok=0,rs(u.x,u.y,u.z,t,i,r,xn)&&(h.ok=1,h.px=xn.x,h.py=xn.y-ga,h.ox=h.px,h.oy=h.py)}const a=36,l=c=>{i>a*2&&(c.px=Math.min(i-a,Math.max(a,c.px))),r>a*2&&(c.py=Math.min(r-a,Math.max(a,c.py)))};for(let c=0;c<8;c++)for(let u=0;u<o;u++){const h=Ht[u];if(h.ok)for(let f=u+1;f<o;f++){const p=Ht[f];if(!p.ok)continue;let g=p.px-h.px,_=p.py-h.py,m=Math.hypot(g,_);if(m>=sr)continue;m<.01&&(g=0,_=1,m=1);const d=(sr-m)/m,M=g*d,E=_*d;if(h.squad!==p.squad){const x=h.squad?h:p,C=h.squad?p:h;if(Math.abs(_)>=Math.abs(g)){const w=x.px-C.px,T=x.py-C.py;let R=Math.abs(w)<1?1:Math.sign(w);const v=Math.sqrt(Math.max(0,sr*sr-T*T))-Math.abs(w);if(v>0){const P=x.px+R*v;i>a*2&&(P<a||P>i-a)&&(R=-R),x.px+=R*v}}else h.squad?(h.px-=M,h.py-=E):(p.px+=M,p.py+=E);l(x)}else h.px-=M*.5,h.py-=E*.5,p.px+=M*.5,p.py+=E*.5,l(h),l(p)}}for(let c=0;c<o;c++){const u=Ht[c];if(!u.ok||!u.squad)continue;let h=1/0;for(let _=0;_<o;_++)c===_||!Ht[_].ok||(h=Math.min(h,Math.hypot(u.px-Ht[_].px,u.py-Ht[_].py)));if(h>=sr-1)continue;let f=u.px,p=u.py,g=h;for(let _=1;_<=5;_++){const m=24*_;for(let d=0;d<12;d++){const M=d/12*Math.PI*2;let E=u.ox+Math.cos(M)*m,x=u.oy+Math.sin(M)*m;i>a*2&&(E=Math.min(i-a,Math.max(a,E))),r>a*2&&(x=Math.min(r-a,Math.max(a,x)));let C=1/0;for(let w=0;w<o;w++)c===w||!Ht[w].ok||(C=Math.min(C,Math.hypot(E-Ht[w].px,x-Ht[w].py)));C>g&&(g=C,f=E,p=x)}}u.px=f,u.py=p}for(let c=0;c<o;c++){const u=Ht[c],h=s[c];h.px=u.px,h.py=u.py,h.ok=u.ok}return o}const Wo=[],hr=[];function mg(n){let e=Wo[n];return e||(e={x:0,y:0,z:0,squad:0},Wo[n]=e),e}function gg(n){let e=hr[n];return e||(e={px:0,py:0,ok:0},hr[n]=e),e}function _g(n,e,t,i,r,s,o){let a=null,l=1/0,c=null,u=ug,h=null,f=1/0;const p=t>=1&&i>=1&&e;if(p){for(let g=0;g<n.length;g++){const _=n[g],m=_.kind==="squad",d=_.kind==="hq"?"hq":"barracks",M=mg(g);M.x=_.x,M.y=m?Kc:Vo[d],M.z=_.z,M.squad=m?1:0,gg(g)}Zc(Wo,n.length,e,t,i,hr)}for(let g=0;g<n.length;g++){const _=n[g],m=_.kind==="squad",d=_.kind==="hq"?"hq":"barracks";let M=1/0,E=1/0;if(p&&hr[g].ok){const x=hr[g],C=Math.hypot(r-x.px,s-x.py);if(E=C,C<M&&(M=C),!m){const w=Math.hypot(r-x.px,s-(x.py+ga));w<M&&(M=w)}if(!m&&rs(_.x,hg[d],_.z,e,t,i,xn)){const w=Math.hypot(r-xn.x,s-xn.y);w<M&&(M=w)}if(!m&&rs(_.x,fg[d],_.z,e,t,i,xn)){const w=Math.hypot(r-xn.x,s-xn.y);w<M&&(M=w)}dg(l,M)&&(l=M,a=_),m&&E<=Yc&&E<f&&(h=_,f=E)}if(o){const x=Math.hypot(_.x-o.x,_.z-o.z);x<u&&(u=x,c=_)}}return a&&a.kind!=="squad"&&h&&f<l&&(a=h),a||c}function xg(n){const e=new Map,t={x:0,y:0},i=new Set,r=[],s=["","快","固","快固"],o=[],a=[],l=[];let c=Li;function u(_){let m=o[_];return m||(m={x:0,y:0,z:0,squad:0},o[_]=m,a[_]={px:0,py:0,ok:0}),m}function h(_){let m=e.get(_);return m||(m=document.createElement("div"),m.className="badge",m.innerHTML='<span class="tag"></span><b class="num"></b><i class="sub"></i>',n.appendChild(m),e.set(_,m)),m}function f(_,m,d){const M=_.querySelector(m);M.textContent!==d&&(M.textContent=d)}function p(_,m){if(!m||!m.ok){_.hidden=!0;return}_.hidden=!1;const d=m.py+ga;_.style.transform=`translate(${m.px}px, ${d}px) translate(-50%, -115%)`}function g(_,m,d){const M=_.squads;for(let E=0;E<M.length;E++){const x=M[E];if(x.mode==="siege"&&x.targetId===m&&x.owner!==d&&x.count>0)return!0}return!1}return{setMap(_){c=_&&_.nodes||Li},update(_,m,d){const M=d.clientWidth||1,E=d.clientHeight||1,x=_&&_.nodes||c;i.clear();let C=0;for(let w=0;w<_.buildings.length;w++){const T=_.buildings[w];i.add(T.id);const R=h(T.id);R.classList.toggle("player",T.owner==="player"),R.classList.toggle("enemy",T.owner==="enemy"),R.classList.toggle("squad",!1),R.classList.toggle("can-up",Nu(T));const y=T.kind==="hq"?"司令部":"兵營";f(R,".tag",y),f(R,".num",String(Math.max(0,Math.floor(T.count))));const v=T.upgrades,P=(v&&v.haste>0?1:0)+(v&&v.bulwark>0?2:0),O=s[P];let F="";T.capture>.02?F="佔領中":T.kind==="hq"&&(T.count<=0||g(_,T.id,T.owner))?F="危":O?F=O:T.count>=T.cap&&(F="滿"),f(R,".sub",F),R.classList.toggle("is-danger",F==="危");const W=x[T.node];if(!W){R.hidden=!0;continue}const Y=u(C);Y.x=W.x,Y.y=Vo[T.kind]||Vo.barracks,Y.z=W.z,Y.squad=0,l[C]=R,C+=1}for(let w=0;w<_.squads.length;w++){const T=_.squads[w];if(T.count<=0)continue;i.add(T.id);const R=h(T.id);R.classList.add("squad"),R.classList.toggle("player",T.owner==="player"),R.classList.toggle("enemy",T.owner==="enemy"),R.classList.toggle("can-up",!1),R.classList.toggle("is-danger",!1),f(R,".tag",T.mode==="siege"?"攻城":"行軍"),f(R,".num",String(Math.max(0,Math.floor(T.count)))),f(R,".sub",T.mode==="fight"?"交戰":"");const y=u(C);y.x=$c(T.x,T.owner,T.mode),y.y=Kc,y.z=T.z,y.squad=1,l[C]=R,C+=1}Zc(o,C,m,M,E,a);for(let w=0;w<C;w++)p(l[w],a[w]);r.length=0;for(const w of e.keys())i.has(w)||r.push(w);for(let w=0;w<r.length;w++)e.get(r[w]).remove(),e.delete(r[w])},clientPoint(_,m,d){const M=c[_];if(!M)return null;const E=d.getBoundingClientRect();return rs(M.x,.4,M.z,m,E.width,E.height,t)?{x:E.left+t.x,y:E.top+t.y}:null}}}function _a(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new vt;let c=0;for(let u=0;u<n.length;++u){const h=n[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in h.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(h.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in h.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(h.morphAttributes[p])}if(e){let p;if(t)p=h.index.count;else if(h.attributes.position!==void 0)p=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,u),c+=p}}if(t){let u=0;const h=[];for(let f=0;f<n.length;++f){const p=n[f].index;for(let g=0;g<p.count;++g)h.push(p.getX(g)+u);u+=n[f].attributes.position.count}l.setIndex(h)}for(const u in s){const h=Wl(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<h;++f){const p=[];for(let _=0;_<o[u].length;++_)p.push(o[u][_][f]);const g=Wl(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function Wl(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){const u=n[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const o=new e(s),a=new dt(o,t,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const h=l/t;for(let f=0,p=u.count;f<p;f++)for(let g=0;g<t;g++){const _=u.getComponent(f,g);a.setComponent(f+h,g,_)}}else o.set(u.array,l);l+=u.count*t}return r!==void 0&&(a.gpuType=r),a}function xa(n,e){const t=Math.hypot(n,e);if(t<1e-8)return 0;const i=Math.atan2(-n/t,-e/t);return i===0?0:i}function Xl(n,e,t,i){const r=Math.cos(t),s=Math.sin(t);return i.x=n*r+e*s,i.z=-n*s+e*r,i}const De={sky:8366276,water:4091791,sand:9075292,meadow:7043662,meadowDeep:5925698,road:6050632,trunk:4864810,leaf:4151866,leafDeep:3097904,rock:7236195,stream:4091791,bridge:7238254,ink:1712672,concrete:8025452,metal:9344660,player:{main:3120731,deep:1796925,flag:4050554,slab:3824703,glow:4050554},enemy:{main:12860466,deep:9315356,flag:14832968,slab:6042930,glow:14832968}};function Yn(n){return n==="player"?De.player:De.enemy}const $s=480,vg=1.48,Mg=.3,Ei={x:0,z:0},ql=new N,Yl=new N;function yg(n){const e=Math.max(0,Math.floor(n));return e<=12?e:Math.min(56,12+Math.round((e-12)*.8))}function Jt(n,e){const t=n.getAttribute("position").count,i=new Float32Array(t*3);return i.fill(e),n.setAttribute("color",new dt(i,3)),n}function Xn(n,e,t,i){return new Xt(n,e,t,i)}function Sg(){const n=Jt(Xn(.035,.042,.2,5),.22);n.translate(-.05,.1,0);const e=Jt(Xn(.035,.042,.2,5),.16);e.translate(.05,.1,0);const t=Jt(Xn(.09,.1,.22,6),.4);t.translate(0,.28,0);const i=Jt(Xn(.028,.03,.16,4),.28);i.translate(-.12,.3,-.02);const r=Jt(Xn(.028,.03,.14,4),.26);r.translate(.11,.3,-.06);const s=Jt(Xn(.055,.06,.09,6),.55);s.translate(0,.42,0);const o=Jt(Xn(.068,.08,.08,7),1);o.translate(0,.48,-.01);const a=Jt(new oe(.2,.02,.16),.78);a.translate(0,.45,-.04);const l=Jt(new oe(.028,.03,.56),.07);l.translate(.12,.3,-.32);const c=Jt(new oe(.035,.05,.08),.12);c.translate(.12,.28,-.04);const u=Jt(new oe(.08,.1,.05),.2);u.translate(0,.3,.08);const h=_a([n,e,t,i,r,s,o,a,l,c,u]);return h.computeVertexNormals(),h}function Kl(n,e){const t=Sg(),i=t.getAttribute("color"),r=new Float32Array(i.count*3),s=new Pe(n),o=s.clone().multiplyScalar(.42),a=new Pe(e),l=a.clone().multiplyScalar(.62),c=new Pe(12888194),u=new Pe(1447958),h=new Pe;for(let f=0;f<i.count;f++){const p=i.getX(f);let g=s;p>=.95?g=a:p>=.7?g=l:p>=.5?g=c:p<=.14?g=u:(h.copy(o).lerp(s,Math.min(1,(p-.14)/.36)),g=h),r[f*3]=g.r,r[f*3+1]=g.g,r[f*3+2]=g.b}return t.setAttribute("color",new dt(r,3)),t}function Eg(n){const t=(va[n]||[])[0],i=ki[n],r=t&&ki[t];return!i||!r?1.8:Math.hypot(r.x-i.x,r.z-i.z)}let ki=Li,va=hs;function bg(n){const t=(va[n]||[])[0],i=ki[n],r=t&&ki[t];return!i||!r?0:xa(r.x-i.x,r.z-i.z)}function Tg(n){const e=()=>new qc({color:16777215,vertexColors:!0,roughness:.74,metalness:.04}),t=new Ol(Kl(De.player.main,9420698),e(),$s),i=new Ol(Kl(De.enemy.main,13928832),e(),$s);t.castShadow=!1,i.castShadow=!1,t.receiveShadow=!1,i.receiveShadow=!1,t.frustumCulled=!1,i.frustumCulled=!1,t.count=0,i.count=0,n.add(t,i);const r=new mt,s=new Map,o=new Map;let a=0,l=0,c=null,u=null;function h(g,_,m){if(Math.hypot(_,m)<.05)return s.get(g)||0;const d=xa(_,m);return s.set(g,d),d}function f(g,_,m,d,M,E,x){const C=g==="player"?t:i,w=g==="player"?a:l;w>=$s||(r.position.set(_,m,d),r.rotation.set(0,M,0),r.scale.setScalar(E),r.updateMatrix(),C.setMatrixAt(w,r.matrix),g==="player"?a+=1:l+=1,x&&(u=C,ql.set(0,0,-1).applyQuaternion(r.quaternion)))}function p(g,_,m,d,M,E){const x=yg(M);if(x<=0)return;const C=x>20?9:x>8?6:Math.max(1,x),w=Mg;for(let T=0;T<x;T++){const R=T%C,y=Math.floor(T/C),v=Math.ceil(x/C),P=y===v-1?x-y*C:C,O=(R-(P-1)/2)*w,F=y*w;Xl(O,F,d,Ei);const W=1+T*17%5*.015;f(g,_+Ei.x,.02,m+Ei.z,d,vg*W,E&&T===0)}}return{facingDot(){return c},setMap(g){ki=g.nodes||Li,va=g.graph||hs,s.clear(),o.clear()},update(g){a=0,l=0,u=null;let _=!1;const m=g&&g.nodes||ki;for(let d=0;d<g.buildings.length;d++){const M=g.buildings[d];if(M.count<=0)continue;const E=m[M.node];if(!E)continue;const x=bg(M.node),C=Math.min(2.45,Math.max(1.2,Eg(M.node)*.82));Xl(0,-1,x,Ei);const w=E.x+Ei.x*C,T=E.z+Ei.z*C;p(M.owner,w,T,x,M.count,!1)}for(let d=0;d<g.squads.length;d++){const M=g.squads[d];if(M.count<=0)continue;let E=0,x=0;if(M.mode==="march"&&M.seg<M.path.length-1){const T=m[M.path[M.seg+1]];T&&(E=T.x-M.x,x=T.z-M.z)}else if(M.path.length>1){const T=m[M.path[Math.max(0,M.seg-1)]];T&&(E=M.x-T.x,x=M.z-T.z)}const C=h(M.id,E,x),w=!_&&M.mode==="march";if(p(M.owner,M.x,M.z,C,M.count,w),w){_=!0;const T=o.get(M.id);if(T&&u){const y=M.x-T.x,v=M.z-T.z,P=Math.hypot(y,v);P>.004&&(Yl.set(y/P,0,v/P),c=ql.dot(Yl))}let R=o.get(M.id);R?(R.x=M.x,R.z=M.z):(R={x:M.x,z:M.z},o.set(M.id,R))}}t.count=a,i.count=l,t.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0}}}const gn=360;function wg(n){const e=new Float32Array(gn*3),t=new Float32Array(gn*3),i=new Float32Array(gn*3);e.fill(0);for(let d=0;d<gn;d++)e[d*3+1]=-8;const r=new vt;r.setAttribute("position",new dt(e,3)),r.setAttribute("color",new dt(t,3));const s=new Xc({size:1.7,vertexColors:!0,transparent:!0,opacity:.82,depthWrite:!1,sizeAttenuation:!0}),o=new ng(r,s);o.frustumCulled=!1,o.renderOrder=4,n.add(o);const a=new Float32Array(gn),l=new Float32Array(gn),c=new Float32Array(gn*3);let u=0,h=!0;const f=new Pe(De.sand),p=new Pe(12893876),g=new Pe(16769162),_=new Pe(16742962);function m(d,M,E,x,C,w,T,R){const y=u;u=(u+1)%gn,a[y]=C,l[y]=C;const v=y*3;e[v]=d,e[v+1]=M,e[v+2]=E,c[v]=w,c[v+1]=T,c[v+2]=R,i[v]=x.r,i[v+1]=x.g,i[v+2]=x.b,t[v]=x.r,t[v+1]=x.g,t[v+2]=x.b}return{setEnabled(d){h=!!d,o.visible=h},update(d,M){if(!h||!M)return;const E=M.squads||[];let x=18;const C=Math.floor((M.t||0)*8);for(let y=0;y<E.length&&x>0;y++){const v=E[y];if(!v||v.count<=0)continue;const P=y*17%5*.05;v.mode==="march"?(m(v.x+P,.12,v.z-P,f,.7,0,.35,0),x-=1):(v.mode==="fight"||v.mode==="siege")&&(m(v.x,.4,v.z,p,1.1,y%2?.4:-.4,.9,0),x-=1,x>0&&(m(v.x+.12,.55,v.z,v.mode==="siege"?_:g,.35,0,.2,0),x-=1),v.mode==="siege"&&x>0&&(m(v.x-.2,.7,v.z+.1,_,.45,.3,.6,-.2),x-=1))}const w=M.nodes,T=M.buildings;if(w&&T&&C%2===0)for(let y=0;y<T.length&&x>0;y++){const v=T[y];if(v.kind!=="hq"&&v.kind!=="barracks")continue;let P=!1;for(let F=0;F<E.length;F++){const W=E[F];W.mode==="siege"&&W.targetId===v.id&&W.owner!==v.owner&&W.count>0&&(P=!0)}if(!P)continue;const O=w[v.node];O&&(m(O.x,1.1,O.z,_,.4,y%2?.3:-.3,.8,.1),x-=1)}const R=Math.min(.05,d||.016);for(let y=0;y<gn;y++){if(a[y]<=0)continue;a[y]-=R;const v=y*3;if(a[y]<=0){e[v+1]=-8,a[y]=0;continue}e[v]+=c[v]*R,e[v+1]+=c[v+1]*R,e[v+2]+=c[v+2]*R;const P=a[y]/l[y];t[v]=i[v]*P,t[v+1]=i[v+1]*P,t[v+2]=i[v+2]*P}r.attributes.position.needsUpdate=!0,r.attributes.color.needsUpdate=!0}}}function Ag(n,e,t,i){const r=new lg,s=new Dn(new N(0,1,0),0),o=new We,a=new N;let l=null;function c(f){const p=n.getBoundingClientRect();if(p.width<1||p.height<1)return null;const g=cg(f.clientX,f.clientY,p);return o.set(g.x,g.y),r.setFromCamera(o,e),r.ray.intersectPlane(s,a)?{x:a.x,z:a.z}:null}function u(f){const p=n.getBoundingClientRect(),g=c(f);return p.width<1||p.height<1?{building:null,world:g}:{building:_g(t(),e,p.width,p.height,f.clientX-p.left,f.clientY-p.top,g),world:g}}n.addEventListener("contextmenu",f=>f.preventDefault()),n.addEventListener("pointerdown",f=>{if(f.button!==0&&f.pointerType==="mouse")return;n.setPointerCapture(f.pointerId),i.unlock();const{building:p}=u(f);l={x:f.clientX,y:f.clientY,id:p?p.id:null,owner:p?p.owner:null,dragging:!1}}),n.addEventListener("pointermove",f=>{if(!l)return;const p=Math.hypot(f.clientX-l.x,f.clientY-l.y);if(!l.dragging&&p>14&&l.id&&l.owner==="player"&&(l.dragging=!0,i.onDragStart(l.id)),!l.dragging)return;const{world:g,building:_}=u(f);g&&i.onDragMove(g,_?_.id:null)});function h(f){if(!l)return;const p=l;l=null;const{building:g}=u(f),_=g?g.id:null;if(p.dragging){i.onDragEnd(p.id,_);return}i.onTap(_)}n.addEventListener("pointerup",h),n.addEventListener("pointercancel",()=>{l&&(l=null,i.onDragEnd(null,null))})}function jc(n,e){n.fov=46,Number.isFinite(e)&&e>0&&(n.aspect=e),n.position.set(.18,12.4,16.6),n.up.set(0,1,0),n.lookAt(.05,.35,-.15),n.updateProjectionMatrix(),n.updateMatrixWorld()}function Rg(n,e){n.fov=46,Number.isFinite(e)&&e>0&&(n.aspect=e),n.position.set(.1,8.2,22),n.up.set(0,1,0),n.lookAt(0,0,8),n.updateProjectionMatrix(),n.updateMatrixWorld()}function Cg(n){try{const e=n.getContext(),t=e.getExtension("WEBGL_debug_renderer_info");if(!t)return!0;const i=`${e.getParameter(t.UNMASKED_RENDERER_WEBGL)||""} ${e.getParameter(t.UNMASKED_VENDOR_WEBGL)||""}`;return/swiftshader|llvmpipe|softpipe|software/i.test(i)?!0:!/nvidia|amd|radeon|intel|apple|adreno|mali|powervr/i.test(i)}catch{return!0}}function $l(n,e,t){n.shadowMap.enabled=!!t,n.shadowMap.type=pc,e.castShadow=!!t,t&&(e.shadow.mapSize.set(1024,1024),e.shadow.camera.near=4,e.shadow.camera.far=42,e.shadow.camera.left=-14,e.shadow.camera.right=14,e.shadow.camera.top=14,e.shadow.camera.bottom=-14,e.shadow.bias=-8e-4,e.shadow.normalBias=.04,e.shadow.camera.updateProjectionMatrix())}function Pg(n){const e=new J0({canvas:n,antialias:!1,alpha:!1,powerPreference:"high-performance"});e.outputColorSpace=Ot,e.toneMapping=gc,e.toneMappingExposure=1.02,e.setClearColor(De.sky,1);const t=new Q0;t.fog=new ha(De.sky,28,62),t.background=new Pe(De.sky);const i=new Vt(46,1,.1,90);jc(i),t.add(new ig(13951726,4017204,.5)),t.add(new ag(15199978,.26));const r=new og(16773590,1.48);r.position.set(-7.5,18,9.2),r.target.position.set(0,0,0),t.add(r),t.add(r.target);const s=Cg(e);let o=!s;$l(e,r,o);function a(){const l=n.clientWidth||390,c=n.clientHeight||844;i.aspect=l/Math.max(1,c),i.updateProjectionMatrix();const u=Math.min(window.devicePixelRatio||1,2);e.setPixelRatio(u),e.setSize(l,c,!1)}return{renderer:e,scene:t,camera:i,sun:r,software:s,get shadowsOn(){return o},setShadows(l){o=!!l,$l(e,r,o),e.shadowMap.needsUpdate=!0},resize:a}}function Jc(n){const e=[];for(let t=0;t<n.length;t++){const i=n[t];e.push({buildingId:i.buildingId,zMin:i.z-i.rz,zMax:i.z+i.rz,xMin:i.x-i.rx,xMax:i.x+i.rx})}return e.sort((t,i)=>i.zMax-t.zMax),e}Jc(Lu);const Dg=[],Zl=1.55;function Lg(n){return Jc(n)}function Ig(n,e,t=Dg){t.length=0;for(let i=0;i<n.length;i++)for(let r=i+1;r<n.length;r++){const s=n[i],o=n[r],a=e[s.buildingId],l=e[o.buildingId];if(!a||!l||a===l)continue;const c=Math.min(s.xMax,o.xMax)-Math.max(s.xMin,o.xMin),u=Math.min(s.zMax,o.zMax)-Math.max(s.zMin,o.zMin),h=Math.max(s.zMin,o.zMin)-Math.min(s.zMax,o.zMax),f=Math.max(s.xMin,o.xMin)-Math.min(s.xMax,o.xMax);if(c>.45&&h<Zl&&h>-.35){const p=s.zMax>=o.zMax?s:o,g=p===s?o:s,_=Math.max(p.xMin,g.xMin),m=Math.min(p.xMax,g.xMax);if(m-_<.4)continue;t.push({axis:"x",z:(p.zMin+g.zMax)/2,x0:_,x1:m,z0:0,z1:0,x:(_+m)/2,plusOwner:e[p.buildingId],minusOwner:e[g.buildingId]})}else if(u>.45&&f<Zl&&f>-.35){const p=s.xMax>=o.xMax?s:o,g=p===s?o:s,_=Math.max(s.zMin,o.zMin),m=Math.min(s.zMax,o.zMax);if(m-_<.4)continue;const d=(p.xMin+g.xMax)/2;t.push({axis:"z",z:(_+m)/2,x0:d,x1:d,z0:_,z1:m,x:d,plusOwner:e[p.buildingId],minusOwner:e[g.buildingId]})}}return t}const Ug=new N(0,1,0),Ng=new N(0,0,1),ss=new N;function st(n,e={}){return new qc({color:n,roughness:.72,metalness:.05,...e})}function Fg(n,e,t){const r=(n.graph[e]||[])[0],s=n.nodes[e],o=r&&n.nodes[r];return!s||!o?(t.x=0,t.z=-1,t):(t.x=o.x-s.x,t.z=o.z-s.z,t)}function Og(n,e,t,i,r,s){const o=i-e,a=r-t,l=Math.hypot(o,a)||.001;return n.scale.set(1,1,l),n.position.set((e+i)/2,s,(t+r)/2),ss.set(o/l,0,a/l),n.quaternion.setFromUnitVectors(Ng,ss),l}function Qc(n){const e=st(n,{roughness:.5,side:Bt}),t=new an,i=new Ze(new zi(.4,.24),e),r=new Ze(new zi(.4,.24),e);return r.rotation.y=Math.PI/2,i.userData.slot="flag",r.userData.slot="flag",t.add(i,r),t.userData.flutter=!0,t}function eu(n){const e=new Ze(new ni(n,.04,6,24),new Dt({color:De.metal}));return e.rotation.x=Math.PI/2,e.position.y=.1,e.visible=!1,e.name="pip",e}const jl=new N,Jl=new qi,Bg=new N(1,1,1),Ql=new tn,zg=new nt;function _e(n,e,t,i,r=0,s=0,o=0){return Ql.set(r,s,o),Jl.setFromEuler(Ql),jl.set(e,t,i),n.applyMatrix4(zg.compose(jl,Jl,Bg)),n}function Wt(n,e){const t=_a(n);for(let r=0;r<n.length;r++)n[r].dispose();const i=new Ze(t,e);return i.castShadow=!0,i.receiveShadow=!0,i}function kg(n){const e=new an,t=Wt([_e(new oe(3.1,.1,2.4),0,.05,.05),_e(new oe(2.2,.2,.4),0,.2,-.98),_e(new oe(2.15,.1,.78),0,.38,-.78,-.42,0,0),_e(new oe(.2,.7,1.2),-1.32,.46,-.02),_e(new oe(.2,.7,1.2),1.32,.46,-.02),_e(new oe(2.2,.14,.16),0,.2,1.08),_e(new oe(.7,.36,.16),0,.42,1.12),_e(new oe(.16,.55,.16),-.7,.5,1.05),_e(new oe(.16,.55,.16),.7,.5,1.05),_e(new oe(.36,.14,.22),-1.05,.2,.9),_e(new oe(.36,.14,.22),1.05,.2,.9),_e(new oe(.28,.12,.16),-.9,.3,-1.18),_e(new oe(.28,.12,.16),-.48,.32,-1.22),_e(new oe(.28,.12,.16),.02,.3,-1.18),_e(new oe(.28,.12,.16),.5,.32,-1.22),_e(new oe(.28,.12,.16),.96,.3,-1.16)],st(De.concrete,{roughness:.88,metalness:.02})),i=Wt([_e(new oe(2.55,.12,1.85),0,.1,.05),_e(new oe(.34,.14,.18),-.7,.28,-1.02),_e(new oe(.34,.14,.18),0,.28,-1.02),_e(new oe(.34,.14,.18),.7,.28,-1.02)],st(De.sand,{roughness:.94,metalness:0})),r=st(n.main,{roughness:.55,metalness:.1});r.emissive=new Pe(n.glow),r.emissiveIntensity=0;const s=Wt([_e(new oe(2.05,.52,1.28),0,.42,0),_e(new oe(1.15,.5,.82),0,1.12,.02),_e(new oe(.72,.22,.52),0,1.46,.02)],r);s.userData.slot="body";const o=Wt([_e(new oe(2.2,.1,1.42),0,.72,0),_e(new oe(2.2,.16,.12),0,.86,.64),_e(new oe(.14,.22,1.2),-1.02,.9,0),_e(new oe(.14,.22,1.2),1.02,.9,0),_e(new oe(1.7,.08,.1),0,.84,-.6)],st(n.deep,{roughness:.6,metalness:.08}));o.userData.slot="roof";const a=Wt([_e(new oe(.46,.32,.06),0,.3,-.68),_e(new oe(.08,.14,.05),-.62,.52,-.66),_e(new oe(.08,.14,.05),.62,.52,-.66),_e(new oe(.5,.04,.05),0,.2,-.7),_e(new oe(.5,.04,.05),0,.3,-.7)],st(De.ink,{roughness:.8,metalness:.12})),l=Wt([_e(new Xt(.045,.06,.7,6),.22,1.72,.02),_e(new Xt(.34,.4,.06,10),.22,1.99,.02,.4,.15,.5),_e(new ni(.2,.012,6,14),.22,2.02,.04,1.05,.2,0),_e(new oe(.03,.85,.03),-.48,1.85,-.08),_e(new oe(.32,.025,.025),-.48,2.2,-.08),_e(new Xt(.018,.022,.9,5),.78,2.2,.05),_e(new oe(.16,.02,.02),.78,2.55,.05)],st(De.metal,{roughness:.38,metalness:.55})),c=Qc(n.flag);c.position.set(.78,2.49,0);const u=eu(1.42),h=new Ze(new ni(1.38,.045,6,28),new Dt({color:n.glow,transparent:!0,opacity:.9,toneMapped:!1}));return h.rotation.x=Math.PI/2,h.position.y=.14,h.visible=!1,e.userData.pip=u,e.userData.pulse=r,e.userData.dangerRing=h,e.add(t,i,s,o,a,l,c,u,h),e}function Gg(n){const e=new an,t=Wt([_e(new oe(2.05,.1,1.35),0,.06,.05),_e(new oe(.22,.12,.16),-.85,.16,-.55),_e(new oe(.22,.12,.16),.85,.16,-.55),_e(new oe(.22,.12,.16),-.85,.16,.45),_e(new oe(.22,.12,.16),.85,.16,.45)],st(De.sand,{roughness:.94,metalness:0})),i=new Ze(new oe(1.62,.46,.92),st(n.main,{roughness:.58,metalness:.06}));i.position.y=.32,i.userData.slot="body",i.castShadow=!0,i.receiveShadow=!0;const r=Wt([_e(new oe(1.78,.08,1.02),0,.7,0),_e(new oe(1.7,.07,.62),0,.84,-.22,-.45,0,0),_e(new oe(1.7,.07,.62),0,.84,.22,.45,0,0),_e(new oe(.1,.28,.95),-.86,.84,0),_e(new oe(.1,.28,.95),.86,.84,0),_e(new oe(.18,.08,.16),-.35,.96,.05),_e(new oe(.18,.08,.16),.4,.96,-.12)],st(n.deep,{roughness:.62,metalness:.12}));r.userData.slot="roof";const s=Wt([_e(new oe(.7,.045,.04),0,.18,-.48),_e(new oe(.7,.045,.04),0,.26,-.48),_e(new oe(.7,.045,.04),0,.34,-.48),_e(new oe(.22,.06,.04),-.52,.48,-.46),_e(new oe(.22,.06,.04),.52,.48,-.46)],st(De.ink,{roughness:.78,metalness:.16})),o=new Ze(new oe(.55,.04,.38),st(De.concrete,{roughness:.84}));o.position.set(0,.1,-.86),o.receiveShadow=!0;const a=Wt([_e(new Xt(.02,.024,.48,5),-.72,1.02,0),_e(new oe(.08,.42,.08),-.78,.32,-.4),_e(new oe(.08,.42,.08),.78,.32,-.4),_e(new oe(.08,.42,.08),-.78,.32,.38),_e(new oe(.08,.42,.08),.78,.32,.38)],st(De.metal,{roughness:.42,metalness:.4})),l=Qc(n.flag);l.scale.setScalar(.65),l.position.set(-.72,1.22,0);const c=eu(1.12);return e.userData.pip=c,e.add(t,i,r,s,o,a,l,c),e}function Hg(n){const e=new an,t=Wt([_e(new oe(.62,.16,.95),0,.22,0),_e(new oe(.4,.12,.42),0,.34,.06)],st(n.deep,{roughness:.48,metalness:.32})),i=new Ze(new oe(.05,.05,.55),st(De.metal,{roughness:.35,metalness:.6}));i.position.set(0,.36,-.55),t.userData.slot="roof";const r=Wt([_e(new oe(.12,.14,1.02),-.36,.12,0),_e(new oe(.12,.14,1.02),.36,.12,0)],st(De.ink,{roughness:.8,metalness:.2}));return e.add(t,r,i),e.scale.setScalar(1),e}function Vg(n,e){const t=Yn(e);n.traverse(i=>{if(!i.material||!i.userData.slot)return;const r=i.userData.slot;r==="body"?(i.material.color.setHex(t.main),i.material.emissive&&i.material.emissive.setHex(t.glow)):r==="roof"?i.material.color.setHex(t.deep):r==="flag"&&i.material.color.setHex(t.flag)})}const Yr=new Pe;function os(n,e,t){Yr.setHex(n),e[t]=Yr.r,e[t+1]=Yr.g,e[t+2]=Yr.b}function Wg(){const e=new Float32Array([-.5,-.045,0,.5,-.045,0,.5,0,0,-.5,0,0,-.5,0,0,.5,0,0,.5,.045,0,-.5,.045,0]),t=new Float32Array(24);for(let r=0;r<4;r++)os(13172696,t,r*3);for(let r=4;r<8;r++)os(16765128,t,r*3);const i=new vt;return i.setAttribute("position",new dt(e,3)),i.setAttribute("color",new dt(t,3)),i.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]),i.rotateX(-Math.PI/2),i}function Xg(){const e=new Float32Array([-.5,-.14,0,.5,-.14,0,.5,0,0,-.5,0,0,-.5,0,0,.5,0,0,.5,.14,0,-.5,.14,0]),t=new Float32Array(24);for(let r=0;r<4;r++)os(De.player.main,t,r*3);for(let r=4;r<8;r++)os(De.enemy.main,t,r*3);const i=new vt;return i.setAttribute("position",new dt(e,3)),i.setAttribute("color",new dt(t,3)),i.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]),i.rotateX(-Math.PI/2),i}function Zs(n,e){const t=new Ze(n,e);return t.visible=!1,t.renderOrder=6,t.frustumCulled=!1,t}function Ti(n,e,t){if(!e.length)return;const i=_a(e);for(let s=0;s<e.length;s++)e[s].dispose();const r=new Ze(i,t);r.castShadow=!0,r.receiveShadow=!0,n.add(r)}function js(n,e,t,i,r,s){const o=new Xt(.05*r,.09*r,.34*r,5);o.translate(t,.06+.16*r,i),n.push(o);const a=e[s]||(e[s]=[]),l=new mr(.42*r,.62*r,7);l.translate(t,.06+.52*r,i);const c=new mr(.28*r,.48*r,6);c.translate(t,.06+.92*r,i),a.push(l,c)}const ec=[[-3.05,6.15,1.08,De.leaf],[-3.25,4.15,.82,De.leafDeep],[3.15,5.55,1.12,De.leaf],[3.3,3.35,.74,De.leaf],[-3.15,1.05,.9,De.leafDeep],[3.05,.7,.78,De.leaf],[-3.2,-1.45,1,De.leaf],[3.2,-1.7,.88,De.leafDeep],[2.95,-4.55,.8,De.leaf],[-3.15,-5.15,1.05,De.leaf],[2.45,-6.85,.7,De.leafDeep],[-2.15,7.05,.76,De.leaf],[1.55,7.15,.64,De.leaf],[-1.35,-7.15,.7,De.leaf]];function qg(n){let e=1/0,t=-1/0,i=1/0,r=-1/0;const s=n.zones;for(let o=0;o<s.length;o++){const a=s[o];e=Math.min(e,a.x-a.rx),t=Math.max(t,a.x+a.rx),i=Math.min(i,a.z-a.rz),r=Math.max(r,a.z+a.rz)}return{minX:e,maxX:t,minZ:i,maxZ:r}}function Yg(n,e,t,i){const r=new Set,s=[],o=Object.keys(e.graph);for(let a=0;a<o.length;a++){const l=o[a],c=e.graph[l];for(let u=0;u<c.length;u++){const h=c[u],f=l<h?`${l}|${h}`:`${h}|${l}`;if(r.has(f))continue;r.add(f);const p=e.nodes[l],g=e.nodes[h],_=new Ze(t);Og(_,p.x,p.z,g.x,g.z,.12),_.updateMatrix();const m=t.clone();m.applyMatrix4(_.matrix),s.push(m)}}Ti(n,s,i),t.dispose()}function Kg(n,e){const t=new an,i=qg(n),r=new Ze(new Xt(1,1.08,.5,10),st(De.meadow,{roughness:.94})),s=Math.max(7.6,(i.maxX-i.minX)*1.05),o=Math.max(12.2,(i.maxZ-i.minZ)*.92);r.scale.set(s,1,o),r.position.y=-.28,r.receiveShadow=!0,r.castShadow=!1,t.add(r);const a={};for(let $=0;$<n.buildings.length;$++)a[n.buildings[$].id]=n.buildings[$].owner;const l=new Map;for(let $=0;$<n.zones.length;$++){const G=n.zones[$],ee=a[G.buildingId],ue=ee?Yn(ee).slab:De.meadow,te=new Ze(new Xt(1,1.02,.045,18),st(ue,{roughness:.96,metalness:0}));ee&&(te.userData.owner=ee),te.scale.set(G.rx,1,G.rz),te.position.set(G.x,.02+$*.006,G.z),te.rotation.y=0,te.receiveShadow=!0,te.castShadow=!1,t.add(te),l.set(G.buildingId,te)}const c=new Ze(new oe(Math.max(6.4,i.maxX-i.minX+.8),.05,.58),st(De.stream,{roughness:.28}));c.position.set(0,.08,0),c.receiveShadow=!0,t.add(c);const u=st(De.bridge),h=[],f=new oe(.92,.08,1.35);f.translate(0,.16,0),h.push(f);for(const $ of[-.42,.42]){const G=new oe(.08,.22,1.35);G.translate($,.28,0),h.push(G)}Ti(t,h,u);const p=new oe(.72,.07,1),g=st(De.road,{roughness:.88});Yg(t,n,p,g);const _=[],m={};if(n.id==="crossing"){for(let ue=0;ue<ec.length;ue++){const[te,se,ae,Ue]=ec[ue];js(_,m,te,se,ae,Ue)}const $=new da(.22,0),G=[],ee=[[2.55,6.4,.85],[-2.7,-6.5,.7],[3.4,-.2,.55],[-3.45,2.4,.62],[3.15,-6.2,.48],[-3.05,-2.4,.4]];for(let ue=0;ue<ee.length;ue++){const[te,se,ae]=ee[ue],Ue=$.clone();Ue.scale(ae,ae*.62,ae*.85),Ue.translate(te,.08,se),G.push(Ue);const D=$.clone();D.scale(ae*.45,ae*.35,ae*.4),D.translate(te+.28*ae,.06,se+.22*ae),G.push(D)}$.dispose(),Ti(t,G,st(De.rock,{roughness:.9,metalness:.02}))}else for(let $=0;$<n.zones.length;$++){const G=n.zones[$];js(_,m,G.x-G.rx+.45,G.z+G.rz*.35,.85,$%2?De.leafDeep:De.leaf),js(_,m,G.x+G.rx-.4,G.z-G.rz*.2,.7,De.leaf)}Ti(t,_,st(De.trunk));const d=Object.keys(m);for(let $=0;$<d.length;$++)Ti(t,m[d[$]],st(Number(d[$])));const M=new Map,E=[],x=[],C={x:0,z:0};for(let $=0;$<n.buildings.length;$++){const G=n.buildings[$],ee=G.kind==="hq"?kg(Yn(G.owner)):Gg(Yn(G.owner)),ue=n.nodes[G.node];Fg(n,G.node,C),ee.position.set(ue.x,.06,ue.z),ee.rotation.y=xa(C.x,C.z);const te=G.kind==="hq"?.72:.78;if(ee.userData.baseScale=te,ee.scale.setScalar(te),ee.userData.owner=G.owner,ee.traverse(ae=>{ae.userData&&ae.userData.flutter&&E.push(ae)}),G.kind==="barracks"){const ae=Hg(Yn(G.owner));ae.position.set(1.15,0,-.35),ee.add(ae)}t.add(ee),M.set(G.id,ee);const se=new ms(G.kind==="hq"?1.55:1.2,10);se.rotateX(-Math.PI/2),se.translate(ue.x,.045,ue.z),x.push(se)}Ti(t,x,new Dt({color:De.ink,transparent:!0,opacity:.46,depthWrite:!1}));const w=new Dt({vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!0,side:Bt,toneMapped:!1}),T=new Dt({vertexColors:!0,transparent:!0,opacity:.2,depthWrite:!1,depthTest:!0,side:Bt,toneMapped:!1}),R=Xg(),y=Wg(),v=new Dt({vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1,depthTest:!0,side:Bt,toneMapped:!1}),P=[],O=[],F=[];for(let $=0;$<8;$++){const G=Zs(R,w);t.add(G),P.push(G);const ee=Zs(R,T);t.add(ee),O.push(ee);const ue=Zs(y,v);ue.renderOrder=7,t.add(ue),F.push(ue)}const W=Lg(n.zones),Y=[],X={},J=new ni(1.05,.05,8,32);J.rotateX(Math.PI/2);const H=new Ze(J,new Dt({color:4050554}));H.position.y=.2,H.visible=!1,t.add(H);const ce=new ni(.95,.035,6,28);ce.rotateX(Math.PI/2);const he=new Ze(ce,new Dt({color:16777215}));he.position.y=.18,he.visible=!1,t.add(he);const xe=new Ze(new Xt(.07,.07,1,6),new Dt({color:16774344,transparent:!0,opacity:.95}));xe.visible=!1,xe.frustumCulled=!1,t.add(xe);const Ie=new Ze(new mr(.2,.46,8),new Dt({color:16774344}));Ie.visible=!1,Ie.frustumCulled=!1,t.add(Ie);const qe=new Ze(new gs(.12,8,6),new Dt({color:16054260}));qe.visible=!1,t.add(qe);function q($,G,ee){let ue,te;const se=ee&&ee.nodes||n.nodes,ae=G&&se[G];if(ae)ue=ae.x,te=ae.z;else if(ee&&G){const Ue=ee.squads;for(let D=0;D<Ue.length;D++)if(Ue[D].id===G){ue=Ue[D].x,te=Ue[D].z;break}}if(ue===void 0){$.visible=!1;return}$.visible=!0,$.position.x=ue,$.position.z=te}function ie($,G,ee){const ue=$.squads;for(let te=0;te<ue.length;te++){const se=ue[te];if(se.mode==="siege"&&se.targetId===G&&se.owner!==ee&&se.count>0)return!0}return!1}return{group:t,resetDrag(){xe.visible=!1,Ie.visible=!1,qe.visible=!1,he.visible=!1},setDrag($,G,ee,ue){const te=n.nodes,se=ue||$&&te[$];if(!$||!G||!se){xe.visible=!1,Ie.visible=!1,qe.visible=!1;return}const ae=G.x-se.x,Ue=G.z-se.z,D=Math.hypot(ae,Ue);if(D<.08?(xe.visible=!1,Ie.visible=!1):(xe.visible=!0,Ie.visible=!0,xe.scale.set(1.4,D,1.4),xe.position.set((se.x+G.x)/2,.55,(se.z+G.z)/2),ss.set(ae/D,0,Ue/D),xe.quaternion.setFromUnitVectors(Ug,ss),Ie.quaternion.copy(xe.quaternion),Ie.position.set(G.x,.55,G.z)),qe.visible=!0,qe.position.set(G.x,.28,G.z),ee&&ee!==$&&te[ee]){he.visible=!0;const ct=te[ee];he.position.x=ct.x,he.position.z=ct.z}else he.visible=!1},update($,G,ee){for(let te=0;te<G.buildings.length;te++){const se=G.buildings[te];X[se.id]=se.owner;const ae=M.get(se.id);if(!ae)continue;ae.userData.owner!==se.owner&&(ae.userData.owner=se.owner,Vg(ae,se.owner));const Ue=l.get(se.id);Ue&&Ue.userData.owner!==se.owner&&(Ue.userData.owner=se.owner,Ue.material.color.setHex(Yn(se.owner).slab));const D=se.upgrades;ae.userData.pip&&(ae.userData.pip.visible=!!(D&&(D.haste>0||D.bulwark>0)));const ct=se.kind==="hq"&&(se.count<=0||ie(G,se.id,se.owner)),Oe=ae.userData.baseScale||1;if(ct&&!e){const Xe=Oe*(1+.045*Math.sin($*9));ae.scale.setScalar(Xe)}else ae.scale.setScalar(Oe);const Be=ae.userData.pulse;Be&&(Be.emissiveIntensity=ct?.45+(e?0:.4*Math.sin($*9)):0);const Te=ae.userData.dangerRing;if(Te&&(Te.visible=!!ct,ct)){const Xe=1+(e?0:.18*(.5+.5*Math.sin($*6)));Te.scale.set(Xe,Xe,Xe),Te.material.color.setHex(Yn(se.owner).glow)}}const ue=Ig(W,X,Y);w.opacity=.92;for(let te=0;te<P.length;te++){const se=ue[te],ae=P[te],Ue=F[te];if(!se){ae.visible=!1,O[te].visible=!1,Ue.visible=!1;continue}const D=se.axis!=="z",ct=D?Math.max(.8,se.x1-se.x0):Math.max(.8,se.z1-se.z0),Oe=D?(se.x0+se.x1)/2:se.x,Be=D?se.z:(se.z0+se.z1)/2,Te=se.plusOwner==="player"?0:Math.PI,Xe=D?Te:Math.PI/2+Te;ae.visible=!0,ae.position.set(Oe,.22,Be),ae.scale.set(ct,1,3.2),ae.rotation.y=Xe;const Ce=O[te];Ce.visible=!0,Ce.position.set(Oe,.08,Be),Ce.scale.set(ct,1,4.2),Ce.rotation.y=Xe,Ue.visible=!0,Ue.position.set(Oe,.62,Be),Ue.scale.set(ct,1,8),Ue.rotation.y=Xe}for(let te=ue.length;te<O.length;te++)O[te].visible=!1,F[te].visible=!1;q(H,ee,G),!e&&H.visible&&(H.rotation.y=$*.8);for(let te=0;te<E.length;te++){const se=E[te];se.rotation.y=e?0:Math.sin($*2.2+te)*.4}},dispose(){const $=new Set,G=new Set;t.traverse(ee=>{ee.geometry&&$.add(ee.geometry),ee.material&&G.add(ee.material)});for(const ee of $)ee.dispose();for(const ee of G)ee.dispose()}}}function $g(){const n=new gs(46,20,12),e=n.attributes.position,t=new Float32Array(e.count*3),i=new Pe(15003382),r=new Pe(De.sky),s=new Pe(6713946),o=new Pe;for(let l=0;l<e.count;l++){const c=e.getY(l)/46,u=Bh.clamp((c+.15)/1.15,0,1);u<.42?o.copy(s).lerp(r,u/.42):o.copy(r).lerp(i,(u-.42)/.58),t[l*3]=o.r,t[l*3+1]=o.g,t[l*3+2]=o.b}n.setAttribute("color",new dt(t,3));const a=new Ze(n,new Dt({vertexColors:!0,side:At,depthWrite:!1,fog:!1,toneMapped:!1}));return a.frustumCulled=!1,a.renderOrder=-2,a}function Zg(n){const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;n.add($g());const t=new ms(26,48),i=t.attributes.position,r=new Float32Array(i.count*3),s=new Pe(De.meadow),o=new Pe(De.meadowDeep),a=new Pe(8227416),l=new Pe;for(let g=0;g<i.count;g++){const _=i.getX(g),m=i.getY(g),d=Math.sin(_*.55)*Math.cos(m*.47)+Math.sin((_+m)*.23)*.4;l.copy(d>.35?a:d<-.25?o:s),r[g*3]=l.r,r[g*3+1]=l.g,r[g*3+2]=l.b}t.setAttribute("color",new dt(r,3));const c=new Ze(t,st(16777215,{vertexColors:!0,roughness:.96,metalness:0}));c.rotation.x=-Math.PI/2,c.position.y=-.66,c.receiveShadow=!0,n.add(c);const u=new Ze(new pa(16.5,26,40),st(De.water,{roughness:.4,metalness:.04}));u.rotation.x=-Math.PI/2,u.position.y=-.64,n.add(u);const h=new an;n.add(h);let f=null;function p(g){f&&(h.remove(f.group),f.dispose(),f=null),f=Kg(g,e),h.add(f.group)}return{mount:p,resetDrag(){f&&f.resetDrag()},setDrag(g,_,m,d){f&&f.setDrag(g,_,m,d)},update(g,_,m){f&&f.update(g,_,m)}}}const jg="long-road",Jg="長路",Qg="前後哨站，路更長",e_="cautious",t_={"player-hq":{x:0,z:7.2},"player-road":{x:0,z:5},"player-bar":{x:1.75,z:5},"player-post":{x:0,z:1.35},"enemy-post":{x:0,z:-1.35},"enemy-road":{x:0,z:-5},"enemy-bar":{x:-1.75,z:-5},"enemy-hq":{x:0,z:-7.2}},n_={"player-hq":["player-road"],"player-road":["player-hq","player-bar","player-post"],"player-bar":["player-road"],"player-post":["player-road","enemy-post"],"enemy-post":["player-post","enemy-road"],"enemy-road":["enemy-post","enemy-bar","enemy-hq"],"enemy-bar":["enemy-road"],"enemy-hq":["enemy-road"]},i_=[{buildingId:"player-hq",x:0,z:6.55,rx:3.15,rz:1.15},{buildingId:"player-bar",x:.3,z:4.75,rx:3.2,rz:.95},{buildingId:"player-post",x:0,z:1.45,rx:3.15,rz:1.2},{buildingId:"enemy-post",x:0,z:-1.45,rx:3.15,rz:1.2},{buildingId:"enemy-bar",x:-.3,z:-4.75,rx:3.2,rz:.95},{buildingId:"enemy-hq",x:0,z:-6.55,rx:3.15,rz:1.15}],r_=["player-hq","player-road","player-post","enemy-post","enemy-road","enemy-hq"],s_=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:14,cap:30,regen:.3},{id:"player-bar",kind:"barracks",owner:"player",node:"player-bar",count:22,cap:48,regen:2},{id:"player-post",kind:"barracks",owner:"player",node:"player-post",count:12,cap:36,regen:1.4},{id:"enemy-post",kind:"barracks",owner:"enemy",node:"enemy-post",count:12,cap:36,regen:1.15},{id:"enemy-bar",kind:"barracks",owner:"enemy",node:"enemy-bar",count:16,cap:44,regen:1.45},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:36,cap:48,regen:0}],o_={id:jg,name:Jg,blurb:Qg,personality:e_,nodes:t_,graph:n_,zones:i_,road:r_,buildings:s_},a_="two-lanes",l_="雙橋",c_="左右兩條路，可以分兵",u_="aggressive",h_={"player-hq":{x:0,z:6.6},"hub-p":{x:0,z:4.3},"player-west":{x:-1.85,z:1.25},"player-east":{x:1.85,z:1.25},"enemy-west":{x:-1.85,z:-1.25},"enemy-east":{x:1.85,z:-1.25},"hub-e":{x:0,z:-4.3},"enemy-hq":{x:0,z:-6.6}},f_={"player-hq":["hub-p"],"hub-p":["player-hq","player-west","player-east"],"player-west":["hub-p","enemy-west"],"player-east":["hub-p","enemy-east"],"enemy-west":["player-west","hub-e"],"enemy-east":["player-east","hub-e"],"hub-e":["enemy-west","enemy-east","enemy-hq"],"enemy-hq":["hub-e"]},d_=[{buildingId:"player-hq",x:0,z:6.15,rx:3.2,rz:1.15},{buildingId:"player-west",x:-1.9,z:1.35,rx:1.5,rz:1.1},{buildingId:"player-east",x:1.9,z:1.35,rx:1.5,rz:1.1},{buildingId:"enemy-west",x:-1.9,z:-1.35,rx:1.5,rz:1.1},{buildingId:"enemy-east",x:1.9,z:-1.35,rx:1.5,rz:1.1},{buildingId:"enemy-hq",x:0,z:-6.15,rx:3.2,rz:1.15}],p_=["player-hq","hub-p","player-west","enemy-west","hub-e","enemy-hq"],m_=[{id:"player-hq",kind:"hq",owner:"player",node:"player-hq",count:12,cap:28,regen:.28},{id:"player-west",kind:"barracks",owner:"player",node:"player-west",count:18,cap:42,regen:1.8},{id:"player-east",kind:"barracks",owner:"player",node:"player-east",count:18,cap:42,regen:1.8},{id:"enemy-west",kind:"barracks",owner:"enemy",node:"enemy-west",count:14,cap:40,regen:1.45},{id:"enemy-east",kind:"barracks",owner:"enemy",node:"enemy-east",count:14,cap:40,regen:1.45},{id:"enemy-hq",kind:"hq",owner:"enemy",node:"enemy-hq",count:40,cap:50,regen:0}],g_={id:a_,name:l_,blurb:c_,personality:u_,nodes:h_,graph:f_,zones:d_,road:p_,buildings:m_};function as(n,e,t=hs){if(n===e)return[n];if(!t[n]||!t[e])return null;const i={[n]:null},r=[n];for(;r.length;){const s=r.shift(),o=t[s]||[];for(let a=0;a<o.length;a++){const l=o[a];if(!Object.prototype.hasOwnProperty.call(i,l)){if(i[l]=s,l===e){const c=[e];let u=e;for(;i[u];)u=i[u],c.push(u);return c.reverse(),c}r.push(l)}}}return null}const fr=[Hi,o_,g_],Xo={easy:{id:"easy",label:"易",sendMinScale:.7,periodScale:1.55,regenScale:.6,reactDelay:3.6,firstShift:0,hqGrace:36,marchCap:8},normal:{id:"normal",label:"中",sendMinScale:1,periodScale:1,regenScale:1,reactDelay:.45,firstShift:0,hqGrace:20,marchCap:0,reliefKeep:.3,counterKeep:.3,holdWall:!0,riposte:6,hqRegen:.1,waveKeep:.58,maxRelief:1,barBonus:0,hqBonus:16,reliefCap:24,counterCap:16},hard:{id:"hard",label:"難",sendMinScale:.85,periodScale:.9,regenScale:1.08,reactDelay:.35,firstShift:-6,hqGrace:12,marchCap:0,reliefKeep:.3,counterKeep:.3,holdWall:!0,riposte:12,hqRegen:.08,waveKeep:.68,maxRelief:1,barBonus:12,hqBonus:18,reliefCap:26,counterCap:16}};function __(n){for(let e=0;e<fr.length;e++)if(fr[e].id===n)return fr[e];return Hi}function x_(n){return Xo[n]||Xo.normal}function v_(n,e){const t=e&&e.firstShift?e.firstShift:0;return Math.max(4,n+t)}function tc(n){const e=Math.floor(n*.5);return Math.max(0,Math.min(e,n-8))}function M_(n,e,t,i,r,s){return n>=e?!0:!t||i==null||s?!1:n>=i+r}function y_(n,e){return n==="aggressive"?(e.kind==="hq"?40:16)-e.count-e.travel*.5:n==="cautious"?(e.kind==="hq"?-20:0)-e.travel*2-e.count*.05:-e.travel*10-e.count*.01}function S_(n,e,t){let i=null,r=-1/0;const s=e??n.length;for(let o=0;o<s;o++){if(t&&n[o].kind==="hq")continue;const a=n[o].count*10-n[o].travel;a>r&&(r=a,i=n[o])}return i}function E_(n,e,t,i){let r=null,s=-1/0;const o=t??e.length;for(let a=0;a<o;a++){if(i&&e[a].kind==="hq")continue;const l=y_(n,e[a]);l>s&&(s=l,r=e[a])}return r}function b_(n,e){if(e.relief=!1,e.counter=!1,!M_(n.t,n.nextSendAt,n.underAttack,n.alarmAt,n.reactDelay,n.answered)||n.count<2||n.kind==="hq"&&(n.wave||0)>=2)return!1;const i=!!(n.holdWall&&n.underAttack&&n.ownsThreatened&&n.threatenedId),r=i&&n.buildingId===n.threatenedId;if(r&&n.count>=8)return!1;const s=i&&!r;if(n.kind==="hq"&&(n.wave||0)>=1&&!s)return!1;if(s){const u=n.reliefKeep>0?n.reliefKeep:.35,h=n.counterKeep>0?n.counterKeep:u,f=n.relieve?u:h;let p=Math.min(n.count-1,Math.max(0,Math.floor(n.count*f)));if(n.marchCap>0){const M=n.count-n.marchCap;M>p&&(p=M)}const g=n.reliefCap>0?n.reliefCap:12,_=n.counterCap>0?n.counterCap:10;if(n.relieve){const M=Math.min(g,n.count-1),E=n.count-M;E>p&&(p=E)}else{const M=n.count-_;M>p&&(p=M)}if(n.count-p<1)return!1;if(n.relieve)return e.targetId=n.threatenedId,e.keep=p,e.relief=!0,!0;if(n.threatenedKind==="hq"&&n.riposte>0&&n.alarmAt!=null&&n.t<n.alarmAt+n.riposte)return!1;const m=n.hqGrace>0&&n.t<n.hqGrace,d=S_(n.targets,n.targetCount,m);return d?(e.targetId=d.id,e.keep=p,e.counter=!0,!0):!1}if(!s&&n.t<n.nextSendAt&&!(n.kind==="hq"?n.count<14:n.count<n.sendMin)&&!n.opened)return!1;const o=!!(n.underAttack&&n.threatenedId&&!n.pressing);if(!s&&o&&n.buildingId!==n.threatenedId&&n.ownsThreatened){const u=n.reliefKeep>0?n.reliefKeep:.35,h=Math.min(n.count-1,Math.max(0,Math.floor(n.count*u)));return n.count-h<1?!1:(e.targetId=n.threatenedId,e.keep=h,!0)}if(!o){if(n.kind==="hq"){const u=tc(n.count);if(n.count<14||n.count-u<8)return!1}else if(n.count<n.sendMin)return!1}const a=n.hqGrace>0&&n.t<n.hqGrace,l=E_(n.personality,n.targets,n.targetCount,a);if(!l)return!1;let c=0;if(n.kind==="hq"&&!o){c=tc(n.count);const u=n.count-14;u>c&&(c=u)}else o?c=n.count>=3?1:0:n.personality==="cautious"&&(c=Math.min(n.count-1,Math.max(0,Math.floor(n.count*.3))));if(n.marchCap>0&&!o){const u=n.count-n.marchCap;u>c&&(c=u)}if(!o&&n.waveKeep>0&&n.kind!=="hq"){const u=Math.floor(n.count*n.waveKeep);u>c&&(c=Math.min(u,n.count-1))}return n.count-c<1?!1:(e.targetId=l.id,e.keep=c,!0)}const qt={clashEvery:.3,clashLoss:4,captureSeconds:.7,marchSpeed:4.8,contactRadius:.92,arriveRadius:.7,enemySendMin:16,enemySendPeriod:10,substep:.05},T_={"enemy-bar":16,"enemy-hq":22};function w_({garrison:n,attackerCount:e,attackerOwner:t,buildingOwner:i}){const r=Math.max(0,Math.floor(n||0)),s=Math.max(0,Math.floor(e||0));return r>0||s<=0||!t||!i?!1:t!==i}function A_(n,e,t,i){if(!i)return{progress:0,done:!1};const r=t,s=Math.max(0,n||0)+Math.max(0,e)/r;return s>=1?{progress:1,done:!0}:{progress:s,done:!1}}function R_(n,e){return{owner:n,count:Math.max(0,Math.floor(e||0)),capture:0}}function C_(n,e){return n!=="player"?"lose":e==="player"?"win":null}function nc(n,e,t){const i=Math.max(0,Math.floor(Number.isFinite(n)?n:0)),r=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),s=Math.max(0,Math.floor(Number.isFinite(t)?t:0)),o=Math.min(i,r,s),a=i-o,l=r-o;let c=null;return a===0&&l===0?c="none":a>0&&l===0?c="a":l>0&&a===0&&(c="b"),{a,b:l,loss:o,winner:c}}function P_(n,e){const t=n.map(c=>Math.max(0,Math.floor(c))),i=t.reduce((c,u)=>c+u,0),r=Math.max(0,Math.floor(e));if(i<=0||r<=0)return t.map(()=>0);const s=t.map(c=>c/i*r),o=s.map(c=>Math.floor(c));let a=r-o.reduce((c,u)=>c+u,0);const l=s.map((c,u)=>({i:u,frac:c-Math.floor(c)})).sort((c,u)=>u.frac-c.frac||c.i-u.i);for(let c=0;c<l.length&&a>0;c++)o[l[c].i]+=1,a-=1;return o}function D_(n,e,t,i,r){const s=Math.max(0,n),o=Math.max(0,e);if(!(i>0)||s>=o||!(r>0))return{count:Math.min(s,o>0?Math.max(s,0):s),bank:s>=o?0:t||0};let a=(t||0)+i*r,l=s;const c=Math.floor(a);if(c>0){const u=Math.min(o-l,c);l+=u,a-=c,l>=o&&(l=o,a=0)}return{count:l,bank:a}}function L_(n,e){const t=n.owner==="enemy"&&e.regenScale>0?e.regenScale:1;let i=n.regen*t;n.owner==="enemy"&&n.kind==="hq"&&e.hqRegen>0&&(i+=e.hqRegen);let r=n.count,s=n.cap;return n.owner==="enemy"&&n.kind==="barracks"&&e.barBonus>0&&(r=Math.min(n.cap,n.count+e.barBonus)),n.owner==="enemy"&&n.kind==="hq"&&e.hqBonus>0&&(r=n.count+e.hqBonus,s=Math.max(n.cap,r)),{id:n.id,kind:n.kind,owner:n.owner,node:n.node,count:r,cap:s,regen:i,baseRegen:n.regen,bank:0,capture:0,upgrades:{haste:0,bulwark:0}}}function I_(n={}){const e=__(n.mapId||"crossing"),t=x_(n.difficulty||"normal"),i=e.buildings.map(s=>L_(s,t)),r={};for(let s=0;s<i.length;s++){const o=i[s];if(o.owner!=="enemy")continue;const a=T_[o.id]??(o.kind==="hq"?22:16);r[o.id]=v_(a,t)}return{t:0,status:n.status||"playing",ai:n.ai!==!1,clashAcc:0,nextSquadId:1,nextSendAt:r,buildings:i,squads:[],events:[],map:e,nodes:e.nodes,graph:e.graph,personality:e.personality||"balanced",difficulty:t.id,sendMin:qt.enemySendMin*t.sendMinScale,sendPeriod:qt.enemySendPeriod*t.periodScale,reactDelay:t.reactDelay,hqGrace:t.hqGrace>0?t.hqGrace:0,marchCap:t.marchCap>0?t.marchCap:0,reliefKeep:t.reliefKeep>0?t.reliefKeep:0,holdWall:!!t.holdWall,riposte:t.riposte>0?t.riposte:0,counterKeep:t.counterKeep>0?t.counterKeep:0,waveKeep:t.waveKeep>0?t.waveKeep:0,maxRelief:t.maxRelief>0?t.maxRelief:0,reliefCap:t.reliefCap>0?t.reliefCap:12,counterCap:t.counterCap>0?t.counterCap:10,alarmAt:null,answered:{},opened:{},waveTurn:{},reliefCount:{}}}function Zi(n){return n&&n.nodes||Li}function Ma(n){return n&&n.graph||hs}function Ct(n,e){for(let t=0;t<n.buildings.length;t++)if(n.buildings[t].id===e)return n.buildings[t];return null}function Ai(n,e){if(!n)return null;for(let t=0;t<n.squads.length;t++)if(n.squads[t].id===e)return n.squads[t];return null}function tu(n,e,t){if(!n||n.status!=="playing")return{ok:!1,reason:"over"};const i=Ai(n,e),r=Ct(n,t);if(!i||i.owner!=="player"||i.count<=0)return{ok:!1,reason:"bad-squad"};if(!r)return{ok:!1,reason:"bad-target"};const s=i.path||[];if(!s.length)return{ok:!1,reason:"no-path"};const o=i.seg>=s.length-1,a=o?s[s.length-1]:s[i.seg],l=o?null:s[i.seg+1];let c;const u=Ma(n);if(!l)c=as(a,r.node,u);else{const h=as(l,r.node,u);if(!h)return{ok:!1,reason:"no-path"};c=h[0]===a?h:[a,...h]}return!c||c.length<2?{ok:!1,reason:"same"}:(i.targetId=r.id,i.path=c,i.seg=0,i.mode="march",n.events.push({type:"retarget",squadId:e,targetId:t,owner:i.owner}),{ok:!0})}function ic(n,e){let t=0;for(let i=0;i<n.buildings.length;i++){const r=n.buildings[i];r.owner===e&&(t+=r.count)}for(let i=0;i<n.squads.length;i++){const r=n.squads[i];r.owner===e&&(t+=r.count)}return t}function U_(n){const e=Math.max(0,Math.floor(n.count||0));if(e<=1)return 0;const t=Math.max(1,Math.floor(e*.2));return Math.min(t,6,e-1)}function ya(n,e,t,i=0){if(!n||n.status!=="playing")return{ok:!1,reason:"over"};const r=Ct(n,e),s=Ct(n,t);if(!r||!s||r.id===s.id)return{ok:!1,reason:"bad-target"};const o=Math.max(0,Math.floor(i));if(r.count-o<1)return{ok:!1,reason:"empty"};const a=as(r.node,s.node,Ma(n));if(!a||a.length<2)return{ok:!1,reason:"no-path"};const l=r.count-o;r.count=o,r.bank=0;const c=Zi(n)[a[0]],u={id:`sq${n.nextSquadId++}`,owner:r.owner,count:l,targetId:s.id,path:a,seg:0,x:c.x,z:c.z,mode:"march"};return n.squads.push(u),n.events.push({type:"send",owner:r.owner,count:l,fromId:e,targetId:t}),{ok:!0,count:l,id:u.id}}function N_(n,e,t){let i=qt.marchSpeed*e;for(;i>0&&n.seg<n.path.length-1;){const r=t[n.path[n.seg+1]],s=r.x-n.x,o=r.z-n.z,a=Math.hypot(s,o);if(a<=1e-6){n.x=r.x,n.z=r.z,n.seg+=1;continue}if(a<=i+1e-8)n.x=r.x,n.z=r.z,i-=a,n.seg+=1;else{const l=1/a;n.x+=s*l*i,n.z+=o*l*i,i=0}}}function F_(n,e){let t=0;for(let i=0;i<n.length-1;i++){const r=e[n[i]],s=e[n[i+1]];t+=Math.hypot(r.x-s.x,r.z-s.z)}return t}const Jn={id:null},Pn={targetId:"",keep:0,relief:!1,counter:!1},ls=[];for(let n=0;n<12;n++)ls.push({id:"",kind:"",count:0,travel:0});function O_(n){Jn.id=null,Jn.dist=1/0;let e=1/0,t=!1;const i=Zi(n);for(let r=0;r<n.squads.length;r++){const s=n.squads[r];if(s.owner!=="player"||s.count<=0||!s.targetId)continue;const o=Ct(n,s.targetId);if(!o||o.owner!=="enemy")continue;t=!0;const a=i[o.node],l=Math.hypot(s.x-a.x,s.z-a.z);l<e&&(e=l,Jn.id=o.id,Jn.dist=l)}return t}function B_(n,e){const t=Zi(n),i=Ma(n);let r=0;for(let s=0;s<n.buildings.length&&r<ls.length;s++){const o=n.buildings[s];if(o.owner!=="player")continue;const a=as(e,o.node,i);if(!a)continue;const l=ls[r];l.id=o.id,l.kind=o.kind,l.count=o.count,l.travel=a.length<2?0:F_(a,t),r+=1}return r}function z_(n){if(!n.ai)return;const e=O_(n);e?n.alarmAt==null&&(n.alarmAt=n.t):n.alarmAt!=null&&(n.alarmAt=null);const t=Ct(n,Jn.id),i=e&&Jn.dist<=qt.arriveRadius,r=n.opened||(n.opened={});let s=null;if(n.holdWall&&e&&t&&t.owner==="enemy"){const o=Zi(n),a=o[t.node];let l=1/0;if(a)for(let c=0;c<n.buildings.length;c++){const u=n.buildings[c];if(u.owner!=="enemy"||u.id===t.id||u.count<2)continue;const h=o[u.node];if(!h)continue;const f=(h.x-a.x)*(h.x-a.x)+(h.z-a.z)*(h.z-a.z);f<l&&(l=f,s=u.id)}}for(let o=0;o<n.buildings.length;o++){const a=n.buildings[o];if(a.owner!=="enemy")continue;const l=B_(n,a.node);if(!b_({t:n.t,nextSendAt:n.nextSendAt[a.id]??0,underAttack:e,alarmAt:n.alarmAt,reactDelay:n.reactDelay,answered:!!n.answered[a.id],count:a.count,kind:a.kind,buildingId:a.id,personality:n.personality,sendMin:n.sendMin,threatenedId:Jn.id,ownsThreatened:!!(t&&t.owner==="enemy"),targets:ls,targetCount:l,opened:!!r[a.id],pressing:i,hqGrace:n.hqGrace||0,marchCap:n.marchCap||0,reliefKeep:n.reliefKeep||0,holdWall:!!n.holdWall,counterKeep:n.counterKeep||0,waveKeep:n.waveKeep||0,wave:n.waveTurn[a.id]||0,reliefCap:n.reliefCap||0,counterCap:n.counterCap||0,riposte:n.riposte||0,threatenedKind:t?t.kind:"",relieve:!!(s&&s===a.id&&t&&t.owner==="enemy"&&t.kind==="barracks"&&t.count>=12&&n.maxRelief>0&&(n.reliefCount[a.id]||0)<n.maxRelief&&(n.waveTurn[a.id]||0)%2===0)},Pn)||!ya(n,a.id,Pn.targetId,Pn.keep).ok)continue;r[a.id]=!0,(Pn.relief||Pn.counter)&&(n.waveTurn[a.id]=(n.waveTurn[a.id]||0)+1),Pn.relief&&(n.reliefCount[a.id]=(n.reliefCount[a.id]||0)+1);let h=n.sendPeriod;(Pn.relief||Pn.counter)&&n.riposte>0&&(h=n.riposte),n.nextSendAt[a.id]=n.t+h,e&&(n.answered[a.id]=!0)}}function k_(n){const e=n.squads,t=new Set,i=[];for(let r=0;r<e.length;r++){const s=e[r];if(s.count<=0||t.has(s.id))continue;let o=null,a=qt.contactRadius;for(let l=0;l<e.length;l++){if(r===l)continue;const c=e[l];if(c.count<=0||t.has(c.id)||c.owner===s.owner)continue;const u=Math.hypot(s.x-c.x,s.z-c.z);u<=a&&(a=u,o=c)}o&&(t.add(s.id),t.add(o.id),i.push([s,o]))}return{pairs:i,paired:t}}function G_(n,e){for(let t=0;t<n.squads.length;t++){const i=n.squads[t];if(i.count<=0)continue;if(e.has(i.id)){i.mode="fight";continue}const r=Ct(n,i.targetId);if(!r){i.mode="march";continue}const s=Zi(n)[r.node],o=Math.hypot(i.x-s.x,i.z-s.z);if(i.seg>=i.path.length-1&&o<=qt.arriveRadius)if(r.owner===i.owner){const l=Math.max(0,r.cap-r.count),c=Math.min(i.count,l);c>0&&(r.count+=c,i.count-=c,n.events.push({type:"reinforce",buildingId:r.id,owner:i.owner})),i.count>0&&(i.x=s.x,i.z=s.z,i.mode="march")}else i.mode="siege",i.x=s.x,i.z=s.z;else i.mode="march"}}function H_(n,e){let t=!1;for(let r=0;r<e.length;r++){const s=e[r][0],o=e[r][1];if(s.count<=0||o.count<=0)continue;const a=nc(s.count,o.count,qt.clashLoss);s.count=a.a,o.count=a.b,t=!0}const i=new Map;for(let r=0;r<n.squads.length;r++){const s=n.squads[r];if(s.mode!=="siege"||s.count<=0)continue;let o=i.get(s.targetId);o||(o=[],i.set(s.targetId,o)),o.push(s)}for(const[r,s]of i){const o=Ct(n,r);if(!o||s.every(f=>f.owner===o.owner))continue;const a=s.filter(f=>f.owner!==o.owner&&f.count>0);if(!a.length)continue;const l=a.map(f=>f.count),c=l.reduce((f,p)=>f+p,0),u=nc(c,o.count,qt.clashLoss);o.count=u.b;const h=P_(l,u.a);for(let f=0;f<a.length;f++)a[f].count=h[f];o.count>0&&(o.capture=0),t=!0}t&&n.events.push({type:"clash"})}function V_(n,e){for(let t=0;t<n.buildings.length;t++){const i=n.buildings[t];let r=0,s=null;const o=[];for(let u=0;u<n.squads.length;u++){const h=n.squads[u];h.mode!=="siege"||h.targetId!==i.id||h.count<=0||h.owner!==i.owner&&(r+=h.count,s=h.owner,o.push(h))}const a=w_({garrison:i.count,attackerCount:r,attackerOwner:s,buildingOwner:i.owner}),l=A_(i.capture,e,qt.captureSeconds,a);if(i.capture=l.progress,!l.done||!s)continue;const c=R_(s,r);i.owner=c.owner,i.count=c.count,i.capture=0,i.bank=0;for(let u=0;u<o.length;u++)o[u].count=0;n.events.push({type:"capture",buildingId:i.id,owner:s})}}function W_(n){const e=Ct(n,"player-hq"),t=Ct(n,"enemy-hq"),i=C_(e&&e.owner,t&&t.owner);i&&n.status==="playing"&&(n.status=i,n.events.push({type:i}))}function X_(n,e){if(n.status!=="playing")return;for(let s=0;s<n.buildings.length;s++){const o=n.buildings[s];if(!(o.regen>0)||o.kind!=="barracks"&&o.kind!=="hq")continue;let a=!1;for(let u=0;u<n.squads.length;u++){const h=n.squads[u];if(h.mode==="siege"&&h.targetId===o.id&&h.owner!==o.owner&&h.count>0){a=!0;break}}if(a)continue;const l=o.count,c=D_(o.count,o.cap,o.bank,o.regen,e);o.count=c.count,o.bank=c.bank,o.count>l&&n.events.push({type:"spawn",buildingId:o.id,owner:o.owner})}z_(n);const t=Zi(n);for(let s=0;s<n.squads.length;s++){const o=n.squads[s];o.mode==="march"&&o.count>0&&N_(o,e,t)}const{pairs:i,paired:r}=k_(n);for(G_(n,r),n.clashAcc+=e;n.clashAcc>=qt.clashEvery;)n.clashAcc-=qt.clashEvery,H_(n,i);V_(n,e),n.squads.some(s=>s.count<=0)&&(n.squads=n.squads.filter(s=>s.count>0)),W_(n)}function nu(n,e,t={}){if(!n||n.status!=="playing"||!Number.isFinite(e)||e<=0)return n;t.ai===!1&&(n.ai=!1),t.ai===!0&&(n.ai=!0),n.events.length=0;let i=e;const r=qt.substep;for(;i>1e-8&&n.status==="playing";){const s=Math.min(r,i);X_(n,s),n.t+=s,i-=s}return n}const iu=document.getElementById("app"),_s=document.getElementById("view"),or=document.getElementById("hint"),Qn=document.getElementById("sheet"),Ri=document.getElementById("mute"),ln=document.getElementById("home"),ru=document.getElementById("upgrades"),su=document.getElementById("up-haste"),ou=document.getElementById("up-bulwark"),q_=document.getElementById("score-mine"),Y_=document.getElementById("score-foe"),Js=document.querySelector(".scores"),Gi=document.getElementById("coach"),cs=document.getElementById("toast"),rc=document.getElementById("sheet-time"),Et=Pg(_s),gr=Zg(Et.scene),Sa=Tg(Et.scene),au=wg(Et.scene);let qo=!0;const Ea=xg(document.getElementById("badges")),Lt=Su();let _r="crossing",xr="normal",Re=null,ut=null,us=!1,sc=0,Yo=!1;function lu(){const n=Lt.muted;Ri.textContent=n?"🔇":"🔊",Ri.setAttribute("aria-pressed",n?"true":"false"),Ri.setAttribute("aria-label",n?"打開聲音":"靜音"),Ri.classList.toggle("is-muted",n)}function K_(n){const e=Math.max(0,Math.floor(n||0));if(e<60)return`用咗 ${e} 秒`;const t=Math.floor(e/60),i=e%60;return`用咗 ${t} 分 ${i} 秒`}function Ko(){Gi&&(Gi.hidden=!0);try{localStorage.setItem(hc,"1")}catch{}}function cu(){if(!Gi)return;let n=!1;try{n=vu(localStorage.getItem(hc))}catch{n=!1}const e=!n&&Re&&Re.status==="playing"&&ln.hidden;Gi.hidden=!e}function $_(){if(!cs)return;let n=!1;if(Re&&Re.status==="playing"&&ln.hidden){const e=Re.squads;for(let t=0;t<e.length;t++){const i=e[t];if(i.owner==="enemy"&&i.count>0&&i.targetId==="player-hq"){n=!0;break}}}n!==Yo&&(Yo=n,cs.hidden=!n)}function It(n){if(ln&&!ln.hidden){or.textContent="揀地圖，再出戰";return}if(!Re||Re.status!=="playing"){or.textContent="再戰，或者揀地圖";return}n==="drag"?or.textContent="鬆手就出兵":n==="selected"?or.textContent="可以升級，或者拖去目標出兵":or.textContent="點自己建築，可以升級或者出兵"}function $o(n){Qn.hidden=!1,Qn.classList.toggle("win",n==="win"),Qn.classList.toggle("lose",n==="lose"),document.getElementById("sheet-title").textContent=n==="win"?"勝利":"戰敗",document.getElementById("sheet-kicker").textContent="戰果",document.getElementById("sheet-body").textContent=n==="win"?"攻陷敵方司令部":"司令部被攻陷",rc&&(rc.textContent=K_(Re&&Re.t)),It("idle")}function vr(){Qn.hidden=!0,Qn.classList.remove("win","lose")}function ba(){Re&&(q_.textContent=String(ic(Re,"player")),Y_.textContent=String(ic(Re,"enemy")))}function uu(){const n=Et.camera;ln&&!ln.hidden?Rg(n,n.aspect):jc(n,n.aspect)}function ii(n){ln.hidden=!n,Js&&(Js.hidden=!1,Js.classList.toggle("is-preview",!!n)),n&&(ru.hidden=!0),uu(),cu()}function ri(n){Re=I_({mapId:_r,difficulty:xr,status:n}),gr.mount(Re.map),Et.renderer.shadowMap.needsUpdate=!0,Sa.setMap(Re.map),Ea.setMap(Re.map),ut=null,us=!1,gr.resetDrag(),Yo=!1,cs&&(cs.hidden=!0),ba(),cu()}function xs(n,e,t){const i=n.querySelectorAll("button");for(let r=0;r<i.length;r++)i[r].classList.toggle("is-on",i[r].getAttribute(e)===t)}function hu(){const n=ut&&Re&&Re.status==="playing"?Ct(Re,ut):null,e=!!(n&&n.owner==="player"&&ln.hidden);ru.hidden=!e,e&&(oc(su,n,"haste"),oc(ou,n,"bulwark"))}function oc(n,e,t){const i=ts(e,t),r=i.reason==="max"?`${i.label} 滿級`:`${i.label} · ${i.cost}`;n.textContent!==r&&(n.textContent=r),n.disabled=!i.ok}function fu(n){const e=ut&&Ct(Re,ut);if(!e)return;const t=Fu(e,n);Lt.sfx(t.ok?"spawn":"nope"),hu()}function Z_(n){const e=new Set;for(let t=0;t<Re.events.length;t++)e.add(Re.events[t].type);e.has("win")?(Lt.sfx("win"),$o("win")):e.has("lose")?(Lt.sfx("lose"),$o("lose")):e.has("capture")?Lt.sfx("capture"):e.has("clash")&&Lt.sfx("clash"),e.has("spawn")&&n>sc&&Re.events.some(i=>i.type==="spawn"&&i.owner==="player")&&(Lt.sfx("spawn"),sc=n+900)}function ac(n,e){return Re.status!=="playing"||!n||!e||n===e?!1:(Ai(Re,n)?tu(Re,n,e):j_(n,e)).ok?(Lt.sfx("send"),ut=null,It("idle"),!0):(Lt.sfx("nope"),!1)}function j_(n,e){const t=Ct(Re,n);return!t||t.owner!=="player"?{ok:!1}:ya(Re,n,e,U_(t))}Ag(_s,Et.camera,()=>{const n=[];for(let e=0;e<Re.buildings.length;e++){const t=Re.buildings[e],r=(Re.nodes||Li)[t.node];n.push({id:t.id,owner:t.owner,kind:t.kind,x:r.x,z:r.z})}for(let e=0;e<Re.squads.length;e++){const t=Re.squads[e];t.count<=0||n.push({id:t.id,owner:t.owner,kind:"squad",x:$c(t.x,t.owner,t.mode),z:t.z})}return n},{unlock(){Lt.unlock()},onTap(n){if(Re.status!=="playing")return;if(!n){ut=null,It("idle");return}const e=Ai(Re,n);if(e&&e.owner!=="player")return;if(ut&&ut!==n){const r=Ai(Re,ut),s=Ct(Re,ut);if(r&&r.owner==="player"||s&&s.owner==="player"){ac(ut,n);return}}const t=Ct(Re,n);if(t&&t.owner==="player"){Ko(),ut=ut===n?null:n,It(ut?"selected":"idle");return}const i=Ai(Re,n);i&&i.owner==="player"&&(ut=ut===n?null:n,It(ut?"selected":"idle"))},onDragStart(n){us=!0,ut=n;const e=Ct(Re,n);e&&e.owner==="player"&&Ko(),It("drag")},onDragMove(n,e){const t=Ai(Re,ut);gr.setDrag(ut,n,e,t?{x:t.x,z:t.z}:null)},onDragEnd(n,e){us=!1,gr.resetDrag(),n&&e&&ac(n,e),It(ut?"selected":"idle")}});Ri.addEventListener("pointerdown",n=>{n.stopPropagation()});Ri.addEventListener("click",n=>{n.stopPropagation(),Lt.unlock(),Lt.toggle(),lu()});function On(n,e){n.addEventListener("pointerdown",t=>{t.stopPropagation()}),n.addEventListener("click",t=>{t.stopPropagation(),Lt.unlock(),e()})}function J_(n){const e=document.createElement("canvas");e.className="map-thumb";const t=320,i=180;e.width=t,e.height=i;const r=e.getContext("2d"),s=r.createLinearGradient(0,0,0,i);s.addColorStop(0,"#9eb8c8"),s.addColorStop(.22,"#7fa8c4"),s.addColorStop(.45,"#6b7a4e"),s.addColorStop(1,"#4e5c38"),r.fillStyle=s,r.fillRect(0,0,t,i);for(let x=0;x<70;x++){r.fillStyle=x%3?"rgba(90,104,64,0.55)":"rgba(125,139,88,0.7)";const C=x*47%(t-8),w=50+x*29%(i-58);r.fillRect(C,w,4,6)}const o=n.nodes||{},a=Object.keys(o);let l=1/0,c=-1/0,u=1/0,h=-1/0;for(let x=0;x<a.length;x++){const C=o[a[x]];C.x<l&&(l=C.x),C.x>c&&(c=C.x),C.z<u&&(u=C.z),C.z>h&&(h=C.z)}const f=c-l||1,p=h-u||1;function g(x){return{x:28+(x.x-l)/f*(t-56),y:36+(x.z-u)/p*(i-64)}}const _=g({x:0,z:(u+h)/2});r.fillStyle="#2f5a72",r.fillRect(0,_.y-9,t,18),r.fillStyle="#4e86a8",r.fillRect(0,_.y-3,t,5);for(let x=0;x<8;x++){const C=8+x*40;r.fillStyle="#2f4530",r.beginPath(),r.moveTo(C,_.y-28),r.lineTo(C+7,_.y-10),r.lineTo(C-7,_.y-10),r.fill(),r.beginPath(),r.moveTo(C,_.y+12),r.lineTo(C+6,_.y+26),r.lineTo(C-6,_.y+26),r.fill()}r.strokeStyle="#5c5348",r.lineWidth=7,r.lineCap="round",r.beginPath();const m=new Set,d=n.graph||{},M=Object.keys(d);for(let x=0;x<M.length;x++){const C=d[M[x]]||[],w=o[M[x]];for(let T=0;T<C.length;T++){const R=C[T],y=M[x]<R?`${M[x]}|${R}`:`${R}|${M[x]}`;if(m.has(y))continue;m.add(y);const v=o[R];if(!w||!v)continue;const P=g(w),O=g(v);r.moveTo(P.x,P.y),r.lineTo(O.x,O.y)}}r.stroke();const E=n.buildings||[];for(let x=0;x<E.length;x++){const C=E[x],w=o[C.node];if(!w)continue;const T=g(w),R=C.owner==="player"?"#2f9e5b":"#c43c32",y=C.owner==="player"?"#1b6b3d":"#8e241c";C.kind==="hq"?(r.fillStyle="#8a7a5c",r.fillRect(T.x-16,T.y-8,32,18),r.fillStyle=R,r.fillRect(T.x-10,T.y-14,20,16),r.fillStyle=y,r.fillRect(T.x-5,T.y-22,10,8),r.fillStyle="#8e9694",r.beginPath(),r.arc(T.x+8,T.y-20,4,0,Math.PI*2),r.fill()):(r.fillStyle="#c8b48a",r.fillRect(T.x-18,T.y-8,6,5),r.fillRect(T.x+12,T.y-8,6,5),r.fillStyle=R,r.fillRect(T.x-14,T.y-6,28,12),r.fillStyle="#1a2220",r.fillRect(T.x-6,T.y-2,12,3)),r.fillStyle=y;for(let v=0;v<6;v++)r.fillRect(T.x-14+v*5,T.y+10,3,4)}return e}const Zo=document.getElementById("maps"),jo=document.getElementById("diffs");for(let n=0;n<fr.length;n++){const e=fr[n],t=document.createElement("button");t.type="button",t.setAttribute("data-map",e.id),t.appendChild(J_(e));const i=document.createElement("span");i.className="map-name",i.textContent=e.name;const r=document.createElement("small");r.textContent=e.blurb,t.append(i,r),On(t,()=>{_r=e.id,xs(Zo,"data-map",_r),ri("menu"),ii(!0),It("idle")}),Zo.appendChild(t)}const lc=["easy","normal","hard"];for(let n=0;n<lc.length;n++){const e=lc[n],t=document.createElement("button");t.type="button",t.setAttribute("data-diff",e),t.textContent=Xo[e].label,On(t,()=>{xr=e,xs(jo,"data-diff",xr)}),jo.appendChild(t)}On(document.getElementById("start"),()=>{ri("playing"),vr(),ii(!1),It("idle")});function du(){vr(),ii(!0),ri("menu"),It("idle")}On(document.getElementById("home-btn"),du);On(document.getElementById("sheet-map"),du);On(su,()=>fu("haste"));On(ou,()=>fu("bulwark"));Gi&&On(Gi,Ko);document.getElementById("retry").addEventListener("click",()=>{Lt.unlock(),ri("playing"),vr(),ii(!1),It("idle")});function pu(){Et.resize(),uu()}const Q_=new ResizeObserver(pu);Q_.observe(iu);pu();lu();xs(jo,"data-diff",xr);xs(Zo,"data-map",_r);ri("menu");ii(!0);It("idle");ba();let cc=performance.now(),Kr=0,Qs=performance.now(),uc=0;function ex(n){if(uc+=1,uc<90){Kr=0,Qs=n;return}Kr+=1;const e=n-Qs;if(e<1600)return;const t=Kr*1e3/e;if(Kr=0,Qs=n,!(t>=40)){if(qo){qo=!1,au.setEnabled(!1);return}Et.shadowsOn&&Et.setShadows(!1)}}function mu(n){const e=Math.min(.05,(n-cc)/1e3);cc=n,Re&&Re.status==="playing"&&(nu(Re,e),Z_(n));const t=n/1e3,i=ln&&!ln.hidden||Qn&&!Qn.hidden,r=document.getElementById("badges");r&&(r.hidden=i),Re&&(gr.update(t,Re,us?null:ut),Sa.update(Re),au.update(e,Re),i||Ea.update(Re,Et.camera,_s),hu(),ba(),$_()),Et.renderer.render(Et.scene,Et.camera),ex(n),requestAnimationFrame(mu)}requestAnimationFrame(mu);window.__BL={get state(){return Re},pick:"screen-44",send(n,e){return ya(Re,n,e)},retarget(n,e){return tu(Re,n,e)},step(n){nu(Re,n),(Re.status==="win"||Re.status==="lose")&&$o(Re.status)},point(n){return Ea.clientPoint(n,Et.camera,_s)},facingDot(){return Sa.facingDot()},quality(){return{shadows:Et.shadowsOn,fx:qo,software:Et.software}},start(n,e){n&&(_r=n),e&&(xr=e),ri("playing"),vr(),ii(!1),It("idle")},reset(){ri("playing"),vr(),ii(!1),It("idle")}};window.addEventListener("error",n=>{const e=document.createElement("pre");e.id="boot-error",e.textContent=n.message||"畫面起動失敗",iu.appendChild(e)});

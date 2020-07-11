!function(e){var r={};function t(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=r,t.d=function(e,r,a){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(a,n,function(r){return e[r]}.bind(null,n));return a},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";t.r(r);t(1),t(2);function a(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)&&/^[0-9-a-zA-Z_\-\.@]+$/.test(e)}var n={user:void 0,username:"",page:"login",apply:{name:"",email:"",email_confirmation:"",zip_code:"",type:"personal",ein:"",title:""},overview:{total:30,health:27,fever:0,warning:2,danger:1},log:[{name:"George Chu",email:"george@bif.one",date:"\t2020-03-20 19:00:00",num:1},{name:"Cober Lu",email:"cober@bif.one",date:"\t2020-03-20 19:00:00",num:3},{name:"Denny Wang",email:"denny@bif.one",date:"\t2020-03-20 19:00:00",num:1},{name:"Mark Chang",email:"mark@bif.one",date:"\t2020-03-20 19:00:00",num:1}]},o={jsonp:function({url:e,params:r={},hookSuccess:t,hookFail:a,showFailAlert:o=!0,hookCatchError:i,logTitle:s="Debug"}){return axios.jsonp(e,{params:r}).then((function(e){return void 0===e.code?(n.page="login",alert("Health2GO API Error!")):0!==e.code?(a&&a(e),void(o&&alert(`${e.message} (code = ${e.code})`))):void(t&&t(e.data))})).catch((function(e){i&&i(e),alert("Something wrong, please check your network connection and try again.")}))}};window.addEventListener("load",(function(){$("#year").text((new Date).getFullYear());var e=new Vue({el:"#vue",data:n,mounted:function(){this.init()},methods:{init:function(){let e=new URLSearchParams(window.location.search),r=this.$data,t=Object.fromEntries(e.entries());if(t.code)return 1==t.code||2==t.code?alert("The magic link is broken! Please get the email magic link again!"):3==t.code?alert("Sign-in link expired! Magic sign-in links expire after 24 hours, and can only be used once."):alert(`Error! (code = ${t.code}) Please get the email magic link again!`),void(n.page="login");o.jsonp({url:"https://api.health2go.life/healthyme",logTitle:"Init",hookSuccess:function(e){if(void 0===e.username)return n.page="login";r.user={username:e.username},n.page="dashboard"},hookFail:function(e){n.page="login"},hookCatchError:function(e){n.page="login"}})},goPage:function(e){this.page=e},toPercent:function(e,r){if(0===e)return"-";var t=100*e/r;return Math.round(t)+"%"},resetErrorMessage:function(e){$(e).find(".form-group").removeClass("is-invalid is-valid").find(".invalid-feedback").text("")},setErrorMessage:function(e,r){$(e).addClass("is-invalid").find(".invalid-feedback").text(r)},getStatus:function(e){switch(e){case"total":if(this.overview.danger>0)return"status-danger";if(this.overview.warning>0||this.overview.fever>0)return"status-warning";if(this.overview.total===this.overview.health)return"status-success";break;case"fever":return 0===this.overview.fever?"status-success":this.overview.fever>1?"status-danger":"status-warning";case"warning":return this.overview.total===this.overview.health?"status-success":this.overview.warning>1?"status-danger":"status-warning";case"danger":return this.overview.danger>0?"status-danger":"status-success"}},register:function(){e.resetErrorMessage(".register-form");var r=!0;""===this.apply.name&&(r=!1,e.setErrorMessage("#form-group-name","Please enter Name.")),""===this.apply.email?(r=!1,e.setErrorMessage("#form-group-email","Please enter Email.")):a(this.apply.email)||(r=!1,e.setErrorMessage("#form-group-email","Please confirm your email address.")),""===this.apply.email_confirmation?(r=!1,e.setErrorMessage("#form-group-email-confirmation","Please enter Email.")):a(this.apply.email_confirmation)||(r=!1,e.setErrorMessage("#form-group-email-confirmation","Please confirm your email address.")),""===this.apply.zip_code&&(r=!1,e.setErrorMessage("#form-group-zip-code","Please enter ZIP Code.")),"business"===this.apply.type&&(""===this.apply.ein&&(r=!1,e.setErrorMessage("#form-group-ein","Please enter EIN Number.")),""===this.apply.title&&(r=!1,e.setErrorMessage("#form-group-title","Please enter Applicant Title / Name."))),r&&e.goPage("login")},login:function(){let r=this.$data;e.resetErrorMessage(".auth-form");var t=!0;""===this.username?(t=!1,e.setErrorMessage("#form-group-username","Please enter Email.")):a(this.username)||(t=!1,e.setErrorMessage("#form-group-username","Please confirm your email address.")),t&&o.jsonp({url:"https://api.health2go.life/healthyme/login",params:{username:r.username},logTitle:"Login",hookSuccess:function(e){alert("Thanks! Please check your email account. We've sent you a confirmation link to complete registration and log in.")},hookFail:function(r){e.setErrorMessage("#form-group-username","Email address is not exist. Please confirm your email address or click the button below to apply for use.")}})},validate:function(){},logout:function(){let r=this.$data;o.jsonp({url:"https://api.health2go.life/healthyme/logout",logTitle:"Logout",hookSuccess:function(t){r.username="",e.goPage("login"),alert("Logout successful.")}})},showLog:function(){e.goPage("log")}}})}))},function(e,r,t){},function(e,r,t){}]);
//# sourceMappingURL=bundle.js.map?v=1594449385
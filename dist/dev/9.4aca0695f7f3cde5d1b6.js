(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"/6n6":function(e,t,a){"use strict";a.r(t),a.d(t,"FaqModule",(function(){return O}));var r=a("SVse"),o=a("iInd"),i=a("zViY"),n=a("iELJ"),c=a("SXVO"),s=a("8Y7J"),m=a("6xPc"),f=a("jKJn"),l=a("Dxy4");let d=(()=>{class e{constructor(e,t,a,r){this.dialogRef=e,this.row=t,this.manageGridService=a,this.alertService=r}ngOnInit(){}deleteRowData(){this.row&&this.manageGridService.deleteRowData(i.a.faq.key,{faqId:this.row.data.faqId}).subscribe(e=>{e&&e.result&&"SUCCESS"===e.result.status&&(this.dialogRef.close({action:"Delete"}),this.alertService.open(c.a.SUCCESS,e.result.data))},e=>{console.log(e)})}}return e.\u0275fac=function(t){return new(t||e)(s.Zb(n.g),s.Zb(n.a),s.Zb(m.a),s.Zb(f.a))},e.\u0275cmp=s.Tb({type:e,selectors:[["app-faq-delete"]],decls:10,vars:1,consts:[["mat-dialog-title",""],["mat-dialog-actions",""],["mat-raised-button","","color","primary",3,"click"],["mat-raised-button","","color","warn","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(e,t){1&e&&(s.fc(0,"h1",0),s.Yc(1,"Confirmation"),s.ec(),s.fc(2,"mat-dialog-content"),s.fc(3,"p"),s.Yc(4,"Do you want to delete?"),s.ec(),s.ec(),s.fc(5,"div",1),s.fc(6,"button",2),s.oc("click",(function(){return t.deleteRowData()})),s.Yc(7,"Yes"),s.ec(),s.fc(8,"button",3),s.Yc(9,"No"),s.ec(),s.ec()),2&e&&(s.Nb(8),s.Ac("mat-dialog-close","NO"))},directives:[n.h,n.e,n.c,l.a,n.d],styles:[""]}),e})();var u=a("s7LF"),p=a("XOzN"),h=a("dzPw"),q=a("Q2Ze"),g=a("ZTz/"),I=a("e6WT"),b=a("UhP/");function A(e,t){if(1&e&&(s.fc(0,"mat-option",14),s.Yc(1),s.ec()),2&e){const e=t.$implicit;s.Ac("value",e.faqTypeId),s.Nb(1),s.ad(" ",e.faqTypeName," ")}}function w(e,t){1&e&&(s.fc(0,"span",16),s.Yc(1," Please choose a FAQ category "),s.ec())}function y(e,t){if(1&e&&(s.fc(0,"mat-error"),s.Wc(1,w,2,0,"span",15),s.ec()),2&e){const e=s.sc();s.Nb(1),s.Ac("ngIf",e.form.get("faqType.faqTypeId").errors.required)}}function N(e,t){1&e&&(s.fc(0,"span",16),s.Yc(1," Question is required "),s.ec())}function S(e,t){1&e&&(s.fc(0,"span",16),s.Yc(1," length exceeded "),s.ec())}function v(e,t){if(1&e&&(s.fc(0,"mat-error"),s.Wc(1,N,2,0,"span",15),s.Wc(2,S,2,0,"span",15),s.ec()),2&e){const e=s.sc();s.Nb(1),s.Ac("ngIf",e.eform.faqItemName.errors.required),s.Nb(1),s.Ac("ngIf",e.eform.faqItemName.errors.maxlength)}}function T(e,t){1&e&&(s.fc(0,"span",16),s.Yc(1," Question Arb. is required "),s.ec())}function R(e,t){1&e&&(s.fc(0,"span",16),s.Yc(1," length exceeded "),s.ec())}function C(e,t){if(1&e&&(s.fc(0,"mat-error"),s.Wc(1,T,2,0,"span",15),s.Wc(2,R,2,0,"span",15),s.ec()),2&e){const e=s.sc();s.Nb(1),s.Ac("ngIf",e.eform.faqItemNameAR.errors.required),s.Nb(1),s.Ac("ngIf",e.eform.faqItemNameAR.errors.maxlength)}}function x(e,t){1&e&&(s.fc(0,"span",16),s.Yc(1," Answer is required "),s.ec())}function Y(e,t){1&e&&(s.fc(0,"span",16),s.Yc(1," length exceeded "),s.ec())}function W(e,t){if(1&e&&(s.fc(0,"mat-error"),s.Wc(1,x,2,0,"span",15),s.Wc(2,Y,2,0,"span",15),s.ec()),2&e){const e=s.sc();s.Nb(1),s.Ac("ngIf",e.eform.faqItemAnswer.errors.required),s.Nb(1),s.Ac("ngIf",e.eform.faqItemAnswer.errors.maxlength)}}function P(e,t){1&e&&(s.fc(0,"span",16),s.Yc(1," Answer Arb. is required "),s.ec())}function Z(e,t){1&e&&(s.fc(0,"span",16),s.Yc(1," length exceeded "),s.ec())}function D(e,t){if(1&e&&(s.fc(0,"mat-error"),s.Wc(1,P,2,0,"span",15),s.Wc(2,Z,2,0,"span",15),s.ec()),2&e){const e=s.sc();s.Nb(1),s.Ac("ngIf",e.eform.faqItemAnswerAR.errors.required),s.Nb(1),s.Ac("ngIf",e.eform.faqItemAnswerAR.errors.maxlength)}}let E=(()=>{class e{constructor(e,t,a,r,o,i,n){this.dialogRef=e,this.row=t,this.formBuilder=a,this.manageGridService=r,this.alertService=o,this.headerService=i,this.adminBaseService=n}ngOnInit(){this.form=this.formBuilder.group({faqId:[this.row.data?this.row.data.faqId:null],faqItemName:[this.row.data?this.row.data.faqItemName:"",[u.x.required,u.x.maxLength(1e4)]],faqItemNameAR:[this.row.data?this.row.data.faqItemNameAR:"",[u.x.required,u.x.maxLength(1e4)]],faqItemAnswer:[this.row.data?this.row.data.faqItemAnswer:"",[u.x.required,u.x.maxLength(5e4)]],faqItemAnswerAR:[this.row.data?this.row.data.faqItemAnswerAR:"",[u.x.required,u.x.maxLength(5e4)]],faqType:this.formBuilder.group({faqTypeId:[this.row.data&&this.row.data.faqType?this.row.data.faqType.faqTypeId:"",[u.x.required]]})}),this.headerService.toggleSpinner(!0),this.adminBaseService.requestSubmit("ADM_LIST_FAQTYPES",null).subscribe(e=>{e&&(this.headerService.toggleSpinner(!1),e.result&&"SUCCESS"===e.result.status&&(this.faqCategoryList=e.result.data))},e=>{this.headerService.toggleSpinner(!1)})}get eform(){return this.form.controls}onSubmit(){const e=this.row.data?"Edit":"New";if(this.form.invalid)return!1;this.manageGridService.addORupdateRowData(i.a.faq.key,!this.row.data,this.form.value).subscribe(t=>{t&&t.result&&"SUCCESS"===t.result.status&&(this.dialogRef.close({action:e,rowValue:t.result.data}),this.alertService.open(c.a.SUCCESS,`${i.a.faq.name} ${this.row.data?"edited":"created"} successfully`))},e=>{})}get moduleKeyModel(){return i.a}}return e.\u0275fac=function(t){return new(t||e)(s.Zb(n.g),s.Zb(n.a),s.Zb(u.d),s.Zb(m.a),s.Zb(f.a),s.Zb(p.a),s.Zb(h.a))},e.\u0275cmp=s.Tb({type:e,selectors:[["app-faq-grid-action"]],decls:31,vars:10,consts:[[3,"formGroup","ngSubmit"],["mat-dialog-title",""],["formGroupName","faqType",1,"full-width"],["formControlName","faqTypeId"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],["color","accent",1,"full-width"],["matInput","","placeholder","Question","autocomplete","off","formControlName","faqItemName","required",""],["matInput","","placeholder","Question AR","autocomplete","off","formControlName","faqItemNameAR","required",""],["matInput","","required","","formControlName","faqItemAnswer"],["matInput","","required","","formControlName","faqItemAnswerAR"],["mat-dialog-actions",""],["type","submit","mat-raised-button","","color","primary"],["mat-raised-button","","color","warn","cdkFocusInitial","",3,"mat-dialog-close"],[3,"value"],["class","alert-danger",4,"ngIf"],[1,"alert-danger"]],template:function(e,t){1&e&&(s.fc(0,"form",0),s.oc("ngSubmit",(function(){return t.onSubmit()})),s.fc(1,"h1",1),s.Yc(2),s.ec(),s.fc(3,"mat-dialog-content"),s.fc(4,"mat-form-field",2),s.fc(5,"mat-label"),s.Yc(6,"Choose FAQ Category"),s.ec(),s.fc(7,"mat-select",3),s.Wc(8,A,2,2,"mat-option",4),s.ec(),s.Wc(9,y,2,1,"mat-error",5),s.ec(),s.fc(10,"mat-form-field",6),s.ac(11,"input",7),s.Wc(12,v,3,2,"mat-error",5),s.ec(),s.fc(13,"mat-form-field",6),s.ac(14,"input",8),s.Wc(15,C,3,2,"mat-error",5),s.ec(),s.fc(16,"mat-form-field",6),s.fc(17,"mat-label"),s.Yc(18,"Answer"),s.ec(),s.ac(19,"textarea",9),s.Wc(20,W,3,2,"mat-error",5),s.ec(),s.fc(21,"mat-form-field",6),s.fc(22,"mat-label"),s.Yc(23,"Answer AR"),s.ec(),s.ac(24,"textarea",10),s.Wc(25,D,3,2,"mat-error",5),s.ec(),s.ec(),s.fc(26,"div",11),s.fc(27,"button",12),s.Yc(28,"Submit"),s.ec(),s.fc(29,"button",13),s.Yc(30,"Cancel"),s.ec(),s.ec(),s.ec()),2&e&&(s.Ac("formGroup",t.form),s.Nb(2),s.bd("",t.row.data?"Edit":"Add","\xa0",t.moduleKeyModel.faq.name,""),s.Nb(6),s.Ac("ngForOf",t.faqCategoryList),s.Nb(1),s.Ac("ngIf",t.form.get("faqType.faqTypeId").invalid&&(t.form.get("faqType.faqTypeId").dirty||t.form.get("faqType.faqTypeId").touched)),s.Nb(3),s.Ac("ngIf",t.eform.faqItemName.invalid&&(t.eform.faqItemName.dirty||t.eform.faqItemName.touched)),s.Nb(3),s.Ac("ngIf",t.eform.faqItemNameAR.invalid&&(t.eform.faqItemNameAR.dirty||t.eform.faqItemNameAR.touched)),s.Nb(5),s.Ac("ngIf",t.eform.faqItemAnswer.invalid&&(t.eform.faqItemAnswer.dirty||t.eform.faqItemAnswer.touched)),s.Nb(5),s.Ac("ngIf",t.eform.faqItemAnswerAR.invalid&&(t.eform.faqItemAnswerAR.dirty||t.eform.faqItemAnswerAR.touched)),s.Nb(4),s.Ac("mat-dialog-close","NO"))},directives:[u.z,u.p,u.h,n.h,n.e,q.c,u.i,q.g,g.a,u.o,u.g,r.k,r.l,I.b,u.c,u.v,n.c,l.a,n.d,b.m,q.b],styles:[""]}),e})();var F=a("VxG0"),Q=a("R3N2");const k=[{path:"list",component:(()=>{class e{constructor(e){this.permissionService=e,this.columns=[{prop:"faqType.faqTypeName",name:"FAQ Type"},{prop:"faqItemName",name:"Question"},{prop:"faqItemNameAR",name:"Question Arb"},{prop:"faqItemAnswer",name:"Answer"},{prop:"faqItemAnswerAR",name:"Answer Arb"}],this.actionButtons=[{type:"New",matTooltip:"New "+this.moduleKeyModel.faq.name,matTooltipClass:"tooltip",matTooltipPosition:"above",color:"primary",matIcon:"add",dialogComponent:E,hasPermission:this.permissionService.hasPermission("New")},{type:"Edit",matTooltip:this.moduleKeyModel.faq.name+" Edit",matTooltipClass:"tooltip",matTooltipPosition:"above",color:"primary",matIcon:"edit",dialogComponent:E,hasPermission:this.permissionService.hasPermission("Edit")},{type:"Delete",matTooltip:this.moduleKeyModel.faq.name+" Delete",matTooltipClass:"tooltip",matTooltipPosition:"above",color:"warn",matIcon:"delete",dialogComponent:d,hasPermission:this.permissionService.hasPermission("Delete")}]}ngOnInit(){}get moduleKeyModel(){return i.a}}return e.\u0275fac=function(t){return new(t||e)(s.Zb(F.a))},e.\u0275cmp=s.Tb({type:e,selectors:[["app-faq-list"]],decls:1,vars:4,consts:[[3,"inSection","inColumns","inactionButtons","moduleDisplayName"]],template:function(e,t){1&e&&s.ac(0,"app-manage-grid",0),2&e&&s.Ac("inSection",t.moduleKeyModel.faq.key)("inColumns",t.columns)("inactionButtons",t.actionButtons)("moduleDisplayName",t.moduleKeyModel.faq.name)},directives:[Q.a],styles:[""]}),e})()}];let K=(()=>{class e{}return e.\u0275mod=s.Xb({type:e}),e.\u0275inj=s.Wb({factory:function(t){return new(t||e)},imports:[[o.e.forChild(k)],o.e]}),e})();var L=a("pKmL"),M=a("rsRi");let O=(()=>{class e{}return e.\u0275mod=s.Xb({type:e}),e.\u0275inj=s.Wb({factory:function(t){return new(t||e)},imports:[[r.c,K,L.a,M.a,u.j,u.u]]}),e})()}}]);
/*
 *    Licensed to the Apache Software Foundation (ASF) under one or more
 *    contributor license agreements.  See the NOTICE file distributed with
 *    this work for additional information regarding copyright ownership.
 *    The ASF licenses this file to You under the Apache License, Version 2.0
 *    (the "License"); you may not use this file except in compliance with
 *    the License.  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import Ember from 'ember';
import EmberValidations,{ validator } from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  fileBrowser : Ember.inject.service('file-browser'),
  setUp : function(){
  	console.log("Settings "+this.get('actionModel.fsOps'));
    if(this.get('actionModel.fsOps') === undefined){
      this.set("actionModel.fsOps", Ember.A([]));
    }
    if(this.get('actionModel.configuration') === undefined){
      this.set("actionModel.configuration",{});
      this.set("actionModel.configuration.property", Ember.A([]));
    }
  }.on('init'),
  initialize : function(){
    this.on('fileSelected',function(fileName){
      this.set(this.get('filePathModel'), fileName);
    }.bind(this));
    this.sendAction('register','fsAction', this);
    //this.set('clonedActionModel',Ember.copy(this.get('actionModel')));
  }.on('didInsertElement'),
  observeError :function(){
    if(this.$('#collapseOne label.text-danger').length > 0 && !this.$('#collapseOne').hasClass("in")){
      this.$('#collapseOne').collapse('show');
    }
  }.on('didUpdate'),
  //validations : {
     // 'actionModel.mainClass': {
     //   presence: {
     //     'message' : 'You need to provide a value for Main Class',
     //   },
     //   format: {
     //      with: /([a-z][a-z_0-9]*\.)*[A-Za-z_]($[A-Za-z_]|[\w_])*/,
     //      allowBlank: false,
     //      message: 'You need to provide a valid value'
     //    }
      // }
  //},

  validations : {
    'actionModel': {
      inline : validator(function() {
      var isValidated = true, msg = "";
      console.log(this.get('actionModel'));
      if(!this.get('actionModel.fsOps')){
        return;
      }
      this.get('actionModel.fsOps').forEach(function(item, index){
      console.log("item is ");
      console.log(item);

  	    switch (item.type) {
  	    	case "mkdir":
  	    	case "delete":
  	    	case "touchz":
	        if(!item.settings.path){
	           isValidated = false;
	           msg="path is mandatory";
	    	}
	    	break;
	    	case "chmod":
	        if(!item.settings.path || !item.settings.permissions){
	           isValidated = false;
	           msg="path and permissions are mandatory";
	    	}
	    	break;
	    	case "chgrp":
	        if(!item.settings.path || !item.settings.group){
	           isValidated = false;
	           msg="path and group are mandatory";
	    	}
	    	break;
	    	case "move":
	        if(!item.settings.source || !item.settings.target){
	           isValidated = false;
	           msg="source and target are mandatory";
	    	}
	    	break; 
  	    }
      });
      if(!isValidated){
        return msg;
      }

    })
    }
  },

  actions : {
    openFileBrowser(model, context){
      if(undefined === context){
        context = this;
      }
      this.set('filePathModel', model);
      this.sendAction('openFileBrowser', model, context);
    },
    register (name, context){
      this.sendAction('register',name , context);
    }
  }
});

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

export default Ember.Component.extend({
  multivalued : true,
  initialize : function(){
    this.sendAction('register', this, this);
    this.on('bindInputPlaceholder',function () {
      this.set('addUnboundValue', true);
    }.bind(this));
  }.on('init'),
  bindInputPlaceholder : function () {
    if(this.get('addUnboundValue') && !Ember.isBlank(this.get('arg'))){
      this.addArg();
    }
  }.on('willDestroyElement'),
  addArg (){
    this.get('args').pushObject({value:this.get('arg')});
    this.set('arg', "");
  },
  actions : {
    addArg () {
      this.addArg();
    },
    deleteArg (index) {
      this.get('args').removeAt(index);
    }
  }
});

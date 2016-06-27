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
  tagName: 'tr',
  onRender : function(){
    this.$('#actions').hide();
  }.on('didInsertElement'),
  actions : {
    doAction(action, id) {
        var deferred = Ember.RSVP.defer();
        deferred.promise.then(function(){
          if(action === 'start'){
            this.set('job.status','RUNNING');
          }else if(action === 'suspend'){
            this.set('job.status','SUSPENDED');
          }else if(action === 'resume'){
            this.set('job.status','RUNNING');
          }else if(action === 'stop'){
            this.set('job.status','STOPPED');
          }else if(action === 'rerun'){
            this.set('job.status','RUNNING');
          }else if(action === 'kill'){
            this.set('job.status','KILLED');
          }
        }.bind(this),function(){
            console.log("error");
        }.bind(this));
        this.sendAction("onAction", { action: action, id: id }, deferred);
    },
    showJobDetails : function(jobId){
      this.sendAction('showJobDetails', jobId);
    },
    showActions () {
      this.$('#actions-div').hide();
      this.$('#actions').show();
    },
    hideActions () {
      this.$('#actions-div').show();
      this.$('#actions').hide();
    }
  }
});

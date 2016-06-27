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
    showBulkAction : false,
    currentPage : Ember.computed('jobs.start',function(){
      var roundedStart = this.get('jobs.start') - this.get('jobs.start') % 10;
      return (roundedStart / this.get('jobs.pageSize'))+1;
    }),
    initialize : function(){
      this.$(".cbox").on('click',function(){
        if(this.$('.cbox:checked').length > 0){
          this.set('showBulkAction', true);
          var status = [];
          this.$('.cbox:checked').each((index, element)=>{
            status.push(this.$(element).attr('data-status'));
          }.bind(this));
          var isSame = status.reduce(function(a, b){
            return (a === b) ? true : false;
          });
          if(isSame && status[0] === 'SUSPENDED'){
            this.set('enableResume', true);
            this.set('enableSuspend', false);
          }else if(isSame && status[0] === 'RUNNING'){
            this.set('enableSuspend', true);
            this.set('enableResume', false);
          }else{
            this.set('enableKill', true);
          }
        }else{
          this.set('showBulkAction', false);
        }
      }.bind(this));
    }.on('didRender'),
    actions: {
        selectAll() {
            this.$(".cbox").click();
            this.$('#ba_buttons').toggleClass('shown');
        },
        onAction(params, deferred) {
            this.sendAction("onAction", params, deferred);
        },
        refresh (){
          this.sendAction("doRefresh");
        },
        doBulkAction(action){
          var filter = '';
          var deferred = Ember.RSVP.defer();
          this.$('.cbox:checked').each(function(index, element){
            filter = filter + "name=" + this.$(element).attr('name')+ ";";
          }.bind(this));
          var params = {};
          this.$('#bulk-action-loader').removeClass('hidden');
          params.action = action;
          params.filter = filter;
          params.jobType = this.get('jobs.jobTypeValue');
          params.start = this.get('jobs.start');
          params.len = this.get('jobs.pageSize');
          this.sendAction('onBulkAction', params, deferred);
          deferred.promise.then(function(){
            this.sendAction("doRefresh");
            this.$('#bulk-action-loader').addClass('hidden');
            this.set('showBulkAction', false);
          }.bind(this), function(){
            this.$('#bulk-action-loader').addClass('hidden');
          }.bind(this));
        },
        page: function (page) {
          var size = this.get('jobs.pageSize'),
              jobType = this.get('jobs.jobTypeValue'),
              filter = this.get('jobs.filterValue'),
                start = (size * (page - 1) + 1);
            start = start || 1;
            this.sendAction("onSearch", { type: jobType, start: start, filter: filter });
        },
        prev: function (page) {
            page = page - 1;
            var size = this.get('jobs.pageSize'),
                jobType = this.get('jobs.jobTypeValue'),
                filter = this.get('jobs.filterValue'),
                start = (size * (page - 1) + 1);

            if (page >= 0) {
                start = start || 1;
                this.sendAction("onSearch", { type: jobType, start: start, filter: filter });
            }
        },
        next: function (page) {
            page = page + 1;
            var size = this.get('jobs.pageSize'),
                jobType = this.get('jobs.jobTypeValue'),
                filter = this.get('jobs.filterValue'),
                total = this.get('jobs.totalValue'),
                start = (size * (page - 1) + 1);
            if (start < total) {
                start = start || 1;
                this.sendAction("onSearch", { type: jobType, start: start, filter: filter });
            }
            this.sendAction("onSearch", { type: jobType, start: start, filter: filter });
        },
        showJobDetails : function(jobId){
          this.sendAction('onShowJobDetails',{type:this.get('jobs.jobTypeValue'), id:jobId});
        }
    }
});

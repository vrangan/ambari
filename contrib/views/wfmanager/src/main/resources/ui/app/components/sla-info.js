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
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  alertEvents: Ember.A([]),
  timeUnitOptions : Ember.A([]),
  initialize : function(){
    this.set('alertEvents', Ember.A([]));
    this.get('alertEvents').pushObject({eventType:'start_miss', alertEnabled:false, displayName :'Start Miss'});
    this.get('alertEvents').pushObject({eventType:'end_miss', alertEnabled:false, displayName : 'End Miss'});
    this.get('alertEvents').pushObject({eventType:'duration_miss', alertEnabled:false, displayName:'Duration Miss'});

    Ember.addObserver(this, 'alertEvents.@each.alertEnabled', this, this.alertEventsObserver);

    this.set('timeUnitOptions',Ember.A([]));
    this.get('timeUnitOptions').pushObject({value:'',displayName:'Select'});
    this.get('timeUnitOptions').pushObject({value:'MINUTES',displayName:'Minutes'});
    this.get('timeUnitOptions').pushObject({value:'HOURS',displayName:'Hours'});
    this.get('timeUnitOptions').pushObject({value:'DAYS',displayName:'Days'});

    if(this.get('slaInfo.alertEvents')){
      var alertsFor = this.get('slaInfo.alertEvents').split(",");
      alertsFor.forEach((alert)=>{
        Ember.set(this.get('alertEvents').findBy('eventType', alert),'alertEnabled', true);
      });
    }
  }.on('init'),
  alertEventsObserver : function(){
    var alerts = this.get('alertEvents').filterBy('alertEnabled',true).mapBy('eventType');
    this.set('slaInfo.alertEvents', alerts.join());
  },
  onDestroy : function(){
    Ember.removeObserver(this, 'alertEvents.@each.alertEnabled', this, this.alertEventsObserver);
  }.on('willDestroyElement'),
  elementsInserted : function() {
    this.$('#nominalTime').datetimepicker({
      useCurrent: false,
      showClose : true,
      defaultDate : this.get('slaInfo.nominalTime')
    });
    if(this.get('type') === 'action'){
      this.sendAction('register','slaInfo', this);
    }
  }.on('didInsertElement'),

  shouldEnd : Ember.computed.alias('slaInfo.shouldEnd'),
  canValidate : Ember.computed.alias('slaEnabled'),
  validations : {
     'slaInfo.nominalTime': {
       'if': 'canValidate',
       presence: {
         'message' : 'You need to provide a value for Nominal time',
       }
     },
     'shouldEnd.time': {
       'if': 'canValidate',
       presence: {
         'message' : 'You need to provide a value for Should End',
       }
     },
     'shouldEnd.unit': {
       'if': 'canValidate',
       presence: {
         'message' : 'You need to select a time unit for Should End',
       }
      }
  },
  slaObserver : Ember.observer('slaEnabled',function(){
    if(this.get('slaEnabled')){
      this.$('#slaCollapse').collapse('show');
    }else{
      this.$('#slaCollapse').collapse('hide');
    }
  })
});

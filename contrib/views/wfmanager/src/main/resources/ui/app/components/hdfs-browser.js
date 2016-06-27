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
import HdfsViewerConfig from '../utils/hdfsviewer';
export default Ember.Component.extend({
  config: HdfsViewerConfig.create(),
  initialize:function(){
      var self=this;
      self.$("#filediv").modal("show");
      self.$("#filediv").on('hidden.bs.modal', function (e) {
        self.sendAction('closeWorkflowSubmitConfigs');
        self.sendAction("closeFileBrowser");
      });

  }.on('didInsertElement'),
  selectFileType: "all",//can be all/file/folder
  selectedPath:"",
  isDirectory:false,
  callback: null,
  alertMessage:null,
  alertDetails:null,
  alertType:null,
  uploadSelected: false,
  isFilePathInvalid: Ember.computed('selectedPath',function() {
     return this.get("selectedPath").indexOf("<")>-1;
  }),
  showNotification(data){
      if (!data){
        return;
      }
      if (data.type==="success"){
        this.set("alertType","success");
      }
      if (data.type==="error"){
        this.set("alertType","danger");
      }
      this.set("alertDetails",data.details);
      this.set("alertMessage",data.message);
  },
  actions: {
    viewerError() {
      console.log("Failed to fetch the content!!!");
    },
    createFolder(){
        var self=this;
        var $elem=this.$("#selectedPath");
        //$elem.val($elem.val()+"/");
          var folderHint="<enter folder here>";
        this.set("selectedPath",this.get("selectedPath")+"/"+folderHint);
        setTimeout(function(){
            $elem[0].selectionStart = $elem[0].selectionEnd = self.get("selectedPath").length-folderHint.length;
        },10);

        $elem.focus();

    },
    viewerSelectedPath(data) {
      this.set("selectedPath",data.path);
      this.set("isDirectory",data.isDirectory);
      this.set("alertMessage",null);
    //  console.log(`User selected: path: ${data.path}, isDirectory: ${data.isDirectory}`);
    },
    selectFile(){
          if (this.get("selectedPath")===""){
            this.showNotification( {"type": "error", "message": "Please fill the settings value"});
            return false;
          }
          if (this.get("selectFileType")==="folder" && !this.get("isDirectory")){
          this.showNotification( {"type": "error", "message": "Only folders can be selected"});
            return false;
          }
          this.set("filePath",this.get("selectedPath"));
        /*
          this.get("selectFileCallback")({
             'path':this.get("selectedPath"),
            "isDirectory":this.get("isDirectory")
          });*/
        /*  if (this.get("callback")){
            this.get("callback")({
                            'path':this.get("selectedPath"),
                            "isDirectory":this.get("isDirectory")
                          });
        }*/
        this.$("#filediv").modal("hide");
    },
    uploadSelect(){
      this.set("uploadSelected",true);
    },

    closeUpload(){
       this.set("uploadSelected",false);
    },
    uploadSuccess(e){
      console.log("upload was successfull",e);
    },
    uploadFailure(textStatus,errorThrown){
      this.showNotification({
          "type": "error",
          "message": "Upload Failed",
          "details":textStatus
      });
      console.log("upload was failed",textStatus,errorThrown);
    },
    uploadProgress(e){
      console.log("upload progress ",e);
    },
    uploadValidation(e){
      this.showNotification({
          "type": "error",
          "message": "Upload Failed",
          "details":e
      });
    }
  }
});

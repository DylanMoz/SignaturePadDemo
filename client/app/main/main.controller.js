'use strict';

angular.module('signaturePadApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
    $scope.signatures = [];
    $scope.lastSig = {};
    var searchpad = null;
    var sigpad = null;

    $(document).ready(function () {
      sigpad = $('.sigPad').signaturePad({drawOnly:true});
      searchpad = $('.searchSig').signaturePad({displayOnly:true});
    });

    $scope.findSignature = function() {
      console.log($scope.searchSignatureId);
      $http.get("/api/signature/"+$scope.searchSignatureId)
      .success(function(data){
        console.log("Get Success", data);
        $scope.foundSig = data;
        console.log(data.signature)
        searchpad.regenerate(data.signature);
      })
    }

    $scope.addSignature = function(name) {
      if(!name || !$(".output").val()) {
        return;
      }
      $http.post('/api/signature', { name: name, output: $(".output").val() })
      .success(function(data) {
        console.log(data._id)
        $scope.lastSig = {id: data._id};
        $scope.submitted = true;
        $scope.name = "";
        sigpad.clearCanvas();
      });
      $timeout(function() {
        $scope.submitted = false;
      }, 30000);
    };

    $scope.deleteSignature = function(signature) {
      $http.delete('/api/signature/' + signature._id);
    };
  });

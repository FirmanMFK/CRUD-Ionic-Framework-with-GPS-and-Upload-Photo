angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('aboutCtrl', function($scope) {})
   

.controller('TambahCtrl', function($scope,forumService, $ionicPopup){

  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
        title: msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
    });
  };

  $scope.simpan = function(thread){

    if(!thread.nama){
      $scope.showAlert({
        title: "Information",
        message: "Nama Mohon Diisi"
      });
    }else if(!thread.npm){
      $scope.showAlert({
        title: "Information",
        message: "NPM Mohon Diisi"
      });
    }else if(!thread.jurusan){
      $scope.showAlert({
        title: "Information",
        message: "Jurusan Mohon Diisi"
      });
    }else if(!thread.pesan){
      $scope.showAlert({
        title: "Information",
        message: "Pesan Mohon Diisi"
      });
    }else{
      forumService.simpan({
        data: thread
      }).then(function(resp) {
        console.log(resp);
      
        $scope.showAlert({
          title: "Information",
          message: "Data Telah Disimpan"
        });
        
      },function(err) {
        console.error('Error', err);
      }); 
    }

  };

})

.controller('forumCtrl', function($scope, $ionicPopup, forumService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
        title: msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
    });
  };
  
  $scope.remove = function(thread) {
    forumService.hapus(thread.id).then(function(resp) {
      console.log(resp);
      $scope.showAlert({
        title: "Information",
        message: "Data Telah Dihapus"
      });
      $scope.showData();
    }, function(err) {
      console.log('Error', err);
    });
  }

  $scope.showData = function() {
    forumService.ambilSemua().success(function(dataForum) {
      $scope.thread = dataForum;
    });  
  };

  $scope.showData();

  console.log($scope.thread);

})

.controller('forumDetailCtrl', function($scope,$stateParams,$ionicPopup,$ionicModal,$state, forumService) {

  $scope.showDataId = function() {
  forumService.ambilSatu($stateParams.id).success(function(dataForum) {
    $scope.thread = dataForum;
  });  
  };

  $scope.showDataId();

  $ionicModal.fromTemplateUrl('edit.html', function(modal){
    $scope.taskModal = modal;
  },{
    scope : $scope,
    animation : 'slide-in-up' 
  });
        
  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
        title: msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
    });
  };
  
  $scope.editModal = function(){
    $scope.taskModal.show();
  };
  
  $scope.batal = function(){
    $scope.taskModal.hide();
    $scope.showDataId();
  };

  $scope.edit = function(thread){

    if(!thread.nama){
      $scope.showAlert({
        title: "Information",
        message: "Nama Mohon Diisi"
      });
    }else if(!thread.npm){
      $scope.showAlert({
        title: "Information",
        message: "NPM Mohon Diisi"
      });
    }else if(!thread.jurusan){
      $scope.showAlert({
        title: "Information",
        message: "Jurusan Mohon Diisi"
      });
    }else if(!thread.pesan){
      $scope.showAlert({
        title: "Information",
        message: "Pesan Mohon Diisi"
      });
    }else{
      forumService.ubah({
        data: thread
      }).then(function(resp) {
        console.log(resp);
      
        $scope.showAlert({
          title: "Information",
          message: "Data Telah Diupdate"
        });
      
        $scope.taskModal.hide();
        
      },function(err) {
        console.error('Error', err);
      }); 
    }
  };
});
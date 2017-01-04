angular.module('starter.services', [])

.factory('forumService', function($http) {
    var baseUrl = 'http://localhost/codeigniter/index.php/api/';
    return {
        
        ambilSemua: function (){
            return $http.get(baseUrl+'ambilSemua'); 
        },
        ambilSatu: function (id){
            return $http.get(baseUrl+'ambilSatu/?id='+id); 
        },
        simpan: function (thread){
            return $http.post(baseUrl+'simpan',thread,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        ubah: function (thread){
            return $http.post(baseUrl+'ubah',thread,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        hapus: function (id){
            return $http.get(baseUrl+'hapus/?id='+id);
        }
    };
});
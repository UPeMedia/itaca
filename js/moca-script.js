var App =  angular.module('App',["ngSanitize"]);

App.controller('appCtrl', function($scope, $http){

  $scope.formObj = {};

  $scope.active = 'test';

  getActiveMenu();

  function getActiveMenu(){
    var fullUrl = window.location.pathname;
    var url = fullUrl.split('/');
    var page = url.length - 1;

    $scope.active = url[page];
  }

  $scope.enviarMail = function(){
    var rest = {
      url:"mail/enviar.php",
      method: "GET",
      params: {
        nombre: $scope.formObj.nombre,
        correo: $scope.formObj.correo,
        telefono: $scope.formObj.telefono,
        mensaje: $scope.formObj.mensaje
      }
    };

    console.log(rest.data);

    $http(rest).success(function(data){

      if(data.enviado == true){
        $scope.aviso = 'Enviado';
        $scope.claseAviso = "fadeIn";
        $scope.formObj = {};
      }else{
        $scope.aviso = "Todos los campos son requeridos";
        $scope.claseAviso = 'fadeIn';
        console.log(data);
      };

      setTimeout(function(){
        $scope.claseAviso = '';

        setTimeout(function(){
          $scope.$apply(function(){
            $scope.claseAviso = 'fadeOut';
          });
        }, 2000);

      },500);



    });
  }

  $scope.enviarCorreo = function(){

    $scope.enviarMail();
  }

  $scope.equipo = [
    {
      area:"Diseño arquitectónico",
      integrantes:"Jose Roberto Gereda"
    },
    {
      area:"Dirección de proyecto",
      integrantes: "Apoyo Inmobiliario / Jose Roberto Gereda"
    },
    {
      area:"Equipo interno",
      integrantes: "Construcción: Raúl Paz <br/> Arquitectura: Bárbara Vega, Daniel Villadeleón y Talia Vásquez <br/> Coordinadora de Ventas: Claudette Frech <br/> Vendedoras: Lucía de Lizarralde, María Eugenia de Micheo, María José Ruiz de Reyes y Karla Echeverría de Castillo <br/> Finanzas: Lucía Rocco"
    },
    {
      area:"Ingenierías",
      integrantes: "Estructuras: Sisma Consulting Group / Roberto Arango <br/> Hidráulico: Archila Rivera y Cía. Limitada / Manuel Archila <br /> Eléctrico: Salnars y Díaz, Instalaciones Eléctricas S.A. / Andris Salnars"
    },
    {
      area:"Estudios",
      integrantes: "Suelos: Geoestudios S.A. / Wilma De León <br /> Medio Ambiente e INAB: Consultoría FASA / Walter Robledo"
    },
    {
      area:"Equipo legal",
      integrantes: "Umaña y Asociados / Ricardo Umaña <br /> Propiedad intelectual: Alejandro Umaña"
    },
    {
      area:"Bancos",
      integrantes: "GTC Bank Inc."
    },
    {
      area:"Desarrolladora",
      integrantes: "Cuatro Setenta y Cinco S.A."
    }
  ]

  $scope.snipped = {
    menu:"snipped/menu.html",
    footer:"snipped/footer.html"
  };

});

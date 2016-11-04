function ContatosController($scope, $http) {

	function Contato() {
		this.nome = '';
		this.telefone = '';
	}

	$scope.contato = new Contato();

	$scope.contatos = [];

	$http.get('/contatos').success(function(retorno) {
		$scope.contatos = retorno.contatos;
	});

	$scope.listaContatos = function(){
		$http.get('/contatos').success(function(retorno) {
			$scope.contatos = retorno.contatos;
		});
	}

	$scope.adicionaContato = function() {
		$http.post('/contato/add', $scope.contato).success(function() {
			$scope.contatos.push($scope.contato);
			$scope.contato = new Contato();
			$scope.listaContatos();
		});
	}


	$scope.removeContato = function(contato) {
		$http.post('/contato/remove', contato).success(function() {
			var index = $scope.contatos.indexOf(contato);
			$scope.contatos.splice(index, 1);
		});
	}

}

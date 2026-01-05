<?php 

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include 'db.php';

//Leemos los datos json

$data = json_decode(file_get_contents("php://input"), true);

if(isset($data['api_id']) && $data['nombre'] && $data['tipo'] && $data['imagen']){

    $apiId = $data['api_id'];
    $nombre = $data['nombre'];
    $tipo = $data['tipo'];
    $imagen = $data['imagen'];
try {

    $sql = "INSERT INTO pokemon (api_id, nombre, tipo, imagen) VALUES (:apiId, :nombre, :tipo, :imagen)";

    $stmt = $conexion->prepare($sql);

    $stmt->execute([':apiId' => $apiId,
                    ':nombre'=> $nombre,
                    ':tipo' => $tipo,
                    ':imagen' => $imagen
                ]);

    echo json_encode(["id"=> $conexion->lastInsertId(), "mensaje" => "pokemon guardado"]);
} catch(PDOException $e ){
    echo json_encode(["error"=> $e->getMessage()]);
}
}else{
    echo json_encode(["error" => "el pokemon es obligatorio"]);
}


?>
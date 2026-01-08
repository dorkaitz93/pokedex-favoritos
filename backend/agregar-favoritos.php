<?php 

include 'db.php';


if(isset($_POST['api_id']) && isset($_POST['nombre'])){

    $apiId  = $_POST['api_id'];
    $nombre = $_POST['nombre'];
    $tipo   = $_POST['tipo'];
    $imagen = $_POST['imagen'];

    try {
        // Comprobar si ya existe para evitar duplicados y errores
        $check = $conexion->prepare("SELECT id FROM pokemon WHERE api_id = :apiId");
        $check->bindParam(':apiId', $apiId);
        $check->execute();

        if($check->rowCount() > 0){
            // Si ya existe, devolvemos error (o éxito falso) para que no falle
            http_response_code(409); // 409 = Conflicto
            echo "El Pokémon ya está en favoritos";
        } else {
            // Insertar
            $sql = "INSERT INTO pokemon (api_id, nombre, tipo, imagen) VALUES (:apiId, :nombre, :tipo, :imagen)";
            $stmt = $conexion->prepare($sql);
            
            // Usamos bindParam para mayor seguridad
            $stmt->bindParam(':apiId', $apiId);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':tipo', $tipo);
            $stmt->bindParam(':imagen', $imagen);

            if($stmt->execute()){
                echo "ok";
            } else {
                http_response_code(500);
                echo "Error al guardar";
            }
        }
    } catch(PDOException $e ){
        http_response_code(500);
        echo "Error: " . $e->getMessage();
    }
} else {
    http_response_code(400);
    echo "Faltan datos";
}
?>
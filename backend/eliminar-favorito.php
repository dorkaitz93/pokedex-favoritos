<?php 

include 'db.php';

if(isset($_POST['id'])){
    
    $id = $_POST['id'];

    $sql = "DELETE FROM pokemon WHERE api_id = :id";

    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(":id", $id); // "i" de integer

    if($stmt ->execute()){
        echo "ok";
    }else{
        http_response_code(500);
        echo "error al borrar";
    }
}else{
    http_response_code(404);
    echo "ID no valido";
}
?>
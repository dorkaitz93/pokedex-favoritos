<?php 

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include 'db.php';

try{
    $sql = "SELECT * FROM pokemon";
    $stmt =  $conexion->query($sql);

    $pokedex = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($pokedex);

}catch(Exception $e){
    echo json_encode(["Error" => $e->getMessage()]);
}
?>
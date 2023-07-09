<?php
$mysql=new mysqli("localhost","root","root","leaflet2");

if($mysql->connect_error){
    die("Error de conexion");
}
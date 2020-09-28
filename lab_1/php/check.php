<?php
session_start();
$startMicroTime = microtime(true);
$startWorldTime = date("H:i:s");
$xValues = $_POST['X'];
$yValue = (float) str_replace(",", ".", $_POST['Y']);
$rValue = (int) $_POST['R'];

$endMicroTime = round((microtime(true) - $startMicroTime)*1e6, 2)." ps";

function check($x, $y, $r){
    if (($x <= $r && $x >= 0 && $y <= 0 && $y >= -$r) || ($x <= ($r - 2*$y) && $y <= $r/2 && $x <= 0) || (($x*$x + $y*$y) <= $r*$r && $x <= 0 && $y <= 0)){
        return "<span style='color: #008000'>True</span>";
    } else {
        return "<span style='color: #ff0000'>False</span>";
    }
}


$checkbox = explode(',', $xValues);
for ($i=0; $i<sizeof($checkbox); $i++) {
    $checkbox[$i]=(int) trim($checkbox[$i],',');
}

if (!isset($_SESSION['history'])) {
    $_SESSION['history'] = array();
}

for ($i=0; $i<sizeof($checkbox); $i++) {
    $res = check($checkbox[$i], $yValue, $rValue);
    $result = array($checkbox[$i], $yValue, $rValue, $res, $startWorldTime, $endMicroTime);
    array_push($_SESSION['history'], $result);
    include "table.php";

}

?>
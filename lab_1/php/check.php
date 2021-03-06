<?php
session_start();
$startMicroTime = microtime(true);
$startWorldTime = date("H:i:s");
$xValues = $_POST['X'];
$yValue = (float) str_replace(",", ".", $_POST['Y']);
$rValue = (float) $_POST['R'];

function check($x, $y, $r){
    if (($x <= $r && $x >= 0 && $y <= 0 && $y >= -$r) || (abs($x) >= ($r-2*$y) && $y <= $r/2 && $y >= 0 && $x >= -$r && $x <= 0) || (($x*$x + $y*$y) <= $r*$r && $x <= 0 && $y <= 0)){
        return "<span style='color: #A5C25C'>True</span>";
    } else {
        return "<span style='color: #C25C72'>False</span>";
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
    $endMicroTime = round((microtime(true) - $startMicroTime)*1e6, 2)." ps";
    $res = check($checkbox[$i], $yValue, $rValue);
    $result = array($checkbox[$i], $yValue, $rValue, $res, $startWorldTime, $endMicroTime);
    array_push($_SESSION['history'], $result);

}

foreach ($_SESSION['history'] as $value){
    echo "<tr>
            <td class='table-data'> $value[0] </td>
            <td class='table-data'> $value[1] </td>
            <td class='table-data'> $value[2] </td>
            <td class='table-data'> $value[3] </td>
            <td class='table-data'> $value[4] </td>
            <td class='table-data'> $value[5] </td>
    </tr>";
}

?>



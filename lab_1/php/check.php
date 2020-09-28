<?php
session_start();
$startMicroTime = microtime(true);
$startWorldTime = date("H:i:s");
$xValues = $_POST['X'];
$yValue = $_POST['Y'];
$rValue = $_POST['R'];
$result = true;
$resultColor = $result=="invalid" ? "red" : ($result=="true" ? "green" : "red");
$endMicroTime = round((microtime(true) - $startMicroTime)*1e6, 2)." ps";
echo "<tr>
                            <td>$xValues</td>
                            <td>$yValue</td>
                            <td>$rValue</td>
                            <td>$startWorldTime</td>
                            <td>$endMicroTime</td>
                            <td style='color:$resultColor;'>$result</td>
                        </tr>";
?>
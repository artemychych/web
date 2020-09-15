<?php
if ('application/json' == $_SERVER['CONTENT_TYPE']
    && 'POST' == $_SERVER['REQUEST_METHOD'])
{
    $_REQUEST['JSON'] = json_decode(
        file_get_contents('php://input'), true
    );
    $_POST['JSON'] = & $_REQUEST['JSON'];
    print($_REQUEST['JSON']);
}

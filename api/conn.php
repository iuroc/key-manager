<?php

require_once 'config.php';

/** 获取数据库连接 */
function get_conn(): mysqli
{
    $conn = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB);
    if ($conn->connect_error) {
        echo make_res(false, $conn->connect_error);
        die();
    }
    return $conn;
}
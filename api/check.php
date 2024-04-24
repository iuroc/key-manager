<?php

require './conn.php';
require './util.php';

$key = $_GET['key'] ?? '';
if (!$key) {
    echo make_res(false, '请输入卡密');
    die();
}

$conn = get_conn();
echo check_key($conn, $key) ? make_res(true, '校验成功') : make_res(false, '校验失败，已核销或不存在');

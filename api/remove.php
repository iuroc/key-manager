<?php

require './conn.php';
require './util.php';

$key = $_POST['key'] ?? '';
$password = $_POST['password'] ?? '';
if (!$key) {
    echo make_res(false, '请输入卡密');
    die();
}
if ($password != ROOT_PASSWORD) {
    echo make_res(false, '管理员密码错误');
    die();
}

// 获取数据库连接
$conn = get_conn();
// 校验卡密的可用性
if (!check_key($conn, $key)) {
    echo make_res(false, '校验失败，已核销或不存在');
    $conn->close();
    die();
}
// 核销卡密
remove_key($conn, $key);
// 提示核销成功
echo make_res(true, '核销成功');
$conn->close();

/** 核销卡密 */
function remove_key(mysqli $conn, string $key)
{
    $stmt = $conn->prepare('UPDATE `key` SET `available` = ?, `remove_time` = ? WHERE `key` = ?');
    $available = 0;
    $currentDateTime = new DateTime();
    $datetime = $currentDateTime->format('Y-m-d H:i:s');
    $stmt->bind_param('iss', $available, $datetime, $key);
    $stmt->execute();
    return $stmt->affected_rows > 0;
}
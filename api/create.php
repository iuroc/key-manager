<?php

require './conn.php';
require './util.php';

$password = $_POST['password'] ?? '';
if ($password != ROOT_PASSWORD) {
    echo make_res(false, '管理员密码错误');
    die();
}

// 获取数据库连接
$conn = get_conn();
// 生成卡密
$key = create_key();
// 将卡密存入数据库
save_key($conn, $key);
// 如果存入成功，则卡密创建成功
if ($conn->error) {
    echo make_res(false, $conn->error);
} else {
    echo make_res(true, '创建成功', $key);
}
$conn->close();

/** 生成卡密 */
function create_key()
{
    return md5(uniqid() . '-' . uniqid());
}

/** 将卡密保存到数据库 */
function save_key(mysqli $conn, $key)
{
    $stmt = $conn->prepare('INSERT INTO `key` (`key`) VALUES (?)');
    $stmt->bind_param('s', $key);
    $stmt->execute();
    echo $stmt->error;
    $stmt->close();
}
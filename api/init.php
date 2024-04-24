<?php

require './conn.php';
require './util.php';

// 获取数据库连接
$conn = get_conn();
// 初始化数据库
init_database($conn);
// 判断是否初始化成功
if ($conn->error) {
    echo make_res(false, $conn->error);
} else {
    echo make_res(true, '数据库初始化成功');
}
$conn->close();

/** 初始化数据库 */
function init_database(mysqli $conn)
{
    $stmt = $conn->prepare('CREATE TABLE `key` (
        `id` int NOT NULL AUTO_INCREMENT,
        `key` varchar(255) NOT NULL COMMENT "卡密",
        `available` int NOT NULL DEFAULT 1 COMMENT "是否可用",
        `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "创建时间",
        `remove_time` datetime NULL COMMENT "核销时间",
        PRIMARY KEY (`id`)
    )');
    $stmt->execute();
    $stmt->close();
}
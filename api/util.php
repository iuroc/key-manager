<?php

/**
 * 生成统一格式的响应 JSON
 * @param bool $success 是否成功
 * @param string $message 描述文本
 * @param mixed $data 响应数据主体
 */
function make_res(bool $success, string $message = '操作成功', mixed $data = null): string
{
    return json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function check_key(mysqli $conn, string $key): bool
{
    $stmt = $conn->prepare('SELECT * FROM `key` WHERE `key` = ? AND `available` = ?');
    $available = 1;
    $stmt->bind_param('si', $key, $available);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->num_rows > 0;
}
<?php
// 引入剛剛寫好的連線設定
require_once 'connect.php';

// 假設你的資料庫裡有一張表叫 users
try {
    $stmt = $pdo->query("SELECT VERSION()"); // 查詢資料庫版本
    $version = $stmt->fetchColumn();
    echo "連線成功！資料庫版本為: " . $version;
} catch (Exception $e) {
    echo "查詢出錯: " . $e->getMessage();
}
?>

<?php
// 引入連線設定
require_once 'connect.php';

// 模擬要存入的資料
$new_user = 'Coding_Newbie';
$new_email = 'test@example.com';

try {
    // 1. 準備 SQL 模板 (使用問號 ? 作為佔位符)
    $sql = "INSERT INTO users (username, email) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);

    // 2. 執行並帶入真實資料
    $stmt->execute([$new_user, $new_email]);

    echo "🎉 資料寫入成功！新的 ID 為: " . $pdo->lastInsertId();
} catch (Exception $e) {
    echo "❌ 寫入失敗: " . $e->getMessage();
}
?>

<?php
//namespace Aliyun;
if (is_file( '../plugin/OSS/autoload.php')) {
    require_once '../plugin/OSS/autoload.php';
}

ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);
use \OSS\OssClient;

use \OSS\Core\OssException;
$accessKeyId = "LTAIuTfkvjnNg54j";
$accessKeySecret = "OTETap8a971xgfYdNCawWuHTkbR5dj";
// Endpoint以杭州为例，其它Region请按实际情况填写。
$endpoint = "oss-cn-beijing.aliyuncs.com";
// 存储空间名称
$bucket = "hivebanks";
$object = "example.jpg";
$content = "example.jpg";
try {
    $ossClient = new \OSS\OssClient($accessKeyId, $accessKeySecret, $endpoint);
    $ossClient->putObject($bucket, $object, $content);
    print_r(22);
} catch (\OSS\Core\OssException $e) {
    print $e->getMessage();

}
<?php
namespace Aliyun;
require_once 'autoload.php';

ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);
use Aliyun\OSS\OssClient;

use Aliyun\OSS\Core\OssException;
$accessKeyId = "LTAIuTfkvjnNg54j";
$accessKeySecret = "OTETap8a971xgfYdNCawWuHTkbR5dj";
// Endpoint以杭州为例，其它Region请按实际情况填写。
$endpoint = "oss-cn-beijing.aliyuncs.com";
// 存储空间名称
$bucket = "hivebanks";
$object = "img";
$content = "Hi, OSS.";
try {
    print_r(66);
    $ossClient = new OssClient($accessKeyId, $accessKeySecret, $endpoint);
    print_r($ossClient);
//    $ossClient->putObject($bucket, $object, $content);
    print_r(22);
} catch (OssException $e) {
//    print $e->getMessage();
    print_r(11);

}
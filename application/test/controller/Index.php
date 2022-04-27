<?php
namespace app\test\controller;
 use IEXBase\TronAPI\Tron;
class Index
{
    public function index()
    {
       

        $fullNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
        $solidityNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
        $eventServer = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
        
        try {
            $tron = new \IEXBase\TronAPI\Tron($fullNode, $solidityNode, $eventServer);
        } catch (\IEXBase\TronAPI\Exception\TronException $e) {
            exit($e->getMessage());
        }
        $res = $tron->getBalance("TUkq3uZivUzyDqCpDffKmXPcqrgUU2XHFB", true);
        dump($res);
            }
            
            
    }

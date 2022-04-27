<?php

namespace app\admin\controller;

use app\admin\model\Admin;
use app\admin\model\User;
use app\common\controller\Backend;
use app\common\model\Attachment;
use fast\Date;
use think\Db;
use IEXBase\TronAPI\Tron;
use GuzzleHttp\Client;

/**
 * 控制台
 *
 * @icon   fa fa-dashboard
 * @remark 用于展示当前系统中的统计数据、统计报表及重要实时数据
 */
class Dashboard extends Backend
{

    /**
     * 查看
     */
    public function index()
    {
        try {
            \think\Db::execute("SET @@sql_mode='';");
        } catch (\Exception $e) {

        }
        $fullNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
        $solidityNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
        $eventServer = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
        
        try {
            $tron = new \IEXBase\TronAPI\Tron($fullNode, $solidityNode, $eventServer);
        } catch (\IEXBase\TronAPI\Exception\TronException $e) {
            exit($e->getMessage());
        }
        
        $uri = 'https://api.trongrid.io';// mainnet
        // $uri = 'https://api.shasta.trongrid.io';// shasta testnet
        $api = new \Tron\Api(new Client(['base_uri' => $uri]));
        $config = [
            'contract_address' => 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',// USDT TRC20
            'decimals' => 6,
        ];
        $trc20Wallet = new \Tron\TRC20($api, $config);

        $column = [];
        $starttime = Date::unixtime('day', -6);
        $endtime = Date::unixtime('day', 0, 'end');
        $joinlist = Db("user")->where('jointime', 'between time', [$starttime, $endtime])
            ->field('jointime, status, COUNT(*) AS nums, DATE_FORMAT(FROM_UNIXTIME(jointime), "%Y-%m-%d") AS join_date')
            ->group('join_date')
            ->select();
        for ($time = $starttime; $time <= $endtime;) {
            $column[] = date("Y-m-d", $time);
            $time += 86400;
        }
        $userlist = array_fill_keys($column, 0);
        foreach ($joinlist as $k => $v) {
            $userlist[$v['join_date']] = $v['nums'];
        }
        
        
        // $dbTableList = Db::query("SHOW TABLE STATUS");
        // $addonList = get_addon_list();
        // $totalworkingaddon = 0;
        
        // $totaladdon = count($addonList);
        // foreach ($addonList as $index => $item) {
        //     if ($item['state']) {
        //         $totalworkingaddon += 1;
        //     }
        // }
        
        $config = Db::name("config")->where("group","wallet")->select();
        $address = new \Tron\Address(
            $config[0]['value'],
            '',
            $trc20Wallet->tron->address2HexString($config[0]['value'])
        );
        
        $sizegame_usdt = $trc20Wallet->balance($address);
        $address = new \Tron\Address(
            $config[1]['value'],
            '',
            $trc20Wallet->tron->address2HexString($config[1]['value'])
        );
        $sadgame_usdt = $trc20Wallet->balance($address);
        $address = new \Tron\Address(
            $config[2]['value'],
            '',
            $trc20Wallet->tron->address2HexString($config[2]['value'])
        );
        $doubletailgame_usdt = $trc20Wallet->balance($address);
        $address = new \Tron\Address(
            $config[3]['value'],
            '',
            $trc20Wallet->tron->address2HexString($config[3]['value'])
        );
        $pc10game_usdt = $trc20Wallet->balance($address);
        $address = new \Tron\Address(
            $config[4]['value'],
            '',
            $trc20Wallet->tron->address2HexString($config[4]['value'])
        );
        $payaddress_usdt = $trc20Wallet->balance($address);
        $total_assets_usdt = $sizegame_usdt + $sadgame_usdt + $doubletailgame_usdt + $pc10game_usdt + $payaddress_usdt;
        
        $sizegame_trx =  $tron->getBalance($config[0]['value'], true);
        $sadgame_trx =  $tron->getBalance($config[1]['value'], true);
        $doubletailgame_trx =  $tron->getBalance($config[2]['value'], true);
        $pc10game_trx =  $tron->getBalance($config[3]['value'], true);
        $payaddress_trx =  $tron->getBalance($config[4]['value'], true);
        $total_assets_trx = $sizegame_trx + $sadgame_trx + $doubletailgame_trx + $pc10game_trx + $payaddress_trx;
        
        //今日投入
        $today_trx =  Db::name('game_record')->whereTime('createtime', 'today')->where(['contractRet'=>"SUCCESS",'currency'=> "TRX"])->sum("amount");
        $today_usdt =  Db::name('game_record')->whereTime('createtime', 'today')->where(['contractRet'=>"SUCCESS",'currency'=> "USDT"])->sum("amount");
        
        //今日盈利
        $profit_trx =  Db::name('game_record')->whereTime('createtime', 'today')->where(['contractRet'=>"SUCCESS",'currency'=> "TRX"])->whereIn("status",[1,3])->sum("winmoney");
        $profit_usdt =  Db::name('game_record')->whereTime('createtime', 'today')->where(['contractRet'=>"SUCCESS",'currency'=> "USDT"])->whereIn("status",[1,3])->sum("winmoney");
        
        // 总投入
        $totle_trx =  Db::name('game_record')->where(['contractRet'=>"SUCCESS",'currency'=> "TRX"])->sum("amount");
        $totle_usdt =  Db::name('game_record')->where(['contractRet'=>"SUCCESS",'currency'=> "USDT"])->sum("amount");
        
        //总盈利
        $totle_profit_trx = Db::name('game_record')->where(['contractRet'=>"SUCCESS",'currency'=> "TRX"])->whereIn("status",[1,3])->sum("winmoney");
        $totle_profit_usdt =  Db::name('game_record')->where(['contractRet'=>"SUCCESS",'currency'=> "USDT"])->whereIn("status",[1,3])->sum("winmoney");
        
        //总盈利
        
        // $tron->getBalance(null, true);
        // dump($total_assets_trx);
        $this->view->assign([
            'totaluser'         => User::count(),
            'total_assets_trx'        => $total_assets_trx,
            'total_assets_usdt' => $total_assets_usdt,
            'today_trx' => $today_trx,
            'today_usdt' =>$today_usdt,
            'profit_trx' =>$profit_trx,
            'profit_usdt' => $profit_usdt,
            'totle_profit_trx'=>$totle_profit_trx,
            'totle_profit_usdt'=>$totle_profit_usdt,
            'totle_trx'=>$totle_trx,
            'totle_usdt'=>$totle_usdt,
            'sizegame_trx' =>$sizegame_trx,
            'sadgame_trx' =>$sadgame_trx,
            'doubletailgame_trx' =>$doubletailgame_trx,
            'pc10game_trx'=>$pc10game_trx,
            'payaddress_trx'=>$payaddress_trx,
            
            'sizegame_usdt' =>$sizegame_usdt,
            'sadgame_usdt' =>$sadgame_usdt,
            'doubletailgame_usdt' =>$doubletailgame_usdt,
            'pc10game_usdt'=>$pc10game_usdt,
            'payaddress_usdt'=>$payaddress_usdt,
            
            'totaladmin'        => Admin::count(),
            // 'totalcategory'     => \app\common\model\Category::count(),
            // 'todayusersignup'   => User::whereTime('jointime', 'today')->count(),
            // 'todayuserlogin'    => User::whereTime('logintime', 'today')->count(),
            // 'sevendau'          => User::whereTime('jointime|logintime|prevtime', '-7 days')->count(),
            // 'thirtydau'         => User::whereTime('jointime|logintime|prevtime', '-30 days')->count(),
            // 'threednu'          => User::whereTime('jointime', '-3 days')->count(),
            // 'sevendnu'          => User::whereTime('jointime', '-7 days')->count(),
            // 'dbtablenums'       => count($dbTableList),
            // 'dbsize'            => array_sum(array_map(function ($item) {
            //     return $item['Data_length'] + $item['Index_length'];
            // }, $dbTableList)),
            // 'totalworkingaddon' => $totalworkingaddon,
            // 'attachmentnums'    => Attachment::count(),
            // 'attachmentsize'    => Attachment::sum('filesize'),
            // 'picturenums'       => Attachment::where('mimetype', 'like', 'image/%')->count(),
            // 'picturesize'       => Attachment::where('mimetype', 'like', 'image/%')->sum('filesize'),
        ]);

        $this->assignconfig('column', array_keys($userlist));
        $this->assignconfig('userdata', array_values($userlist));

        return $this->view->fetch();
    }

}

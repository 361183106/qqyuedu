/*ziye
******************************************************************************
⚠️可N个账号，BOX 设置为0 日常任务，设置为1 单开宝箱，设置为2 完整功能  

github地址     https://github.com/ziye12/JavaScript
TG频道地址     https://t.me/ziyescript
TG交流群       https://t.me/joinchat/AAAAAE7XHm-q1-7Np-tF3g
boxjs链接      https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/ziye.boxjs.json
完整版         https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js

本人github地址     https://github.com/ziye12/JavaScript 
转载请备注个名字，谢谢

12.28 固定ck版,增加外部通知，默认12点以及23.40通知，解决宝箱翻倍问题，解决手机端运行异常问题
12.28 解决通知问题，notifyInterval     0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知 
12.28 增加 无通知时打印通知
12.29 修复手机通知问题，增加外部推送开关
1.1 修复签到问题
1.2 增加完整功能 兼容固定ck与boxjs以及变量版 


⚠️cookie获取方法：

进 https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a  点我的   获取cookie

进一本书 看 10秒以下 然后退出，获取阅读时长cookie，看书一定不能超过10秒

可能某些页面会卡住，但是能获取到cookie，再注释cookie重写就行了！



⚠️宝箱奖励为20分钟一次，自己根据情况设置定时，建议设置11分钟一次

hostname=mqqapi.reader.qq.com
############## 圈x
#企鹅读书获取更新body
https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track url script-request-body https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js
#企鹅读书获取时长cookie
https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid? url script-request-header https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js

############## loon
#企鹅读书获取更新body
http-request https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js,requires-body=true, tag=企鹅读书获取更新body
#企鹅读书获取时长cookie
http-request https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid? script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js, requires-header=true, tag=企鹅读书获取时长cookie

############## surge
#企鹅读书获取更新body
企鹅读书获取更新body = type=http-request,pattern=https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track,script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js, 
#企鹅读书获取时长cookie
企鹅读书获取时长cookie = type=http-request,pattern=https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid?,script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js, 



*/

const BOX = 2;//设置为0 日常任务，设置为1 单开宝箱，设置为2 完整功能版
const NODE = 1;//如需固定ck，请设置为1，下载到本地使用



const jsname = '企鹅读书'
const $ = Env(jsname)
let task, tz, kz, config = '';
let wktime;
let ydrw;
let dk;
let ljyd;
let sp;

console.log(`\n========= 脚本执行时间(TM)：${new Date(new Date().getTime() + 0 * 60 * 60 * 1000).toLocaleString('zh', { hour12: false })} =========\n`)
const notify = $.isNode() ? require("./sendNotify") : "";
const notifyttt = 0// 0为关闭外部推送，1为12 23 点外部推送
const notifyInterval = 2;// 0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知 
const logs = 0;   //0为关闭日志，1为开启
const maxtime = 10//每日上传时长限制，默认20小时
const wktimess = 1200//周奖励领取标准，默认1200分钟
let CASH = 0;


//⚠️固定ck则在``里面填写ck，多账号换行

let qqreadbodyVal=`{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875860933","guid":2875860933,"session":"64awactipb1d7mdijoglmqkhn3bsj3bw","scene":1007,"source":"wza0001wzb0001","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"33477116","cid":"1"},"dis":1609647882291,"ext6":127,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"33477116","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_33477116"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875323829","guid":2875323829,"session":"pt4g2zttpupmsgjqf4zkjdnbywwkpv1g","scene":1007,"source":"wza0006wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"26291181","cid":"1"},"dis":1609560331925,"ext6":67,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"26291181","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_26291181"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2872930957","guid":2872930957,"session":"btsl1d8ur84xx2ln28ic09ow9kdapilz","scene":1007,"source":"wza0006wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31207188","cid":"1"},"dis":1609560405988,"ext6":29,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31207188","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_31207188"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2223853238","guid":2223853238,"session":"ly3fyjfy5n1ftbxgg2sa1ce8x5dpxnsd","scene":1007,"source":"wza0006wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookDetail_chapter_slide_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"33498200","cid":"1"},"dis":1609560500508,"ext6":31,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"33498200","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_33498200"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2223981391","guid":2223981391,"session":"f1npppwy4wi562qdtm4bh7jbxuk9yqfq","scene":1007,"source":"wza0006wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"33705015","cid":"1"},"dis":1609560575629,"ext6":21,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"33705015","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_33705015"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2750634282","guid":2750634282,"session":"21idtrrpn84a1v7i61f73yye3wngo9he","scene":1007,"source":"wza0006wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"32187459","cid":"1"},"dis":1609560666023,"ext6":30,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"32187459","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_32187459"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875459034","guid":2875459034,"session":"jkofeoqbufe7t43dbqepbdkkqsv4s1oq","scene":1007,"source":"wza0006wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"34236115","cid":"1"},"dis":1609560830217,"ext6":57,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"34236115","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_34236115"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875432207","guid":2875432207,"session":"r22j5sda5za1of1fuyo2vhmec22gsbgi","scene":1007,"source":"wza0006wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"33498200","cid":"1"},"dis":1609569051695,"ext6":26,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"33498200","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_33498200"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875689373","guid":2875689373,"session":"agtnsn2k1egtwzy3te56eqek4v596avo","scene":1007,"source":"wza0006wzb0003","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"27288278","cid":"1"},"dis":1609569203603,"ext6":75,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"27288278","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_27288278"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875513960","guid":2875513960,"session":"7bts9ug1tffphz0w2csqtoct70vtmiyi","scene":1007,"source":"wza0003wzb0002","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"26291181","cid":"1"},"dis":1609569270429,"ext6":31,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"26291181","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_26291181"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875767496","guid":2875767496,"session":"xrj8mnnngnmmfhoa0wzvp0edvwbujcuy","scene":1007,"source":"wza0003wzb0002","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookDetail_chapter_slide_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"29153089","cid":"1"},"dis":1609569340277,"ext6":31,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"29153089","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_29153089"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875403431","guid":2875403431,"session":"6u0di6nh9uh22y56u454qmyzart6haln","scene":1007,"source":"wza0003wzb0002","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"749376","cid":"1"},"dis":1609569586940,"ext6":30,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"749376","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_749376"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2872781428","guid":2872781428,"session":"i3bmdttuw003lt46ekauqpoft8jqzu7a","scene":1007,"source":"wza0003wzb0002","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"749376","cid":"1"},"dis":1609569469488,"ext6":46,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"749376","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_749376"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"3535028425","guid":3535028425,"session":"3zmbydysu3h7an5eqkvf95hlhlhaqkgo","scene":1007,"source":"wza0002wzb0002","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"30519958","cid":"1"},"dis":1609569655018,"ext6":30,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"30519958","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_30519958"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"8D19F114F5B32F3995EDCE10FE37B90D","guid":2749918094,"session":"z86arp7esxmsyxvd28vv8szwhdblbu9n","scene":1007,"source":"wza0002wzb0002","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"30519958","cid":"1"},"dis":1609569860421,"ext6":39,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"30519958","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_30519958"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"3382023740","guid":3382023740,"session":"6ig11llljjhg5wqe1lpg1cdg5tyt1mu2","scene":1007,"source":"wza0001wzb0001","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"34236115","cid":"1"},"dis":1609569949032,"ext6":49,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"34236115","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_34236115"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"3381856384","guid":3381856384,"session":"d1x4eidlw2xpp7wtqmcyx5ahzkh58b52","scene":1007,"source":"wza0006wzb0003","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"26291181","cid":"1"},"dis":1609580500460,"ext6":29,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"26291181","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_26291181"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875458548","guid":2875458548,"session":"00wvd2m6u5xx1ktq84vuhh6zvbwoyhh1","scene":1007,"source":"wza0003wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"30519958","cid":"1"},"dis":1609594214318,"ext6":38,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"30519958","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_30519958"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875789840","guid":2875789840,"session":"htdqnicejf6u00ym6mdvlyv77bpzygt3","scene":1007,"source":"wza0003wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"27288278","cid":"1"},"dis":1609594307289,"ext6":20,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"27288278","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_27288278"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2872786724","guid":2872786724,"session":"z930at96iau935makzg4camnn0q9svzm","scene":1007,"source":"wza0003wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"30519958","cid":"1"},"dis":1609594368028,"ext6":20,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"30519958","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_30519958"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875357643","guid":2875357643,"session":"2u0ynyqniaiwl5viu2r99pub7v143ym3","scene":1007,"source":"wza0003wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31835974","cid":"1"},"dis":1609660416127,"ext6":24,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31835974","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_31835974"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875769568","guid":2875769568,"session":"1wjxd2ravjtf810yze9wfqbcq1jaxh0r","scene":1007,"source":"wza0003wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"31835974","cid":"1"},"dis":1609595080116,"ext6":44,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"31835974","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_31835974"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2878079539","guid":2878079539,"session":"co5q27l0rap6kmu6t5c0g1jr3bddh73q","scene":1007,"source":"wza0002wzb0002","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"28233273","cid":"1"},"dis":1609595162488,"ext6":20,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"28233273","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_28233273"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"2875504673","guid":2875504673,"session":"okah3oc7hhf17xnk4wh49yct02byun2w","scene":1007,"source":"wza0001wzb0004","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"30519958","cid":"1"},"dis":1609595283596,"ext6":34,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"30519958","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_30519958"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"1736006072","guid":1736006072,"session":"w1ymanox34quww26c76b77cmwpnt4ppb","scene":1007,"source":"wza0006wzb0003","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"23811329","cid":"1"},"dis":1609595462190,"ext6":35,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"23811329","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_23811329"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"3381887569","guid":3381887569,"session":"d9nhgoncszcsj4dwi2yz46rmjbhb4ivd","scene":1007,"source":"wza0003wzb0001","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"27598876","cid":"1"},"dis":1609595554295,"ext6":20,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"27598876","bookStatus":1,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_27598876"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"1735747360","guid":1735747360,"session":"uu82txdxnbr5agal73krlv68xypdwdtq","scene":1007,"source":"wza0003wzb0001","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"29153089","cid":"1"},"dis":1609595607512,"ext6":31,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"29153089","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_29153089"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"1747212261","guid":1747212261,"session":"40tkkdblj7vpcjm2ie7nqphs0dftob7e","scene":1007,"source":"wza0003wzb0005","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookDetail_chapter_slide_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"26703582","cid":"1"},"dis":1609596056658,"ext6":32,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"26703582","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_26703582"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"1736109634","guid":1736109634,"session":"b1a4ag61iqx576aceky1986kvx1l6sml","scene":1007,"source":"wza0003wzb0005","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"26291181","cid":"1"},"dis":1609596153891,"ext6":30,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"26291181","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_26291181"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"1735720250","guid":1735720250,"session":"1bftprhfx05z7pzcozngm1z7qd6qllcw","scene":1007,"source":"wza0003wzb0005","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookStore_newCI_unit_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"23811329","cid":"1"},"dis":1609596385136,"ext6":43,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"23811329","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_23811329"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"3381746979","guid":3381746979,"session":"modis7pkczzl25nu62ffijl0w8r4323k","scene":1007,"source":"wza0003wzb0005","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"bookDetail_chapter_slide_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"25184772","cid":"1"},"dis":1609596544329,"ext6":65,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"25184772","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_25184772"}]}
{"common":{"appid":1450024394,"areaid":5,"qq_ver":"8.4.9","os_ver":"iOS 14.1","mp_ver":"0.41.0","mpos_ver":"1.19.0","brand":"iPhone","model":"iPhone 7<iPhone9,1>","screenWidth":375,"screenHeight":667,"windowWidth":375,"windowHeight":618,"openid":"3382104898","guid":3382104898,"session":"du2emff7jmwjz1mvwb1a3cvmq6njpi5p","scene":1007,"source":"wza0003wzb0005","hasRedDot":"false","missions":-1,"caseID":-1},"dataList":[{"click1":"bookDetail_bottomBar_read_C","click2":"NewyearCard_pageClose_C","route":"pages/book-read/index","refer":"pages/book-detail/index","options":{"bid":"26291181","cid":"1"},"dis":1609596624223,"ext6":31,"eventID":"bookRead_show_I","type":"shown","ccid":1,"bid":"26291181","bookStatus":0,"bookPay":1,"chapterStatus":0,"ext1":{"font":18,"bg":0,"pageMode":1},"from":"1007_26291181"}]}`;
let qqreadtimeurlVal=`https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=33477116&readTime=4470&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4470%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=26291181&readTime=4962&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4962%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=31207188&readTime=4548&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4548%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=33498200&readTime=4550&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4550%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=33705015&readTime=4662&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4662%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=32187459&readTime=5922&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A5922%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=34236115&readTime=4414&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4414%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=33498200&readTime=4335&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4335%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=27288278&readTime=4460&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4460%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=26291181&readTime=4127&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4127%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=29153089&readTime=4440&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4440%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=749376&readTime=4171&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4171%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=749376&readTime=4565&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4565%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=30519958&readTime=4461&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4461%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=30519958&readTime=4615&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4615%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=34236115&readTime=5105&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A5105%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=26291181&readTime=4210&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4210%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=30519958&readTime=4780&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4780%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=27288278&readTime=4876&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4876%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=30519958&readTime=4436&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4436%2C%22pay_status%22%3A0%2C%22is_tail%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=31835974&readTime=3749&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A3749%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=31835974&readTime=4334&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4334%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=28233273&readTime=3719&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A3719%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=30519958&readTime=4407&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4407%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=23811329&readTime=4298&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4298%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=27598876&readTime=4332&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4332%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=29153089&readTime=4645&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4645%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=26703582&readTime=3866&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A3866%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=26291181&readTime=4486&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4486%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=23811329&readTime=5018&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A5018%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=25184772&readTime=4250&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4250%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1
https://mqqapi.reader.qq.com/mqq/addReadTimeWithBid?scene=1007&refer=pages%2Findex%2Findex&bid=26291181&readTime=4931&read_type=0&conttype=1&read_status=0&chapter_info=%5B%7B%221%22%3A%7B%22readTime%22%3A4931%2C%22pay_status%22%3A0%7D%7D%5D&sp=-1`;
let qqreadtimeheaderVal=`{"Accept":"*/*","Content-Type":"application/json","ywsession":"64awactipb1d7mdijoglmqkhn3bsj3bw","Cookie":"ywguid=2875860933;ywkey=yw99PyQ9nxAf;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875860933","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"pt4g2zttpupmsgjqf4zkjdnbywwkpv1g","Cookie":"ywguid=2875323829;ywkey=ywHNwuduJGiV;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875323829","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"btsl1d8ur84xx2ln28ic09ow9kdapilz","Cookie":"ywguid=2872930957;ywkey=ywKIrI5kYMpj;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2872930957","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"ly3fyjfy5n1ftbxgg2sa1ce8x5dpxnsd","Cookie":"ywguid=2223853238;ywkey=yw3JxIPPMvGq;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2223853238","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"f1npppwy4wi562qdtm4bh7jbxuk9yqfq","Cookie":"ywguid=2223981391;ywkey=yw9YyhZdbdPj;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2223981391","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"21idtrrpn84a1v7i61f73yye3wngo9he","Cookie":"ywguid=2750634282;ywkey=ywsfDCKo0GWh;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2750634282","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"jkofeoqbufe7t43dbqepbdkkqsv4s1oq","Cookie":"ywguid=2875459034;ywkey=ywVSN0fbXuV0;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875459034","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"r22j5sda5za1of1fuyo2vhmec22gsbgi","Cookie":"ywguid=2875432207;ywkey=ywz5dnSX5E1m;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875432207","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"agtnsn2k1egtwzy3te56eqek4v596avo","Cookie":"ywguid=2875689373;ywkey=yw2aYd5zv7Qw;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875689373","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"7bts9ug1tffphz0w2csqtoct70vtmiyi","Cookie":"ywguid=2875513960;ywkey=ywZ1ZeGkvQGd;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875513960","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"xrj8mnnngnmmfhoa0wzvp0edvwbujcuy","Cookie":"ywguid=2875767496;ywkey=ywWb3OnQ7BYe;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875767496","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"6u0di6nh9uh22y56u454qmyzart6haln","Cookie":"ywguid=2875403431;ywkey=ywHxXRVbK3Nr;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875403431","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"i3bmdttuw003lt46ekauqpoft8jqzu7a","Cookie":"ywguid=2872781428;ywkey=yw9LhEdzZSU1;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2872781428","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"3zmbydysu3h7an5eqkvf95hlhlhaqkgo","Cookie":"ywguid=3535028425;ywkey=ywwQWNdyNCZv;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=3535028425","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"z86arp7esxmsyxvd28vv8szwhdblbu9n","Cookie":"ywguid=2749918094;ywkey=ywuyF1GDQ3zi;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=8D19F114F5B32F3995EDCE10FE37B90D","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"6ig11llljjhg5wqe1lpg1cdg5tyt1mu2","Cookie":"ywguid=3382023740;ywkey=yw3BwPcdCIvH;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=3382023740","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"d1x4eidlw2xpp7wtqmcyx5ahzkh58b52","Cookie":"ywguid=3381856384;ywkey=yw656LzXRP5O;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=3381856384","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"00wvd2m6u5xx1ktq84vuhh6zvbwoyhh1","Cookie":"ywguid=2875458548;ywkey=ywua7kbaVYlS;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875458548","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"htdqnicejf6u00ym6mdvlyv77bpzygt3","Cookie":"ywguid=2875789840;ywkey=ywnzBu95RdHO;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875789840","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"z930at96iau935makzg4camnn0q9svzm","Cookie":"ywguid=2872786724;ywkey=yws0UrvPdaLV;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2872786724","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"2u0ynyqniaiwl5viu2r99pub7v143ym3","Cookie":"ywguid=2875357643;ywkey=ywRqXF7w8HEM;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875357643","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"1wjxd2ravjtf810yze9wfqbcq1jaxh0r","Cookie":"ywguid=2875769568;ywkey=ywfYmnNLZYui;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875769568","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"co5q27l0rap6kmu6t5c0g1jr3bddh73q","Cookie":"ywguid=2878079539;ywkey=ywThPAOup8VZ;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2878079539","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"okah3oc7hhf17xnk4wh49yct02byun2w","Cookie":"ywguid=2875504673;ywkey=ywS7Reabf9Bf;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=2875504673","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"w1ymanox34quww26c76b77cmwpnt4ppb","Cookie":"ywguid=1736006072;ywkey=yw3ShCRoIOb1;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=1736006072","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"d9nhgoncszcsj4dwi2yz46rmjbhb4ivd","Cookie":"ywguid=3381887569;ywkey=ywrYLit5E0qU;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=3381887569","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"uu82txdxnbr5agal73krlv68xypdwdtq","Cookie":"ywguid=1735747360;ywkey=ywQmINrwo027;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=1735747360","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"40tkkdblj7vpcjm2ie7nqphs0dftob7e","Cookie":"ywguid=1747212261;ywkey=ywxz0lmu11XW;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=1747212261","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"b1a4ag61iqx576aceky1986kvx1l6sml","Cookie":"ywguid=1736109634;ywkey=yw0z3HsJbiqZ;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=1736109634","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"1bftprhfx05z7pzcozngm1z7qd6qllcw","Cookie":"ywguid=1735720250;ywkey=ywZJuiZIbNFo;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=1735720250","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"modis7pkczzl25nu62ffijl0w8r4323k","Cookie":"ywguid=3381746979;ywkey=ywR1R4mTOvsr;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=3381746979","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}
{"Accept":"*/*","Content-Type":"application/json","ywsession":"du2emff7jmwjz1mvwb1a3cvmq6njpi5p","Cookie":"ywguid=3382104898;ywkey=ywLuQnHAoJVZ;platform=ios;channel=mqqmina;mpVersion=0.41.0;qq_ver=8.4.9;os_ver=iOS 14.1;mpos_ver=1.19.0;platform=ios;openid=3382104898","mpversion":"0.41.0","Connection":"keep-alive","Host":"mqqapi.reader.qq.com","User-Agent":"QQ/8.4.9.604 CFNetwork/1197 Darwin/20.0.0","Referer":"https://appservice.qq.com/1110657249/0.41.0/page-frame.html","Accept-Encoding":"gzip, deflate, br","Accept-Language":"zh-cn"}`;

const qqreadbdArr = [];
const qqreadtimeurlArr = [];
const qqreadtimehdArr = [];
let qqreadBD = [];
let qqreadtimeURL = [];
let qqreadtimeHD = [];

const nowTimes = new Date(
  new Date().getTime() +
  new Date().getTimezoneOffset() * 60 * 1000 +
  8 * 60 * 60 * 1000
);

if ($.isNode() &&
  process.env.QQREAD_BODY) {
  // 没有设置 QQREAD_CASH 则默认为 0 不提现
  CASH = process.env.QQREAD_CASH || 0;

  // 自定义多 cookie 之间连接的分隔符，默认为 \n 换行分割，不熟悉的不要改动和配置，为了兼容本地 node 执行
  COOKIES_SPLIT = process.env.COOKIES_SPLIT || "\n";

  console.log(
    `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
  );
  if (
    process.env.QQREAD_BODY &&
    process.env.QQREAD_BODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    qqreadBD = process.env.QQREAD_BODY.split(COOKIES_SPLIT);
  } else {
    qqreadBD = process.env.QQREAD_BODY.split();
  }

  if (
    process.env.QQREAD_TIMEURL &&
    process.env.QQREAD_TIMEURL.indexOf(COOKIES_SPLIT) > -1
  ) {
    qqreadtimeURL = process.env.QQREAD_TIMEURL.split(COOKIES_SPLIT);
  } else {
    qqreadtimeURL = process.env.QQREAD_TIMEURL.split();
  }

  if (
    process.env.QQREAD_TIMEHD &&
    process.env.QQREAD_TIMEHD.indexOf(COOKIES_SPLIT) > -1
  ) {
    qqreadtimeHD = process.env.QQREAD_TIMEHD.split(COOKIES_SPLIT);
  } else {
    qqreadtimeHD = process.env.QQREAD_TIMEHD.split();
  }
}

if (NODE == 1) {
  QQ_READ_COOKIES = {
    "qqreadbodyVal": qqreadbodyVal.split('\n'),
    "qqreadtimeurlVal": qqreadtimeurlVal.split('\n'),
    "qqreadtimeheaderVal": qqreadtimeheaderVal.split('\n')
  }

  Length = QQ_READ_COOKIES.qqreadbodyVal.length;
}


if (NODE != 1) {

  if ($.isNode()) {
    Object.keys(qqreadBD).forEach((item) => {
      if (qqreadBD[item]) {
        qqreadbdArr.push(qqreadBD[item]);
      }
    });
    Object.keys(qqreadtimeURL).forEach((item) => {
      if (qqreadtimeURL[item]) {
        qqreadtimeurlArr.push(qqreadtimeURL[item]);
      }
    });
    Object.keys(qqreadtimeHD).forEach((item) => {
      if (qqreadtimeHD[item]) {
        qqreadtimehdArr.push(qqreadtimeHD[item]);
      }
    });
  } else {
    qqreadbdArr.push($.getdata("qqreadbd"));
    qqreadtimeurlArr.push($.getdata("qqreadtimeurl"));
    qqreadtimehdArr.push($.getdata("qqreadtimehd"));
    // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
    if ("qeCASH") {
      CASH = $.getval("qeCASH");
    }
    const qeCount = ($.getval("qeCount") || "1") - 0;
    for (let i = 2; i <= qeCount; i++) {
      if ($.getdata(`qqreadbd${i}`)) {
        qqreadbdArr.push($.getdata(`qqreadbd${i}`));
        qqreadtimeurlArr.push($.getdata(`qqreadtimeurl${i}`));
        qqreadtimehdArr.push($.getdata(`qqreadtimehd${i}`));
      }
    }
  }
  Length = qqreadbdArr.length
}

if ($.isNode()) {
  daytime =
    new Date(new Date().toLocaleDateString()).getTime() - 8 * 60 * 60 * 1000;
} else {
  daytime = new Date(new Date().toLocaleDateString()).getTime();
}

if ((isGetCookie = typeof $request !== "undefined")) {
  GetCookie();
  $.done();
}

function GetCookie() {
  if ($request && $request.url.indexOf("addReadTimeWithBid?") >= 0) {
    const qqreadtimeurlVal = $request.url;
    if (qqreadtimeurlVal) $.setdata(qqreadtimeurlVal, `qqreadtimeurl${$.idx}`);
    $.log(
      `[${jsname + $.idx
      }] 获取时长url: 成功,qqreadtimeurlVal: ${qqreadtimeurlVal}`
    );
    $.msg(jsname + $.idx, `获取时长url: 成功🎉`, ``);
    const qqreadtimeheaderVal = JSON.stringify($request.headers);
    if (qqreadtimeheaderVal)
      $.setdata(qqreadtimeheaderVal, `qqreadtimehd${$.idx}`);
    $.log(
      `[${jsname + $.idx
      }] 获取时长header: 成功,qqreadtimeheaderVal: ${qqreadtimeheaderVal}`
    );
    $.msg(jsname + $.idx, `获取时长header: 成功🎉`, ``);
  } else if (
    $request &&
    $request.body.indexOf("bookDetail_bottomBar_read_C") >= 0 &&
    $request.body.indexOf("bookRead_show_I") >= 0 &&
    $request.body.indexOf("topBar_left_back_C") < 0 &&
    $request.body.indexOf("bookRead_dropOut_shelfYes_C") < 0
  ) {
    const qqreadbodyVal = $request.body;
    if (qqreadbodyVal) $.setdata(qqreadbodyVal, `qqreadbd${$.idx}`);
    $.log(
      `[${jsname + $.idx}] 获取更新body: 成功,qqreadbodyVal: ${qqreadbodyVal}`
    );
    $.msg(jsname + $.idx, `获取更新body: 成功🎉`, ``);
  }
}

console.log(
  `================== 脚本执行 - 北京时间(UTC+8)：${new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
  ).toLocaleString()} =====================\n`
);

console.log(
  `============ 共 ${Length} 个${jsname}账号=============\n`
);

console.log(`============ 提现标准为：${CASH} =============\n`);


!(async () => {

  await all();

})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function all() {

  if (!Length) {
    $.msg(
      jsname,
      "⚠️提示：您还未获取cookie,请点击前往获取cookie\n",
      "https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a",
      { "open-url": "https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a" }
    );
    $.done();
  }

  for (let i = 0; i < Length; i++) {
    if (NODE == 1) {
      qqreadbodyVal = QQ_READ_COOKIES.qqreadbodyVal[i];
      qqreadtimeurlVal = QQ_READ_COOKIES.qqreadtimeurlVal[i];
      qqreadtimeheaderVal = QQ_READ_COOKIES.qqreadtimeheaderVal[i];
    }
    if (NODE != 1) {
      qqreadbodyVal = qqreadbdArr[i];
      qqreadtimeurlVal = qqreadtimeurlArr[i];
      qqreadtimeheaderVal = qqreadtimehdArr[i];

    }
    O = (`${jsname + (i + 1)}🔔`);
    tz = '';
    kz = '';
    let cookie_is_live = await qqreadinfo(i + 1);//用户名
    if (!cookie_is_live) {
      continue;
    }
    if (BOX == 0) {
      await qqreadtrack();//更新
      await qqreadconfig();//时长查询
      await qqreadwktime();//周时长查询
      if (config.data && config.data.pageParams.todayReadSeconds / 3600 <= maxtime) {
        await qqreadtime();// 上传时长
      }
      if (wktime.data && wktime.data.readTime >= wktimess && wktime.data.readTime <= 1250) {
        await qqreadpick();//领周时长奖励
      }
      await qqreadtask();//任务列表
      if (task.data && ljyd.doneFlag == 0) {
        await qqreaddayread();//阅读任务
      }
      if (ydrw.doneFlag == 0 && config.data && config.data.pageParams.todayReadSeconds / 60 >= 1) {
        await qqreadssr1();//阅读金币1	  
      }
      if (task.data && dk.doneFlag == 0) {
        await qqreadsign();//金币签到
        await qqreadtake();//阅豆签到
      }
      await $.wait(4000)
      if (ydrw.doneFlag == 0 && config.data && config.data.pageParams.todayReadSeconds / 60 >= 30) {
        await qqreadssr2();//阅读金币2
        await $.wait(4000);
        await qqreadssr3();//阅读金币3
      }
      if (nowTimes.getHours() >= 23 && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 59)) {
        if (CASH >= 1 && task.data && task.data.user.amount >= CASH * 10000) {
          await qqreadwithdraw();//提现
        }
        await qqreadtrans();//今日收益累计
      }
      if (task.data && dk.doneFlag == 0) {
        await qqreadsign2();
      }//签到翻倍    	
      if (task.data && sp.doneFlag == 0) {
        await qqreadvideo();//视频奖励
      }

    }


    if (BOX == 1) {

      if (nowTimes.getHours() === 0 && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 59)) {
        await qqreadtrack();//更新
      }
      await qqreadtask();//任务列表
      if (task.data && ljyd.doneFlag == 0) {
        await qqreaddayread();//阅读任务
      }
      if (task.data && task.data.treasureBox.timeInterval <= 10000) {
        await $.wait(task.data.treasureBox.timeInterval)
        await qqreadbox();//宝箱
      }
      if (task.data && task.data.treasureBox.timeInterval - 600000 <= 10000) {
        await $.wait(task.data.treasureBox.timeInterval - 600000)
        await qqreadbox2();//宝箱翻倍
      }
    }

    if (BOX == 2) {
      await qqreadtrack();//更新
      await qqreadconfig();//时长查询
      await qqreadwktime();//周时长查询
      if (config.data && config.data.pageParams.todayReadSeconds / 3600 <= maxtime) {
        await qqreadtime();// 上传时长
      }
      if (wktime.data && wktime.data.readTime >= wktimess && wktime.data.readTime <= 1250) {
        await qqreadpick();//领周时长奖励
      }
      await qqreadtask();//任务列表
      if (task.data && ljyd.doneFlag == 0) {
        await qqreaddayread();//阅读任务
      }
      if (ydrw.doneFlag == 0 && config.data && config.data.pageParams.todayReadSeconds / 60 >= 1) {
        await qqreadssr1();//阅读金币1	  
      }
      if (task.data && dk.doneFlag == 0) {
        await qqreadsign();//金币签到
        await qqreadtake();//阅豆签到
      }
      if (task.data && task.data.treasureBox.timeInterval <= 10000) {
        await $.wait(task.data.treasureBox.timeInterval)
        await qqreadbox();//宝箱
      }
      await $.wait(4000)
      if (task.data && task.data.treasureBox.timeInterval - 600000 <= 10000) {
        await $.wait(task.data.treasureBox.timeInterval - 600000)
        await qqreadbox2();//宝箱翻倍
      }
      if (ydrw.doneFlag == 0 && config.data && config.data.pageParams.todayReadSeconds / 60 >= 30) {
        await qqreadssr2();//阅读金币2
        await $.wait(4000);
        await qqreadssr3();//阅读金币3
      }
      if (nowTimes.getHours() >= 23 && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 59)) {
        if (CASH >= 1 && task.data && task.data.user.amount >= CASH * 10000) {
          await qqreadwithdraw();//提现
        }
        await qqreadtrans();//今日收益累计
      }
      if (task.data && dk.doneFlag == 0) {
        await qqreadsign2();
      }//签到翻倍    	
      if (task.data && sp.doneFlag == 0) {
        await qqreadvideo();//视频奖励
      }

    }

    await showmsg();//通知	

  }
}


function showmsg() {
  return new Promise(async resolve => {
    if (BOX != 1) {
      if (notifyInterval != 1) {
        console.log(O + '\n' + tz);
      }

      if (notifyInterval == 1) {
        $.msg(O, "", tz);
      }
      if (notifyInterval == 2 && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
        $.msg(O, "", tz);
      }
      if (notifyInterval == 3 && (nowTimes.getHours() === 6 || nowTimes.getHours() === 12 || nowTimes.getHours() === 18 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
        $.msg(O, "", tz);
      }

      if (notifyttt == 1 && $.isNode() && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10))
        await notify.sendNotify(O, tz);

    }
    if (BOX == 1) {
      if (notifyInterval != 1) {
        console.log(O + '\n' + kz);
      }

      if (notifyInterval == 1) {
        $.msg(O, "", kz);
      }
      if (notifyInterval == 2 && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
        $.msg(O, "", kz);
      }
      if (notifyInterval == 3 && (nowTimes.getHours() === 6 || nowTimes.getHours() === 12 || nowTimes.getHours() === 18 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
        $.msg(O, "", kz);
      }

      if (notifyttt == 1 && $.isNode() && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10))
        await notify.sendNotify(O, kz);

    }
    resolve()
  })
}


// 更新
function qqreadtrack() {
  return new Promise((resolve, reject) => {
    const body = qqreadbodyVal.replace(new RegExp(/"dis":[0-9]{13}/), `"dis":${new Date().getTime()}`)
    const toqqreadtrackurl = {
      url: "https://mqqapi.reader.qq.com/log/v4/mqq/track",
      headers: JSON.parse(qqreadtimeheaderVal),
      body: body,
      timeout: 60000,
    };
    $.post(toqqreadtrackurl, (error, response, data) => {
      if (logs) $.log(`${O}, 更新: ${data}`);
      let track = JSON.parse(data);
      tz += `【数据更新】:更新${track.msg}\n`;
      kz += `【数据更新】:更新${track.msg}\n`;
      resolve();
    });
  });
}
// 用户名
function qqreadinfo(account_count) {
  return new Promise((resolve, reject) => {
    const toqqreadinfourl = {
      url: "https://mqqapi.reader.qq.com/mqq/user/init",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadinfourl, (error, response, data) => {
      if (logs) $.log(`${O}, 用户名: ${data}`);
      let info = JSON.parse(data);
      if (!info.data.user) {
        $.msg(`❌❌❌【${jsname + (account_count)}】COOKIE失效，请重新获取`);
        let cookie_not_live_message = new Date(new Date().getTime()).toLocaleString() + "企鹅读书账号" + account_count + "COOKIE失效";
        notify.sendNotify(jsname, cookie_not_live_message);
        kz += "账号" + account_count + "COOKIE失效";
        tz += "账号" + account_count + "COOKIE失效";
        resolve(false);
      } else {
        tz += `\n========== 【${info.data.user.nickName}】 ==========\n`;
        kz += `\n========== 【${info.data.user.nickName}】 ==========\n`;
        resolve(true);
      }
    });
  });
}
// 任务列表
function qqreadtask() {
  return new Promise((resolve, reject) => {
    const toqqreadtaskurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/page?fromGuid=",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadtaskurl, (error, response, data) => {
      if (logs) $.log(`${O}, 任务列表: ${data}`);
      task = JSON.parse(data);
      dk = task.data.taskList.find(item => item.type === 200);
      ljyd = task.data.taskList.find(item => item.type === 210);
      ydrw = task.data.taskList.find(item => item.type === 220);
      sp = task.data.taskList.find(item => item.type === 230);

      if (task.data.invite.nextInviteConfig) {
        tz +=
          `【现金余额】:${(task.data.user.amount / 10000).toFixed(2)}元\n` +
          `【第${task.data.invite.issue}期】:时间${task.data.invite.dayRange}\n` +
          ` 已邀请${task.data.invite.inviteCount}人，再邀请${task.data.invite.nextInviteConfig.count}人获得${task.data.invite.nextInviteConfig.amount}金币\n` +
          `【${dk.title}】:${dk.amount}金币,${dk.actionText}\n` +
          `【${ljyd.title}】:${ljyd.amount}金币,${ljyd.actionText}\n` +
          `【${ydrw.title}】:${ydrw.amount}金币,${ydrw.actionText}\n` +
          `【${sp.title}】:${sp.amount}金币,${sp.actionText}\n` +
          `【宝箱任务${task.data.treasureBox.count + 1}】:${task.data.treasureBox.timeInterval / 1000
          }秒后领取\n` +
          `【${task.data.fans.title}】:${task.data.fans.fansCount}个好友,${task.data.fans.todayAmount}金币\n`;
      }

      kz +=
        `【现金余额】:${(task.data.user.amount / 10000).toFixed(2)}元\n` +
        `【宝箱任务${task.data.treasureBox.count + 1}】:${task.data.treasureBox.timeInterval / 1000
        }秒后领取\n` +
        `【已开宝箱】:${task.data.treasureBox.count}个\n`;

      resolve();
    });
  });
}
// 每日阅读
function qqreaddayread() {
  return new Promise((resolve, reject) => {
    const toqqreaddayreadurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/read_book",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddayreadurl, (error, response, data) => {
      if (logs) $.log(`${O}, 每日阅读: ${data}`);
      let dayread = JSON.parse(data);
      if (dayread.code == 0) {
        tz += `【每日阅读】:获得${dayread.data.amount}金币\n`;
        kz += `【每日阅读】:获得${dayread.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 金币签到
function qqreadsign() {
  return new Promise((resolve, reject) => {
    const toqqreadsignurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/clock_in",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadsignurl, (error, response, data) => {
      if (logs) $.log(`${O}, 金币签到: ${data}`);
      sign = JSON.parse(data);
      if (sign.code == 0) {
        tz += `【金币签到】:获得${sign.data.amount}金币\n`;
        kz += `【金币签到】:获得${sign.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 金币签到翻倍
function qqreadsign2() {
  return new Promise((resolve, reject) => {
    const toqqreadsign2url = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/clock_in_video",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadsign2url, (error, response, data) => {
      if (logs) $.log(`${O}, 金币签到翻倍: ${data}`);
      let sign2 = JSON.parse(data);
      if (sign2.code == 0) {
        tz += `【签到翻倍】:获得${sign2.data.amount}金币\n`;
        kz += `【签到翻倍】:获得${sign2.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 视频奖励
function qqreadvideo() {
  return new Promise((resolve, reject) => {
    const toqqreadvideourl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/watch_video",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadvideourl, (error, response, data) => {
      if (logs) $.log(`${O}, 视频奖励: ${data}`);
      let video = JSON.parse(data);
      if (video.code == 0) {
        tz += `【视频奖励】:获得${video.data.amount}金币\n`;
        kz += `【视频奖励】:获得${video.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 阅读金币1
function qqreadssr1() {
  return new Promise((resolve, reject) => {
    const toqqreadssr1url = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=30`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };

    $.get(toqqreadssr1url, (error, response, data) => {
      if (logs) $.log(`${O}, 金币奖励1: ${data}`);
      let ssr1 = JSON.parse(data);
      if (ssr1.data.amount > 0) {
        tz += `【阅读金币1】获得${ssr1.data.amount}金币\n`;
        kz += `【阅读金币1】获得${ssr1.data.amount}金币\n`;
      }
    });

    resolve();
  });
}
// 阅读金币2
function qqreadssr2() {
  return new Promise((resolve, reject) => {
    const toqqreadssr2url = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=300`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };

    $.get(toqqreadssr2url, (error, response, data) => {
      if (logs) $.log(`${O}, 金币奖励2: ${data}`);
      ssr2 = JSON.parse(data);
      if (ssr2.data.amount > 0) {
        tz += `【阅读金币2】获得${ssr2.data.amount}金币\n`;
        kz += `【阅读金币2】获得${ssr2.data.amount}金币\n`;
      }
    });

    resolve();
  });
}
// 阅读金币3
function qqreadssr3() {
  return new Promise((resolve, reject) => {
    const toqqreadssr3url = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=1800`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };

    $.get(toqqreadssr3url, (error, response, data) => {
      if (logs) $.log(`${O}, 金币奖励3: ${data}`);
      let ssr3 = JSON.parse(data);
      if (ssr3.data.amount > 0) {
        tz += `【阅读金币3】获得${ssr3.data.amount}金币\n`;
        kz += `【阅读金币3】获得${ssr3.data.amount}金币\n`;
      }
    });

    resolve();
  });
}
// 阅豆签到
function qqreadtake() {
  return new Promise((resolve, reject) => {
    const toqqreadtakeurl = {
      url: "https://mqqapi.reader.qq.com/mqq/sign_in/user",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.post(toqqreadtakeurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅豆签到: ${data}`);
      let take = JSON.parse(data);
      if (take.data.takeTicket > 0) {
        tz += `【阅豆签到】:获得${take.data.takeTicket}豆\n`;
        kz += `【阅豆签到】:获得${take.data.takeTicket}豆\n`;
      }
      resolve();
    });
  });
}
// 阅读时长任务
function qqreadconfig() {
  return new Promise((resolve, reject) => {
    const toqqreadconfigurl = {
      url:
        "https://mqqapi.reader.qq.com/mqq/page/config?router=%2Fpages%2Fbook-read%2Findex&options=",
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadconfigurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅读时长查询: ${data}`);
      config = JSON.parse(data);
      if (config.code == 0) {
        tz += `【时长查询】:今日阅读${(
          config.data.pageParams.todayReadSeconds / 60
        ).toFixed(0)}分钟\n`;
        kz += `【时长查询】:今日阅读${(
          config.data.pageParams.todayReadSeconds / 60
        ).toFixed(0)}分钟\n`;
      }

      resolve();
    });
  });
}
// 阅读时长
function qqreadtime() {
  return new Promise((resolve, reject) => {
    do TIME = Math.floor(Math.random() * 35);
    while (TIME < 25)
    const toqqreadtimeurl = {
      url: qqreadtimeurlVal.replace(/readTime=/g, `readTime=${TIME}`),
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadtimeurl, (error, response, data) => {
      if (logs) $.log(`${O}, 阅读时长: ${data}`);
      let time = JSON.parse(data);
      if (time.code == 0) {
        tz += `【阅读时长】:上传${(TIME / 6).toFixed(1)}分钟\n`;
        kz += `【阅读时长】:上传${(TIME / 6).toFixed(1)}分钟\n`;
      }
      resolve();
    });
  });
}
// 宝箱奖励
function qqreadbox() {
  return new Promise((resolve, reject) => {
    const toqqreadboxurl = {
      url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/treasure_box",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadboxurl, (error, response, data) => {
      if (logs) $.log(`${O}, 宝箱奖励: ${data}`);
      let box = JSON.parse(data);
      if (box.code == 0 && box.data.amount) {
        tz += `【宝箱奖励${box.data.count}】:获得${box.data.amount}金币\n`;
        kz += `【宝箱奖励${box.data.count}】:获得${box.data.amount}金币\n`;
      }

      resolve();
    });
  });
}
// 宝箱奖励翻倍
function qqreadbox2() {
  return new Promise((resolve, reject) => {
    const toqqreadbox2url = {
      url:
        "https://mqqapi.reader.qq.com/mqq/red_packet/user/treasure_box_video",
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreadbox2url, (error, response, data) => {
      if (logs) $.log(`${O}, 宝箱奖励翻倍: ${data}`);
      let box2 = JSON.parse(data);
      if (box2.code == 0 && box2.data.amount) {
        tz += `【宝箱翻倍】:获得${box2.data.amount}金币\n`;
        kz += `【宝箱翻倍】:获得${box2.data.amount}金币\n`;
      }
      resolve();
    });
  });
}
// 本周阅读时长
function qqreadwktime() {
  return new Promise((resolve, reject) => {
    const toqqreadwktimeurl = {
      url: `https://mqqapi.reader.qq.com/mqq/v1/bookShelfInit`,
      headers: JSON.parse(qqreadtimeheaderVal),
    };
    $.get(toqqreadwktimeurl, (error, response, data) => {
      if (logs) $.log(`${O}, 本周阅读时长: ${data}`);
      wktime = JSON.parse(data);
      if (wktime.code == 0) {
        tz += `【本周阅读时长】:${wktime.data.readTime}分钟\n`;
        kz += `【本周阅读时长】:${wktime.data.readTime}分钟\n`;
      }
      resolve();
    });
  });
}
// 本周阅读时长奖励任务
function qqreadpick() {
  return new Promise((resolve, reject) => {
    const toqqreadpickurl = {
      url: `https://mqqapi.reader.qq.com/mqq/pickPackageInit`,
      headers: JSON.parse(qqreadtimeheaderVal),
    };

    $.get(toqqreadpickurl, (error, response, data) => {
      if (logs) $.log(`${O},周阅读时长奖励任务: ${data}`);
      let pick = JSON.parse(data); {
        if (pick.data[7].isPick == true)
          tz += "【周时长奖励】:已全部领取\n";
        kz += "【周时长奖励】:已全部领取\n";
      }

      for (let i = 0; i < pick.data.length; i++) {
        setTimeout(() => {
          const pickid = pick.data[i].readTime;
          const Packageid = [
            "10",
            "10",
            "20",
            "30",
            "50",
            "80",
            "100",
            "120",
          ];
          const toqqreadPackageurl = {
            url: `https://mqqapi.reader.qq.com/mqq/pickPackage?readTime=${pickid}`,
            headers: JSON.parse(qqreadtimeheaderVal),
            timeout: 60000,
          };
          $.get(toqqreadPackageurl, (error, response, data) => {
            if (logs) $.log(`${O}, 领周阅读时长奖励: ${data}`);
            Package = JSON.parse(data);
            if (Package.code == 0) {
              tz += `【周时长奖励${i + 1}】:领取${Packageid[i]}阅豆\n`;
              kz += `【周时长奖励${i + 1}】:领取${Packageid[i]}阅豆\n`;
            }
          });
        }, i * 100);
      }
    });
    resolve();

    resolve();
  });
}
//提现
function qqreadwithdraw() {
  return new Promise((resolve, reject) => {
    const toqqreadwithdrawurl = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/withdraw?amount=${CASH * 10000}`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.post(toqqreadwithdrawurl, (error, response, data) => {
      if (logs) $.log(`${O}, 提现: ${data}`);
      let withdraw = JSON.parse(data);
      if (withdraw.data.code == 0) {
        tz += `【现金提现】:成功提现${CASH}元\n`;
        kz += `【现金提现】:成功提现${CASH}元\n`;
      }
      resolve();
    });
  });
}
// 金币统计
function qqreadtrans() {
  return new Promise((resolve, reject) => {
    for (var y = 1; y < 9; y++) {
      let day = 0;
      const toqqreadtransurl = {
        url: "https://mqqapi.reader.qq.com/mqq/red_packet/user/trans/list?pn=" + y,
        headers: JSON.parse(qqreadtimeheaderVal),
        timeout: 60000,
      };
      $.get(toqqreadtransurl, (error, response, data) => {
        if (logs) $.log(`${O}, 今日收益: ${data}`);
        trans = JSON.parse(data);
        for (var i = 0; i < 20; i++) {
          if (trans.data.list[i].createTime >= daytime)
            day += trans.data.list[i].amount;
        }
        tz += "【今日收益】:获得" + day + '\n'
        kz += "【今日收益】:获得" + day + '\n'
        resolve();
      });
    }

  });
}
// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

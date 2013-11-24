var ZsetRankList = require("../index.js");

var key = "key";
var u_id = "u_key143";
var score = 27;
var i;
for (i=0;i<20;i++){
//    client.zadd("key",i*2+1,"u_key"+(i*11));
//    client.zadd("key",i*2+1,"u_key"+(i*12));
//    client.zadd("key",i*2+1,"u_key"+(i*13));
//    ZsetRankList.setScore(key,i*2+1,"u_key"+(i*11));
//    ZsetRankList.setScore(key,i*2+1,"u_key"+(i*12));
//    ZsetRankList.setScore(key,i*2+1,"u_key"+(i*13));
//    ZsetRankList.setScore(key,i*2+1,"u_key"+(i*14));
//    ZsetRankList.setScore(key,i*2+1,"u_key"+(i*15));
}

ZsetRankList.getRank(key,u_id,score,function(rank){
    console.log(u_id," score is:", score, " rank is:", rank)
});
ZsetRankList.getRankList(key,u_id,score,30,function(list){
    console.log("rank list:\n",list);
});


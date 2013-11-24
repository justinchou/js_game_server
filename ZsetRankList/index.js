var redis = require("redis");

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });


var setScore = function(key,u_id,score){
    var client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
        return;
    });
    client.zadd(key,u_id,score,redis.print);
    client.quit();
};

var getRank = function(key,u_id,score,cb){
    var client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
        return;
    });
    client.zrevrank(key,u_id,function(err,index){
        client.zcount(key,score,score,function(err,count){
            if (count > 1){
                client.zrevrangebyscore(key,score,score,function(err,list){
                    for(i=0; i<count; i++){
                        if(u_id == list[i]){
                            cb(index-i+1);
                            break;
                        }
                    };
                    if(i>=count) cb(index);
                    client.quit();
                });
            } else {
                cb(index);
                client.quit();
            }
        });
    });
};

var reHashArray = function(arr,u_id,score){
    var len = arr.length;
    var cursor = 0;
    var index = 1;
    var reHashObject = {};
    var key, value;
    var exchange = true,
        exclude = false;
    for(;cursor<len;cursor+=2){
        key = arr[cursor];
        value = arr[cursor+1];
        if(exchange && score == value){
            reHashObject[index] = {"u_id":u_id,"score":score};
            exchange = false;
            exclude = true;
            index++;
        }
        if(exclude && u_id == key){
            continue;
        }
        reHashObject[index] = {"u_id":key,"score":parseInt(value)};
        index++;
    }
    return reHashObject;
}

var getRankList = function(key,u_id,score,amount,cb){
    var client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
        return;
    });
    var conditions = [key,0,amount,'WITHSCORES'];
    client.zrevrange(conditions,function(err,list){
        var hashList = reHashArray(list,u_id,score);
        cb(hashList);
        client.quit();
    });
};

module.exports = {
    "getRank": getRank,
    "setScore": setScore,
    "getRankList": getRankList
};

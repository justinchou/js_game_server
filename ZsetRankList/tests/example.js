var ZsetRankList = require("../index.js");
var key, u_id, score, i;
var amount = 30;


/**  Part I: Same Score Show The Same Rank (But Occupied Multi)  **/
{
	key = "keyI";
	u_id = "u_key143";
	score = 27;
	for (i=0;i<20;i++){
		ZsetRankList.setScore(key,i*2+1,"u_key"+(i*11));
		ZsetRankList.setScore(key,i*2+1,"u_key"+(i*12));
		ZsetRankList.setScore(key,i*2+1,"u_key"+(i*13));
		ZsetRankList.setScore(key,i*2+1,"u_key"+(i*14));
		ZsetRankList.setScore(key,i*2+1,"u_key"+(i*15));
	}

	ZsetRankList.getRank(key,u_id,score,function(rank){
		console.log(u_id," score is:", score, " rank is:", rank)
	});
	ZsetRankList.getRankList(key,u_id,score,amount,function(list){
		console.log("rank list:\n",list);
	});
}


/**  Part II: Same Score Rank Depends On TimeStamp (First Come Rank Good)  **/
{
	key = "keyII";
	u_id = "u_key143";
	for (i=0;i<20;i++){
		ZsetRankList.setScoreTimestamp(key,i*2+1,"u_key"+(i*11));
		ZsetRankList.setScoreTimestamp(key,i*2+1,"u_key"+(i*12));
		ZsetRankList.setScoreTimestamp(key,i*2+1,"u_key"+(i*13));
		ZsetRankList.setScoreTimestamp(key,i*2+1,"u_key"+(i*14));
		ZsetRankList.setScoreTimestamp(key,i*2+1,"u_key"+(i*15));
	}

	ZsetRankList.getRank(key,u_id,function(rank){
		console.log(u_id," rank is:", rank)
	});
	ZsetRankList.getRankList(key,amount,function(list){
		console.log("rank list:\n",list);
	});
}
const stats={startTime:void 0,rounds:0,successfulAttacks:0,unsuccessfulAttacks:0};export default{get:{time(){var s=new Date-stats.startTime,t=Math.floor(s/6e4),s=(s%6e4/1e3).toFixed(0);return"Time played: "+t+":"+(s<10?"0":"")+s},rounds(){return"Rounds: "+stats.rounds},successRate(){var s=stats.successfulAttacks+stats.unsuccessfulAttacks;return`Success rate: ${0===s?0:Math.round(stats.successfulAttacks/s*100)}%`}},set:{startTime(){stats.startTime=new Date},rounds(){stats.rounds++},successfulAttacks(){stats.successfulAttacks++},unsuccessfulAttacks(){stats.unsuccessfulAttacks++}},reset(){stats.startTime=new Date,stats.rounds=0,stats.successfulAttacks=0,stats.unsuccessfulAttacks=0}};
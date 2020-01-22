
function main(params, callback){
	let maxMsgBattery = 1000;
	let batteryPercentage = ((maxMsgBattery - params.custom.seqNumber)/maxMsgBattery)*100;

  let date = moment().toISOString();
	let dateAdd10Seconds = moment().add(10, "seconds").toISOString();

  
    var result = [
        {
            "key": "status",
            "value": "pushed"
		},	
      	{
            "key": "last_push",
            "value": date
		},
        {
            "key": "battery",
            "value": batteryPercentage
		},
      	{
            "key": "status_num",
            "value": 1,
          	"datetime": date
		},
      	{
            "key": "status_num",
            "value": 0,
          	"datetime": dateAdd10Seconds
		},
      	{
            "key": "snr",
            "value": params.custom.snr
		},
      	{
            "key": "station",
            "value": params.custom.station
		},
      	{
            "key": "avgSnr",
            "value": params.custom.avgSnr
		},
      	{
            "key": "rssi",
            "value": params.custom.rssi
		},
      	{
            "key": "seqNumber",
            "value": params.custom.seqNumber
		}
    ]
    
    console.log(result);
    
    callback(null, result) 
}

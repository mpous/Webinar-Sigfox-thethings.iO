function job(params, callback) {

    thethingsAPI.getProductThings((err, things) => {
        async.eachSeries(things, function (thing, next) {
            let result = [];
            let horasOffline = 0;
            let status = "ONLINE";
            let seqNumber = 0;
            let lastSeqNumber = 0;

            thethingsAPI.thingRead(thing.thingToken, 'ctm_payload', {'limit':50, 'lib':'panel'}, (err, payload) => {

                seqNumber = payload[0].value;

                if (err) horasOffline = 0;
                else horasOffline = moment().diff(moment(payload[0].datetime), 'hours');

                if (horasOffline > 3) status = "OFFLINE";

                result.push({
                    key : 'offlineTime',
                    value : horasOffline
                },{
                    key : 'statusConnection',
                    value : status
                });

                thethingsAPI.thingWrite(thing.thingToken, { values: result }, {lib:'panel'}, next);

            });
        }, function (err) {
            if (err) return callback('Error on some devices' + warehouseResult);
            return callback(null, 'Done');
        });
    });
}

import moment from "moment";
module.exports.getLocalTime=(date)=>{
    var now =new Date();
    return new Date(date.getTime()-(now.getTimezoneOffset()*60000));
}
module.exports.getDurationHoursAndMinutes=(elapse_total)=>{
    const duration=moment.duration(elapse_total);
    const o={
        hours:0,
        minutes:0
    }
    o.hours=Math.floor(duration.asHours());
    const restDuration=duration.subtract(moment.duration(o.hours,"hours"))
    //console.log(restDuration);
    o.minutes=Math.floor(restDuration.minutes())
    //console.log(o);
    return o
}
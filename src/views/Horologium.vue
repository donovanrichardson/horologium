<template>
    <div>
        <h2>
            {{utcString}}
        </h2>
        <h1>
            {{localTime}}
        </h1>
        <h1>
            {{today}}
        </h1>
    </div>
</template>

<script>
import { DateTime, Settings, IANAZone } from "luxon";

console.log('datetime', DateTime);
// console.log('thedata?', this.data);

export default {
    created(){
        console.log("route", this.$route);
        console.log("zone", IANAZone);
        // console.log("tz", );
        if(this.$route.query.zone && IANAZone.isValidZone(this.$route.query.zone)){
            this.timezone = this.$route.query.zone
        }else{
            this.timezone = Settings.defaultZoneName
        }
        let timestring = this.$route.query.time
        if(timestring){
            this.time = DateTime.fromFormat(timestring,'yyyyMMddHHmmss',{zone:this.timezone})
            console.log('the toyme mate',this.time);
        }

        if(!timestring || this.time.invalid){
            this.time = DateTime.fromObject({zone:this.timezone})
        }
        this.utc = this.time.toUTC()
    },
    name: "Horologium",
    data:function(){
        return {
                time:null,
                timezone:null
            }
    },
    computed: {
        utcString(){
            return `${this.utc.toLocaleString(DateTime.DATE_HUGE)} ${this.utc.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}`
        },
        localTime(){
            return this.time.toLocaleString(DateTime.TIME_24_WITH_LONG_OFFSET)
        },
        today(){
            return this.time.toLocaleString(DateTime.DATE_HUGE)
        },
    }
}
</script>
<template>
    <div>
        <h1>
            {{timestring}}
        </h1>
        <h1>
            {{time}}
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
    },
    name: "Horologium",
    data:function(){
        return {
                time:null,
                timezone:null
            }
    },
    computed: {
        timestring(){
            return DateTime.utc().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
        }
    }
}
</script>
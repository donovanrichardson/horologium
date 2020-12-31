<template>
    <div>
        <h2>
            {{utcString}}
        </h2>
        <h1>
            {{chosenTime}}
        </h1>
        <h1>
            {{chosenDate}}
        </h1>
        <div v-if="localZone != timezone">
            <h2>
                {{localString}}
            </h2>
        </div>
        <h2>
            {{unixString}}
        </h2>
        <button v-on:click="share">
            Share this moment (copies url to this moment to the clipboard)
        </button>
        <div>
            <h3>
                Set the date and time!
            </h3>
            <form id='datetime-edit' v-on:submit.prevent="changeTime">
                <div>
                    <input type='date' v-model="selectedDate"/>
                </div>
                <div>
                    <input type="time" v-model="selectedTime"/>
                </div>
                <button>Change Date</button>
            </form>
            <button :class="{hidden: !fixed}" @click="()=> {this.fixed=false; this.startClockIfNotFixed()}">
                Set Current Time
            </button>
        </div>
    </div>
</template>
<style scoped>
.hidden{
    visibility:hidden;
}
</style>

<script>
import { DateTime, Settings, IANAZone } from "luxon";
import copy from 'copy-to-clipboard'

console.log('datetime', DateTime);
console.log('copy', copy);
// console.log('thedata?', this.data);

export default {
    created(){
        console.log("route", this.$route);
        console.log("zone", IANAZone);
        this.localZone = Settings.defaultZoneName
        // console.log("tz", );
        if(this.$route.query.zone && IANAZone.isValidZone(this.$route.query.zone)){
            this.timezone = this.$route.query.zone
        }else{
            this.timezone = this.localZone
        }
        let timestring = this.$route.query.time
        if(timestring){
            this.time = DateTime.fromFormat(timestring,'yyyy-MM-dd HH:mm:ss',{zone:this.timezone})
            // console.log('the toyme mate',this.time);
            this.fixed = true
        }

        if(!timestring || this.time.invalid){
            this.time = DateTime.fromObject({zone:this.timezone})
            this.fixed = false
        }
        this.selectedDate = this.time.toFormat('yyyy-MM-dd')
        this.selectedTime = this.time.toFormat('HH:mm')
        console.log("it ran", this.selectedTime);
        

        this.startClockIfNotFixed()
    },
    name: "Horologium",
    data:function(){
        return {
                time:null,
                timezone:null,
                selectedDate:null,
                selectedTime:null,
                clockBattery:null,
                original:Math.floor(4.5)
                //for some reason, commenting out time and timezone prevents the every-second updating
            }
    },
    computed: {
        utcString(){
            const utc = this.time.toUTC()
            return `${utc.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} ${utc.toLocaleString(DateTime.DATE_HUGE)}`
        },
        chosenTime(){
            return this.time.toLocaleString(DateTime.TIME_24_WITH_LONG_OFFSET)
        },
        chosenDate(){
            return this.time.toLocaleString(DateTime.DATE_HUGE)
        },
        localString(){
            const local = this.time.toLocal()
            return `${local.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} ${local.toLocaleString(DateTime.DATE_HUGE)}`
        },
        unixString(){
            return `UNIX: ${Math.floor(this.time.ts / 1000)}`
        }
    },
    methods:{
        share: function(e){
            const loc = window.location.toString().split('?')[0]
            const slug = `?time=${this.time.toFormat('yyyy-MM-dd HH:mm:ss')}&zone=${this.timezone}`
            copy(encodeURI(`${loc}${slug}`))
        },
        clicky: function(e){
            console.log("ive been clicked")
        },
        startClockIfNotFixed: function(){
            if(!this.fixed){
                const startOfSecond = this.time.plus({seconds:1}).startOf('second') + 1 - this.time
                setTimeout(()=>{
                    this.time = DateTime.fromObject({zone:this.timezone}) //maybe put this starting at if(!timestring || this.time.invalid){; abstract the time assignment
                    this.clockBattery = setInterval(()=>{
                        this.time = DateTime.fromObject({zone:this.timezone})
                    },1000)
                },startOfSecond)
            }
        },
        changeTime: function(e){
            clearInterval(this.clockBattery)
            this.fixed = true
            this.time = DateTime.fromFormat(`${this.selectedDate} ${this.selectedTime}`,'yyyy-MM-dd HH:mm',{zone:this.timezone})
        }
    }
}
</script>
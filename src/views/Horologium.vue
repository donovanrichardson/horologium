<template>
    <div class='home'>
        <b-container id='main-display'>
            <b-row>
            <!-- <b-col cols='12' sm>1 of 3</b-col>
            <b-col cols='12' sm>3 of 3</b-col>
            <b-col cols='12' sm>3 of 3</b-col>
            <b-col cols='12' sm>3 of 3</b-col>
            <b-col cols='12' sm>3 of 3</b-col> -->
                <b-col cols='12' lg>
                    <h1>
                        {{utcTime}}
                    </h1>
                    <h1>
                        {{utcDate}}
                    </h1>
                </b-col>
                <b-col cols='12' :lg="localZone != timezone? '5':''">
                    <h1>
                        {{chosenTime}}
                    </h1>
                    <h1>
                        {{chosenDate}}
                    </h1>
                    <select v-model.lazy="timezone" @change="changeZone"> 
                        <option v-for="zone in tz" v-bind:value="zone.name" v-bind:key="zone.name">{{zone.rawFormat}} </option>
                    </select>
                </b-col>
                <b-col cols='12' lg v-if="localZone != timezone">
                    <h1>
                        {{localTime}}
                    </h1>
                    <h1>
                        {{localDate}}
                    </h1>
                </b-col>
            </b-row>
        </b-container>
        <div class="timegroup">
            <h2>
                {{unixString}}
            </h2>
        </div>
        <button v-on:click="share">
            Share this moment (adds link to clipboard)
        </button>
        <div>
            <h4>
                Set the date and time below!
            </h4>
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
                Reset to Current Time
            </button>
        </div>
    </div>
</template>
<style scoped>
#main-display{
    margin:2em auto;
}
select{
    width:50%;
}
.hidden{
    visibility:hidden;
}
h1, h2, h3{
    padding: .05em;
}

/* .timegroup{
    border-top: 1px solid black;
} */

h4, button, input{
    margin:.2em;
}

button, input{
    border-radius: 10px;
}

input{
    border:none;
    background: #ddd;
    
}
</style>

<script>
import { DateTime, Settings, IANAZone } from "luxon";
import copy from 'copy-to-clipboard'
import {getTimeZones} from "@vvo/tzdb";

// console.log('datetime', DateTime);
// console.log('copy', copy);

export default {
    created(){
        this.tz = getTimeZones()

        this.tz.sort((z1, z2)=>{
            return z1.currentTimeOffsetInMinutes - z2.currentTimeOffsetInMinutes || z1.name.localeCompare(z2.name)
        })

        // console.log('zones', this.tz);

        // console.log("route", this.$route);
        // console.log("zone", IANAZone);
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
            this.fixed = true
        }

        if(!timestring || this.time.invalid){
            this.time = DateTime.fromObject({zone:this.timezone})
            this.fixed = false
        }
        this.selectedDate = this.time.toFormat('yyyy-MM-dd')
        this.selectedTime = this.time.toFormat('HH:mm')
        

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
                tz:null,
                //for some reason, commenting out time and timezone prevents the every-second updating
            }
    },
    computed: {
        utc(){
            return this.time.toUTC()
        },
        local(){
            return this.time.toLocal()
        },
        // utcString(){
        //     const utc = this.time.toUTC()
        //     return `${utc.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} ${utc.toLocaleString(DateTime.DATE_HUGE)}`
        // },
        utcTime(){
            return this.utc.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)
        },
        utcDate(){
            return this.utc.toLocaleString(DateTime.DATE_HUGE)
        },
        chosenTime(){
            return this.time.toLocaleString(DateTime.TIME_24_WITH_LONG_OFFSET)
        },
        chosenDate(){
            return this.time.toLocaleString(DateTime.DATE_HUGE)
        },
        // localString(){
        //     const local = this.time.toLocal()
        //     return `${local.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)} ${local.toLocaleString(DateTime.DATE_HUGE)}`
        // },
        localTime(){
            return this.local.toLocaleString(DateTime.TIME_24_WITH_LONG_OFFSET)
        },
        localDate(){
            return this.local.toLocaleString(DateTime.DATE_HUGE)
        },
        unixString(){
            return `UNIX: ${Math.floor(this.time.ts / 1000)}`
        }
    },
    methods:{
        changeZone: function(e){
            this.time= this.time.setZone(this.timezone);
        },
        share: function(e){
            const loc = window.location.toString().split('?')[0]
            const slug = `?time=${this.time.toFormat('yyyy-MM-dd HH:mm:ss')}&zone=${this.timezone}`
            copy(encodeURI(`${loc}${slug}`))
        },
        startClockIfNotFixed: function(){
            if(!this.fixed){
                this.time = DateTime.fromObject({zone:this.timezone})
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
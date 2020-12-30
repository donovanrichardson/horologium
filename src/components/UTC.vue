<template>
    <p>
        {{timestring}}
    </p>
</template>

<script>
import { DateTime } from "luxon";

console.log('datetime?', DateTime.utc());
// console.log('thedata?', this.data);

export default {
    name: "UTC",
    data:function(){
        return {
            // time:luxon.DateTime.utc()
            }
    },
    computed: {
        timestring(){
            return DateTime.utc().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
        }
    }
}
</script>
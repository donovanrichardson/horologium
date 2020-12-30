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
import { DateTime } from "luxon";

console.log('datetime?', DateTime.utc());
// console.log('thedata?', this.data);

export default {
    created(){
        this.time = DateTime.utc().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
    },
    name: "Horologium",
    data:function(){
        return {
            }
    },
    computed: {
        timestring(){
            return DateTime.utc().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
        }
    }
}
</script>
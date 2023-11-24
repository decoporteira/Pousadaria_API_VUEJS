

const  app = Vue.createApp({
    data() {
        return {
            listData: [
                 
        ], listRoom: []
        }
    },
    async mounted(){
        this.listData = await this.getInns();
    },
    
    methods:{
        async getInns() {
            let response = await fetch('http://127.0.0.1:3000/api/v1/inns/')
            let data = await response.json()
            this.listRoom = []
            this.listData = []
            data.forEach(item => {
                var object = new Object();
                object.trade_name = item.trade_name
                object.email = item.email
                object.city = item.city
                object.id = item.id
                object.description = item.description
                this.listData.push(object)

            });
        },
        async getInn(id){
            let response = await fetch('http://127.0.0.1:3000/api/v1/inns/inn_details/?id=' + id)
            let data = await response.json()
            this.listData = []
            var object = new Object();
            object.trade_name = data.trade_name
            object.email = data.email
            object.city = data.city
            object.nota = data.nota
            this.listData.push(object)
               
            let rooms = await fetch('http://127.0.0.1:3000/api/v1/inns/rooms?id=' + id)
            let rooms_data = await rooms.json()
            rooms_data.forEach(item => {
                var object = new Object();
                object.name = item.name
                object.description = item.description
                object.size = item.size
                object.guest = item.guest
                object.daily_rate = item.daily_rate
                object.balcony = item.balcony
                object.air_conditioner =  item.air_conditioner
                object.tv = item.tv
                object.wardrobe = item.wardrobe
                object.safe = item.safe
                object.accessible = item.accessible

                this.listRoom.push(object)

            });
           
        },
        

        
    }
})

app.mount('#app')
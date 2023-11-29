

const  app = Vue.createApp({
    data() {
        return {
            searchText: '',
            innsList: [], 
            listRoom: [],
            listCities: [],
           
        }
    },
    computed: {
        listData(){
            if(this.searchText) {
                return this.innsList.filter(object => {
                    return object.trade_name.toLowerCase().includes(this.searchText.toLowerCase());
                });
            } else {
                return this.innsList;
            }
        }
    },
    async mounted(){
        this.innsList = this.getInns();
        this.listCities = this.getCities();
    },
    
    methods:{
        async getInns() {
            this.searchText = '';
            let response = await fetch('http://127.0.0.1:3000/api/v1/inns/')
            let innsData = await response.json()
            this.listRoom = []
            this.innsList = []
           
            innsData.forEach(item => {
                var inn = new Object();
                inn.trade_name = item.trade_name
                inn.email = item.email
                inn.city = item.city
                inn.id = item.id
                inn.description = item.description
                
                this.innsList.push(inn)
               
            });
            
        },
        async getCities() {
            let response = await fetch('http://127.0.0.1:3000/api/v1/cities/')
            let listCitiesData = await response.json()  
            this.listCities = []    
            listCitiesData.forEach(item => {
                var city = new Object();
                city.city = item.city
                this.listCities.push(city)
                 
            })
    
            

        },
        async getInn(id){
            let response = await fetch('http://127.0.0.1:3000/api/v1/inns/inn_details/?id=' + id)
            let innData = await response.json()
            this.innsList = []
            var inn = new Object();
            inn.trade_name = innData.trade_name
            inn.email = innData.email
            inn.city = innData.city
            inn.nota = innData.nota
            this.innsList.push(inn)
               
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
        async getInnByCity(city) {

            let response = await fetch('http://127.0.0.1:3000/api/v1/inns_by_city?city=' + city)
            let inns_by_city = await response.json() 
            this.listRoom = []
            this.innsList = []
           
            inns_by_city.forEach(item => {
                var inn = new Object();
                inn.trade_name = item.trade_name
                inn.email = item.email
                inn.city = item.city
                inn.id = item.id
                inn.description = item.description
                
                this.innsList.push(inn)
               
            });
        }
        

        
    }
})

app.mount('#app')
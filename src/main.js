import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router' // <---
import Unicon from 'vue-unicons'
import { uniLayerGroupMonochrome, uniCarWash, uniBars, uniEstate, uniHistory, uniCloudUpload, uniTimes, uniScenery, uniFile, uniComments, uniRobot, uniMicroscope } from 'vue-unicons/dist/icons'
Unicon.add(
    [
        uniLayerGroupMonochrome, uniCarWash, uniBars,
        uniEstate, uniHistory, uniCloudUpload, uniTimes,
        uniScenery, uniFile, uniComments, uniRobot, uniMicroscope
    ])

createApp(App).use(router).use(Unicon).mount('#app')
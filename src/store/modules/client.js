import { addClient } from '@/api/client-service'
import { v5 as uuidv5 } from 'uuid'

const state = {}

const mutations = {}

const actions = {

  async addClient({ commit }) {
    const randon = Math.random()
    if (!localStorage.getItem('uuid')) {
      const uuid = uuidv5(`clientId+${randon}`, uuidv5.URL)
      localStorage.setItem('uuid', uuid)
      await addClient({
        scope: 'pc',
        clientName: 'admin',
        clientId: uuid,
        clientSecret: process.env.VUE_APP_DEVICE_TOKEN
      })
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

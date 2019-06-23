// import Web3 from 'web3'
export const state = () => ({
  count: 0,
  badgeCount: 0
})

export const mutations = {
  addCount(state) {
    state.count += 1
  },
  getCount(state) {
    state.badgeCount = 0
  }
}

module.exports = {

  clicks: function(state){
    console.log(state().clickCount)
    state.clickCount.set(state.clickCount() + 1)
  },

}
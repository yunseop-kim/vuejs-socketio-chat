<template>
  <div class="container">
    <h3>Socket.io Chat Example</h3>
    <!-- <form class="form-inline"> -->
    <div class="form-group">
      <label for="name" class="col-sm-2 control-label">Name</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="name" placeholder="Name" v-model="name">
      </div>
    </div>
    <div class="form-group">
      <label for="room" class="col-sm-2 control-label">Room</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="room" placeholder="Room" v-model="room">
      </div>
    </div>
    <div class="form-group">
      <label for="msg" class="col-sm-2 control-label">Message</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="msg" placeholder="Message" v-model="msg">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button class="btn btn-default" @click="clickButton">Send</button>
      </div>
    </div>
    <ul id="chat">
      <li v-for="(item, index) in chatList" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  sockets: {
    connect: function() {
      // eslint-disable-next-line
      console.log("socket connected");
    },
    chatMessage: function (data) {
      this.chatList.push(data)
    }
  },
  data () {
    return {
      name: "",
      room: "",
      msg: "",
      chatList: []
    }
  },
  methods: {
    clickButton: function () {
      // $socket is socket.io-client instance
      this.$socket.emit("chatMessage", {
        name: this.name,
        userid: this.name,
        msg: this.msg,
        room: this.room
      });
      this.msg = ""
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div>
    <div id="messages" class="j-message">
      <div v-for="(item, index) in chatList" :key="index">{{item}}</div>
    </div>
    <div class="j-footer">
      <table>
        <tr>
          <td width="100%">
            <input class="form-control" type="text" v-model="room" placeholder="방명">
          </td>
        </tr>
        <tr>
          <td width="100%">
            <input class="form-control" type="text" v-model="name" placeholder="닉네임">
          </td>
        </tr>
        <tr>
          <td width="100%">
            <input
              id="message-input"
              class="form-control"
              type="text"
              @keyup.enter="clickButton"
              v-model="msg"
            >
          </td>
          <td width="20%">
            <button id="message-button" class="btn btn-default" @click="clickButton">SEND</button>
          </td>
        </tr>
      </table>
    </div>
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
    chatMessage: function(data) {
      this.chatList.push(data);
    }
  },
  data() {
    return {
      name: "",
      room: "",
      msg: "",
      chatList: []
    };
  },
  methods: {
    clickButton: function() {
      if (this.msg === "") return;
      if (this.room === "") {
        window.alert("방명을 입력하세요.");
        return;
      }
      if (this.name === "") {
        window.alert("이름을 입력하세요.");
        return;
      }
      // $socket is socket.io-client instance
      this.$socket.emit("chatMessage", {
        name: this.name,
        userid: this.name,
        msg: this.msg,
        room: this.room
      });
      var container = this.$el.querySelector("#messages");
      container.scrollTop = container.scrollHeight;
      this.msg = "";
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

.j-message {
  margin-bottom: 50px;
  overflow-y: auto;
}
.j-footer {
  width: 100%;
  height: 150px;
  position: fixed;
  bottom: 0;
  background-color: white;
  border-top: 1px solid black;
}
table {
  height: 100%;
}
</style>

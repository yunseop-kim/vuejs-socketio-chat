<template>
  <div id="chat-window-template" v-if="open">
    <div class="toolbar">
      <span id="title">{{title}}</span>
      <button id="close" @click="close">𝘅</button>
    </div>
    <div class="msgs-container">
      <div class="msgs" v-chat-scroll="{always: false, smooth: true}">
        <slot></slot>
      </div>
      <div id="input-container">
        <input type="text" placeholder="Enter text" v-model="msg" @keyup.enter="inputMessage(msg)">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "open", "room", "name"],
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    inputMessage() {
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
      this.msg = "";
    },
    close() {
      this.$emit("open-flag");
    }
  }
};
</script>
<style>
#chat-window-template {
  display: block;
  max-width: 250px;
  background: #fff;
  contain: content;
  position: fixed;
  bottom: 0;
  right: 16px;
}
#chat-window-template .msgs {
  display: flex;
}
.toolbar {
  padding: 8px;
  background: #404040;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  cursor: pointer;
  user-select: none;
}
.toolbar #title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.toolbar #close {
  font-size: inherit;
  background: none;
  border: none;
  color: inherit;
}
.msgs {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 300px;
  overflow: auto;
  overscroll-behavior-y: contain;
}
.msg {
  padding: 8px 16px;
  margin: 8px;
  border-radius: 5px;
  background-color: #eee;
}
.msg:nth-child(even) {
  align-self: flex-end;
}
#input-container {
  border: 1px solid #ccc;
  border-top: 1px solid #aaa;
}
#input-container input {
  padding: 8px;
  font-size: inherit;
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
}
.msgs-container {
  display: none;
}
#chat-window-template .msgs-container {
  display: block;
}
</style>

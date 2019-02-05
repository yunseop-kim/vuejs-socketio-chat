<template>
  <div id="chat-window-template" v-if="open">
    <div class="toolbar">
      <span id="title">{{title}}</span>
      <button id="close" @click="close">𝘅</button>
    </div>
    <div class="msgs-container">
      <div class="msgs" v-chat-scroll="{always: false, smooth: true}">
        <div
          class="msg"
          :class="{ me: user.name === data.name }"
          v-for="(data, index) in messages"
          :key="index"
        >
          <span>{{data.name}}: {{data.msg}}</span>
          <div @click="kick(data.socketId)">강퇴</div>
          <div @click="whisper(data.socketId)">귓속말</div>
        </div>
      </div>
      <div id="input-container">
        <input type="text" placeholder="Enter text" v-model="msg" @keyup.enter="inputMessage(msg)">
      </div>
    </div>
  </div>
</template>
<script>
import { User } from "../models/User.js";
export default {
  props: {
    open: {
      type: Boolean
    },
    user: {
      type: User
    }
  },
  data() {
    return {
      msg: "",
      title: null,
      messages: []
    };
  },
  sockets: {
    // connect() {
    //   // eslint-disable-next-line
    //   console.log("socket connected, chatwindow");
    // },
    chatMessage(data) {
      // eslint-disable-next-line
      console.log(data);
      this.messages.push(data);
      // eslint-disable-next-line
      console.log(this.messages);
    },
    whisper(data) {
      // eslint-disable-next-line
      console.log("whisper:", data);
      if (data.type === "kick") {
        window.alert("강퇴 당하셨습니다.");
        this.close();
      }
      if (data.type === "whisper") {
        this.messages.push(data);
      }
    },
    rooms(data) {
      // eslint-disable-next-line
      console.log("chat - room list", data);
    },
    kicked(data) {
      // eslint-disable-next-line
      console.log(data);
    }
  },
  methods: {
    inputMessage() {
      if (this.msg === "") return;
      // $socket is socket.io-client instance
      this.user.chat(this.msg)
      this.msg = "";
    },
    close() {
      this.$emit("close");
    },
    kick(target) {
      if (window.confirm(`${target} 사용자를 강퇴합니다. 계속하시겠습니까?`)) {
        this.user.kick(target)
      }
    },
    whisper(target) {
      const message = window.prompt("귓속말:");
      this.user.whisper(target, message)
    }
  }
};
</script>
<style>
#chat-window-template {
  display: block;
  max-width: 350px;
  background: #fff;
  contain: content;
  position: fixed;
  bottom: 0;
  right: 16px;
  width: 300px;
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
/* .msg:nth-child(even) {
  align-self: flex-end;
} */
.me {
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

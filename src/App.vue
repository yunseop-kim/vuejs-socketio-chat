<template>
  <!-- shrink refreshing -->
  <main :class="{shrink: transitionFlag, refreshing: transitionFlag}">
    <header>
      <div>
        <h2>채팅 앱</h2>
      </div>
      <button @click="openChatRoom()">방 만들기</button>
    </header>
    <div class="refresher">
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
    </div>
    <section id="inbox">
      <div v-for="(room, index) in rooms" :key="index" @click="openChatRoom(room)">
        <span>채팅방 {{room}}</span>
        <span>5:30 PM</span>
      </div>

      <!-- filled dynamically -->
    </section>
    <chat-window
      :title="`채팅방 ${room}`"
      :room="room"
      :name="name"
      @open-flag="openFlag"
      :open="open"
    />
  </main>
</template>

<script>
import ChatWindow from "./components/ChatWindow.vue";
export default {
  name: "app",
  components: {
    "chat-window": ChatWindow
  },
  sockets: {
    connect() {
      // eslint-disable-next-line
      console.log("App - socket connected");
    },
    disconnect() {
      // eslint-disable-next-line
      console.log("App - socket disconnected");
      this.$socket.emit("leave", `admin`);
    },
    rooms(data) {
      // eslint-disable-next-line
      console.log("App - room list", data);
      this.rooms = data
    }
  },
  created() {
    document.addEventListener(
      "touchstart",
      e => {
        this.startY = e.touches[0].pageY;
      },
      { passive: true }
    );
    document.addEventListener(
      "touchmove",
      e => {
        const y = e.touches[0].pageY;
        // Activate custom pull-to-refresh effects when at the top fo the container
        // and user is scrolling up.
        if (
          document.scrollingElement.scrollTop === 0 &&
          y > this.startY &&
          !this.transitionFlag
        ) {
          this.simulateRefreshAction();
        }
      },
      { passive: true }
    );
  },
  data() {
    return {
      name: "",
      room: "",
      msg: "",
      rooms: [],
      open: false,
      transitionFlag: false,
      startY: 0
    };
  },
  methods: {
    openChatRoom(room) {
      if (!room) {
        this.room = window.prompt("방 이름을 입력해주세요")
      } else {
        this.room = room;
      }
      if (this.name === "" || this.name === null) {
        this.name = window.prompt("이름을 입력해주세요.");
      }
      if (this.name === "" || this.name === null) {
        window.alert("이름을 입력하지 않으셨습니다!");
        return;
      }
      if (this.room) {
        this.openFlag();
      }
      // this.room = room;
      this.open = true;
    },
    simulateRefreshAction() {
      this.transitionFlag = true;
      setTimeout(() => {
        this.transitionFlag = false;
      }, 2000);
    },
    openFlag() {
      if (this.open) {
        this.open = false;
        this.$socket.emit("leave", {
          name: this.name,
          room: `test/${this.room}`
        });
      } else {
        this.open = true;
        this.$socket.emit("join", {
          name: this.name,
          room: `test/${this.room}`
        });
      }
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  --header-height: 60px;
}
html,
body {
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 16px;
  background: #fafafa;
  margin: 0;
  overscroll-behavior-y: contain; /* disable pull to refresh, keeps glow effects */
}
h1,
h2,
h3 {
  margin: 0;
  font-weight: inherit;
}
header {
  padding: 0 8px;
  background: #f44336;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#inbox {
  padding-top: var(--header-height); /* height of header */
}
section {
  counter-reset: email;
}
section div {
  margin: 0;
  padding: 16px 8px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
section .label::after {
  counter-increment: email;
  content: counter(email);
  margin-left: 8px;
}
main.refreshing #inbox,
main.refreshing header {
  filter: blur(1px);
  touch-action: none; /* prevent scrolling */
}
main.refreshing .refresher {
  transform: translate3d(0, 150%, 0) scale(1);
  z-index: 1;
  visibility: visible;
}
.refresher {
  pointer-events: none;
  --refresh-width: 55px;
  background: #fff;
  width: var(--refresh-width);
  height: var(--refresh-width);
  border-radius: 50%;
  position: absolute;
  left: calc(50% - var(--refresh-width) / 2);
  padding: 8px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
  will-change: transform, opacity;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  visibility: hidden;
}
main.refreshing .refresher.shrink {
  transform: translate3d(0, 150%, 0) scale(0);
  opacity: 0;
}
.refresher.done {
  transition: none;
}
.loading-bar {
  width: 4px;
  height: 18px;
  border-radius: 4px;
  animation: loading 1s ease-in-out infinite;
}
.loading-bar:nth-child(1) {
  background-color: #3498db;
  animation-delay: 0;
}
.loading-bar:nth-child(2) {
  background-color: #c0392b;
  animation-delay: 0.09s;
}
.loading-bar:nth-child(3) {
  background-color: #f1c40f;
  animation-delay: 0.18s;
}
.loading-bar:nth-child(4) {
  background-color: #27ae60;
  animation-delay: 0.27s;
}
@keyframes loading {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1, 2.2);
  }
  40% {
    transform: scale(1);
  }
}
</style>

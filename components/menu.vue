<template>
  <!-- MENU -->
  <a-layout-sider
    v-model="collapsed" collapsible
    breakpoint="lg"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
    class="check"
  >
    <div class="logo">
      <a href="/">
        <img src="img/logo.png" alt="" />
        <h1>Adiary</h1>
      </a>
    </div>
    <a-menu theme="dark" :default-selected-keys="['']" mode="inline">
      <a-menu-item-group title="Reports">
        <a-menu-item key="1">
          <nuxt-link to="/adiary">
            <a-icon type="appstore" />
            <span class="nav-text">Adiary</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="2">
          <nuxt-link to="/chart">
            <a-icon type="bar-chart" />
            <span class="nav-text">Chart</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="More">
        <a-menu-item key="3">
          <nuxt-link to="/news">
            <a-icon type="container" />
            <span class="nav-text">News</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="Infomation">
        <a-menu-item key="4">
          <nuxt-link to="/user">
            <a-icon type="user" />
            <span class="nav-text">Account</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu-item-group>
    </a-menu>
  </a-layout-sider>
  <!-- /MENU -->
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    onCollapse(collapsed, type) {
      
    },
    onBreakpoint(broken) {
      
    }
  }
};
</script>

<style>
/* reposonsive */


#components-layout-demo-responsive .logo a{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
}
#components-layout-demo-responsive .logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
}
#components-layout-demo-responsive .logo img {
  display: inline-block;
  height: 32px;
  vertical-align: middle;
}
#components-layout-demo-responsive .logo h1 {
  display: inline-block;
  height: 32px;
  margin: 0 0  0 12px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  vertical-align: middle;
}
/* #components-layout-demo-responsive .logo:hover {
  background: pink;
  transition: background-color 300ms ease-out 0.1s;
  cursor: pointer;
} */
#components-layout-demo-responsive .logo::before {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.ant-menu-item-group-title {
  font-weight: 600;
}
.ant-layout-sider-children {
  position: fixed;
  min-width: 200px;
}
</style>

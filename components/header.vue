<template>
  <div>
    <!-- TOPBAR -->
    <a-layout-header :style="{ background: '#fff', padding: '0 16px 0' }">
      <div class="top-bar">
        <a-input-search
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
          :style="{ margin: '0 16px' }"
        />
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <a-avatar
              class="logo-user"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            /><span>User Profile</span>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" class="btn-menu-item"
                >
                <nuxt-link to="/user">
                <a-icon type="setting" /> 
            
                Setting
                </nuxt-link>
                </a
              >
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" class="btn-menu-item"
                ><a-icon type="export" /> Logout</a
              >
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-layout-header>
    <!-- /TOPBAR -->
    <!-- BREADCRUMBS -->
      <div v-if="crumbs[0].title == '' " class="cccc"></div>
      <div v-else>
    <a-breadcrumb class="breadcrumbs">
        <a-breadcrumb-item class="breadcrumbs-item"><nuxt-link to="/">Home</nuxt-link></a-breadcrumb-item>
        <a-breadcrumb-item v-for="(crumb, index) in crumbs" :key="index" class="breadcrumbs-item">
          <nuxt-link :to="crumb.path"
          >{{
            $route.fullPath === crumb.path && title !== null ? title : crumb.title
          }}
          </nuxt-link>
        </a-breadcrumb-item>
    </a-breadcrumb>
        <div class="ant-page-header-heading">
          <div class="ant-page-header-heading-left">
            <div class="ant-page-header-heading-title">
              <span>{{crumbs[0].title}}</span>
            </div>
          </div>
        </div>
      </div>
    <!-- /BREADCRUMBS  -->
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
   methods: {
    onSearch(value) {
      console.log(value);
    },
  },
  computed: {
        crumbs() {
      const fullPath = this.$route.fullPath;
      const params = fullPath.startsWith("/")
        ? fullPath.substring(1).split("/")
        : fullPath.split("/");
      const crumbs = [];
      let path = "";
      params.forEach((param, index) => {
        path = `${path}/${param}`;
        const match = this.$router.match(path);
        if (match.name !== null) {
          crumbs.push({
            title: param.replace(/-/g, " "),
            ...match
          });
        }
      });
      console.log(crumbs, "check")
      return crumbs;
    }
  }
  
};
</script>

<style>
/* GLOBAL */
.content {
  padding: 24px;
  margin: 16px 16px 0;
  background: white;
  min-height:100vh
}
/*  */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.breadcrumbs {
  margin-top: 1px;
  padding: 16px 0;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  text-transform: capitalize;
}
.breadcrumbs-item:nth-child(1),
.ant-page-header-heading-title {
  padding-left: 24px;
  margin-left: 16px;
}
.ant-page-header-heading{
  padding: 16px 0;
  background: #fff;
  text-transform: capitalize;
}
.ant-layout-header {
  height: 48px;
  line-height: 48px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.ant-page-header-heading {
  margin-top: 0px !important
}
.ant-page-header-heading-left {
  display: flex;
  align-items: center;
  margin: 4px 0;
  overflow: hidden;
}
.ant-page-header-heading-title {
  margin-right: 12px;
  margin-bottom: 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ant-dropdown-link {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 100%;
  color: grey;
}
.ant-dropdown-link:hover {
  background: rgba(0, 0, 0, 0.025);
  color: black;
}
.logo-user {
  margin-right: 8px;
}
.btn-menu-item{
  padding: 10px 20px !important;
}
.btn-menu-item a{
  color: grey;
}

</style>

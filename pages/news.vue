<template>
  <div class="content">
    <a-list
      item-layout="vertical"
      size="large"
      :pagination="pagination"
      :data-source="listNews"
    >
      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <template v-for="{ type, text } in actions" slot="actions">
          <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <img
          slot="extra"
          width="272"
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
        <a-list-item-meta :description="item.description">
          <a slot="title" :href="item.href">{{ item.title }}</a>
          <a-avatar slot="avatar" :src="item.attach_file" />
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import mutationTypes from '~/constants/mutationTypes';
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://www.antdv.com/",
    title: `ant design vue part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}
import { convertTime } from "~/helpers/time";
export default {
  mounted() {
    this.$store.dispatch(`news/${mutationTypes.USER.GET_NEWS}`);
  },
  computed: {
    listNews: function(){
      return (this.$store.getters["news/newsList"] || []).map(el => ({
        ...el,
        created_at: el.created_at ? convertTime(el.created_at) : 'Processing',
      }))
    },
    imageNews: function(){
      return (this.$store.getters["news/newsList"]?.attach_file || null)
    }
  },
  data() {
    return {
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      },
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
      ]
    };
  }
};
</script>
<style></style>

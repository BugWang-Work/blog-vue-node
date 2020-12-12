import path from 'path'

export default {
  base: './blog-vue-node',
  // 别名设置 https://github.com/vitejs/vite/issues/300
  alias: {
    "/@/": path.resolve(__dirname, "src"),
  },
  resolvers: [
    {
      alias(id: string) {
        return id.replace(/^@\//, "/@/"); // add slash to particular id, then vite won't resolve it as a module
      },
    },
  ],
};

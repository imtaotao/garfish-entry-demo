function ExpandEntryPlugin(Garfish) {
  const name = 'ExpandEntryPlugin';
  const transformManager = (data, code) => {
    const manager = new Garfish.loader.TemplateManager(code, data.result.url);
    data.value.code = code;
    data.value.fileType = 'template'
    data.value.resourceManager = manager;
  }

  // 允许 img entry
  const processImg = (data) => {
    const code = `<img src="${data.result.url}" width="100%"/>`
    transformManager(data, code);
  }

  // 允许 json entry
  const processJson = (data) => {
    const code = `
      <div>${data.value.code}</div>
      <script>
        exports.provider = {
          jsonData: ${data.value.code},
        }
      <\/script>
    `
    transformManager(data, code);
  }

  const processExportJs = (data) => {
    // 这里不能改为 src，因为当前 url 的资源以及被此时的插件更改为了 html 资源
    const code = `
      <div>打开控制可以看到输出</div>
      <script>${data.value.resourceManager.scriptCode}<\/script>
    `;
    transformManager(data, code);
  }

  Garfish.loader.hooks.usePlugin({
    name,
    loaded(data) {
      if (data.value.url.endsWith('.jpg')) {
        processImg(data);
      } else if (data.value.url.endsWith('.json')) {
        processJson(data);
      } else if (data.value.url.endsWith('jsExport.js')) {
        processExportJs(data);
      }
      return data;
    },
  })
  return { name };
}
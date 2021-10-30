function StorageWhitelistPlugin(Garfish, list) {
  const rewrite = (storage) => {
    const { rawStorage } = storage
    const realKey = (name) => {
      return list.includes(name) ? name : `${storage.prefix + name}`;
    }

    storage.getItem = function(key) {
      return rawStorage.getItem(realKey(key));
    }
    storage.setItem = function(key, value) {
      return rawStorage.setItem(realKey(key), value);
    }
    storage.removeItem = function(key) {
      return rawStorage.removeItem(realKey(key));
    }
    return storage;
  }
  
  const modifyVmSandboxStorage = () => {
    return {
      created(fakeWindow) {
        fakeWindow.localStorage = rewrite(fakeWindow.localStorage);
        fakeWindow.sessionStorage = rewrite(fakeWindow.sessionStorage);
      },
    };
  }

  return {
    name: 'StorageWhitelistPlugin',
    beforeLoad(appInfo) {
      const { sandbox } = appInfo;
      if (sandbox && !sandbox.snapshot) {
        sandbox.modules = sandbox.modules || [];
        sandbox.modules.push(modifyVmSandboxStorage);
      }
    },
  };
}
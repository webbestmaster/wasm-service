# RUST-WASM _inline_ front-end

1 - build the wasm for web
```bash
$ wasm-pack build -t web --out-dir "./get-available-move-path-list" --release
```

2 - add into webpack config
```typescript
import {type Configuration} from "webpack";

const webpackConfig: Configuration = {
    experiments: {
        asyncWebAssembly: true,
        syncWebAssembly: true,
    },
    module: {
        rules: [
            {
                test: /\.wasm$/u,
                type: "asset/inline",
            },
        ]
    },
};
```

3 - add the pkg to project folder, just copy folder and rename

4 - add package to package.json into `dependencies`
```json
{
  "dependencies": {
    "rust-wasm": "file:./path/to/rust-wasm-folder"
  }
}
```

5 - install dependencies
```bash
$ npm i
```

6 - run code, example
```typescript
import wasmInit, {get_available_move_path_list} from "rust-wasm";
import wasmData from "rust-wasm/rust_wasm_bg.wasm";

console.warn(wasmInit);
console.warn(wasmData);

(async () => {
    const res = await wasmInit(wasmData);

    console.warn(res);

    // this function will work after initalisation only
    console.warn(get_available_move_path_list(0, 0, 2, [1, 2, 3, 4, 5].join(","), 2));
})();
```

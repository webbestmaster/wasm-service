import path from "node:path";
import {cwd} from "node:process";

import type {StorybookConfig} from "@storybook/react-webpack5";
import type {Configuration} from "webpack";

import {isProduction} from "../webpack/config";

const styleLoader = {
    loader: "style-loader",
    options: {attributes: {"class": "my-css-module"}},
};

const config: StorybookConfig = {
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
    core: {
        builder: "@storybook/builder-webpack5",
    },
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
    // eslint-disable-next-line @typescript-eslint/require-await
    webpackFinal: async (currentConfig: Configuration): Promise<Configuration> => {
        currentConfig.module?.rules?.push(
            {
                test: /\.scss$/u,
                use: [
                    styleLoader,
                    "css-module-typescript-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]----[hash:6]",
                            },
                            sourceMap: true,
                        },
                    },
                    {loader: "sass-loader", options: {sourceMap: true}},
                ],
            },
            {
                exclude: /node_modules/u,
                test: /\.tsx?$/u,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: isProduction
                                ? path.join(cwd(), "tsconfig.json")
                                : path.join(cwd(), "tsconfig.dev.json"),
                            // Disable type checker for building
                            // TranspileOnly: true,
                        },
                    },
                ],
            }
        );

        return currentConfig;
    },
};

export default config;

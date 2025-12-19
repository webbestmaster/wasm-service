import {describe, expect, it} from "@jest/globals";

import {sort} from "./sort";

describe("sort", () => {
    it("string", () => {
        expect.assertions(5);

        expect(sort<string>(["а", "ё"], 1)).toStrictEqual(["а", "ё"]);
        expect(sort<string>(["а", "ё"], -1)).toStrictEqual(["ё", "а"]);
        expect(sort<string>(["ё", "а"], 1)).toStrictEqual(["а", "ё"]);
        expect(sort<string>(["а", "б"], 1)).toStrictEqual(["а", "б"]);
        expect(sort<string>(["б", "а"], 1)).toStrictEqual(["а", "б"]);
    });

    it("number", () => {
        expect.assertions(4);

        expect(sort<number>([1, 2], 1)).toStrictEqual([1, 2]);
        expect(sort<number>([2, 1], 1)).toStrictEqual([1, 2]);
        expect(sort<number>([-1, 0], 1)).toStrictEqual([-1, 0]);
        expect(sort<number>([Number.NaN, 0, 1, -1, Number.NaN], 1)).toStrictEqual([Number.NaN, -1, 0, 1, Number.NaN]);
    });

    it("boolean", () => {
        expect.assertions(2);

        expect(sort<boolean>([false, true], 1)).toStrictEqual([false, true]);
        expect(sort<boolean>([true, false], 1)).toStrictEqual([false, true]);
    });

    it("object", () => {
        expect.assertions(5);

        expect(sort<{aaa: number}>([{aaa: 1}, {aaa: 2}], 1, ["aaa"])).toStrictEqual([{aaa: 1}, {aaa: 2}]);
        expect(sort<{aaa: number}>([{aaa: 2}, {aaa: 1}], 1, ["aaa"])).toStrictEqual([{aaa: 1}, {aaa: 2}]);
        expect(sort<{aaa: {bbb: number}}>([{aaa: {bbb: 2}}, {aaa: {bbb: 1}}], 1, ["aaa", "bbb"])).toStrictEqual([
            {aaa: {bbb: 1}},
            {aaa: {bbb: 2}},
        ]);
        expect(sort<{aaa: {bbb: number}}>([{aaa: {bbb: 2}}, {aaa: {bbb: 1}}], -1, ["aaa", "bbb"])).toStrictEqual([
            {aaa: {bbb: 2}},
            {aaa: {bbb: 1}},
        ]);
        expect(sort<{aaa: number}>([{aaa: 2}, {aaa: 1}], 1, ["non-exist-key"])).toStrictEqual([{aaa: 2}, {aaa: 1}]);
    });
});

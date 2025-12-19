/* eslint-disable jest/prefer-ending-with-an-expect */

/* global HTMLElement */

import {describe, expect, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import {type JSX, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {TestUtilityNavigationProvider} from "../../../test-unit/util/test-utility-navigation-provider";
import {NavigationLink} from "./navigation-link";

// eslint-disable-next-line jest/no-disabled-tests
describe.skip("navigationLink", () => {
    it("default state", () => {
        expect.assertions(1);

        function DefaultState(): JSX.Element {
            return <NavigationLink to="/default-state" />;
        }

        const {unmount, container} = render(<TestUtilityNavigationProvider component={DefaultState} />);

        const link = container.querySelector("a[href='/default-state']");

        expect(link instanceof HTMLElement).toBe(true);

        unmount();
    });

    it("with props", () => {
        expect.assertions(2);

        function WithProps(): JSX.Element {
            return (
                <NavigationLink className="props-class-name" title="props-title" to="/with-props">
                    some text
                </NavigationLink>
            );
        }

        const {unmount, container} = render(<TestUtilityNavigationProvider component={WithProps} />);

        const link = container.querySelector(
            "a.props-class-name[href='/with-props'][class='props-class-name'][title='props-title']"
        );

        expect(link instanceof HTMLElement).toBe(true);
        expect(screen.getByText("some text") instanceof HTMLElement).toBe(true);

        unmount();
    });

    it("use query by default", () => {
        expect.assertions(1);

        function UseQuery(): JSX.Element {
            // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
            const [ignoredSearch, setSearch] = useSearchParams();

            useEffect(() => {
                setSearch({nick: "mike"});
            }, [setSearch]);

            return <NavigationLink to="/use-query-by-default" />;
        }

        const {unmount, container} = render(<TestUtilityNavigationProvider component={UseQuery} />);

        const link = container.querySelector("a[href='/use-query-by-default?nick=mike']");

        expect(link instanceof HTMLElement).toBe(true);

        unmount();
    });

    it("use query by props", () => {
        expect.assertions(1);

        function UseQuery(): JSX.Element {
            // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
            const [ignoredSearch, setSearch] = useSearchParams();

            useEffect(() => {
                setSearch({nick: "mike"});
            }, [setSearch]);

            return <NavigationLink isSaveQueries to="/use-query-by-props" />;
        }

        const {unmount, container} = render(<TestUtilityNavigationProvider component={UseQuery} />);

        const link = container.querySelector("a[href='/use-query-by-props?nick=mike']");

        expect(link instanceof HTMLElement).toBe(true);

        unmount();
    });

    it("do not use query", () => {
        expect.assertions(1);

        function DoNotUseQuery(): JSX.Element {
            // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
            const [ignoredSearch, setSearch] = useSearchParams();

            useEffect(() => {
                setSearch({nick: "mike"});
            }, [setSearch]);

            return <NavigationLink isSaveQueries={false} to="/do-not-use-query" />;
        }

        const {unmount, container} = render(<TestUtilityNavigationProvider component={DoNotUseQuery} />);

        const link = container.querySelector("a[href='/do-not-use-query']");

        expect(link instanceof HTMLElement).toBe(true);

        unmount();
    });

    it("use own queries", () => {
        expect.assertions(1);

        function UseOwnQueries(): JSX.Element {
            // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
            const [ignoredSearch, setSearch] = useSearchParams();

            useEffect(() => {
                setSearch({nick: "mike"});
            }, [setSearch]);

            return <NavigationLink queries={{foo: "bar"}} to="/use-own-queries" />;
        }

        const {unmount, container} = render(<TestUtilityNavigationProvider component={UseOwnQueries} />);

        const link = container.querySelector("a[href='/use-own-queries?nick=mike&foo=bar']");

        expect(link instanceof HTMLElement).toBe(true);

        unmount();
    });

    it("use own queries only", () => {
        expect.assertions(1);

        function UseOwnQueriesOnly(): JSX.Element {
            // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
            const [ignoredSearch, setSearch] = useSearchParams();

            useEffect(() => {
                setSearch({nick: "mike"});
            }, [setSearch]);

            return <NavigationLink isSaveQueries={false} queries={{foo: "bar"}} to="/use-own-queries-only" />;
        }

        const {unmount, container} = render(<TestUtilityNavigationProvider component={UseOwnQueriesOnly} />);

        const link = container.querySelector("a[href='/use-own-queries-only?foo=bar']");

        expect(link instanceof HTMLElement).toBe(true);

        unmount();
    });
});

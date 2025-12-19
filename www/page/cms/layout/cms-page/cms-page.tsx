import "antd/dist/reset.css";

import {Layout, Menu} from "antd";
import type {JSX, ReactNode} from "react";
import {Link, type Location, useLocation} from "react-router-dom";

import {appRoute} from "../../../../component/app/app-route";
import {Box} from "../../../../layout/box/box";

const {Content} = Layout;

interface CmsPagePropsType {
    readonly children: ReactNode;
}

export function CmsPage(props: CmsPagePropsType): JSX.Element {
    const {children} = props;
    const routerLocation: Location<unknown> = useLocation();

    return (
        <Layout>
            <Box padding={16}>
                <Menu
                    defaultSelectedKeys={[routerLocation.pathname]}
                    items={[
                        {
                            key: appRoute.articleList.path,
                            label: <Link to={appRoute.articleList.path}>List</Link>,
                        },
                        {
                            key: appRoute.articleCreate.path,
                            label: <Link to={appRoute.articleCreate.path}>Create</Link>,
                        },
                        {
                            key: appRoute.articleTree.path,
                            label: <Link to={appRoute.articleTree.path}>Tree</Link>,
                        },
                    ]}
                    mode="horizontal"
                />
            </Box>

            <Box padding={16}>
                <Content>{children}</Content>
            </Box>

            {/* <Footer>Footer is here</Footer> */}
        </Layout>
    );
}

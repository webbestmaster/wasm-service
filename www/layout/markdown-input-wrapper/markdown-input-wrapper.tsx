import {Col, Row} from "antd";
import type {JSX} from "react";

import {Box} from "../box/box";
import {Markdown} from "../markdown/markdown";
import * as markdownInputWrapperStyle from "./markdown-input-wrapper.scss";

interface MarkdownInputWrapperPropsType {
    readonly children: JSX.Element;
    readonly mdInput: string;
}

export function MarkdownInputWrapper(props: MarkdownInputWrapperPropsType): JSX.Element {
    const {mdInput, children} = props;

    return (
        <Row className={markdownInputWrapperStyle.markdown_input_wrapper} gutter={[16, 0]}>
            <Col span={12}>{children}</Col>
            <Col span={12}>
                <Box backgroundColor="#fff" height="calc(100% - 54px)" margin={[32, 0, 16]} padding={[8]}>
                    <Markdown articleTitle="" mdInput={mdInput} />
                </Box>
            </Col>
        </Row>
    );
}

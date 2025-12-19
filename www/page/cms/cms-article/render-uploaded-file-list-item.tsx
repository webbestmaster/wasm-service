/* global HTMLInputElement */
import {Col, Input, Row, Typography} from "antd";
import type {UploadFile} from "antd/es/upload/interface";
import type {JSX, SyntheticEvent} from "react";
const {Title} = Typography;

import type {ArticleFileType} from "../../../../server/article/article-type";
import {Box} from "../../../layout/box/box";
import {getFileMarkdownByFullInfo} from "../../../layout/markdown/markdown-helper";

interface UploadedFileListItemPropsType {
    file: UploadFile<unknown>;
    fileInfo: ArticleFileType | undefined;
    originNode: JSX.Element;
    setFileTitle: (updateFileTitle: string) => void;

    // ignored uploadedFileList: Array<UploadFile<unknown>>,

    // ignored actions: { download: () => void; preview: () => void; remove: () => void }
}

export function renderUploadedFileListItem(props: UploadedFileListItemPropsType): JSX.Element {
    const {setFileTitle, fileInfo, originNode, file} = props;

    if (!fileInfo) {
        return (
            <Title level={4} type="danger">
                Can not found file by name: {file.name}
            </Title>
        );
    }

    return (
        <Box height={112}>
            {originNode}
            <Row gutter={8}>
                <Col span={12}>
                    <Input
                        defaultValue={fileInfo.title}
                        onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                            setFileTitle(evt.currentTarget.value.trim());
                        }}
                        placeholder="Title"
                    />
                </Col>
                <Col span={12}>
                    <Input readOnly value={getFileMarkdownByFullInfo(fileInfo, {alt: "", poster: ""})} />
                </Col>
            </Row>
        </Box>
    );
}

import React from 'react';
import { Card, Tabs, Button, List, Row, Col, Typography, Divider } from 'antd';
import { CalendarOutlined, CarOutlined, FieldTimeOutlined, GlobalOutlined } from '@ant-design/icons';
import { mdlExcursionDetail } from '../../models/domain/excursionDetail';
import placeHolder from "../../assets/img/placeHolder.jpg";
import { mdlExcursionOffer } from '../../models/domain/excursionOffer';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

// Type for component props
type ExcursionDetailProps = {
    callback: (offer: mdlExcursionOffer) => void;
    excursionDetail: mdlExcursionDetail;
};

export const ExcursionDetail = (props: ExcursionDetailProps) => {
    const { excursionDetail, callback } = props;
    const { offers, detail } = excursionDetail;



    return (
        <Card
            cover={
                <img alt={detail?.excursionName || "Excursion"} height={300} style={{ objectFit: 'cover' }}
                    src={detail?.coverImage ? `https://dev.sanoctopus.com/files/0c4c8c45-2518-4622-be3b-523e6a2a43d5/${detail.coverImage}` : placeHolder}
                />
            }
            actions={[
                <Button type="primary">Show all photos</Button>,
            ]}
        >
            <Title level={3}>{detail?.excursionName || "Excursion Title"}</Title>
            <span className="excursion-location"><GlobalOutlined style={{ marginRight: '5px' }} />{detail?.locationId}</span>
            <span style={{ marginLeft: '5px' }} className="detailcursion-duration"><FieldTimeOutlined style={{ marginRight: '5px' }} />{detail?.duration.split(":")[0]} hours and {detail?.duration.split(":")[1]} minutes</span>
            <Divider />

            <Tabs defaultActiveKey="1">
                <TabPane tab="Offers" key="1">
                    <List
                        itemLayout="vertical"
                        dataSource={offers}
                        renderItem={item => (
                            <List.Item style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '0' }}>
                                <Row >
                                    <Col span={18} style={{ padding: '10px' }}>
                                        <div><CalendarOutlined /> Date: {item.date}</div>
                                        <hr />
                                        <Text><FieldTimeOutlined style={{ marginRight: '5px' }} />Start Time:</Text>
                                        <br />
                                        <Button type="default" shape="round">{item.time}</Button>
                                    </Col>
                                    <Col span={6} style={{ textAlign: 'left', borderLeft: "1px solid #ddd", padding: '10px' }}>
                                        <Title level={4}>Total Price</Title>
                                        <Title level={4}>{item.currencyCode} {item.price.toFixed(2)}</Title>
                                        <Button type="primary" onClick={() => callback(item)} disabled={!item.isAvailable} style={{ width: '100%' }}>
                                            {item.isAvailable ? "Book Now" : "Unavailable"}
                                        </Button>
                                    </Col>
                                </Row>

                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="Details" key="2">
                    <p>{detail?.excursionName} details content goes here...</p>
                </TabPane>
                <TabPane tab="Gallery" key="3">
                    <p>Gallery content goes here...</p>
                </TabPane>
            </Tabs>
        </Card >
    );
};

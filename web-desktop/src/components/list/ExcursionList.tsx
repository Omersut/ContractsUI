import React from 'react';
import './ExcursionList.css';
import Title from 'antd/es/typography/Title';
import { mdlExcursion } from '../../models/domain/excursion';
import { Col, Row } from 'antd';
import { FieldTimeOutlined, GlobalOutlined, HeatMapOutlined, StarOutlined } from '@ant-design/icons';
import placeHolder from "../../assets/img/placeHolder.jpg";


type ExcursionListProps = {
    list: mdlExcursion[];
    callback: (excursion: mdlExcursion) => void;
};

const ExcursionList = (props: ExcursionListProps) => {
    return (
        <div className="excursion-list">
            <Title level={3}>Results</Title>
            <div>{props.list?.length} Results Found</div>
            {props.list.map((ex) => (
                <div key={ex.excursionId} className="excursion-card" onClick={() => props.callback(ex)}>
                    <img
                        src={ex.coverImage ? `https://dev.sanoctopus.com/files/0c4c8c45-2518-4622-be3b-523e6a2a43d5/${ex.coverImage}` : placeHolder}
                        alt={ex.excursionName}
                        className="excursion-image"
                    />
                    <div className="excursion-details">
                        <h3 className="excursion-name">{ex.excursionName}</h3>
                        <Row>
                            <Col>
                                <p className="excursion-location"><GlobalOutlined style={{ marginRight: '5px' }} />Location: {ex.locationId}</p>
                            </Col>
                            <Col style={{ marginLeft: '10px' }}>
                                <p className="excursion-duration"><FieldTimeOutlined style={{ marginRight: '5px' }} />Duration: {ex.duration}</p>

                            </Col>
                        </Row>
                        {/* <p className="excursion-themes"><StarOutlined style={{ marginRight: '5px' }} />Themes: {ex.themes.length > 0 ? ex.themes.join(', ') : 'No themes available'}</p> */}
                        <p className="excursion-themes"><StarOutlined style={{ marginRight: '5px' }} />Facilities:  {ex.facilitiesIncluded.length > 0 ? ex.facilitiesIncluded.map((facility, index) => (
                            <span key={index}>{`${index != 0 ? ", " : ""}${facility}`}</span>
                        )) : <span>No facilities listed</span>}</p>

                    </div>



                    <div className="excursion-price" >
                        <span>Starting from</span>
                        <strong>{ex.currencyCode} {ex.pricePerExcursion.toFixed(2)}</strong>
                        <span>Per Person</span>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default ExcursionList;

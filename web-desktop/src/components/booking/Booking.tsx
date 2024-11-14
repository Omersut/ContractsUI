import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, InputNumber, Typography, Divider, Card, Row, Col, Flex, Spin } from 'antd';
import dayjs from 'dayjs';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import { ContractsService } from '../../services/ContractsService';
import { mdlBookExcursionResponse } from '../../models/service-models/BookExcursionResponse';
import Paragraph from 'antd/es/typography/Paragraph';
import { mdlCollectManualPaymentRequest } from '../../models/service-models/CollectManulaPaymentRequest';
import { toast } from 'react-toastify';
import { toPng } from 'html-to-image';
const { Title } = Typography;

const Booking = () => {
    const [form] = Form.useForm();
    const bookingRef = useRef(null);
    const [excursionDetail, setExcursionDetail] = useState(() => {
        const detail = localStorage.getItem("excursionDetail");
        return detail ? JSON.parse(detail) : null;
    });
    const [bookResponse, setBookResponse] = useState<mdlBookExcursionResponse>();
    const [searchCriteria, setSearchCriteria] = useState(() => {
        const criteria = localStorage.getItem('searchCriteria');
        return criteria ? JSON.parse(criteria) : null;
    });
    const [bookingLoadingSpin, setBookingLoadingSpin] = useState<boolean>(false)
    // Sample data for suppliers, agencies, and tour guides
    const suppliers = [
        { id: '0x68520BAE52306140B8112e6862f6fbD12d59AF05', name: 'Supplier 1' },
        { id: '0x68520BAE52306140B8112e6862f6fbD12d59AF05', name: 'Supplier 2' },
        { id: '0x68520BAE52306140B8112e6862f6fbD12d59AF05', name: 'Supplier 3' },
    ];

    const agencies = [
        { id: '0x68520BAE52306140B8112e6862f6fbD12d59AF05', name: 'Agency 1' },
        { id: '0x68520BAE52306140B8112e6862f6fbD12d59AF05', name: 'Agency 2' },
        { id: '0x68520BAE52306140B8112e6862f6fbD12d59AF05', name: 'Agency 3' },
    ];

    const tourGuides = [
        { id: '0x68520BAE52306140B8112e6862f6fbD12d59AF05', name: 'Guide 1' },
        { id: '0x68520BAE52306140B8112e6862f6fbD12d59AF05', name: 'Guide 2' },
        { id: '0x68520BAE52306140B8112e6862f6fbD12d59AF05', name: 'Guide 3' },
    ];
    useEffect(() => {
        if (excursionDetail) {
            const camPrice = excursionDetail.selectedOffer?.camPrice || 0;
            const price = excursionDetail.selectedOffer?.price || 0;
            // Calculate shares based on camPrice
            const supplierShare = price * 0.5;
            const agentShare = price * 0.3;
            const guideShare = price * 0.2;

            // Initialize form with calculated shares
            form.setFieldsValue({
                supplierCAMShare: supplierShare,
                travelAgentCAMShare: agentShare,
                tourGuideCAMShare: guideShare,
            });
        }
    }, [excursionDetail, form]);

    const handleSubmit = (values: any) => {
        handleBook(values);
    };

    const handleBook = async (values: any) => {
        const camPrice = excursionDetail.selectedOffer?.camPrice || 0;
        const supplierShare = camPrice * 0.5;
        const agentShare = camPrice * 0.3;
        const guideShare = camPrice * 0.2;

        const bookingRequest = {
            excursionOfferId: excursionDetail?.selectedOffer?.offerId,
            excursionName: excursionDetail?.detail?.excursionName,
            excursionVariation: excursionDetail?.detail?.variationCode,
            leadName: values.leadName,
            camPrice: excursionDetail?.selectedOffer?.camPrice,
            price: excursionDetail?.selectedOffer?.price,
            currency: excursionDetail?.selectedOffer?.currencyCode,
            supplierWallet: values.supplierWallet,
            travelAgentWallet: values.travelAgentWallet,
            tourGuideWallet: values.tourGuideWallet,
            startDate: dayjs(searchCriteria?.fromDate).format('YYYY-MM-DD'),
            supplierCAMShare: supplierShare,
            travelAgentCAMShare: agentShare,
            tourGuideCAMShare: guideShare,
            supplierMail: values.supplierMail,
            agentMail: values.agentMail,
            tourGuideMail: values.tourGuideMail,
            nationality: searchCriteria?.nationality,
            paxCount: searchCriteria?.adultCount,
        };
        setBookingLoadingSpin(true)
        const response = await ContractsService.BookExcursion(bookingRequest);
        setBookingLoadingSpin(false)
        if (response.excursionId) setBookResponse(response)
    };

    const collectPayment = async () => {
        if (bookResponse?.excursionId) {
            const request: mdlCollectManualPaymentRequest = {
                excursionId: bookResponse?.excursionId,
                paymentAmount: excursionDetail?.selectedOffer?.camPrice
            }
            setBookingLoadingSpin(true)
            const response = await ContractsService.CollectManualPayment(request);
            setBookingLoadingSpin(false)
            if (response) {
                toast.success("Success")
            } else {
                toast.error("")
            }
        }
    }
    const downloadAsImage = () => {
        if (bookingRef.current) {
            toPng(bookingRef.current)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'booking-confirmation.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch((error) => {
                    console.error('Could not download the image', error);
                });
        }
    };

    const copyToClipboard = (textToCopy: string) => {
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.value = textToCopy;
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        toast.success('ID has been copied to clipboard!');

    };
    return (
        <div style={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
            <Spin spinning={bookingLoadingSpin}>
                {bookResponse ? (
                    <>
                        <div style={styles.confirmContainer} ref={bookingRef}>
                            <Title level={4} style={styles.confirmTitle}>Booking Confirmation</Title>
                            <div style={styles.infoContainer} >
                                <Paragraph style={styles.infoItem}><span>Excursion:</span> {excursionDetail?.detail?.excursionName}</Paragraph>
                                <Paragraph style={styles.infoItem}><span>Price:</span> {excursionDetail?.selectedOffer?.currencyCode} {excursionDetail?.selectedOffer?.price}</Paragraph>
                                <Paragraph style={styles.infoItem}><span>Start Time:</span> {excursionDetail?.selectedOffer?.date}</Paragraph>
                            </div>
                            <Paragraph style={styles.infoItem}></Paragraph>
                            <Button type="primary" onClick={() => copyToClipboard(bookResponse.excursionId)} icon={<CopyOutlined />}>
                                Copy Excursion ID
                            </Button>

                        </div>
                        <Flex justify='end'>
                            <Button type="primary" onClick={downloadAsImage} style={styles.downloadButton} icon={<DownloadOutlined />}>
                                Download Confirmation
                            </Button>
                            <Button type="primary" onClick={collectPayment} style={styles.collectButton}>
                                Collect Payment
                            </Button>
                        </Flex>
                    </>
                ) :
                    <Card title={<Title level={3} style={{ textAlign: 'center' }}>Excursion Booking</Title>} bordered={false}>
                        {searchCriteria && excursionDetail && (
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                initialValues={{
                                    excursionName: excursionDetail.detail.excursionName,
                                    supplierMail: 'supplier@example.com',
                                    agentMail: 'agent@example.com',
                                    tourGuideMail: 'tourguide@example.com',
                                }}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Lead Name"
                                            name="leadName"
                                            rules={[{ required: true, message: 'Please enter the lead name' }]}
                                        >
                                            <Input placeholder="Enter lead name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Excursion Name"
                                            name="excursionName"
                                            rules={[{ required: true, message: 'Please enter the excursion name' }]}
                                        >
                                            <Input placeholder="Enter excursion name" disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={10}>
                                        <Form.Item
                                            label="Agent Wallet"
                                            name="travelAgentWallet"
                                            rules={[{ required: true, message: 'Please select a travel agent' }]}
                                        >
                                            <Select placeholder="Select travel agent">
                                                {agencies.map(agency => (
                                                    <Select.Option key={agency.id} value={agency.id}>
                                                        {agency.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Agent Email"
                                            name="agentMail"
                                            rules={[{ type: 'email', required: true, message: 'Please enter a valid email' }]}
                                        >
                                            <Input placeholder="Enter agent email" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            label="Agent Share"
                                            name="travelAgentCAMShare"
                                        >
                                            <InputNumber min={0} step={0.01} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Supplier Section */}
                                <Row gutter={16}>
                                    <Col span={10}>
                                        <Form.Item
                                            label="Supplier Wallet"
                                            name="supplierWallet"
                                            rules={[{ required: true, message: 'Please select a supplier' }]}
                                        >
                                            <Select placeholder="Select supplier">
                                                {suppliers.map(supplier => (
                                                    <Select.Option key={supplier.id} value={supplier.id}>
                                                        {supplier.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Supplier Email"
                                            name="supplierMail"
                                            rules={[{ type: 'email', required: true, message: 'Please enter a valid email' }]}
                                        >
                                            <Input placeholder="Enter supplier email" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            label="Supplier Share"
                                            name="supplierCAMShare"
                                        >
                                            <InputNumber min={0} step={0.01} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Tour Guide Section */}
                                <Row gutter={16}>
                                    <Col span={10}>
                                        <Form.Item
                                            label="Tour Guide Wallet"
                                            name="tourGuideWallet"
                                            rules={[{ required: true, message: 'Please select a tour guide wallet' }]}
                                        >
                                            <Select placeholder="Select tour guide">
                                                {tourGuides.map(guide => (
                                                    <Select.Option key={guide.id} value={guide.id}>
                                                        {guide.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Tour Guide Email"
                                            name="tourGuideMail"
                                            rules={[{ type: 'email', required: true, message: 'Please enter a valid email' }]}
                                        >
                                            <Input placeholder="Enter tour guide email" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            label="Tour Guide Share"
                                            name="tourGuideCAMShare"
                                        >
                                            <InputNumber min={0} step={0.01} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Divider />
                                <Form.Item style={{ textAlign: 'right' }}>
                                    <Title level={4}>Total Price: {excursionDetail.selectedOffer?.price} {excursionDetail.selectedOffer?.currencyCode} </Title>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                        Book Now
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}
                    </Card>
                }
            </Spin>

        </div>
    );
};

const styles = {
    confirmContainer: {
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    confirmTitle: {
        color: '#1890ff',
        fontSize: '24px',
        fontWeight: 'bold' as const,
        marginBottom: '20px',
    },
    infoContainer: {
        maxWidth: '300px',
        backgroundColor: '#fff',
        padding: 5,
        border: '1px solid',
        borderRadius: 5
    },
    infoItem: {
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#555',
        marginBottom: '8px',
    },
    downloadButton: {
        marginTop: '20px',
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
        color: '#fff',
        padding: "20px",
        fontSize: '16px',
    },
    collectButton: {
        marginTop: '20px',
        marginLeft: '10px',
        backgroundColor: 'green',
        color: '#fff',
        padding: "20px",
        fontSize: '16px',
    },
};

export default Booking;

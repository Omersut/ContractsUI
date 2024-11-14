import React, { useState, useEffect } from 'react';
import { DatePicker, Select, InputNumber, Form, Button, Spin } from 'antd';
import dayjs from 'dayjs';
import { SearchOutlined } from '@ant-design/icons';
import { mdlSearchExcursionRequest } from '../../models/service-models/SearchExcursionRequest';
import { ContractsService } from '../../services/ContractsService';
import { mdlSearchExcursionResponse } from '../../models/service-models/SearchExcursionResponse';

const { RangePicker } = DatePicker;

type SearchProps = {
    callback?: (excursionResponse: mdlSearchExcursionResponse) => void;
    customStyle?: any
};

const Search = ({ callback }: SearchProps) => {
    const [formData, setFormData] = useState<mdlSearchExcursionRequest>({
        fromDate: '',
        toDate: '',
        nationality: 'TR',
        adultCount: 1,
    });
    const [spinActive, setSpinActive] = React.useState(false)

    const [form] = Form.useForm();

    // Load search criteria from localStorage on component mount
    useEffect(() => {
        const savedCriteria = localStorage.getItem('searchCriteria');
        if (savedCriteria) {
            const parsedCriteria = JSON.parse(savedCriteria);
            setFormData(parsedCriteria);

            // Set form values directly using Ant Design's form instance
            form.setFieldsValue({
                dateRange: parsedCriteria.fromDate && parsedCriteria.toDate ? [dayjs(parsedCriteria.fromDate), dayjs(parsedCriteria.toDate)] : null,
                nationality: parsedCriteria.nationality,
                adultCount: parsedCriteria.adultCount,
            });
        }
    }, [form]);

    // Save criteria to localStorage whenever formData changes
    useEffect(() => {
        if (formData.fromDate !== "")
            localStorage.setItem('searchCriteria', JSON.stringify(formData));
    }, [formData]);

    const handleSearch = async () => {
        setSpinActive(true)
        const response = await ContractsService.SearchExcursion(formData);
        if (response?.data?.items.length) {
            setSpinActive(false)
            callback?.(response)
        };
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Spin spinning={spinActive}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSearch}
                initialValues={{
                    dateRange: formData.fromDate && formData.toDate ? [dayjs(formData.fromDate), dayjs(formData.toDate)] : null,
                    nationality: formData.nationality,
                    adultCount: formData.adultCount,
                }}
                style={styles.form}
            >
                <Form.Item
                    label="Date Range"
                    name="dateRange"
                    rules={[{ required: true, message: 'Please select a date range!' }]}
                >
                    <RangePicker
                        format="YYYY-MM-DD"
                        onChange={(dates, dateStrings) => {
                            handleInputChange("fromDate", dateStrings[0]);
                            handleInputChange("toDate", dateStrings[1]);
                        }}
                        disabledDate={current => current.isBefore(dayjs().add(1, 'day'), 'day')}
                        style={styles.input}
                    />
                </Form.Item>

                <Form.Item
                    label="Nationality"
                    name="nationality"
                    rules={[{ required: true, message: 'Please select a nationality!' }]}
                >
                    <Select
                        onChange={value => handleInputChange("nationality", value)}
                        style={styles.input}
                    >
                        <Select.Option value="US">American</Select.Option>
                        <Select.Option value="DE">German</Select.Option>
                        <Select.Option value="TR">Turkish</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Adult Count"
                    name="adultCount"
                    rules={[{ required: true, message: 'Please specify the number of adults!' }]}
                >
                    <InputNumber
                        min={1}
                        max={10}
                        onChange={value => handleInputChange("adultCount", value)}
                        style={styles.input}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={styles.submitButton}>
                        <SearchOutlined /> Search
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

const styles = {
    form: { marginTop: '20px', maxWidth: 900, padding: '20px' },
    input: { width: '100%' },
    submitButton: { width: '100%', marginTop: '10px' },
};

export default Search;

import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Spin, List, Form, message } from 'antd';
import { ContractsService } from '../../services/ContractsService';
import { mdlExcursionContract } from '../../models/domain/excursionContract';
import { toast } from 'react-toastify';

type ContractsModalProps = {
    walletAddress: string | null;
    callbackForget: () => void;
};

export const ContractsModal: React.FC<ContractsModalProps> = ({ walletAddress, callbackForget }) => {
    const [guideId, setGuideId] = useState<string | null>(walletAddress);
    const [excursionId, setExcursionId] = useState<string>('');
    const [contractAddress, setContractAddress] = useState<string>('');
    const [contracts, setContracts] = useState<mdlExcursionContract[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setGuideId(walletAddress);
    }, [walletAddress]);

    const searchContracts = async () => {


        setLoading(true);
        try {
            const response = await ContractsService.GetExcursions({
                excursionId,
            });
            if (response?.excursions) {
                setContracts(response.excursions);
            } else {
                setContracts([]);
                message.info('No contracts found.');
            }
        } catch (error) {
            message.error('An error occurred while fetching contracts.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (excursionId: string) => {
        try {
            const response = await ContractsService.CancelExcursion({ excursionId });
            if (response.status) {
                toast.success('Cancelled successfully');
                searchContracts();  // Refresh contracts list after cancellation
            }
        } catch (error) {
            toast.error('Failed to cancel the contract');
        }
    };

    const handleForgetWallet = () => {
        localStorage.removeItem('walletId');
        callbackForget();
        setGuideId(null);
        toast.success('Wallet address removed.');
    };

    return (
        <>
            <Form layout="vertical" onFinish={searchContracts}>

                <Form.Item label="Excursion ID ">
                    <Input
                        value={excursionId}
                        onChange={(e) => setExcursionId(e.target.value)}
                        placeholder="Enter Excursion ID"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Search
                    </Button>
                </Form.Item>
            </Form>

            {loading && (
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Spin />
                </div>
            )}

            {contracts.length > 0 && (
                <List
                    style={{ marginTop: 16 }}
                    header={<h4>Contracts:</h4>}
                    bordered
                    dataSource={contracts}
                    renderItem={(contract) => (
                        <List.Item key={contract.id}>
                            <div style={{ flex: 1 }}>
                                <p><strong>Contract Name:</strong> {contract.name}</p>
                                <p><strong>Start Date:</strong> {contract.startDate}</p>
                                <p><strong>Price:</strong> {contract.currency} {contract.price}</p>
                                <p><strong>Status:</strong> {contract.status || 'No status'}</p>
                            </div>
                            {
                                contract.status != "Cancelled" && <Button
                                    type="primary"
                                    danger
                                    onClick={() => handleCancel(contract.id)}
                                >
                                    Cancel
                                </Button>
                            }
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};
